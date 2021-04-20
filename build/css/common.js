function getURLVar(key) {
	var value = [];

	var query = String(document.location).split('?');

	if (query[1]) {
		var part = query[1].split('&');

		for (i = 0; i < part.length; i++) {
			var data = part[i].split('=');

			if (data[0] && data[1]) {
				value[data[0]] = data[1];
			}
		}

		if (value[key]) {
			return value[key];
		} else {
			return '';
		}
	}
}

$(document).ready(function() {
	// Highlight any found errors
	$('.text-danger').each(function() {
		var element = $(this).parent().parent();

		if (element.hasClass('form-group')) {
			element.addClass('has-error');
		}
	});

	// Currency
	$('#form-currency .currency-select').on('click', function(e) {
		e.preventDefault();

		$('#form-currency input[name=\'code\']').val($(this).attr('name'));

		$('#form-currency').submit();
	});

	// Language
	$('#form-language .language-select').on('click', function(e) {
		e.preventDefault();

		$('#form-language input[name=\'code\']').val($(this).attr('name'));

		$('#form-language').submit();
	});

	/* Search */
	$('#search input[name=\'search\']').parent().find('button').on('click', function() {
		var url = $('base').attr('href') + 'index.php?route=product/search';

		var value = $('header #search input[name=\'search\']').val();

		if (value) {
			url += '&search=' + encodeURIComponent(value);
		}

		location = url;
	});

	$('#search input[name=\'search\']').on('keydown', function(e) {
		if (e.keyCode == 13) {
			$('header #search input[name=\'search\']').parent().find('button').trigger('click');
		}
	});

	// Menu
	$('#menu .dropdown-menu').each(function() {
		var menu = $('#menu').offset();
		var dropdown = $(this).parent().offset();

		var i = (dropdown.left + $(this).outerWidth()) - (menu.left + $('#menu').outerWidth());

		if (i > 0) {
			$(this).css('margin-left', '-' + (i + 10) + 'px');
		}
	});

	// Product List
	$('#list-view').click(function() {
		$('#content .product-grid > .clearfix').remove();

		$('#content .row > .product-grid').attr('class', 'product-layout product-list col-xs-12');
		$('#grid-view').removeClass('active');
		$('#list-view').addClass('active');

		localStorage.setItem('display', 'list');
	});

	// Product Grid
	$('#grid-view').click(function() {
		// What a shame bootstrap does not take into account dynamically loaded columns
		var cols = $('#column-right, #column-left').length;

		if (cols == 2) {
			$('#content .product-list').attr('class', 'product-layout product-grid col-lg-6 col-md-6 col-sm-12 col-xs-12');
		} else if (cols == 1) {
			$('#content .product-list').attr('class', 'product-layout product-grid col-lg-4 col-md-4 col-sm-6 col-xs-12');
		} else {
			$('#content .product-list').attr('class', 'product-layout product-grid col-lg-3 col-md-3 col-sm-6 col-xs-12');
		}

		$('#list-view').removeClass('active');
		$('#grid-view').addClass('active');

		localStorage.setItem('display', 'grid');
	});

	if (localStorage.getItem('display') == 'list') {
		$('#list-view').trigger('click');
		$('#list-view').addClass('active');
	} else {
		$('#grid-view').trigger('click');
		$('#grid-view').addClass('active');
	}

	// Checkout
	$(document).on('keydown', '#collapse-checkout-option input[name=\'email\'], #collapse-checkout-option input[name=\'password\']', function(e) {
		if (e.keyCode == 13) {
			$('#collapse-checkout-option #button-login').trigger('click');
		}
	});

	// tooltips on hover
	$('[data-toggle=\'tooltip\']').tooltip({container: 'body'});

	// Makes tooltips work on ajax generated content
	$(document).ajaxStop(function() {
		$('[data-toggle=\'tooltip\']').tooltip({container: 'body'});
	});
});

