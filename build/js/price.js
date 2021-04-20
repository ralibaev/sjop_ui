var firstButton = document.querySelector(".price__document-title--first");
var firstAccordeon = document.querySelector(".price__hidden-block--first");

firstButton.addEventListener("click", function (evt) {
	evt.preventDefault();
	firstAccordeon.classList.add("price__hidden-block--open");
	// if (storage) {
	// 	login.value = storage;
	// 	password.focus();
	// } else {
	// 	login.focus();
	// }
});