// Верхний слайдер
let headerSlider = document.querySelector('.header-slider');
if (headerSlider) {
  let headerSlides = document.querySelectorAll('.header-slider__item');
  let headerSlidesCount = 0;
  for (let i = 0; i < headerSlides.length; i++) {
    headerSlidesCount++;
  }

  let headerSlidesButtonList = document.querySelector('.header-slider__button-list');
  for (let i = 0; i < headerSlidesCount; i++) {
    let headerSlidesButton = document.createElement('button');
    headerSlidesButton.classList.add('header-slider__button-item');
    headerSlidesButtonList.append(headerSlidesButton);
  }

  headerSlidesButtonList.childNodes[0].classList.add('header-slider__button-item--active');

  for (let i = 0; i < headerSlides.length; i++) {
    headerSlides[i].style.left = (i * 100) + '%';
  }

  function showHeaderSlide() {
    for (let i = 0; i < headerSlidesCount; i++) {
      if (headerSlidesButtonList.childNodes[i].classList.contains('header-slider__button-item--active')) {
        for (let j = 0; j < headerSlides.length; j++) {
          headerSlides[j].style.left = (j * 100) - (i * 100) + '%';
        }
      }
    }
  }

  function removeTransitionFromSlides() {
    for (let i = 0; i < headerSlidesCount; i++) {
      headerSlides[i].classList.add('header-slider__item--no-transition');
    }
  }

  function addTransitionToSlides() {
    for (let i = 0; i < headerSlidesCount; i++) {
      headerSlides[i].classList.remove('header-slider__item--no-transition');
    }
  }

  function showLastHeaderSlide() {
    removeTransitionFromSlides();
    for (let i = 0; i < headerSlidesCount; i++) {
    	headerSlides[i].style.left = ((i - headerSlidesCount) * 100) + '%';
    }
    setTimeout(addTransitionToSlides, 10);
    setTimeout(function() {
      for (let i = 0; i < headerSlidesCount; i++) {
        headerSlides[i].style.left = ((i - headerSlidesCount + 1) * 100) + '%';
      }
    }, 20);
  }

  function showFirstHeaderSlide() {
    removeTransitionFromSlides();
    for (let i = 0; i < headerSlidesCount; i++) {
    	headerSlides[i].style.left = ((i + 1) * 100) + '%';
    }
    setTimeout(addTransitionToSlides, 10);
    setTimeout(function() {
      for (let i = 0; i < headerSlidesCount; i++) {
        headerSlides[i].style.left = (i * 100) + '%';
      }
    }, 20);
  }

  function prevHeaderSlide() {
    let x = 0;
    for (let i = 0; i < headerSlidesCount; i++) {
      if (headerSlidesButtonList.childNodes[i].classList.contains('header-slider__button-item--active')) {x = i;}
    }
    headerSlidesButtonList.childNodes[x].classList.remove('header-slider__button-item--active');
    if (x == 0) {
      headerSlidesButtonList.lastChild.classList.add('header-slider__button-item--active');
      showLastHeaderSlide();
    } else {
      headerSlidesButtonList.childNodes[x - 1].classList.add('header-slider__button-item--active');
      showHeaderSlide();
    }
  }

  function nextHeaderSlide() {
    let x = 0;
    for (let i = 0; i < headerSlidesCount; i++) {
      if (headerSlidesButtonList.childNodes[i].classList.contains('header-slider__button-item--active')) {x = i;}
    }
    headerSlidesButtonList.childNodes[x].classList.remove('header-slider__button-item--active');
    if (x == (headerSlidesCount - 1)) {
      headerSlidesButtonList.firstChild.classList.add('header-slider__button-item--active');
  		showFirstHeaderSlide();
    } else {
      headerSlidesButtonList.childNodes[x + 1].classList.add('header-slider__button-item--active');
  		showHeaderSlide();
    }
  }

  let headerSlidesTime = 10000;
  let headerSlidesTimer = setInterval(function() {
    nextHeaderSlide();
  }, headerSlidesTime);

  for (let i = 0; i < headerSlidesCount; i++) {
    headerSlidesButtonList.childNodes[i].addEventListener('click', function() {
      for (let j = 0; j < headerSlides.length; j++) {
        headerSlidesButtonList.childNodes[j].classList.remove('header-slider__button-item--active')
      }
      headerSlidesButtonList.childNodes[i].classList.add('header-slider__button-item--active');
      showHeaderSlide();
    });
  }

  let headerSlidesPrevButton = document.querySelector('.header-slider__button--prev');
  headerSlidesPrevButton.addEventListener('click', prevHeaderSlide);

  let headerSlidesNextButton = document.querySelector('.header-slider__button--next');
  headerSlidesNextButton.addEventListener('click', nextHeaderSlide);
}

