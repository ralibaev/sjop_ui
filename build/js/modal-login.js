var link = document.querySelector(".modal-login__link");
var popup = document.querySelector(".modal-login");
var close = document.querySelector(".modal-login__close-button");
var buttonsBlock = document.querySelector(".modal-login__buttons-block");
var enterButton = document.querySelector(".modal-login__button--enter");
var enterBlock = document.querySelector(".modal-login__enter-block");
var registrButton = document.querySelector(".modal-login__button--registration");
var registrBlock = document.querySelector(".modal-login__registration-block");
var cancelEnter = document.querySelector(".modal-login__cancel-button--enter");
var cancelRegistr = document.querySelector(".modal-login__cancel-button--registration");
// var form = popup.querySelector("form");
// var login = popup.querySelector("[name=login]");
// var password = popup.querySelector("[name=password]");
// var isStorageSupport = true;
// var storage = "";

// try {
// 	storage = localStorage.getItem('login');
// } catch (err) {
// 	isStorageSupport = false;
// }

link.addEventListener("click", function (evt) {
	evt.preventDefault();
	popup.classList.add("modal-login--opened");
	// if (storage) {
	// 	login.value = storage;
	// 	password.focus();
	// } else {
	// 	login.focus();
	// }
});

close.addEventListener("click", function (evt) {
	evt.preventDefault();
	popup.classList.remove("modal-login--opened");
	// popup.classList.remove("modal-error");
});

// form.addEventListener("submit", function (evt) {
// 	if (!login.value || !password.value) {
// 		evt.preventDefault();
// 		popup.classList.add("modal-error");
// 	} else {
// 		if (isStorageSupport) {
// 			localStorage.setItem("login", login.value);
// 		};
// 	};
// });

window.addEventListener("keydown", function (evt) {
	if(evt.keyCode === 27) {
		evt.preventDefault();
		if (popup.classList.contains("modal-login--opened")) {
			popup.classList.remove("modal-login--opened");
		}
	}
});

enterButton.addEventListener("click", function (evt) {
	evt.preventDefault();
	enterBlock.classList.add("modal-login__enter-block--opened");
	buttonsBlock.classList.remove("modal-login__buttons-block--opened");
	// if (storage) {
	// 	login.value = storage;
	// 	password.focus();
	// } else {
	// 	login.focus();
	// }
});

registrButton.addEventListener("click", function (evt) {
	evt.preventDefault();
	registrBlock.classList.add("modal-login__registration-block--opened");
	buttonsBlock.classList.remove("modal-login__buttons-block--opened");
	// if (storage) {
	// 	login.value = storage;
	// 	password.focus();
	// } else {
	// 	login.focus();
	// }
});

cancelEnter.addEventListener("click", function (evt) {
	evt.preventDefault();
	buttonsBlock.classList.add("modal-login__buttons-block--opened");
	enterBlock.classList.remove("modal-login__enter-block--opened");
	// if (storage) {
	// 	login.value = storage;
	// 	password.focus();
	// } else {
	// 	login.focus();
	// }
});

cancelRegistr.addEventListener("click", function (evt) {
	evt.preventDefault();
	buttonsBlock.classList.add("modal-login__buttons-block--opened");
	registrBlock.classList.remove("modal-login__registration-block--opened");
	// if (storage) {
	// 	login.value = storage;
	// 	password.focus();
	// } else {
	// 	login.focus();
	// }
});