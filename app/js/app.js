// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});


document.addEventListener("DOMContentLoaded", function() {

    const loader = $('.preloader-wrap');
    setTimeout(function(){
        loader.addClass('hide');
        $('html').addClass('page-ready');
    }, 1000);

    // BURGER MENU
    $('#sidebar-btn').on('click', function () {
        $('.line-black').toggleClass('line-black-move');
        $('#sidebar-btn,.sidebar').toggleClass('active');
        $('body').toggleClass('lock');
    });

    $('#sidebar-btn').on('mouseover', () => {
        $('#sidebar-btn').removeClass('sidebar-btn');
    });

    $('#sidebar-btn').on('mouseout', () => {
        if(window.pageYOffset < 835){
            $('#sidebar-btn').addClass('sidebar-btn');
        }else{
            $('#sidebar-btn').removeClass('sidebar-btn');
        }
    });

    $('.arrow-top').on('click', function() {
        $('html, body').animate({
            scrollTop: $('#screen-2').offset().top
        }, 500);
    });
    
    const topMainSectionHeight = $('.top-main-bg').outerHeight();
    window.addEventListener('scroll', function() {
        
        const sidebarBtnOffset = $('#sidebar-btn').offset().top;

        if(sidebarBtnOffset > topMainSectionHeight) {
            $('.header').addClass('sidebar-btn');
            $('.wayp-lists').addClass('wayp-lists-black');
        } else {
            $('.header').removeClass('sidebar-btn');
            $('.wayp-lists').removeClass('wayp-lists-black');
        }

        const top = this.pageYOffset;

        let layers = $('.parallax__layer');
        let speed, yPos;
        layers.each(function() {
            speed = $(this).attr('data-speed');
            let yPos = -(top * speed / 100);
            $(this).attr('style','transform: translate3d(0px, ' + yPos + 'px, 0px)');
        });


    });

    $(document).on('mouseup', function(e){

        const target = e.target;
        const langList = $('.lang-list');

        if (!langList.is(target) && langList.has(target).length === 0) {
            $('.lang').removeClass("active");
        }
        
    });

    $('.lang-item').on('click', function() {
        $('.lang-js span').text($(this).text());
        $('.lang-item').removeClass('active');
        $(this).addClass('active');
        $('.lang').removeClass('active');
    });


    $('.lang-js').on('click', function() {
        $('.lang').addClass('active');
    });

    $('.tooltip-item__letter').hover(function() {
            $(this).closest('.tooltip-item').find('.tooltip-item__text').slideDown(200);
        }, function() {
            $(this).closest('.tooltip-item').find('.tooltip-item__text').slideUp(200);
        });


    const wayNavLi = $('.wayp-lists li');

    function waypCalcHeight() {
        let itemSum = 0;
        $.each(wayNavLi, function (idx, item) {
            const itemHeight = $(item).outerWidth();
            const itemOffset = parseInt($(item).css('margin-left'));
            itemSum += itemHeight + itemOffset;
        });

        $('.wayp-lists').css('height', itemSum.toFixed(0));
        
    }

    waypCalcHeight();

    function waypTracked (hash) {
        wayNavLi.removeClass('active');
        $.each(wayNavLi, function () {
            const href = $(this).children('a').attr('href').slice(1);
            if (href === hash) {
                $(this).addClass('active');
                waypCalcHeight();
            }
        });
    } 

    $('.tracked').waypoint(function (direction) {
        if (direction === 'down') {
            var hash = $(this)[0].element.id;
            waypTracked(hash);
        }
    },{
        offset: '10%' 
    });

    $('.tracked').waypoint(function (direction) {
        if (direction === 'up') {
            var hash = $(this)[0].element.id;
            waypTracked(hash);
        }
    },{
        offset: '-50%'
    });

    $('.wayp-lists li a').on('click', function () {
        var scrollEl = $(this).attr('href');
        if ($(scrollEl).length != 0) {
            $('html, body').animate({
                scrollTop: $(scrollEl).offset().top + 1
            }, 500);
        }
        return false;
    });


    $('.go-to').on('click', function(){
        let scroll_el = $(this).attr('href');
        if ($(scroll_el).length != 0) {
            $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
        }
        return false;
    });


    $('.ytb-play').one('click', function() {
        setTimeout(() => {
            $(this).closest('.video-container').addClass('video-active');
        }, 300);
        let symbol = $("#video1")[0].src.indexOf("?") > -1 ? "&" : "?";
        $("#video1")[0].src += symbol + "autoplay=1";
        setTimeout(function(){
            $(window).trigger('resize').trigger('scroll');  
        }, 1000);
    });
    
    if($('.mainSlider').length) {
        const $mainSlider = $('.mainSlider')
        .slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            speed: 2500,
            autoplaySpeed: 5000,
            dots: false,
            autoplay: true
        })
        .on({
            beforeChange: function(event, slick, currentSlide, nextSlide) {
                $('.slick-slide', this).eq(currentSlide).addClass('preve-slide');
                $('.slick-slide', this).eq(nextSlide).addClass('slide-animation');
            },
            afterChange: function() {
                $('.preve-slide', this).removeClass('slide-animation preve-slide');
            }
        });
        $mainSlider.find('.slick-slide').eq(0).addClass('slide-animation');
    }

    if($('.slider-reviews').length) {
        $('.slider-reviews').slick({
            arrows: false,
            autoplay: true,
            dots: false,
            autoplayspeed: 4500,
            fade: true,
            infinite: true,
            speed: 1200,
            pauseOnHover: false
        });
    }  

    if($('.catalog-slider').length) {
        const sliderCatalog = new Swiper('.catalog-slider', {
            speed: 1200,
            loop: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false
            }
        });
    }

    if($('[data-youtube]').length) {
        $('[data-youtube]').youtube_background();
    }

    if($('.slider-product').length) {
        const sliderProduct = new Swiper('.slider-product', {     
            slidesPerView: 'auto',
            speed: 800,
            navigation: {
              nextEl: '.product-next',
              prevEl: '.product-prev',
            },
        });
    }


    if($('.slider-single-product').length) {
        const sliderSingleProduct = new Swiper('.slider-single-product', {     
            slidesPerView: '1',
            speed: 800,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            }
        });
    }
    
    const galleryOptions = {
        slidesPerView: 'auto',
        speed: 800,
        navigation: {
            nextEl: '.gallery-next',
            prevEl: '.gallery-prev',
        },
    }

    if($('.slider-gallery').length) {
        const sliderGallery = new Swiper('.slider-gallery', galleryOptions);
    }
    

    if (window.matchMedia('(max-width: 1023px)').matches) {
        if($('.team-img-slider').length) {
            const teamSlider = new Swiper('.team-img-slider', {     
                slidesPerView: 'auto',
                speed: 800,
                navigation: {
                  nextEl: '.team-next',
                  prevEl: '.team-prev',
                },
            });
        }
        if($('.slider-gallery-inner').length) {
            const sliderGalleryInner = new Swiper('.slider-gallery-inner', galleryOptions)
        }
    }

    if($('.cat-img-slider').length) {
        const catSlider = new Swiper('.cat-img-slider', {     
            slidesPerView: 'auto',
            speed: 800,
            loop: true,
            navigation: {
              nextEl: '.cat-next',
              prevEl: '.cat-prev',
            },
        });
    }

    
    $('[data-type="category"]').each(function() {
        let productCounter = 0;
        const currentCat = $(this);
        $(this).find('.product-item').each(function() {
            productCounter++;
            if(productCounter > 6) {
                currentCat.find('.show-more-product').addClass('active');
            }
        });
        $(this).find('[data-product="hidden"]').hide();
    });
   
    $('.show-more-product').on('click', function() {
        if($(this).hasClass('active')) {
            $(this).closest('[data-type="category"]').find('[data-product="hidden"').show();
            $(this).removeClass('active');
            $(this).text($(this).data('text-hidden'));
        } else {
            $(this).closest('[data-type="category"]').find('[data-product="hidden"').hide();
            $(this).addClass('active');
            $(this).text($(this).data('text-show'));
        }
    });

    $('.scroll-top').on('click', function() {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });

    $(window).on('scroll', function() {
        if ($('.footer').isInViewport()) {
           $('.contacts-menu').addClass('offset-bottom');
        } else {
            $('.contacts-menu').removeClass('offset-bottom');
        }
    });
    

    // Animation on scroll
    let wow = new WOW({
        offset: 0
    });

    wow.init();


    setInterval(() => { 
        $('.s-msg__rotate').addClass('active');
        setTimeout(() => {
            $('.s-msg__rotate').removeClass('active');
        }, 3000); 
    }, 13000);


    (function ( document, window, index ) {
        var inputs = document.querySelectorAll( '.inputfile' );
        Array.prototype.forEach.call( inputs, function( input ) {
            var label	 = input.nextElementSibling,
                labelVal = label.innerHTML;

            input.addEventListener( 'change', function( e )
            {
                var fileName = '';
                if( this.files && this.files.length > 1 )
                    fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
                else
                    fileName = e.target.value.split( '\\' ).pop();

                if( fileName )
                    label.querySelector( 'span' ).innerHTML = fileName;
                else
                    label.innerHTML = labelVal;
            });

            // Firefox bug fix
            input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
            input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
        });
    }( document, window, 0 ));


});


