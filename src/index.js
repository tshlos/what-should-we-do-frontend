const activitiesURL = "http://localhost:3000/api/v1/activities";

const activitiesContainer = document.getElementById("activity-container");
const loginForm = document.getElementById("login-form");
const mySidebar = document.getElementById("mySidebar");

const unlike = "♡";
const like = "♥";

let activityList = [];
fetchActivities(); // replace listenToLoginForm();

async function fetchActivities() {
  const response = await fetch(activitiesURL);
  const activities = await response.json();

  activities.forEach((activity) => {
    appendActivities(activity);
  });
}

function appendActivities(activity) {
  const {
    id,
    name,
    address,
    city,
    state,
    zipcode,
    description,
    image,
    category,
    comments,
    likes,
  } = activity;
  const div = document.createElement("div"); // card
  const h4 = document.createElement("h4"); // name
  const h5 = document.createElement("h5"); // category
  const h6 = document.createElement("h6"); // address
  const p = document.createElement("p"); // description
  const img = document.createElement("img"); // image

  const ul = document.createElement("ul"); // comments
  const heart = document.createElement("span"); // likes
  const likeText = document.createElement("span"); // likes

  div.className = `card ${category}`;
  div.id = id;
  h4.textContent = name;
  h5.textContent = category;
  h6.textContent = `${address}, ${city}, ${state}`;
  p.textContent = description;
  img.src = image;
  heart.className = "like";
  heart.textContent = unlike;
  likeText.textContent = `${likes} likes`;

  div.append(heart, likeText, h4, h5, img, h6, p);
  activitiesContainer.appendChild(div);

  listComments(div, activity);
  addToActivityList(activity.category);
  appendCategory(activity.category);
  closeNav();
}

function addToActivityList(category) {
  activityList.push(category);
}

function openNav() {
  mySidebar.style.width = "25%";
  document.getElementById("main").style.marginLeft = "25%";
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
    const formFiled = event.target.children;

    const name = formFiled[0].value;
    const address = formFiled[1].value;
    const city = formFiled[2].value;
    const state = formFiled[3].value;
    const zipcode = formFiled[4].value;
    const description = formFiled[5].value;
    const image = formFiled[6].value;
    const category = formFiled[7].value;

    const body = {
      activity: {
        name,
        address,
        city,
        zipcode,
        state,
        description,
        image,
        category,
        comments: [],
        likes: 0,
        user_activities: [],
      },
    };

    const options = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    fetch(activitiesURL, options)
      .then((response) => response.json())
      .then((activity) => appendActivities(activity));

    formFiled[0].value = " ";
    formFiled[1].value = " ";
    formFiled[2].value = " ";
    formFiled[3].value = " ";
    formFiled[4].value = " ";
    formFiled[5].value = " ";
    formFiled[6].value = " ";
    formFiled[7].value = " ";
  });
}

// createLoginForm();
// listenToLoginForm();
// function listenToLoginForm() {
//   loginForm.addEventListener("submit", function (event) {
//     event.preventDefault();
//     if (
//       event.target.childNodes[0].value !== "" &&
//       event.target.childNodes[1].value !== ""
//     ) {
//       loginForm.className = "hidden";
//       fetchActivities();
//     } else {
//       alert("error!");
//     }
//   });
// }

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