// Мобильное меню
var navMain = document.querySelector('.mobile-nav');
if (navMain) {
  var navToggle = document.querySelector('.main-nav__toggle');
  navToggle.addEventListener('click', function() {
  	if (navMain.classList.contains('mobile-nav--closed')) {
  		navMain.classList.remove('mobile-nav--closed');
  		navMain.classList.add('mobile-nav--opened');
  		navToggle.classList.remove('main-nav__toggle--closed');
  		navToggle.classList.add('main-nav__toggle--opened');
  	} else {
  		navMain.classList.remove('mobile-nav--opened');
  		navMain.classList.add('mobile-nav--closed');
  		navToggle.classList.remove('main-nav__toggle--opened');
  		navToggle.classList.add('main-nav__toggle--closed');
  	}
  });

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
  });

  registrButton.addEventListener("click", function (evt) {
  	evt.preventDefault();
  	registrBlock.classList.add("modal-login__registration-block--opened");
  	buttonsBlock.classList.remove("modal-login__buttons-block--opened");
  });

  cancelEnter.addEventListener("click", function (evt) {
  	evt.preventDefault();
  	buttonsBlock.classList.add("modal-login__buttons-block--opened");
  	enterBlock.classList.remove("modal-login__enter-block--opened");
  });

  cancelRegistr.addEventListener("click", function (evt) {
  	evt.preventDefault();
  	buttonsBlock.classList.add("modal-login__buttons-block--opened");
  	registrBlock.classList.remove("modal-login__registration-block--opened");
  });

  // var firstButton = document.querySelector(".price__document-title--first");
  // var firstAccordeon = document.querySelector(".price__hidden-block--first");
  //
  // firstButton.addEventListener("click", function (evt) {
  // 	evt.preventDefault();
  // 	firstAccordeon.classList.add("price__hidden-block--open");
  // 	// if (storage) {
  // 	// 	login.value = storage;
  // 	// 	password.focus();
  // 	// } else {
  // 	// 	login.focus();
  // 	// }
  // });

  // var inputReviews = document.querySelector('.product-options__input--reviews');
  // var reviewsText = document.querySelector('.product-options__reviews-text');
  // // var description = document.querySelector(.'product-options__description-text');
  // // var characteristic = document.querySelector(.'product-options__characteristics-text');
  // // var reviews = document.querySelector(.'product-options__reviews-text');
  // // var char = document.querySelector(.'product-options__chars-text');
  // // var instructions = document.querySelector(.'product-options__instructions-text');
  //
  // if (inputReviews.checked) {
  // 	window.alert("kjsdf");
  // 	reviewsText.classList.add('.product-options__option-block');
  // }
}

let catalogCategory = document.querySelector('.page-footer');
if (window.location.href == 'https://riamedtd.ru/index.php?route=product/category') {
  catalogCategory.classList.add('page-footer--white');
};

// window.onload = function () {
//   if (ymaps.geolocation.region == "Республика Башкортостан") {
//     switch (ymaps.geolocation.city) {
//       case "Уфа":
//         jQuery("#ufa").attr('selected', '');
//         var rTown = 'ufa';
//         localStorage.setItem('rTown', 'ufa');
//         break;
//       case "Стерлитамак":
//         jQuery("#ster").attr('selected', '');
//         var rTown = 'ster';
//         localStorage.setItem('rTown', 'ster');
//         break;
//       case "Октябрьский":
//         jQuery("#okt").attr('selected', '');
//         var rTown = 'okt';
//         localStorage.setItem('rTown', 'okt');
//         break;
//       case "Нефтекамск":
//         jQuery("#neft").attr('selected', '');
//         var rTown = 'neft';
//         localStorage.setItem('rTown', 'neft');
//         break;
//       case "Сибай":
//         jQuery("#sibay").attr('selected', '');
//         var rTown = 'sibay';
//         localStorage.setItem('rTown', 'sibay');
//         break;
//     }
//   }
//   var storTown = localStorage.getItem('rTown');
//   switch (storTown) {
//     case "ufa":
//       jQuery("#ufa").attr('selected', '');
//       break;
//     case "ster":
//       jQuery("#ster").attr('selected', '');
//       break;
//     case "okt":
//       jQuery("#okt").attr('selected', '');
//       break;
//     case "neft":
//       jQuery("#neft").attr('selected', '');
//       break;
//     case "sibay":
//       jQuery("#sibay").attr('selected', '');
//       break;
//   }
// }
