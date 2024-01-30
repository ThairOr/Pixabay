1-draw a mock design of your website : how you want it to look, which elements containes (a navbar? a footer? a lateral section with someting??)

2- build a loop that loops over the array of pictures

3- Display all the pictures in the screen

4- Decide how you wanna present those pictures : maybe as a card? with a frame and some text saying something about the image? maybe just a as list of images?

5 - think about the criteria you will use to FILTER the images. Filter them by tag? sort them by views? radio buttons with numbers of likes? there are many possibilities, but the criterias HAVE to come from the API

6- build your filter section according to what you designed

7- try to build a function, that creates the carrusel , usin the imagePreviewUrl filed to have a carrousel with the small version of the pictures

// console.log("data", data);
let subject = "";
// template literals
let url = `https://pixabay.com/api/?key=38834913-47f3b1009b5d9a1b5361eaeeb&q=${subject}&order=popular`;

const clearHTML = () => {
let cardContainer = document.getElementById("cards-container");
// console.warn("this is our cards container", cardContainer);
cardContainer.innerHTML = "";
};

const formatUrl = (sortValue = "popular", myCategory = "animals", mySearchVariable = "cat", myColors = "red") => {
let newUrl = `https://pixabay.com/api/?key=38834913-47f3b1009b5d9a1b5361eaeeb&q=${mySearchVariable}&order=${sortValue}&category=${myCategory}`;
if (myColors) {
newUrl += `&colors=${myColors}`;
}
console.log(sortValue, myCategory, mySearchVariable, myColors);
// console.log("newUrl", newUrl);
return newUrl;
};

// console.log("we can see our default values here",formatUrl());
//?console.log("------------------------Order Select-------------------------");
const handleClick = (e) => {
// console.log("our event object", e);
// console.log("our event target", e.target);
let value = e.currentTarget.value;
console.log("our e.current.target.value=", value);
clearHTML();
let formattedUrl = formatUrl(value);
// console.warn(formattedUrl);
getData(formattedUrl);
};
// console.log("handleClick :>> ", handleClick);
let myForm = document.querySelector(".form-select");
// event listener takes 1) event type, 2) function to run when event type is heard
myForm.addEventListener("change", handleClick);
//?console.log("------------------------Orientation-------------------------");
// const orientaionImg = (e) => {
// console.log("radio", e);
// let sortValue = "popular";
// let orientaionImgValue = e.target.value;
// let category = "animals"
// let sv = "all"
// let c = "red"
// clearHTML();

// console.log('orientaionImgValue :>> ', orientaionImgValue);

// let formattedUrl = formatUrl(sortValue, category, sv, c, orientaionImgValue);
// console.log(formattedUrl);
// getData(formattedUrl)
// }

// const myOrientaion = document.querySelector(".radio");
// // console.log("radio", myOrientaion);
// myOrientaion.addEventListener("click", orientaionImg)
//?console.log("------------------------search-------------------------");
function search(e) {
const searchBar = document.getElementById("search-input");
const searchValue = searchBar.value;
console.log("searchValue", searchValue);
if (e.key === "Enter") {
let sortValue = "popular";
let category = "animals"
// let sv = "all"
let colors = "red";
let newUrl = formatUrl(sortValue, category, searchValue, colors);
clearHTML()
getData(newUrl);
searchBar.value = "";
searchBar.setAttribute("placeholder", searchValue);
}
}
function addEventListeners() {
const searchBar = document.getElementById("search-input");
// console.log('searchBar :>> ', searchBar);
searchBar.addEventListener("keyup", search);
}
addEventListeners();

//?console.log("------------------------Filter images by color -------------------------");
// هذه الوظيفة تقوم بتصفية الصور بناءً على القيمة التي تم اختيارها
const filterImg = (e) => {
// هنا نقوم بطباعة كائن الحدث للتحقق منه
// console.log("event", e);
// نحدد قيمة افتراضية لطريقة الترتيب
let sortValue = "popular";
// نحاول جلب القيمة من العنصر الذي تم النقر عليه
let filtervalue = e.target.value;
// نقوم بمسح المحتوى الحالي
clearHTML();
// نقوم بتكوين الرابط باستخدام الوظيفة formatUrl
let formattedUrl = formatUrl(sortValue, undefined, undefined, filtervalue);
// نطبع الرابط المكون للتحقق منه
// console.warn(formattedUrl);
// نستخدم الرابط المكون لجلب البيانات
getData(formattedUrl);
}
// هنا نقوم بالبحث عن العنصر بواسطة الفئة .grid-colors
let myColors = document.querySelector(".grid-colors");
// console.log("myColor", myColors);
// نضيف مستمع للحدث للعنصر، حتى نتمكن من تنفيذ وظيفة filterImg عند النقر عليه
myColors.addEventListener("click", filterImg);
//?console.log("------------------------Header-------------------------");

