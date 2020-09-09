const usersURL = "http://localhost:3000/api/v1/users";

const loginForm = document.getElementById("login-form");
listenToLoginForm();
signUP();

function signUP() {
  const signupBtn = document.getElementById("signup");
  signupBtn.addEventListener("click", function (event) {
    loginForm.style.display = "block";
    signupBtn.style.display = "none";
  });
}

function listenToLoginForm() {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const userInput = event.target;
    const name = userInput.children[0].value;
    const address = userInput.children[1].value;
    const city = userInput.children[2].value;
    const state = userInput.children[3].value;
    const zipcode = userInput.children[4].value;
    const image = userInput.children[5].value;
    if (name !== "" && address !== "" && city !== "" && state !== "") {
      fetchUser(name, address, city, state, zipcode, image);
      updateUserInfo();
    } else {
      alert("error!");
    }
  });
}

async function fetchUser(name, address, city, state, zipcode, image) {
  const newUser = {
    name: name,
    address: address,
    city: city,
    state: state,
    zipcode: zipcode,
    image: image,
  };
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

function helloMessage(name, id) {
  const nav = document.querySelector("nav");
  const hello = document.createElement("button");

  hello.textContent = `Hello ${name},`;
  hello.className = "user-btn";
  hello.id = id;
  nav.appendChild(hello);
}

function updateUserInfo() {
  console.log(hello);
  //   const button = document.querySelector(".user-btn");
  //   button.addEventListener("click", function (event) {
  debugger;
}

// createLoginForm();

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
