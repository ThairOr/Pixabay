buildUrl(); // this is our first function
addEventListeners(); // this is the second function

function getData(url) {
  // console.log(url);
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      // console.log("result =>>", result.hits);
      displayPictures(result);
    })
    .catch((error) => console.log("error", error));
}
// getData(url);

function clearHTML() {
  let cardContainer = document.getElementById("cards-container");
  cardContainer.innerHTML = "";
}
//!console.log("------------------------this is the first function -------------------------");
function buildUrl() {
  let q = "";
  let order = "";
  let colors = "";
  let orientation = "";
  let category = "";
  // template literals
  console.log(document.getElementsByName("color"));
  const searchInput = document.getElementById("search-input");
  q = searchInput.value;
  const orderInput = document.getElementById("orderinput");
  order = orderInput.value;
  const colorsRadios = document.getElementsByName("color");
  for (let i = 0; i < colorsRadios.length; i++) {
    if (colorsRadios[i].checked === true) {
      colors = colorsRadios[i].value;
    }
  }
  const orientationRadios = document.getElementsByName("inlineRadioOptions");
  for (let i = 0; i < orientationRadios.length; i++) {
    if (orientationRadios[i].checked) {
      orientation = orientationRadios[i].value;
    }
  }
  const myCategory = document.getElementsByName("category");
  category;
  for (let i = 0; i < myCategory.length; i++) {
    if (myCategory[i].click) {
      category = myCategory[i].value;
      console.log("myCategory", myCategory);
    }
  }
  let url = `https://pixabay.com/api/?key=38834913-47f3b1009b5d9a1b5361eaeeb&q=${q}&order=${order}&colors=${colors}&orientation=${orientation}&category=${category}`;
  // console.log(category);
  // if (myCategory[i].click) {
  //   url = url.concat(`&category=${category}`);
  // }
  // console.log(url);
  clearHTML();
  getData(url);
}

//!console.log("------------------------this is the second function -------------------------");
function addEventListeners() {
  const searchBar = document.getElementById("search-input");
  searchBar.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      buildUrl();
    }
  });
  /*searchInput*/
  const searchInput = document.getElementById("search-button");
  searchInput.addEventListener("click", (e) => {
    buildUrl();
  });
  /*myColors*/
  const myColors = document.getElementsByName("color");
  for (let i = 0; i < myColors.length; i++) {
    myColors[i].addEventListener("change", buildUrl);
  }
  /*orientationRadios */
  const orientationRadios = document.getElementsByName("inlineRadioOptions");
  for (let i = 0; i < orientationRadios.length; i++) {
    orientationRadios[i].addEventListener("change", buildUrl);
  }
  /* clearFilters*/
  const clearFilters = document.getElementById("clear-filter");
  clearFilters.addEventListener("click", (e) => {
    location.reload(true);
  });
  /*myCategory*/
  const myCategory = document.getElementsByName("category");
  for (let i = 0; i < myCategory.length; i++) {}

  // onclick="onCategoryClick(event)"
}
//?console.log("--------------------function onCategoryClick-----------------------------");
function onCategoryClick(event) {
  myCategory = event.target.value;
  buildUrl(category);
}
//?console.log("--------------------function displayPictures-----------------------------");
function displayPictures(data) {
  const cardContainer = document.getElementById("cards-container");
  for (let i = 0; i < data.hits.length; i++) {
    //*cardDiv
    const cardDiv = document.createElement("div");
    cardDiv.setAttribute("class", "card cols-1 row-cols-md-3 g-4 ");
    cardDiv.setAttribute(
      "style",
      "width: 16rem;  border-radius: 5px; padding: 5px; border: solid 1px black; margin: 5px;"
    );
    //? console.log("--------------------images-----------------------------");
    //* card/img
    const images = document.createElement("img");
    images.setAttribute("src", data.hits[i].webformatURL);
    images.setAttribute("alt", "a picture about " + data.hits[i].tags);
    images.setAttribute("class", "card-img-top");
    cardDiv.appendChild(images);
    //? console.log("--------------------cardBody-----------------------------");
    //* Body
    const cardBody = document.createElement("div");
    cardDiv.setAttribute("class", "card-body text-center");
    if (i % 2 === 0) {
      cardDiv.classList.add("card1");
    } else {
      cardDiv.classList.add("card2");
    }
    cardDiv.appendChild(cardBody);
    //* card header
    const h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.innerText = data.hits[i].user;
    cardBody.appendChild(h5);
    const h6 = document.createElement("h6");
    h6.classList.add("card-title");
    h6.innerText = data.hits[i].tags;
    cardBody.appendChild(h6);
    const p1 = document.createElement("p");
    // p1.innerText = "likes : " + data.photos[i].likes + " from user " + data.photos[i].user
    p1.innerText = `likes :  ${data.hits[i].likes} from user ${data.hits[i].user} `;
    cardBody.appendChild(p1);
    // //* Buttom
    feelModel(data.hits[i], cardBody);
    cardContainer.appendChild(cardDiv);
  }
}
//? console.log("--------------------function feelModel-----------------------------");
function feelModel(data, cardBody) {
  const button = document.createElement("button");
  button.setAttribute("type", "button");
  button.setAttribute("class", "btn btn-outline-dark text-center");
  button.setAttribute("data-bs-toggle", "modal");
  button.setAttribute("data-bs-target", "#exampleModal");
  button.innerHTML = "open";
  button.addEventListener("click", function callback() {
    const modelcontents = document.getElementById("gallery-photo");
    modelcontents.innerHTML = "";
    const imageModel = document.createElement("img");
    imageModel.setAttribute("src", data.webformatURL);
    modelcontents.appendChild(imageModel);
    //* i should start from hier
  });

  cardBody.appendChild(button);
}