const categoryClick = (e) => {
// console.log("our event object", e);
// console.log("our event target", e.target);
let sortValue = "popular"
let myCategory = e.target.value;
let mySearchVariable = "picture";
clearHTML();
let formattedUrl = formatUrl(sortValue, myCategory, mySearchVariable);
// console.log(formattedUrl);
getData(formattedUrl);
};
let myHeader = document.querySelector(".header");
myHeader.addEventListener("click", categoryClick);
//?console.log("-------------------------------------------------");

const getData = (url) => {
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
};
const newUrl = formatUrl();
// getData(newUrl)
getData(url);

//?console.log("--------------------function displayPictures-----------------------------");
function displayPictures(data) {
// const cardContainer = document.getElementById("cards-container");
// console.log(data);
const cardContainer = document.getElementById("cards-container");
// console.log("cardsContainer =>>", cardContainer);
for (let i = 0; i < data.hits.length; i++) {
// console.log("data.photos =>>", data.hits[i]);
//*cardDiv
const cardDiv = document.createElement("div");
cardDiv.setAttribute("class", "card col-sm-10 col-md-8 col-lg-6");
cardDiv.setAttribute("style", "width: 17rem");
//*Quastion
//? console.log("--------------------images-----------------------------");
//_ card/img
const images = document.createElement("img");
images.setAttribute("src", data.hits[i].webformatURL);
images.setAttribute("alt", "a picture about " + data.hits[i].tags);
images.setAttribute("class", "card-img-top");
cardDiv.appendChild(images);
//? console.log("--------------------cardBody-----------------------------");
//_ Body
const cardBody = document.createElement("body");
cardDiv.setAttribute("class", "card-body");
cardDiv.appendChild(cardBody);
//_ card header
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
// //_ Buttom
feelModel(data.hits[i], cardBody);
cardContainer.appendChild(cardDiv);
}
}
//? console.log("--------------------function feelModel-----------------------------");
// displayPictures()
function feelModel(data, cardBody) {
const button = document.createElement("button");
button.setAttribute("type", "button");
button.setAttribute("class", "btn btn-primary");
button.setAttribute("data-bs-toggle", "modal");
button.setAttribute("data-bs-target", "#exampleModal");
button.innerHTML = "open";
button.addEventListener("click", function callback() {
const modelcontents = document.getElementById("gallery-photo");
modelcontents.innerHTML = "";
const imageModel = document.createElement("img");
imageModel.setAttribute("src", data.webformatURL);
modelcontents.appendChild(imageModel);
//\* i should start from hier
});
cardBody.appendChild(button);
}

const clearHTML = () => {
let cardContainer = document.getElementById("cards-container");

console.warn("this is our cards container", cardContainer);
cardContainer.innerHTML = "";
};

const formatUrl = (
sortValue = "popular",
myCategory = "animals",
mySearchVariable = "cat",
myColors = "red"
) => {
// let chosenColour = 'red'; this si for testing
let newUrl = `https://pixabay.com/api/?key=38834913-47f3b1009b5d9a1b5361eaeeb&=&q=${mySearchVariable}&order=${sortValue}&category=${myCategory}&colors=${myColors}`;
console.log("newUrl", newUrl);
return newUrl;
};

//?console.log("------------------------Filter images by color -------------------------");
// هذه الوظيفة تقوم بتصفية الصور بناءً على القيمة التي تم اختيارها
const filterImg = (e) => {
// هنا نقوم بطباعة كائن الحدث للتحقق منه
console.log("event", e);
// نحدد قيمة افتراضية لطريقة الترتيب
let sortValue = "popular";
// نحاول جلب القيمة من العنصر الذي تم النقر عليه
let filtervalue = e.target.value;
// نقوم بمسح المحتوى الحالي
clearHTML();
// نقوم بتكوين الرابط باستخدام الوظيفة formatUrl
let formattedUrl = formatUrl(sortValue, undefined, undefined, filtervalue);
// نطبع الرابط المكون للتحقق منه
console.warn(formattedUrl);
// نستخدم الرابط المكون لجلب البيانات
getData(formattedUrl);
};

