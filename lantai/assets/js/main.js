
$(window).load(function() {

	$('#status').fadeOut('slow'); // fade out na animação
	$('#preloader').fadeOut('slow', function(){ /* $(this).remove(); */}); // fade out na div sobreposta e remove o preload


});

$(document).on("click", function(event){
	var $trigger = $(".dropdown");
	if($trigger !== event.target && !$trigger.has(event.target).length){
		$(".dropdown-menu").fadeOut("fast");
	}
});


$(document).ready(function(){

	/*  Bind MouseDown */

	$(' img').bind("mousedown",function(){
		return false;
	});

	/* Dropdown */

	redefineDropdown = function(){
		var myW = $(window).width();
		if(myW>768){
			$('.dropdown-toggle').click(function() {
				$(this).next('.dropdown-menu').fadeToggle(500);
			});
		}
	};


	/*carousel*/
	var banner = $('.slider');

	addContainer = function(){
		$('.owl-pagination').addClass( "container" );
	}
	banner.owlCarousel({
		transitionStyle : "fade",
		// theme: "lantai-theme",
		items:1,
		itemsDesktop: [1200, 1],
		itemsDesktopSmall: [992, 1],
		itemsTablet: [768, 1],
		responsive: true,
		mouseDrag : false,
		loop : true,
		navigation : false,
		autoPlay: true,
		rewindSpeed: 3000,
		pagination : true,
		afterInit : addContainer
	});



	redefineHeader = function() {
		var myHeight = $(window).height();
		var myWidth = $(window).width();
		navBarHeight = $('.navbar-default').height();
		var sliderHeight = myHeight - navBarHeight;
		if(myWidth<768){
			$(".slider .item").css("height", sliderHeight/2);
		}
		else{
			$(".slider .item").css("height", sliderHeight);
		}
		console.log(myWidth);
	};


	/* Redefinir heders de páginas */
	redefineHeaderPaginas = function(){
		var containerHeight = $('#header-pagina .container').height();
		var imgHeight = $('#header-pagina .header-img').height();

		var padding = imgHeight/2 - containerHeight/2;
		console.log(padding);

		$('#header-pagina').css("padding",  padding+"px 0px");
	}

	redefineHeaderPaginas();

	/* Scroll Down */

	$('a[href="#destaque"]').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: target.offset().top
				}, 800);
				return false;
			}
		}
	});
	redefineHeader();
	redefineDropdown();

	window.addEventListener('resize', function(){
		redefineHeader();
		redefineHeaderPaginas();
	});


	/* Isotope */

	var $container = $('.produtos'),
	colWidth = function () {
		var w = $container.width(),
		columnNum = 1,
		columnWidth = 0;
		if (w > 1200) {
			columnNum  = 4;
		} else if (w > 900) {
			columnNum  = 4;
		} else if (w > 600) {
			columnNum  = 4;
		} else if (w > 300) {
			columnNum  = 2;
		}
		columnWidth = Math.floor(w/columnNum);
		$container.find('.item').each(function() {
			var $item = $(this),
			multiplier_w = $item.attr('class').match(/item-w(\d)/),
			multiplier_h = $item.attr('class').match(/item-h(\d)/);
			if (w > 600) {
				width = multiplier_w ? columnWidth*multiplier_w[1]-5 : columnWidth-5;
				height = multiplier_h ? columnWidth*multiplier_h[1]*0.5-5 : columnWidth*0.5-5;
				$item.css({
					width: width,
					height: height
				});
			}
			else{
				width = multiplier_w/2 ? columnWidth*multiplier_w[1]-5 : columnWidth-5;
				height = multiplier_h ? columnWidth*multiplier_h[1]*0.5-5 : columnWidth*0.5-5;
				$item.css({
					width: width,
					height: 'auto'
				});
			}
		});
		return columnWidth;
	},
	isotope = function () {
		$container.isotope({
			resizable: false,
			itemSelector: '.item',
			masonry: {
				columnWidth: colWidth(),
				gutterWidth: 5
			}
		});
	};
	isotope();
	$(window).smartresize(isotope);


	/* Way points animate */

	function onScrollInit( items, trigger ) {
		items.each( function() {
			var osElement = $(this),
			osAnimationClass = osElement.attr('data-os-animation'),
			osAnimationDelay = osElement.attr('data-os-animation-delay');

			osElement.css({
				'-webkit-animation-delay':  osAnimationDelay,
				'-moz-animation-delay':     osAnimationDelay,
				'animation-delay':          osAnimationDelay
			});

			var osTrigger = ( trigger ) ? trigger : osElement;

			osTrigger.waypoint(function() {
				osElement.addClass('animated').addClass(osAnimationClass);
			},{
				triggerOnce: true,
				offset: '90%'
			});
		});
	}

	onScrollInit( $('.way-animation') );





	/*===================================================
	=            Aqui começa tudo do mixiTup            =
	===================================================*/



	/*=====  End of Aqui começa tudo do mixiTup  ======*/


	$("#items").mixItUp({
		load: {
			page: 1,
		},

		pagination: {
			limit: 16,
			loop: false,
			generatePagers: true,
		pagerClass: '',
		prevButtonHTML: '«',
		nextButtonHTML: '»'
	},

	selectors: {
		pagersWrapper: '.pager-list',
		pager: '.pager'
	},

	/* Callbacks para necessidades */

	callbacks: {
		onMixStart: function(state, futureState){
				// $('#status').fadeIn('fast'); // fade out na animaÃ§Ã£o
				// $('#preloader').fadeIn('fast', function(){ });
				// ;
				// $('#busca').fadeIn('slow');
				$("html, body").animate({ scrollTop: 0 }, 500);

			},
			// onMixLoad: function(){
			// 	console.log(window.location.hash);
			// 	var hash = window.location.hash;
			// 	console.log(window.location.hash);
			// 	var noHash=hash.replace("#","");

			// 	if(hash){
			// 		$('#grid').mixitup('filter', noHash);
			// 	}
			// }
		}
	});
	console.log(window.location.hash);


	var inputText;
	var $matching = $();

  // função delay
  var delay = (function(){
  	var timer = 0;
  	return function(callback, ms){
  		clearTimeout (timer);
  		timer = setTimeout(callback, ms);
  	};
  })();


  /* Criei uma variável para inserir depois do hash pra teste */

  filtros = "checkbox";
  filtros += "&checkbox";


  /* Pega a url e o parametro search= */
   url = $.url(location);
   console.log(url.fparam('search'));


   mixitUp = function(){
   	delay(function(){
   		inputText = $("#search").val().toLowerCase();
   		console.log($("#search").val().toLowerCase());



      // Verifica se o campo de entrada está vazio
      if ((inputText.length) > 0) {
      	$( '.mix').each(function() {
      		$this = $("this");

           // adicionar o item a ser filtrado para fora se o texto de entrada e combina artigos no interior do título
           if($(this).find('h3').text().toLowerCase().match(inputText)) {
           	$matching = $matching.add(this);
           }
           else if($(this).find('h4').text().toLowerCase().match(inputText)){
           	$matching = $matching.add(this);
           }
           else {
            //remove qualquer item previamente combinado
            $matching = $matching.not(this);
        }
    });
      	//$("#items").mixItUp('filter', $matching);
      }

      else {
        // redefine o filtro para mostrar todos os itens se a entrada estiver vazia
        //$("#items").mixItUp('filter', 'all');
    }
}, 200 );
   }

   $("#search").val(url.fparam('search'));

   //mixitUp();

   $("#search").keyup(function(){
   //	mixitUp();
   	//document.location.hash = "&search=" + $("#search").val().toLowerCase();

	//  função delay  chamada para se certificar de usuário parou de digitar

	});

   /*=====  Final dos códigos do MixiTup  ======*/

	 var hashMapper = new HashMapper();
	 $("ul.filters input[type=checkbox]").click(function() {
		 	var elId = this.getAttribute('id');

		 	if ( $('#' + elId).is(':checked') ) {
		 		hashMapper.add(elId);
		 	} else {
		 		hashMapper.remove(elId);
		 	}

		 	$("#items").mixItUp('filter', hashMapper.buildFilter());

		 	hashMapper.buildHash();
	 });

	$("#items").mixItUp('filter', hashMapper.buildFilterFromURL());

	$("ul.filters input[type=checkbox]").each(function(i, input) {
		input.checked = true;
	});

});

$(window).load(function () {
	redefineHeaderPaginas();
});

////////////////////////////////////////////////////////////////////////////////



function HashMapper() {
	this.checked = [];

	this.add = function(el) {
		this.checked.push(el);
	}

	this.remove = function(el) {
		var index = this.checked.indexOf(el);
		if (index != -1) {
			this.checked.splice(index, 1);
		}
	}

	this.buildHash = function() {
		if (this.checked.length) {
			document.location.hash = "&checkbox=" + this.checked.join('+');
		} else {
			document.location.hash = '';
		}
	}

	this.buildFilter = function() {
		if (this.checked.length) {
			var c = this.checked.map(function(el) { return '.' + el; });
			return c.join(',');
		} else {
			return 'all';
		}
	}

	this.buildFilterFromURL = function() {
		var hash = document.location.hash.substr(1),
				opts = hash.substr(hash.indexOf('checkbox='))
							.split('&')[0]
							.split('=')[1]
							.split('+');

		for (var i = 0; i < opts.length; i++) {
			this.add(opts[i]);
		}

		return this.buildFilter();
	}
}
