;(function(){
    var proSwiper = new Swiper('.home-banner-swiper', {
        loop: true,
        slidesPerView: 1,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        autoplay: {
            disableOnInteraction: false
        }
    });


    new Swiper('.item_swiper1', {
        loop: false,
        autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    })

    new Swiper('.item_swiper2', {
        loop: false,
        autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    })

    new Swiper('.item_swiper3', {
        loop: false,
        autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    })

    new Swiper('.item_swiper4', {
        loop: false,
        autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    })

})();