// هنا نقوم بالبحث عن العنصر بواسطة الفئة .grid-colors
let myColors = document.querySelector(".grid-colors");
// console.log("myColor", myColors);
// نضيف مستمع للحدث للعنصر، حتى نتمكن من تنفيذ وظيفة filterImg عند النقر عليه
myColors.addEventListener("click", filterImg);

//?console.log("------------------------Order Select-------------------------");
const getData = (url) => {
console.log(url);

fetch(url)
.then((response) => {
return response.json();
})
.then((result) => {
console.log("result =>>", result.hits);
displayPictures(result);

      // return result;
    })
    .catch((error) => console.log("error", error));

};

//? console.log("--------------------displayPictures-----------------------------");
function displayPictures(data) {
console.log(data);
const cardContainer = document.getElementById("cards-container");
console.log("cardsContainer =>>", cardContainer);
// console.log("--------------------function displayPictures-----------------------------");
for (let i = 0; i < data.hits.length; i++) {
//*cardDiv
const cardDiv = document.createElement("div");
cardDiv.setAttribute("class", "card col-sm-10 col-md-8 col-lg-6");
cardDiv.setAttribute("style", "width: 17rem");
//*Quastion

    //? console.log("--------------------images-----------------------------");
    //* card/img
    const images = document.createElement("img");
    images.setAttribute("src", data.hits[i].webformatURL);
    images.setAttribute("alt", "a picture about " + data.hits[i].tags);
    images.setAttribute("class", "card-img-top");
    cardDiv.appendChild(images);
    //? console.log("--------------------cardBody-----------------------------");
    //* Body
    const cardBody = document.createElement("body");
    cardDiv.setAttribute("class", "card-body");
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

    p1.innerText = `likes :  ${data.hits[i].likes} from user ${data.hits[i].user} `;

    cardBody.appendChild(p1);

    // //* Buttom
    feelModel(data.hits[i], cardBody);
    //

    cardContainer.appendChild(cardDiv);

}
}

//? console.log("--------------------function feelModel-----------------------------");

function feelModel(data, cardBody) {
const button = document.createElement("button");
button.setAttribute("type", "button");
button.setAttribute("class", "btn btn-primary");
button.setAttribute("data-bs-toggle", "modal");
button.setAttribute("data-bs-target", "#exampleModal");
button.innerHTML = "open";
button.addEventListener("click", function callback() {
const modelcontents = document.getElementById("gallery-photo");
modelcontents.innerHTML = "";
const imageModel = document.createElement("img");
imageModel.setAttribute("src", data.webformatURL);
modelcontents.appendChild(imageModel);
//\* i should start from hier
});
cardBody.appendChild(button);
}

const createCardController = (imgData) => {
const myContainer = document.getElementById("container");
const myImg = createImg(imgData.picture);
const myBtn = createBtn();
const myTxt = createText(imgData.description);
myContainer.appendChild(myImg);
myContainer.appendChild(myBtn);
myContainer.appendChild(myTxt);
};

function handleSearch(e) {
const searchBar = document.getElementById("search-input");
const searchValue = searchBar.value;
console.log("searchValue", searchValue);
if (e.key === "Enter") {
let sortValue = "popular";
let category = "animals";
let col = "red";
let newUrl = formatUrl(sortValue, category, searchValue, col);
clearHTML();
getData(newUrl);
}
}
//?console.log("------------------------Header-------------------------");

const handleChange = (e) => {
console.log("our event object", e);
console.log("our event target", e.target);
let sortValue = "popular";
let myCategory = e.target.value;
let mySearchVariable = "picture";
clearHTML();
let formattedUrl = formatUrl(sortValue, myCategory, mySearchVariable);
console.log(formattedUrl);
getData(formattedUrl);
};
//?console.log("------------------------Order Select-------------------------");

const handleClick = (e) => {
console.log("our event object", e);
console.log("our event target", e.target);
let value = e.currentTarget.value;
console.log("our e.current.target.value=", value);
clearHTML();
let formattedUrl = formatUrl(value);
console.warn(formattedUrl);
getData(formattedUrl);
};
//?console.log("------------------------search-------------------------");

