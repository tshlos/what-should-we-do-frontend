// fetch Get to all users : http://localhost:3000/api/v1/users
// fetch Get to all comments: http://localhost:3000/api/v1/comments

const activitiesURL = "http://localhost:3000/api/v1/activities";
const mainTag = document.querySelector("main");
const loginForm = document.getElementById("login-form");
const mySidebar = document.getElementById("mySidebar");

// createLoginForm();
listenToLoginForm();
function listenToLoginForm() {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (
      event.target.childNodes[0].value !== "" &&
      event.target.childNodes[1].value !== ""
    ) {
      loginForm.className = "hidden";
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
  const activitiesContainer = document.getElementById("activity-container");
  const div = document.createElement("div"); // card
  const h2 = document.createElement("h2"); // name
  const h4 = document.createElement("h4"); // category
  const h3 = document.createElement("h3"); // address
  const p = document.createElement("p"); // description
  const img = document.createElement("img"); // image
  const ul = document.createElement("ul"); // comments

  div.className = "card";
  div.style = "overflow:scroll";
  h2.textContent = activity.name;
  h4.textContent = activity.category;
  h3.textContent = `${activity.address}, ${activity.city}, ${activity.state}`;
  p.textContent = activity.description;
  ul.innerHTML += createCommentList(activity.comments);
  img.src = activity.image;
  img.style.width = "100%";

  div.append(h2, h3, img, h4, p, ul);
  activitiesContainer.append(div);
}

function createCommentList(comments) {
  return comments.map((comments) => `<li>${comments.content}</li>`).join(" ");
}

function openNav() {
  mySidebar.style.width = "50%";
  document.getElementById("main").style.marginLeft = "50%";
  createNewActivity();
}

function closeNav() {
  mySidebar.style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

function createNewActivity() {
  const form = document.getElementById("new-Activity-Form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
  });
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

// function createNewActivity() {
//     const form = document.createElement("form");
//     const inputName = document.createElement("input");
//     const inputCategory = document.createElement("input");
//     const inputAdress = document.createElement("input");
//     const inputCity = document.createElement("input");
//     const inputState = document.createElement("input");
//     const inputZip = document.createElement("input");
//     const inputDescription = document.createElement("input");
//     const inputImg = document.createElement("input");
//     const btn = document.createElement("button");

//     inputName.placeholder = "Activity Name";
//     inputCategory.placeholder = "Category";
//     inputAdress.placeholder = "Address";
//     inputCity.placeholder = "City";
//     inputState.placeholder = "State";
//     inputZip.placeholder = "Zipcode";
//     inputDescription.placeholder = "description";
//     inputDescription.style.height = "200%";
//     inputImg.placeholder = "Image URL";
//     btn.textContent = "Add New Activity";

//     form.append(
//       inputName,
//       inputCategory,
//       inputAdress,
//       inputCity,
//       inputZip,
//       inputDescription,
//       inputImg,
//       btn
//     );
//     mySidebar.append(form);
//     }
