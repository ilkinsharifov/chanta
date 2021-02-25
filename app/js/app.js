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
            $('.header__inner').addClass('sidebar-btn');
            $('.wayp-lists').addClass('wayp-lists-black');
        } else {
            $('.header__inner').removeClass('sidebar-btn');
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
                scrollTop: $(scrollEl).offset().top
            }, 500);
        }
        return false;
    });

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

    // $('.slider-product').slick({
    //     arrows: true,
    //     slidesToShow: 2,
    //     centerMode: true,
    //     variableWidth: true,
    //     infinite: false,
    //     responsive: [
    //         {
    //             breakpoint: 992,
    //             settings: {
    //                 slidesToShow: 2,
    //                 variableWidth: false,
    //                 centerMode: true,
    //                 centerPadding: '29px'
    //             }
    //         },
    //         {
    //             breakpoint: 767,
    //             settings: {
    //                 slidesToShow: 1,
    //                 centerMode: true,
    //                 variableWidth: false,
    //                 centerPadding: '29px'
    //             }
    //         }
    //     ]
    // });


    let slideOffsetLeft = ($(window).height() / 900) * 240;

    if (window.matchMedia("(max-width: 1023px), (min-width: 1024px) and (max-width: 1025px) and (min-height: 800px)").matches) {
        slideOffsetLeft = 0;
    }

    const swiper = new Swiper('.swiper-container', {     
        slidesPerView: 'auto',
        slidesOffsetBefore: slideOffsetLeft,
        speed: 800,
        navigation: {
          nextEl: '.product-next',
          prevEl: '.product-prev',
        },
      });

    $('.slider-gallery').slick({
        arrows: true,
        slidesToShow: 1,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    });


    // Animation on scroll
    let wowConfig = {
        offset: 250
    }
    if (window.matchMedia('(max-width: 991px)').matches) {
        wowConfig = {
            offset: 100
        }
    }

    let wow = new WOW(wowConfig);

    wow.init();


});


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


