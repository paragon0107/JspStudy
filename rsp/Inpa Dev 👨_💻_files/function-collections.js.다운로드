//* ************************************* lazyload 로드 ************************************* */
let lazy_load = false;
async function load_lazy() {
    if (lazy_load) return;

    lazy_load = true;
    // await jsAsync('./images/lazysizes.min.js');
    await jsAsync('https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js');
    return;
}
/* ===================================== lazyload 로드 END ===================================== */

//* ************************************* 상단 가로 스크롤바 애니메이션 ************************************* */
function scrollIndicator(indicator) {
    window.addEventListener('scroll', function () {
        const winScroll = $(window).scrollTop();
        const height = $(document).outerHeight() - $(window).height();

        $(indicator).css('width', (winScroll / height) * 100 + '%');
    });
}
/* ===================================== 상단 가로 스크롤바 애니메이션 END ===================================== */

//* ************************************* 다크 모드 변환 ************************************* */
function switchTheme(el = 'html', attr = 'data-theme') {
    const TTDARK = $(el).attr(attr) === 'dark' ? 'Y' : 'N';

    localStorage.TTDARK = TTDARK === 'Y' ? 'N' : 'Y';
    $('html').attr('data-theme', TTDARK === 'Y' ? 'light' : 'dark');

    if (TTDARK === 'N')
        alert(
            '다크 모드 기능은 현재 미완성된 상태입니다.\n색감 불일치 현상이 일어날수 있으니, 번거롭더라도 라이트 모드를 이용해주시길 바랍니다.',
        );
}
/* ===================================== 다크 모드 변환 END ===================================== */

//* ************************************* 상단 nav 아이콘 스크립트 ************************************* */
function topNav() {
    try {
        const clickEvent = new Event('click', { bubbles: true });

        // 댓글 갯수
        let rpNum = 0;
        rpNum += document.querySelectorAll('.rp-list.comments > ol > li').length;
        rpNum += document.querySelectorAll('.rp-list.comments > ol > li > ol > li').length;
        document.querySelector('#rpNum').textContent = rpNum;

        // 하트 갯수
        let heartNum = 0;
        heartNum += document.querySelector('.txt_like.uoc-count').textContent;
        heartNum = parseInt(heartNum, 10);

        const $heartNum = document.querySelector('#heartNum');
        $heartNum.textContent = heartNum;
        const $heartNum2 = document.querySelector('#heartNum2');
        $heartNum2.querySelector('p').textContent = heartNum;

        // 하트 클릭 이벤트
        function clickHeart() {
            document.querySelector('button.btn_post.uoc-icon').dispatchEvent(clickEvent);

            if (document.querySelector('div.like_on')) {
                $heartNum.textContent = parseInt($heartNum.textContent, 10) - 1;
                $heartNum2.querySelector('p').textContent = parseInt($heartNum2.querySelector('p').textContent, 10) - 1;
            } else {
                $heartNum.textContent = parseInt($heartNum.textContent, 10) + 1;
                $heartNum2.querySelector('p').textContent = parseInt($heartNum2.querySelector('p').textContent, 10) + 1;
            }
        }
        $heartNum.parentNode.addEventListener('click', function (e) {
            e.preventDefault();

            clickHeart();
        });
        $heartNum2.addEventListener('click', function (e) {
            e.preventDefault();

            clickHeart();
        });
    } catch (err) {
        console.log(err);
    }
}
/* ===================================== 상단 nav 아이콘 스크립트 END ===================================== */

//* ************************************* 검색 아이콘 클릭하면 focus ************************************* */
function focusSearchModal() {
    try {
        document.querySelectorAll('.searchButton').forEach((el) => {
            el.addEventListener('click', function () {
                document.querySelector('#__sidebar').classList.remove('opened');
                // 서치 모달이 display none되어있어서 나타나는동안 지연을 줌
                setTimeout(() => {
                    document.querySelector('#search').focus();
                }, 650);
            });
        });
    } catch (err) {
        console.log('검색 아이콘 클릭하면 focus : ', err);
    }
}
/* ===================================== 검색 아이콘 클릭하면 focus END ===================================== */

