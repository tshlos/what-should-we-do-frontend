function appendCategory(item) {
  let options = document.getElementById(item);
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
    // for (activity of activities) {
    //   activity.style.display = "inline-grid";
    // }

    for (activity of activities) {
      if (category === "show all") {
        activity.style.display = "inline-grid";
      } else {
        if (activity.children[3].textContent === category) {
          activity.style.display = "inline-grid";
        } else {
          activity.style.display = "none";
        }
      }
    }
  });
}

// inline-grid
// none

sortByCategory();
