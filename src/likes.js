addLikeToActivity();

function addLikeToActivity() {
  const activityContainer = document.getElementById("activity-container");
  activityContainer.addEventListener("click", function (event) {
    let likeBtn = event.target;
    const activityID = event.target.parentElement.id;
    const likeText = likeBtn.nextElementSibling;
    let likeNumber = parseInt(likeText.textContent);

    if (likeBtn.className === "like") {
      if (likeBtn.textContent === like) {
        likeBtn.textContent = unlike;
        newLikeNum = likeNumber - 1;
        likeText.textContent = `${newLikeNum} likes`;
        fetchToAddLike(activityID, newLikeNum);
      } else {
        likeBtn.textContent = like;
        newLikeNum = likeNumber + 1;
        likeText.textContent = `${newLikeNum} likes`;
        fetchToAddLike(activityID, newLikeNum);
      }
    }
  });
}

async function fetchToAddLike(activityID, newLikeNum) {
  let response = await fetch(`${activitiesURL}/${activityID}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      likes: newLikeNum,
    }),
  });
  // let result = await response.json();
}