//* ************************************* 구독 카드 ************************************* */
function subCard() {
    try {
        function hiding() {
            lessIndex();
            document.querySelector('#hide').setAttribute('checked', true);
        }
        function lessIndex() {
            setTimeout(function () {
                document.querySelector('.container25').style.display = 'none';
            }, 1000);
        }

        const clickEvent = new Event('click', { bubbles: true });
        const isSub = document
            .querySelector('.screen_out + .btn_tool > .btn_subscription')
            .classList.contains('following');
        console.log('sub? : ', isSub);

        if (!isSub) {
            setTimeout(function () {
                // 몇 초 지난뒤 구독 카드 나오는 모션
                document.querySelector('.container25').style.display = 'inline-block';

                document.querySelector('#subButton').addEventListener('click', function () {
                    setTimeout(function () {
                        if (!document.querySelector('#hide:checked')) hiding();
                    }, 250);
                });

                document.querySelector('.container25 label i').addEventListener('click', function () {
                    lessIndex();
                });

                // 11초 지난뒤 구독 카드 사라짐
                setTimeout(function () {
                    if (!document.querySelector('#hide:checked')) hiding();
                }, 11000);
            }, 2000);
        }
    } catch (err) {
        console.log('구독 카드 오류 : ', err);
    }
}
/* ===================================== 구독 카드 END ===================================== */

//* ************************************* 커스텀 sweet alert ************************************* */
function mySweetAlert() {
    // 하트 메세지
    document.querySelectorAll('.container_postbtn .postbtn_like .wrap_btn[id^=reaction-]').forEach((el) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 3500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer);
                toast.addEventListener('mouseleave', Swal.resumeTimer);
            },
        });

        el.addEventListener('click', function (e) {
            if (e.currentTarget.querySelector('.btn_post > .uoc-icon').classList.contains('like_on')) {
                Toast.fire({
                    icon: 'error',
                    title: '공감이 취소되었습니다. ❌',
                });
            } else {
                Toast.fire({
                    icon: 'success',
                    title: '공감해주셔서 감사합니다. ❤️',
                });
            }
        });
    });

    // 구독 메세지
    try {
        const isSub = document
            .querySelector('.screen_out + .btn_tool > .btn_subscription')
            .classList.contains('following');
        if (isSub) {
            document.querySelector('.tit_xs.my_follow_btn').textContent = '구독중';
        }

        const $following = document.querySelector('.screen_out + .btn_tool > .btn_subscription');
        const clickEvent = new Event('click', { bubbles: true });
        const $subbutton1 = document.querySelector('.tit_xs.my_follow_btn');
        // 하단 구독좋아요 섹션
        document.querySelector('.MP_insight_page .post_smBtn .btn_bg').addEventListener('click', function (e) {
            const isSub = $following.classList.contains('following');
            if (isSub) {
                Swal.fire({
                    title: '정말로 구독을 취소하실 껀가요? 😭',
                    text: '다시 한번만 더 생각해 주세요!',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: 'rgb(50,205,50)',
                    confirmButtonText: '네 구독을 취소합니다',
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire('구독 취소!', '구독이 취소되었습니다. 🔕', 'error');
                        $following.dispatchEvent(clickEvent);
                        $subbutton1.textContent = '구독하기';
                        console.log('구독취소');
                    }
                });
            } else {
                Swal.fire('구독 성공!', '구독 감사합니다. 🔔', 'success');
                $following.dispatchEvent(clickEvent);
                $subbutton1.textContent = '구독중';
                console.log('구독완료');
            }
        });

        // 구독 사이드 카드
        document.getElementById('subButton').addEventListener('click', function (e) {
            const isSub = $following.classList.contains('following');
            if (isSub) {
            } else {
                Swal.fire('구독 성공!', '구독 감사합니다. 🔔', 'success');
                $following.dispatchEvent(clickEvent);
                $subbutton1.textContent = '구독중';
                console.log('구독완료');
            }
        });
    } catch (e) {
        console.log('이 글이 좋으셨다면 구독&좋아요 섹션 카드 : ', e);
    }
}
/* ===================================== 커스텀 sweet alert END ===================================== */

