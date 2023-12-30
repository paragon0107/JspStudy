//* *********** Sidebar script 최적화 로드 *********** */
let side_load = false;
async function loadSideScipt() {
    if (side_load) return;
    side_load = true;

    // 폰트 로드 대기
    //loadIconFont();

    // 사이드바 스크립트 대기
    sidebarscript();

    // 카테고리 접기 펼치기
    function categoryAccordion() {
        $('.tt_category .category_list > li').has('ul').addClass('cat-sub-menu');
        $('.cat-sub-menu .link_item').addClass('cat-toggle');

        $('.cat-toggle').on('click', function (event) {
            event.preventDefault();

            const c = $(this).parent('li');
            c.children('ul').slideToggle(250);
            c.toggleClass('uk-open');
        });
    }

    // 현재 카테고리는 펼치기
    function openedColor() {
        try {
            if (iscategory) {
                const cat = new URL(location.href).pathname.split('/')[2];
                const sub = new URL(location.href).pathname.split('/')[3];
                console.log(cat, sub);

                [...document.querySelectorAll('ul.category_list > li')].some((el) => {
                    //console.log(el.querySelector('a').href.split('/'));

                    if (el.querySelector('a')?.href.split('/')[4] == cat) {
                        $(el).children('ul').slideToggle();
                        $(el).toggleClass('uk-open');

                        return true;
                    }
                });
            }
        } catch (err) {
            console.log('사이드바 스크립트 에러 : ', console.log(err));
        }
    }

    function toggleSidebar() {
        // 왼쪽 사이드바 열고/닫기
        const $sidebar = document.getElementById('__sidebar');
        document.querySelectorAll('.openSide').forEach((el) => {
            el.addEventListener('click', () => {
                // console.log("왼쪽 사이드바 열고/닫기")
                $sidebar.classList.toggle('opened');
            });
        });

        // 마스크 사이드바
        document.getElementById('side-mask').addEventListener('click', () => {
            if ($sidebar.classList.contains('opened')) {
                $sidebar.classList.toggle('opened');
            }
        });
    }

    /* 사이드바 Category 접기/펼치기 구현 */
    if (H.skinOptions.foldableCategory) {
        const $subCategory = $('.tt_category .sub_category_list');

        if ($subCategory.length) {
            $subCategory.prev('.link_item').append('<i class="fas fa-chevron-down"></i>');
            $subCategory.slideUp();
        }

        categoryAccordion(); // 카테고리 접기 펼치기
        openedColor(); // 현재 카테고리화면 사이드바 자동 열림 설정
        toggleSidebar(); // 사이드바 토글 스크립트
    }

    // 스켈레톤 ui 없애기
    setTimeout(() => {
        document.querySelector('#sidemenu').classList.remove('hidden');
        document.querySelector('#sidemenu_skeleton').classList.add('hidden');
    }, 150);
}

//* *********** 사이드바스크립트, 폰트로드 최적화 이벤트 등록 *********** */
function load_script_event() {
    if (window.innerWidth >= mediaWidth) {
        loadSideScipt();
    } else {
        document.querySelectorAll('.openSide').forEach((el) => {
            el.addEventListener(
                'click',
                () => {
                    // side_load가 로드되지 않는다면 일시적으로 토글 이벤트 한번만 부여
                    if (!side_load) document.getElementById('__sidebar').classList.add('opened');
                    loadSideScipt();
                },
                { once: true },
            );
        });
        document.querySelectorAll('.dropdown-toggle').forEach((el) => {
            el.addEventListener(
                'mouseover',
                () => {
                    loadSideScipt();
                },
                { once: true },
            );
        });
    }

    // 리사이징 최적화 스크립트
    let timer2 = null;
    window.addEventListener('resize', function () {
        clearTimeout(timer2);
        timer2 = setTimeout(function () {
            if (window.innerWidth >= mediaWidth) {
                loadSideScipt();
            }
        }, 300);
    });
}

//* *********** 사이드바 스크립트 *********** */
function sidebarscript() {
    try {
        function insertIconTag($item) {
            const txt = $item.textContent
                .toLowerCase()
                .replace(/\s|[\(\d\)]/g, '')
                .trim();

            const bool = categoryObj[txt] ? true : false;

            if (bool) {
                $item.insertAdjacentHTML('afterbegin', categoryObj[txt]);
            } else {
                if ($item.classList.contains('link_item')) {
                    $item.insertAdjacentHTML('afterbegin', '<i class="fas fa-book"></i>');
                } else if ($item.classList.contains('link_sub_item')) {
                    $item.insertAdjacentHTML('afterbegin', '<i class="fas fa-paperclip"></i>');
                }
            }
        }

        /* 분류 전체보기 텍스트 변경 */
        const num = document.querySelector('#sidemenu .link_tit .c_cnt').textContent;
        const $root = document.querySelector('#sidemenu .link_tit');
        $root.textContent = `ROOT ${num}`;
        $root.classList.add('text-gradient2');

        /* 사이드바 글갯수 꾸미기 */
        document.querySelectorAll('.c_cnt').forEach((el) => {
            const txt = el.textContent.replace('(', '').replace(')', '');
            el.textContent = txt;
        });

        /* 사이드바 아이콘 생성 */
        document.querySelectorAll('#sidemenu .category_list > li a').forEach((el) => {
            insertIconTag(el);
        });

        /* 사이드바 a hover underline 효과 */
        document.querySelectorAll('#sidemenu .link_item').forEach((el) => {
            el.classList.add('link-both-underline');
        });

        /* 사이드바 목록 구분 제목 */
        const dot_template = (title) => `
						<li class="nav-item mt-2 sidebar-title text-truncate small category_doc">
							<i class="far fa-ellipsis-h"></i>
							<span>${title}</span>
						</li>
				`;
        document.querySelectorAll('#sidemenu .category_list > li').forEach((el, i) => {
            if (i === 0) {
                el.insertAdjacentHTML('beforebegin', dot_template('Programming'));
            } else if (i === 5) {
                el.insertAdjacentHTML('beforebegin', dot_template('Framework'));
            } else if (i === 8) {
                el.insertAdjacentHTML('beforebegin', dot_template('DATA'));
            } else if (i === 10) {
                el.insertAdjacentHTML('beforebegin', dot_template('DevOps'));
            } else if (i === 14) {
                el.insertAdjacentHTML('beforebegin', dot_template('Cloud'));
            } else if (i === 15) {
                el.insertAdjacentHTML('beforebegin', dot_template('Knowledge'));
            } else if (i === 19) {
                el.insertAdjacentHTML('beforebegin', dot_template('Dev Kit'));
            } else if (i === 21) {
                el.insertAdjacentHTML('beforebegin', dot_template('TEST'));
            } else if (i === 23) {
                el.insertAdjacentHTML('beforebegin', dot_template('ETC'));
            }
        });

        // 상단nav 아이콘 처리 #boot_header .dropdown-menu .dropdown-header
        document.querySelectorAll('#boot_header .dropdown-menu .dropdown-item').forEach((el) => {
            insertIconTag(el);
        });
    } catch (err) {
        console.log(err);
    }
}
