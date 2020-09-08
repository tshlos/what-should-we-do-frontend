const menu = document.getElementById("main");
const dropDown = document.createElement("ul");
const dropDownDiv = document.createElement("div");

createDropDown();
function createDropDown() {
  menu.append(dropDownDiv);
  dropDownDiv.append(dropDown);
  //   const dropDown = document.createElement("button");

  dropDownDiv.className = "dropdown";
  dropDown.className = "categoriesList";
  dropDown.textContent = "sort by category";

  //   dropDown.innerHTML += createDropDownCategory();
  //   createDropDownCategory();
  //   dropDown.innerHTML += createDropDownCategory();

  //   dropDown.onclick = showDropdownList();
  //   dropDown.append(ul);
  function createDropDownCategory() {
    const list = Array.from(document.querySelectorAll("h4")).map(
      (h4) => h4.textContent
    );
    const uniqeCategory = [...new Set(list)];

    uniqeCategory.forEach((category) => appendCategory(category));
    debugger;
  }

  function appendCategory(category) {
    dropDown.innerHTML += `<li> ${category} </li>`;
  }

  createDropDownCategory();
}
