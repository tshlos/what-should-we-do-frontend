// fetch Get to all users : http://localhost:3000/api/v1/users
// fetch Get to all comments: http://localhost:3000/api/v1/comments

const activitiesURL = "http://localhost:3000/api/v1/activities";
const mainTag = document.querySelector("main");
const form = document.querySelector("form");
const activitiesContainer = document.getElementById("activity-container");

// createLoginForm();
listenToLoginForm();
function listenToLoginForm() {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (
      event.target.childNodes[0].value !== "" &&
      event.target.childNodes[1].value !== ""
    ) {
      form.className = "hidden";
      fetchActivities();
    } else {
      console.error("error");
    }
  });
}

function fetchActivities() {
  fetch(activitiesURL)
    .then((response) => response.json())
    .then((activities) =>
      activities.forEach((activity) => appendActivities(activity))
    );
}

function appendActivities(activity) {
  const {
    name,
    address,
    city,
    state,
    zipcode,
    description,
    image,
    category,
    comments,
  } = activity;
  const div = document.createElement("div"); // card
  const h2 = document.createElement("h2"); // name
  const h4 = document.createElement("h4"); // category
  const h3 = document.createElement("h3"); // address
  const p = document.createElement("p"); // description
  const img = document.createElement("img"); // image
  const ul = document.createElement("ul"); // comments

  div.className = "card";
  h2.textContent = activity.name;
  h4.textContent = activity.category;
  h3.textContent = `${activity.address}, ${activity.city}, ${activity.state}`;
  p.textContent = activity.description;
  img.src = activity.image;
  img.style.width = "100%";

  div.append(h2, h3, img, h4, p);
  activitiesContainer.append(div);

  debugger;
}

// function createLoginForm() {
//   const nameInputTag = document.createElement("input");
//   const addressInputTag = document.createElement("input");
//   const btn = document.createElement("button");

//   form.className = "login-form";
//   addressInputTag.placeholder = "Type your address";
//   nameInputTag.placeholder = "Type your name";
//   btn.textContent = "Login";
//   btn.id = "login-btn";

//   form.append(nameInputTag, addressInputTag, btn);
// }