function addEventListeners() {
const searchBar = document.getElementById("search-input");
console.log("searchBar :>> ", searchBar);
searchBar.addEventListener("keydown", handleSearch);
let myHeader = document.querySelector(".header");
myHeader.addEventListener("click", handleChange);
let myForm = document.querySelector(".form-select");
myForm.addEventListener("change", handleClick);
}

// console.log("data", data);
let subject = "all";
// template literals
let url = `https://pixabay.com/api/?key=38834913-47f3b1009b5d9a1b5361eaeeb&q=${subject}&order=popular`;

const controller = () => {
addEventListeners();
const newUrl = formatUrl();
getData(newUrl);
};
controller();

---

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

// const formatUrl = (sortValue, myCategory, mySearchVariable, myColors) => {
// let base = "https://pixabay.com/api/?key=38834913-47f3b1009b5d9a1b5361eaeeb";
// if (sortValue) {
// base += `&order=${sortValue}`;
// }
// if (myCategory) {
// base += `&category=${myCategory}`;
// }
// if (mySearchVariable) {
// base += `&q=${mySearchVariable}`;
// }
// if (myColors) {
// base += `&colors=${myColors}`;
// }

// let newUrl = `https://pixabay.com/api/?key=38834913-47f3b1009b5d9a1b5361eaeeb&q=${mySearchVariable}&order=${sortValue}&category=${myCategory}&colors=${myColors}`;
// console.log("base", base);
// return base;
// };
//!console.log("------------------------this is the first function -------------------------");
function buildUrl() {
let q = "";
let order = "";
let colors = "";
let orientation = "";
let clearFilters = "";
// template literals
const searchInput = document.getElementById("search-input");
q = searchInput.value;
const orderInput = document.getElementById("orderinput");
order = orderInput.value;
const colorsRadios = document.getElementsByName("color");
for (let i = 0; i < colorsRadios.length; i++) {
if (colorsRadios[i].checked) {
colors = colorsRadios[i].value;
}
}
const orientationRadios = document.getElementsByName("inlineRadioOptions");
for (let i = 0; i < orientationRadios.length; i++) {
if (orientationRadios[i].checked) {
orientation = orientationRadios[i].value;
}
}
// clearFilters = document.getElementById("clear");
// clearFilters = clear.value;
// console.log("clear value", value);
// location.reload();
// console.log("serchinput", searchInput.value);
let url = `https://pixabay.com/api/?key=38834913-47f3b1009b5d9a1b5361eaeeb&q=${q}&order=${order}&colors=${colors}&orientation=${orientation}`;
console.log(url);
clearHTML();
getData(url);
}

//?console.log("------------------------Order Select-------------------------");
// const handleClick = (e) => {
// // console.log("our event object", e);
// // console.log("our event target", e.target);
// let value = e.currentTarget.value;
// console.log("our e.current.target.value=", value);
// clearHTML();
// let formattedUrl = formatUrl(value);
// // console.warn(formattedUrl);
// getData(formattedUrl);
// };
// let myForm = document.querySelector(".form-select");
// // event listener takes 1) event type, 2) function to run when event type is heard
// myForm.addEventListener("change", handleClick);
//?console.log("------------------------Orientation-------------------------");
// const orientaionImg = (e) => {
// console.log("radio", e);
// let sortValue = "popular";
// let orientaionImgValue = e.target.value;
// let category = "animals"
// let sv = "all"
// let c = "red"
// clearHTML();

// console.log('orientaionImgValue :>> ', orientaionImgValue);

// let formattedUrl = formatUrl(sortValue, category, sv, c, orientaionImgValue);
// console.log(formattedUrl);
// getData(formattedUrl)
// }

// const myOrientaion = document.querySelector(".radio");
// // console.log("radio", myOrientaion);
// myOrientaion.addEventListener("click", orientaionImg)
//?console.log("------------------------search-------------------------");
// function search(e) {
// const searchBar = document.getElementById("search-input");
// const searchValue = searchBar.value;
// console.log("searchValue", searchValue);
// if (e.key === "Enter") {
// let sortValue = "popular";
// let category = "animals";
// let colors = "red";
// let newUrl = formatUrl(sortValue, category, searchValue, colors);
// clearHTML();
// getData(newUrl);
// searchBar.value = "";
// searchBar.setAttribute("placeholder", searchValue);
// }
// }

