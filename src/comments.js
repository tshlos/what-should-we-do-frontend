const commentsURL = "http://localhost:3000/api/v1/comments";
const modal = document.getElementById("myModal");
const commentContainer = modal.querySelector(".comment-value");
const commentList = modal.querySelector(".comment-list");
const commentForm = document.querySelector(".comment-form");

function createOpenCard(cardContainer, activity) {
  const btn = document.createElement("button");
  btn.className = "infocard";
  btn.textContent = "Info";
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
    // const clearList = commentList.children;
    // for (let i = 0; i < clearList.length; i++) {
    //   clearList[i].remove();
    //   debugger;
    // }
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
    //   const commentsToActivity= [];
    //   commentsToActivity.push(comment.content);

    // debugger;
    const listItem = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-button";
    deleteBtn.dataset.id = comment.id;
    deleteBtn.innerText = "\uD83D\uDDD1";
    const updateBtn = document.createElement("button");
    updateBtn.className = "update-button";
    updateBtn.dataset.id = comment.id;
    updateBtn.innerText = "\u270E";
    span.innerText = comment.content;
    commentList.append(listItem);
    listItem.append(deleteBtn);
    listItem.append(updateBtn);
    listItem.append(span);
    listenToDeleteBtn(deleteBtn);
    listenToUpdateComment(updateBtn);

    // return commentsToActivity
    // commentList.children.remove();
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

function listenToUpdateComment(updateBtn) {
  updateBtn.addEventListener("click", function (e) {
    // debugger;
    const commentID = e.target.dataset.id;
    const oldComment = e.target.nextElementSibling.textContent;
    const li = e.target.parentElement;
    const inputField = document.createElement("input");
    inputField.placeholder = oldComment;
    const updateBtn = document.createElement("button");
    updateBtn.className = "button-to-update";
    updateBtn.innerText = "update";
    li.append(inputField, updateBtn);
    e.target.parentElement.firstChild.remove();
    e.target.nextSibling.previousSibling.remove();
    UpdateComment(commentID, li);
  });
}
function UpdateComment(commentID, li) {
  const list = document.querySelector("ul");
  list.addEventListener("click", async function (e) {
    e.preventDefault();
    if (e.target.className === "button-to-update") {
      //   debugger;
      const commentValue = e.target.previousElementSibling.value;
      const comment = await fetchPatchComment(commentID, commentValue);
      li.remove();
      displayComments([comment]);
    }
  });
}

async function fetchPatchComment(commentID, commentValue) {
  const response = await fetch(`${commentsURL}/${commentID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ content: commentValue }),
  });
  return await response.json();
}
