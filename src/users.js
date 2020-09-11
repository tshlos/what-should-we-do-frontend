const floatingPanel = document.querySelector("#floating-panel");
const confirmBtn = document.querySelector("#submit");
closeFloatingPanel();

function closeFloatingPanel() {
  confirmBtn.addEventListener("click", function (e) {
    const nameContainer = document.querySelector("#name");
    const name = nameContainer.value;

    if (name) {
      const usercontainer = document.querySelector(".helloUser");
      const greeting = document.createElement("button");

      usercontainer.append(greeting);
      greeting.textContent = `Hello ${name}!`;
      nameContainer.style.display = "none";

      greeting.className = "helloButton";

      greeting.addEventListener("click", function () {
        greeting.remove();
        nameContainer.style.display = "inline";
      });
    }
  });
}