//!console.log("------------------------this is the second function -------------------------");
function addEventListeners() {
const searchBar = document.getElementById("search-input");
searchBar.addEventListener("keyup", (e) => {
if (e.key === "Enter"){
buildUrl();
}
});
const searchInput = document.getElementById("search-button")
searchInput.addEventListener("click", (e) => {
buildUrl();
})
const myColors = document.getElementsByName("color");
for (let i = 0; i < myColors.length; i++) {
myColors[i].addEventListener("change", buildUrl);
}
const orientationRadios = document.getElementsByName("inlineRadioOptions");
for (let i = 0; i < orientationRadios.length; i++) {
orientationRadios[i].addEventListener("change", buildUrl);
}
// const clearFilters = document.getElementById("clear")
// clearFilters = document.addEventListener("click", (e) => {
// clearFilters = e.target.value;
// console.log(e.target.value);
// })
// myColors.addEventListener("click", filterImg);
// let myHeader = document.querySelector(".header");
// myHeader.addEventListener("click", categoryClick);
}
//!console.log("-------------------------------------------------");
//?console.log("------------------------Filter images by color -------------------------");
// هذه الوظيفة تقوم بتصفية الصور بناءً على القيمة التي تم اختيارها
function filterImg(e) {
// هنا نقوم بطباعة كائن الحدث للتحقق منه
// console.log("event", e);
// نحدد قيمة افتراضية لطريقة الترتيب
let sortValue = "popular";
// نحاول جلب القيمة من العنصر الذي تم النقر عليه
let filtervalue = e.target.value;
console.log(filtervalue);
// نقوم بمسح المحتوى الحالي
clearHTML();
// نقوم بتكوين الرابط باستخدام الوظيفة formatUrl
let formattedUrl = formatUrl(sortValue, undefined, undefined, filtervalue);
// نطبع الرابط المكون للتحقق منه
// console.warn(formattedUrl);
// نستخدم الرابط المكون لجلب البيانات
getData(formattedUrl);
}
// هنا نقوم بالبحث عن العنصر بواسطة الفئة .grid-colors

// console.log("myColor", myColors);
// نضيف مستمع للحدث للعنصر، حتى نتمكن من تنفيذ وظيفة filterImg عند النقر عليه

//?console.log("------------------------Header-------------------------");

function categoryClick(e) {
let sortValue = "popular";
let myCategory = e.target.value;
let mySearchVariable = "picture";
clearHTML();
let formattedUrl = formatUrl(sortValue, myCategory, mySearchVariable);
// console.log(formattedUrl);
getData(formattedUrl);
}
const newUrl = formatUrl();
//?console.log("-------------------------------------------------");

//?console.log("--------------------function displayPictures-----------------------------");
function displayPictures(data) {
// const cardContainer = document.getElementById("cards-container");
// console.log(data);
const cardContainer = document.getElementById("cards-container");
// console.log("cardsContainer =>>", cardContainer);
for (let i = 0; i < data.hits.length; i++) {
// console.log("data.photos =>>", data.hits[i]);
//*cardDiv
const cardDiv = document.createElement("div");
cardDiv.setAttribute("class", "card col-sm-10 col-md-8 col-lg-6");
cardDiv.setAttribute("style", "width: 17rem");
//*Quastion
//? console.log("--------------------images-----------------------------");
//_ card/img
const images = document.createElement("img");
images.setAttribute("src", data.hits[i].webformatURL);
images.setAttribute("alt", "a picture about " + data.hits[i].tags);
images.setAttribute("class", "card-img-top");
cardDiv.appendChild(images);
//? console.log("--------------------cardBody-----------------------------");
//_ Body
const cardBody = document.createElement("body");
cardDiv.setAttribute("class", "card-body");
cardDiv.appendChild(cardBody);
//_ card header
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
// //_ Buttom
feelModel(data.hits[i], cardBody);
cardContainer.appendChild(cardDiv);
}
}
//? console.log("--------------------function feelModel-----------------------------");
function feelModel(data, cardBody) {
const button = document.createElement("button");
button.setAttribute("type", "button");
button.setAttribute("class", "btn btn-primary");
button.setAttribute("data-bs-toggle", "modal");
button.setAttribute("data-bs-target", "#exampleModal");
button.innerHTML = "open";
button.addEventListener("click", function callback() {
const modelcontents = document.getElementById("gallery-photo");
modelcontents.innerHTML = "";
const imageModel = document.createElement("img");
imageModel.setAttribute("src", data.webformatURL);
modelcontents.appendChild(imageModel);
//\* i should start from hier
});
cardBody.appendChild(button);
}