// Cart add remove functions
var cart = {
	'add': function(product_id, quantity) {
		$.ajax({
			url: 'index.php?route=checkout/cart/add',
			type: 'post',
			data: 'product_id=' + product_id + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				$('.alert-dismissible, .text-danger').remove();

				if (json['redirect']) {
					location = json['redirect'];
				}

				if (json['success']) {
					$('#content').parent().before('<div class="alert alert-success alert-dismissible"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');

					// Need to set timeout otherwise it wont update the total
					setTimeout(function () {
						$('#cart > button').html('<span id="cart-total">' + json['total'] + '</span>');
					}, 100);

					$('html, body').animate({ scrollTop: 0 }, 'slow');

					$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'update': function(key, quantity) {
		$.ajax({
			url: 'index.php?route=checkout/cart/edit',
			type: 'post',
			data: 'key=' + key + '&quantity=' + (typeof(quantity) != 'undefined' ? quantity : 1),
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				// Need to set timeout otherwise it wont update the total
				setTimeout(function () {
					$('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
				}, 100);

				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'remove': function(key) {
		$.ajax({
			url: 'index.php?route=checkout/cart/remove',
			type: 'post',
			data: 'key=' + key,
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				// Need to set timeout otherwise it wont update the total
				setTimeout(function () {
					$('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
				}, 100);

				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	}
}

var voucher = {
	'add': function() {

	},
	'remove': function(key) {
		$.ajax({
			url: 'index.php?route=checkout/cart/remove',
			type: 'post',
			data: 'key=' + key,
			dataType: 'json',
			beforeSend: function() {
				$('#cart > button').button('loading');
			},
			complete: function() {
				$('#cart > button').button('reset');
			},
			success: function(json) {
				// Need to set timeout otherwise it wont update the total
				setTimeout(function () {
					$('#cart > button').html('<span id="cart-total"><i class="fa fa-shopping-cart"></i> ' + json['total'] + '</span>');
				}, 100);

				if (getURLVar('route') == 'checkout/cart' || getURLVar('route') == 'checkout/checkout') {
					location = 'index.php?route=checkout/cart';
				} else {
					$('#cart > ul').load('index.php?route=common/cart/info ul li');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	}
}

var wishlist = {
	'add': function(product_id) {
		$.ajax({
			url: 'index.php?route=account/wishlist/add',
			type: 'post',
			data: 'product_id=' + product_id,
			dataType: 'json',
			success: function(json) {
				$('.alert-dismissible').remove();

				if (json['redirect']) {
					location = json['redirect'];
				}

				if (json['success']) {
					$('#content').parent().before('<div class="alert alert-success alert-dismissible"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				}

				$('#wishlist-total span').html(json['total']);
				$('#wishlist-total').attr('title', json['total']);

				$('html, body').animate({ scrollTop: 0 }, 'slow');
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'remove': function() {

	}
}

var compare = {
	'add': function(product_id) {
		$.ajax({
			url: 'index.php?route=product/compare/add',
			type: 'post',
			data: 'product_id=' + product_id,
			dataType: 'json',
			success: function(json) {
				$('.alert-dismissible').remove();

				if (json['success']) {
					$('#content').parent().before('<div class="alert alert-success alert-dismissible"><i class="fa fa-check-circle"></i> ' + json['success'] + ' <button type="button" class="close" data-dismiss="alert">&times;</button></div>');

					$('#compare-total').html(json['total']);

					$('html, body').animate({ scrollTop: 0 }, 'slow');
				}
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'remove': function() {

	}
}

/* Agree to Terms */
$(document).delegate('.agree', 'click', function(e) {
	e.preventDefault();

	$('#modal-agree').remove();

	var element = this;

	$.ajax({
		url: $(element).attr('href'),
		type: 'get',
		dataType: 'html',
		success: function(data) {
			html  = '<div id="modal-agree" class="modal">';
			html += '  <div class="modal-dialog">';
			html += '    <div class="modal-content">';
			html += '      <div class="modal-header">';
			html += '        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
			html += '        <h4 class="modal-title">' + $(element).text() + '</h4>';
			html += '      </div>';
			html += '      <div class="modal-body">' + data + '</div>';
			html += '    </div>';
			html += '  </div>';
			html += '</div>';

			$('body').append(html);

			$('#modal-agree').modal('show');
		}
	});
});

// Autocomplete */
(function($) {
	$.fn.autocomplete = function(option) {
		return this.each(function() {
			this.timer = null;
			this.items = new Array();

			$.extend(this, option);

			$(this).attr('autocomplete', 'off');

			// Focus
			$(this).on('focus', function() {
				this.request();
			});

			// Blur
			$(this).on('blur', function() {
				setTimeout(function(object) {
					object.hide();
				}, 200, this);
			});

			// Keydown
			$(this).on('keydown', function(event) {
				switch(event.keyCode) {
					case 27: // escape
						this.hide();
						break;
					default:
						this.request();
						break;
				}
			});

			// Click
			this.click = function(event) {
				event.preventDefault();

				value = $(event.target).parent().attr('data-value');

				if (value && this.items[value]) {
					this.select(this.items[value]);
				}
			}

			// Show
			this.show = function() {
				var pos = $(this).position();

				$(this).siblings('ul.dropdown-menu').css({
					top: pos.top + $(this).outerHeight(),
					left: pos.left
				});

				$(this).siblings('ul.dropdown-menu').show();
			}

			// Hide
			this.hide = function() {
				$(this).siblings('ul.dropdown-menu').hide();
			}

			// Request
			this.request = function() {
				clearTimeout(this.timer);

				this.timer = setTimeout(function(object) {
					object.source($(object).val(), $.proxy(object.response, object));
				}, 200, this);
			}

			// Response
			this.response = function(json) {
				html = '';

				if (json.length) {
					for (i = 0; i < json.length; i++) {
						this.items[json[i]['value']] = json[i];
					}

					for (i = 0; i < json.length; i++) {
						if (!json[i]['category']) {
							html += '<li data-value="' + json[i]['value'] + '"><a href="#">' + json[i]['label'] + '</a></li>';
						}
					}

					// Get all the ones with a categories
					var category = new Array();

					for (i = 0; i < json.length; i++) {
						if (json[i]['category']) {
							if (!category[json[i]['category']]) {
								category[json[i]['category']] = new Array();
								category[json[i]['category']]['name'] = json[i]['category'];
								category[json[i]['category']]['item'] = new Array();
							}

							category[json[i]['category']]['item'].push(json[i]);
						}
					}

					for (i in category) {
						html += '<li class="dropdown-header">' + category[i]['name'] + '</li>';

						for (j = 0; j < category[i]['item'].length; j++) {
							html += '<li data-value="' + category[i]['item'][j]['value'] + '"><a href="#">&nbsp;&nbsp;&nbsp;' + category[i]['item'][j]['label'] + '</a></li>';
						}
					}
				}

				if (html) {
					this.show();
				} else {
					this.hide();
				}

				$(this).siblings('ul.dropdown-menu').html(html);
			}

			$(this).after('<ul class="dropdown-menu"></ul>');
			$(this).siblings('ul.dropdown-menu').delegate('a', 'click', $.proxy(this.click, this));

		});
	}
	$('.bottom-header__catalog-link').click(function(e){
		e.preventDefault();
	});

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

	// Мобильное меню
	var navMain = document.querySelector('.mobile-nav');
	var navToggle = document.querySelector('.main-nav__toggle');
	if (navToggle){
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
	};

	var link = document.querySelector(".modal-login__link");
	var popup = document.querySelector(".modal-login");
	var close = document.querySelector(".modal-login__close-button");
	var buttonsBlock = document.querySelector(".modal-login__buttons-block");
	var enterBlock = document.querySelector(".modal-login__enter-block");
	var registrBlock = document.querySelector(".modal-login__registration-block");
	var cancelEnter = document.querySelector(".modal-login__cancel-button--enter");
	var cancelRegistr = document.querySelector(".modal-login__cancel-button--registration");

	if (link){
		link.addEventListener("click", function (evt) {
			evt.preventDefault();
			popup.classList.add("modal-login--opened");
		});
	}

	if (close){
		close.addEventListener("click", function (evt) {
			evt.preventDefault();
			popup.classList.remove("modal-login--opened");
			// popup.classList.remove("modal-error");
		});
	}

	window.addEventListener("keydown", function (evt) {
		if(evt.keyCode === 27) {
			evt.preventDefault();
			if (popup.classList.contains("modal-login--opened")) {
				popup.classList.remove("modal-login--opened");
			}
		}
	});

	if(cancelEnter){
		cancelEnter.addEventListener("click", function (evt) {
			evt.preventDefault();
			buttonsBlock.classList.add("modal-login__buttons-block--opened");
			enterBlock.classList.remove("modal-login__enter-block--opened");
		});
	}

	if(cancelRegistr){
		cancelRegistr.addEventListener("click", function (evt) {
			evt.preventDefault();
			buttonsBlock.classList.add("modal-login__buttons-block--opened");
			registrBlock.classList.remove("modal-login__registration-block--opened");
		});
	}


	var firstButton = document.querySelector(".price__document-title--first");
	var firstAccordeon = document.querySelector(".price__hidden-block--first");

	if(firstButton){
		firstButton.addEventListener("click", function (evt) {
			evt.preventDefault();
			firstAccordeon.classList.add("price__hidden-block--open");
		});
	}


	var inputReviews = document.querySelector('.product-options__input--reviews');
	var reviewsText = document.querySelector('.product-options__reviews-text');

	if ((inputReviews)&&(inputReviews.checked)) {
		window.alert("kjsdf");
		reviewsText.classList.add('.product-options__option-block');
	}
	$('#cart.btn-group.btn-block').click(
		function(){
			location.href='/index.php?route=checkout/simplecheckout';
		});

	$('.popup-with-form, .form-popup-close').click(function(e){
		e.preventDefault();
		$('#form-popup').toggleClass('formgo');

	});

	$('#userData').submit(function(){
		let errors = false;
		$(this).find('span').empty();

		$(this).find('input, textarea').each(function(){
			if(  $.trim( $(this).val() ) == ''){
				errors = true;
				$(this).next().text('Не заполнено поле ');
			}
		});

		if(!errors){
			let data = $('#userData').serialize();
			$.ajax({
				url: 'sender.php',
				type: 'POST',
				data: data,
				success: function(res){
					if (data['error']) {
				alert(data['error']);
			} else {
				console.log('Письмo oтврaвлeнo!');
				$('#userData').html('<h2 class="userData__msg">Ваша заявка отправлена.<br/> Ждите звонка менеджера!</h2>');
			}
				},
				error: function(){
					alert('Ошибка');
				}
			});
		}

		return false;
	});

})(window.jQuery);
