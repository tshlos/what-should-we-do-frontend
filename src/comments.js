const commentsURL = "http://localhost:3000/api/v1/comments";
const modal = document.getElementById("myModal");
const commentContainer = modal.querySelector(".comment-value");
const commentList = modal.querySelector(".comment-list");

function createOpenCard(cardContainer, activity) {
  const btn = document.createElement("button");
  btn.className = "infocard";
  btn.textContent = "Open Card";
  cardContainer.append(btn);
  btn.addEventListener("click", function (e) {
    openModal(activity);
  });
}

function openModal(activity) {
  // commentList.append(activity.comment);
  modal.style.display = "block";
  const closeModal = modal.querySelector(".close");
  closeModal.onclick = function () {
    modal.style.display = "none";
  };
  addInfoToModal(activity);
  displayComments(activity.comments);
}

function addInfoToModal(activity) {
  const name = modal.querySelector(".name");
  name.textContent = activity.name;
  const category = modal.querySelector(".category");
  category.textContent = activity.category;
  const image = modal.querySelector(".image");
  image.src = activity.image;
  const address = modal.querySelector(".address");
  address.textContent = `${activity.address}, ${activity.city}, ${activity.state}`;
  //const comments = modal.querySelector('.comments');
  commentList.innerHTML = "";

  listenToCreateCommentForm(activity);
}

function listenToCreateCommentForm(activity) {
  const commentForm = document.querySelector(".comment-form");
  commentForm.onsubmit = async function (e) {
    e.preventDefault();
    const commentValue = e.target["comment-value"].value; //value of the last comment entered
    const comment = await fetchComment(activity.id, commentValue); //a comment obj
    displayComments([comment]);
    commentForm.comment.value = "";
    activity.comments.push(comment);
  };
}

function displayComments(comments) {
  comments.forEach((comment) => {
    const listItem = document.createElement("li");
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-button";
    deleteBtn.dataset.id = comment.id;
    deleteBtn.innerText = "\uD83D\uDDD1";
    const updateBtn = document.createElement("button");
    updateBtn.className = "update-button";
    updateBtn.dataset.id = comment.id;
    updateBtn.innerText = "\u270E";
    listItem.innerText = comment.content;
    commentList.append(listItem);
    listItem.append(deleteBtn);
    listItem.append(updateBtn);
    listenToDeleteBtn(deleteBtn);
  });
}

async function fetchComment(activityId, content) {
  const newComment = {
    activity_id: activityId,
    content: content,
  };
  const response = await fetch(commentsURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newComment),
  });
  return await response.json();
}

function listenToDeleteBtn(deleteBtn) {
  deleteBtn.addEventListener("click", function (e) {
    const btnID = parseInt(e.target.dataset.id);
    e.target.parentElement.remove();
    fetchToDeleteComment(btnID);
  });
}
async function fetchToDeleteComment(btnID) {
  return fetch(`${commentsURL}/${btnID}`, {
    method: "DELETE",
  });
}
