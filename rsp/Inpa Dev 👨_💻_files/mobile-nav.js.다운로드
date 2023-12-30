if (ismobile) {
    document.querySelector('#boot_header').style.display = 'none';
    document.querySelector('#__nav').style.display = 'flex';
}
if (isarticle) {
    document.querySelectorAll('.posticon').forEach((el) => {
        el.classList.remove('hidden');
    });
}

// 991vw 보다 낮으면 모바일 반응형 nav를 태블릿용으로 설정
const $nav = document.querySelector('#__nav');
if (!ismobile && window.innerWidth <= 991) {
    $nav.classList.add('tabletnav'); // 태블릿 전용 클래스
    $nav.style.display = 'flex';
}

let timer = null;
!ismobile &&
    window.addEventListener('resize', function () {
        clearTimeout(timer);
        timer = setTimeout(function () {
            //console.log(window.innerWidth);
            if (window.innerWidth <= 991) {
                $nav.classList.add('tabletnav'); // 태블릿 전용 클래스스
                $nav.style.display = 'flex';
            } else {
                $nav.style.display = 'none';
            }
        }, 300);
    });

// 모바일 nav바 언제 스크롤해서 나타날지
function mobileHeaderSticky(target, context, cls) {
    const $target = $(target);
    const $context = $(context);

    if ($context.length) {
        const contextOffsetTop = $context.offset().top;
        return () => (window.pageYOffset >= contextOffsetTop ? $target.addClass(cls) : $target.removeClass(cls));
    }

    $target.addClass(cls);

    return () => {};
}

let mobileNav;
if (isarticle) {
    mobileNav = mobileHeaderSticky('#__nav', '#h1_ani > h1.title', 'sticky');
} else if (ishome) {
    mobileNav = mobileHeaderSticky('#__nav', 'h2.display-5.header.counting_h2', 'sticky');
} else if (iscategory) {
    mobileNav = mobileHeaderSticky('#__nav', '#hash22', 'sticky');
} else if (isguestbook) {
    mobileNav = mobileHeaderSticky('#__nav', '#__guestbook', 'sticky');
}
window.addEventListener('scroll', mobileNav, { passive: true });