$(window).on('load', function() {
    function setSliderHeight() {
        let height = 0;
        $('.slider-vertical__item').each(function(idx, item) {
            const itemHeight = $(this).innerHeight();
            height += itemHeight;
        });
        $('.slider-vertical').css('height', height);   
    }    
    setSliderHeight();

    if($('.slider-vertical').length) {
        const sliderVertical = new Swiper('.slider-vertical', {
            direction: 'vertical',
            slidesPerView: 'auto',
            centeredSlides: true,
            loop: true,
            autoHeight: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            }
        });
    }

});


$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};


// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"

(function () {
    let originalPositions = [];
    let daElements = document.querySelectorAll('[data-da]');
    let daElementsArray = [];
    let daMatchMedia = [];
    //Заполняем массивы
    if (daElements.length > 0) {
        let number = 0;
        for (let index = 0; index < daElements.length; index++) {
            const daElement = daElements[index];
            const daMove = daElement.getAttribute('data-da');
            if (daMove != '') {
                const daArray = daMove.split(',');
                const daPlace = daArray[1] ? daArray[1].trim() : 'last';
                const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
                const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
                const daDestination = document.querySelector('.' + daArray[0].trim())
                if (daArray.length > 0 && daDestination) {
                    daElement.setAttribute('data-da-index', number);
                    //Заполняем массив первоначальных позиций
                    originalPositions[number] = {
                        "parent": daElement.parentNode,
                        "index": indexInParent(daElement)
                    };
                    //Заполняем массив элементов 
                    daElementsArray[number] = {
                        "element": daElement,
                        "destination": document.querySelector('.' + daArray[0].trim()),
                        "place": daPlace,
                        "breakpoint": daBreakpoint,
                        "type": daType
                    }
                    number++;
                }
            }
        }
        dynamicAdaptSort(daElementsArray);

        //Создаем события в точке брейкпоинта
        for (let index = 0; index < daElementsArray.length; index++) {
            const el = daElementsArray[index];
            const daBreakpoint = el.breakpoint;
            const daType = el.type;

            daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
            daMatchMedia[index].addListener(dynamicAdapt);
        }
    }
    //Основная функция
    function dynamicAdapt(e) {
        for (let index = 0; index < daElementsArray.length; index++) {
            const el = daElementsArray[index];
            const daElement = el.element;
            const daDestination = el.destination;
            const daPlace = el.place;
            const daBreakpoint = el.breakpoint;
            const daClassname = "_dynamic_adapt_" + daBreakpoint;

            if (daMatchMedia[index].matches) {
                //Перебрасываем элементы
                if (!daElement.classList.contains(daClassname)) {
                    let actualIndex = indexOfElements(daDestination)[daPlace];
                    if (daPlace === 'first') {
                        actualIndex = indexOfElements(daDestination)[0];
                    } else if (daPlace === 'last') {
                        actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
                    }
                    daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
                    daElement.classList.add(daClassname);
                }
            } else {
                //Возвращаем на место
                if (daElement.classList.contains(daClassname)) {
                    dynamicAdaptBack(daElement);
                    daElement.classList.remove(daClassname);
                }
            }
        }
        //customAdapt();
    }

    //Вызов основной функции
    dynamicAdapt();

    //Функция возврата на место
    function dynamicAdaptBack(el) {
        const daIndex = el.getAttribute('data-da-index');
        const originalPlace = originalPositions[daIndex];
        const parentPlace = originalPlace['parent'];
        const indexPlace = originalPlace['index'];
        const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
        parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
    }
    //Функция получения индекса внутри родителя
    function indexInParent(el) {
        var children = Array.prototype.slice.call(el.parentNode.children);
        return children.indexOf(el);
    }
    //Функция получения массива индексов элементов внутри родителя 
    function indexOfElements(parent, back) {
        const children = parent.children;
        const childrenArray = [];
        for (let i = 0; i < children.length; i++) {
            const childrenElement = children[i];
            if (back) {
                childrenArray.push(i);
            } else {
                //Исключая перенесенный элемент
                if (childrenElement.getAttribute('data-da') == null) {
                    childrenArray.push(i);
                }
            }
        }
        return childrenArray;
    }
    //Сортировка объекта
    function dynamicAdaptSort(arr) {
        arr.sort(function (a, b) {
            if (a.breakpoint > b.breakpoint) {
                return -1
            } else {
                return 1
            }
        });
        arr.sort(function (a, b) {
            if (a.place > b.place) {
                return 1
            } else {
                return -1
            }
        });
    }
    //Дополнительные сценарии адаптации
    function customAdapt() {
        //const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
}());


var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
        /* When an item is clicked, update the original select box,
        and the selected item: */
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);