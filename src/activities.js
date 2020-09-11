function appendCategory(item) {
  let options = document.getElementById(item);
  // add clear item from empty spaces return string.replace(/[^A-Za-z0-9-']+/g, '');
  if (options === null) {
    const dropdown = document.querySelector(".dropdown");
    const option = document.createElement("option");
    option.innerText = item;
    option.value = item;
    option.id = item;
    dropdown.appendChild(option);
  }
}

function sortByCategory() {
  const dropdown = document.querySelector(".dropdown");
  dropdown.addEventListener("input", function (event) {
    const category = event.target.value;
    const activities = Array.from(document.querySelectorAll(`.card`));

    for (activity of activities) {
      if (category === "show all") {
        activity.style.display = "inline-grid";
      } else {
        if (activity.children[4].textContent === category) {
          activity.style.display = "inline-grid";
        } else {
          activity.style.display = "none";
        }
      }
    }
  });
}

sortByCategory();
