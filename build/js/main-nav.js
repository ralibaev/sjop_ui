var navMain = document.querySelector('.mobile-nav');
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