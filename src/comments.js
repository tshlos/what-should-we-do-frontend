const commentsURL = "http://localhost:3000/api/v1/comments";
const modal = document.getElementById("myModal");
const commentInput = modal.querySelector(".comment-value");
const commentList = document.createElement("ul");
const commentForm = document.querySelector(".comment-form");

function listComments(cardContainer, activity) {
  const btn = document.createElement("button");
  btn.className = "infocard";
  btn.textContent = "Open Card";
  cardContainer.append(btn);
  btn.addEventListener("click", function (e) {
    // debugger
    const foundActivity = allActivities.find((a) => a.id === activity.id);
    openCard(foundActivity);
  });
  // createComment(activity);
}

function createComment(activity) {
  commentForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const commentValue = e.target["comment-value"].value;
    const comment = await sendComment(activity.id, commentValue);
    displayComments([comment]);
    commentForm.comment.value = "";

    allActivities.map((activity) => {
      activity.comments;
    });
    activity.push(comment);
  });
}

function openCard(activity) {
  modal.style.display = "block";
  const closeModal = modal.querySelector(".close");
  closeModal.onclick = function () {
    modal.style.display = "none";
  };
  const name = modal.querySelector(".name");
  name.textContent = activity.name;
  const category = modal.querySelector(".category");
  category.textContent = activity.category;
  const image = modal.querySelector(".image");
  image.src = activity.image;
  const address = modal.querySelector(".address");
  address.textContent = `${activity.address}, ${activity.city}, ${activity.state}`;
  const comments = modal.querySelector(".comments");

  commentList.innerHTML = "";

  createComment(activity);
  displayComments(activity.comments);
}

function displayComments(comments) {
  commentInput.append(commentList);
  comments.forEach((comment) => {
    const listItem = document.createElement("li");
    const span = document.createElement("span");
    span.innerText = comment.content;
    listItem.append(span);
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-button";
    deleteBtn.dataset.id = comment.id;
    deleteBtn.innerText = "\uD83D\uDDD1";
    const updateBtn = document.createElement("button");
    updateBtn.className = "update-button";
    updateBtn.dataset.id = comment.id;
    updateBtn.innerText = "\u270E";
    listItem.innerText = comment.content;
    commentList.append(listItem); //ul append li
    listItem.append(deleteBtn);
    listItem.append(updateBtn);

    listenToDeleteBtn(deleteBtn);
    listenToUpdateComment(updateBtn);
  });
}

async function sendComment(activityId, content) {
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
    const commentID = e.target.dataset.id;
    const oldComment = e.target.previousSibling.previousSibling.textContent;
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
      const commentValue = e.target.previousElementSibling.value;
      const comment = await updateComment(commentID, commentValue);
      li.remove();
      displayComments([comment]);
    }
  });
}

async function updateComment(commentID, commentValue) {
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
