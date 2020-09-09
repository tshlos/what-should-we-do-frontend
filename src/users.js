const usersURL = "http://localhost:3000/api/v1/users";
const userModal = document.getElementById("userModal");
const closeModal = userModal.querySelector(".close");
const loginForm = document.getElementById("login-form");
const signupBtn = document.getElementById("signup");
const deleteBtn = document.getElementById("delete-user-btn");

listenToLoginForm();
signUP();

function signUP() {
  signupBtn.addEventListener("click", function (event) {
    loginForm.style.display = "block";
    signupBtn.style.display = "none";
  });
}

function listenToLoginForm() {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    fetchUser(createUserElements(event));
  });
}

function createUserElements(event) {
  const userInput = event.target;
  const name = userInput.children[1].value;
  const address = userInput.children[3].value;
  const city = userInput.children[5].value;
  const state = userInput.children[7].value;
  const zipcode = userInput.children[9].value;
  const image = userInput.children[11].value;

  if (name !== "" && address !== "" && city !== "" && state !== "") {
    const newUser = {
      name: name,
      address: address,
      city: city,
      state: state,
      zipcode: zipcode,
      image: image,
    };
    return newUser;
  } else {
    alert("error!");
    return null;
  }
}

async function fetchUser(newUser) {
  if (newUser !== null) {
    const response = await fetch(usersURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    let user = await response.json();
    loginForm.style.display = "none";
    helloMessage(user.name, user.id);
  }
}

function helloMessage(name, id) {
  const nav = document.querySelector("nav");
  const hello = document.createElement("button");

  hello.textContent = `Hello ${name},`;
  hello.className = "profile-btn";
  hello.dataset.id = id;
  nav.appendChild(hello);
  updateUserInfo();
}

function updateUserInfo() {
  const button = document.querySelector(".profile-btn");
  button.addEventListener("click", function (event) {
    const userID = event.target.dataset.id;

    fetchSingleUser(userID);
  });
}
async function fetchSingleUser(userID) {
  const response = await fetch(`${usersURL}/${userID}`);
  let user = await response.json();
  openUserCard(user);
}

function openUserCard(user) {
  userModal.style.display = "block";

  closeModal.onclick = function () {
    userModal.style.display = "none";
  };

  userModal.dataset.id = user.id;
  const name = userModal.querySelector(".username");
  name.placeholder = user.name;
  const address = userModal.querySelector(".useraddress");
  address.placeholder = user.address;
  const city = userModal.querySelector(".usercity");
  city.placeholder = user.city;
  const state = userModal.querySelector(".userstate");
  state.placeholder = user.state;
  const zipcode = userModal.querySelector(".userzipcode");
  zipcode.placeholder = user.zipcode;
  const image = userModal.querySelector(".userimage");
  image.placeholder = user.image;

  listentoUserUpdate();
  listentoUserDelete();
}

function listentoUserUpdate() {
  const form = document.getElementById("update-User-Form");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const userID = +event.target.parentElement.parentElement.dataset.id;
    updateUser(createUserElements(event), userID);
  });
}

async function updateUser(Userinfo, userID) {
  if (Userinfo !== null) {
    const options = {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Userinfo),
    };

    const response = await fetch(`${usersURL}/${userID}`, options);
    let user = await response.json();
    alert(`Hey ${user.name} we update your profile`);
    const button = document.querySelector(".profile-btn");
    button.textContent = `Hello ${user.name}`;
    userModal.style.display = "none";
  }
}
function listentoUserDelete() {
  deleteBtn.addEventListener("click", function (event) {
    const userID = +event.target.parentElement.parentElement.dataset.id;
    deleteUser(userID);
  });
}

async function deleteUser(userID) {
  const response = await fetch(`${usersURL}/${userID}`, { method: "DELETE" });
  resetAfterDeleteUser();
}

function resetAfterDeleteUser() {
  const button = document.querySelector(".profile-btn");
  button.style.display = "none";
  signupBtn.style.display = "block";
  userModal.style.display = "none";
  loginForm.reset();
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