//* ************************************* bootstrap5 nav hover 등록 ************************************* */
function bootstrapNavHover() {
    document.querySelectorAll('.dropdown').forEach((e) => {
        const $button = e.querySelector('.dropdown-toggle');
        const $menu = e.querySelector('.dropdown-menu');

        e.addEventListener('mouseover', function (event) {
            if (!$button.classList.contains('show')) {
                $button.classList.add('show');
                $button.setAttribute('aria-expanded', 'true');
                $menu.classList.add('show');
                $menu.setAttribute('data-bs-popper', 'true');
            }
        });

        e.addEventListener('mouseout', function (event) {
            if ($button.classList.contains('show')) {
                $button.classList.remove('show');
                $button.setAttribute('aria-expanded', 'false');
                $menu.classList.remove('show');
                $menu.setAttribute('data-bs-popper', 'false');
            }
        });
    });

    document.querySelectorAll('.dropend').forEach((e) => {
        const $button = e.querySelector('.dropdown-toggle');
        const $menu = e.querySelector('.dropdown-menu');

        e.addEventListener('mouseover', function (event) {
            if (!$button.classList.contains('show')) {
                $button.classList.add('show');
                $button.setAttribute('aria-expanded', 'true');
                $menu.classList.add('show');
                $menu.setAttribute('data-bs-popper', 'true');
            }
        });

        e.addEventListener('mouseout', function (event) {
            if ($button.classList.contains('show')) {
                $button.classList.remove('show');
                $button.setAttribute('aria-expanded', 'false');
                $menu.classList.remove('show');
                $menu.setAttribute('data-bs-popper', 'false');
            }
        });
    });
}
/* ===================================== bootstrap5 nav hover 등록 END ===================================== */

//* ************************************* 페이지 전환 효과 ************************************* */
function isSameAsLocation(uriString) {
    let bool = false;
    const uri = new URL(uriString);
    // 오리진, 경로가 현재 url과 같고 해시 태그가 있을 경우
    if (uri.origin === window.location.origin && uri.pathname === window.location.pathname && uri.hash !== '') {
        bool = true;
    }

    return bool;
}

function pageTransition(nodeList) {
    nodeList.forEach((node) => {
        // if (!(node instanceof HTMLAnchorElement)) return;

        const { href } = node;
        if (!href || node.target === '_blank' || isSameAsLocation(href)) return;

        node.addEventListener('click', (event) => {
            // event.preventDefault();

            const $loader = document.getElementById('__loader');
            $loader.style.display = 'block';
            $loader.classList.remove('fade-out-box');
            $loader.classList.add('fade-in-box');

            // window.location.href = href;
        });
    });
}
/* ===================================== 페이지 전환 효과 END ===================================== */

//* *************************************  ************************************* */

/* =====================================  END ===================================== */

//* *************************************  ************************************* */

/* =====================================  END ===================================== */

/* *********** 폰트 아이콘 로드 *********** */
// let loadiconfont = false;
// function loadIconFont() {
// 	if(!loadiconfont) {
// 		loadiconfont = true;
// 		cssAsyncStatic("./images/fontAwesomePro5.css", 'fa_pro'); // font-awesome
// 		cssAsyncStatic("https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css", 'devicon'); // Devicon
// 	}

// 	return;
// }

/* *********** 검색모달 돋보기 버튼 누르면 폰트어웨썸 로드 *********** */
// document.querySelectorAll('[data-bs-target="#modal-search-bar-2"]').forEach(el => {
// 	el.addEventListener('click', () => {
// 		loadIconFont();
// 	}, {once: true});
// });
