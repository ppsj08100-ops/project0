const moveList = (list, direction) => {
    const item = list.firstElementChild;

    if (!item) return;

    const styles = window.getComputedStyle(list);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    const distance = item.getBoundingClientRect().width + gap;

    if (window.innerWidth > 1100) {
        const visibleItems = Math.max(1, Math.floor(list.parentElement.clientWidth / distance));
        const maximumIndex = Math.max(0, list.children.length - visibleItems);
        const currentIndex = Number(list.dataset.index || 0);
        const nextIndex = Math.min(Math.max(currentIndex + direction, 0), maximumIndex);

        list.dataset.index = String(nextIndex);
        list.style.transform = `translateX(${-distance * nextIndex}px)`;
        return;
    }

    list.scrollBy({
        left: distance * direction,
        behavior: 'smooth',
    });
};

const setSliderControls = () => {
    const sections = document.querySelectorAll('.ranking');

    sections.forEach((section) => {
        const list = section.querySelector('.promo-list, .live-list, .rank-list');
        const previousButton = section.querySelector('.arrow--left');
        const nextButton = section.querySelector('.arrow--right');

        if (!list || !previousButton || !nextButton) return;

        previousButton.addEventListener('click', () => {
            moveList(list, -1);
        });

        nextButton.addEventListener('click', () => {
            moveList(list, 1);
        });
    });
};

const fillPromotionCards = (wrapper, total) => {
    const cards = [...wrapper.children];

    if (!cards.length) return;

    for (let index = cards.length; index < total; index += 1) {
        const clone = cards[index % cards.length].cloneNode(true);
        wrapper.append(clone);
    }
};

const setPromotionSwiper = () => {
    const con1 = document.querySelector('.con1');
    const slider = con1?.querySelector('.promotion__list');
    const wrapper = slider?.querySelector('.swiper-wrapper');
    const previousButton = con1?.querySelector('.arrow--left');
    const nextButton = con1?.querySelector('.arrow--right');

    if (!slider || !wrapper || !previousButton || !nextButton || typeof Swiper === 'undefined') return;

    fillPromotionCards(wrapper, 13);

    new Swiper(slider, {
        loop: true,
        navigation: {
            nextEl: nextButton,
            prevEl: previousButton,
        },
        slidesPerGroup: 1,
        slidesPerView: 'auto',
        spaceBetween: 40,
        speed: 500,
    });
};

const setLiveSwiper = () => {
    const con2 = document.querySelector('.con2');
    const slider = con2?.querySelector('.live-now__list');
    const previousButton = con2?.querySelector('.arrow--left');
    const nextButton = con2?.querySelector('.arrow--right');

    if (!slider || !previousButton || !nextButton || typeof Swiper === 'undefined') return;

    new Swiper(slider, {
        loop: true,
        navigation: {
            nextEl: nextButton,
            prevEl: previousButton,
        },
        slidesPerGroup: 1,
        slidesPerView: 'auto',
        spaceBetween: 23,
        speed: 500,
    });
};

const setHeroSwiper = () => {
    const hero = document.querySelector('.hero-swiper');
    const pauseButton = hero?.querySelector('.hero__paging button');

    if (!hero || !pauseButton || typeof Swiper === 'undefined') return;

    const swiper = new Swiper(hero, {
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        loop: true,
        pagination: {
            el: '.hero__pagination',
            bulletActiveClass: 'is-active',
            bulletClass: 'hero__bullet',
            clickable: true,
        },
        speed: 800,
    });

    pauseButton.addEventListener('click', () => {
        const isPaused = pauseButton.classList.toggle('is-paused');

        if (isPaused) {
            swiper.autoplay.stop();
            pauseButton.setAttribute('aria-label', '재생');
            return;
        }

        swiper.autoplay.start();
        pauseButton.setAttribute('aria-label', '일시 정지');
    });
};

const formatTime = (value) => String(value).padStart(2, '0');

const setCountdown = () => {
    const timer = document.querySelector('.live__title strong');

    if (!timer) return;

    let remainingSeconds = (1 * 60 * 60) + (20 * 60) + 12;

    const updateTimer = () => {
        const hours = Math.floor(remainingSeconds / 3600);
        const minutes = Math.floor((remainingSeconds % 3600) / 60);
        const seconds = remainingSeconds % 60;

        timer.textContent = `${formatTime(hours)} : ${formatTime(minutes)} : ${formatTime(seconds)}`;
        remainingSeconds = Math.max(remainingSeconds - 1, 0);
    };

    updateTimer();
    window.setInterval(updateTimer, 1000);
};

const setNavigation = () => {
    const links = document.querySelectorAll('.header__nav a[href^="#"]');

    links.forEach((link) => {
        link.addEventListener('click', () => {
            links.forEach((item) => item.classList.remove('is-active'));
            link.classList.add('is-active');
        });
    });
};

const setTopButton = () => {
    const topButton = document.querySelector('.top');
    const hero = document.querySelector('.hero');
    const footer = document.querySelector('.footer');

    if (!topButton) return;

    const updateTopButton = () => {
        const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : 0;
        const buttonBottom = window.innerHeight - 103;
        const footerTop = footer ? footer.getBoundingClientRect().top : window.innerHeight;

        topButton.classList.toggle('is-hidden', window.scrollY < heroBottom);
        topButton.classList.toggle('is-footer', footerTop <= buttonBottom);
    };

    topButton.addEventListener('click', (event) => {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    });

    window.addEventListener('scroll', updateTopButton, { passive: true });
    window.addEventListener('resize', updateTopButton);
    updateTopButton();
};

const init = () => {
    setHeroSwiper();
    setPromotionSwiper();
    setLiveSwiper();
    setSliderControls();
    setCountdown();
    setNavigation();
    setTopButton();
};

(() => {
    init();
})();
