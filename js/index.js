document.addEventListener('DOMContentLoaded', function() {
    history.scrollRestoration = "manual";
    
    const fixWidthConHeight = () => {
        const visualWidthCon = document.querySelector('#visual.section_01 .width_con');
        visualWidthCon.style.height = `${window.innerHeight}px`
    }

    // 초기 로드 시 높이 조정
    fixWidthConHeight();

    
    // resize event
    window.addEventListener('resize', function() {
        fixWidthConHeight();
        resize();
        raceContainerSize();
    });

    const scrollEvent = (scrollPos) => {
        const body = document.body;

        if(scrollPos < 1) {
            body.classList.add('top');
        } else {
            body.classList.remove('top');
        }
    }

    // scroll header
    let ticking = false;
    window.addEventListener('scroll', function() {
        if(!ticking) {
            window.requestAnimationFrame(function() {
                scrollEvent(window.scrollY);
                ticking = false;
            });
            ticking = true;
        }
    });


    // tablet menu
    let w_w = window.innerWidth;
    const hamburgerToggle = document.querySelectorAll('#header.sections.section_00 > .width_con > .nav_con > i, .nav_cover, .nav_con ul li a');

    hamburgerToggle.forEach((menu) => {
        menu.addEventListener('click', () => {
            resize();
            if(w_w < 1000) {
                document.documentElement.classList.toggle("open_menu");
            }
        });
    });

    // reize
    const resize = () => {
        w_w = window.innerWidth;
        if(w_w > 1000) {
            document.documentElement.classList.remove('open_menu');
        }
    };

    // races container
    const raceContainerSize = () => {
        // let tabBtnH = document.querySelector('#races.sections.section_04 > .width_con > ul.v_con > li.cells > ul.v_con > li.cells').offsetHeight;
        // let tabDescH = document.querySelector('#races.sections.section_04 > .width_con > ul.v_con > li.cells > .races_desc').offsetHeight;
        let cellsH = document.querySelector('#races.sections.section_04 > .width_con > ul.v_con > li.cells').offsetHeight;
        const characterBox = document.querySelector('#races.sections.section_04 > .width_con > ul.v_con > li.cells > .races_chtr_box');

        characterBox.style.height = `${cellsH}px`;
    };
    raceContainerSize();

    // races tab
    const threeRaces = () => {
        const racesTab = document.querySelectorAll('#races.sections.section_04 > .width_con > ul.v_con > li.cells > ul.v_con > li.cells');
        const titleCon = document.querySelectorAll('#races.sections.section_04 > .width_con > ul.v_con > li.cells > .races_desc > .title_con');
        const raceCtr = document.querySelectorAll('#races.sections.section_04 > .width_con > ul.v_con > li.cells > .races_chtr_box > .race_chtr');

        racesTab.forEach((element, index) => {
            element.addEventListener('click', (e) => {
                e.preventDefault();

                racesTab.forEach((ele) => {
                    ele.classList.remove('active');
                });

                titleCon.forEach((ele) => {
                    ele.classList.remove('active');
                });

                raceCtr.forEach((ele) => {
                    ele.classList.remove('active');
                });

                racesTab[index].classList.add('active');
                titleCon[index].classList.add('active');
                raceCtr[index].classList.add('active');
            });
        });
    };
    threeRaces();

    // mode tab
    const modesTab = () => {
        const modesTabList = document.querySelectorAll('#modes.sections.section_05 > .width_con > ul.v_con > li.cells > ul.tab_lists > li.tab');
        const modesContent = document.querySelectorAll('#modes.sections.section_05 > .width_con > ul.v_con > li.cells > .modes_con > .modes_box');

        modesTabList.forEach((element, index) => {
            element.addEventListener('click', (e) => {
                e.preventDefault();

                modesTabList.forEach((ele) => {
                    ele.classList.remove('active');
                });

                modesContent.forEach((ele) => {
                    ele.classList.remove('active');
                });

                modesTabList[index].classList.add('active');
                modesContent[index].classList.add('active');
            });
        });
    };
    modesTab();

    // show more toggle
    const showMoreToggle = () => {
        const showMoreBtn = document.querySelector('#news.sections.section_06 > .width_con > ul.v_con > li.cells > h4.toggle_btn');
        const newsBox = document.querySelectorAll('#news.sections.section_06 > .width_con > ul.v_con > li.cells > ul.v_con.one_con > li.cells');

        for(let i = 0; i < Math.min(4, newsBox.length); i++) {
            newsBox[i].style.display = 'block';
        }

        showMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();

            const hiddenNewsBox = Array.from(newsBox).filter(ele => getComputedStyle(ele).display === 'none');

            for(let i = 0; i < Math.min(4, hiddenNewsBox.length); i++) {
                hiddenNewsBox[i].style.display = 'block';
            }

            if(hiddenNewsBox.length <= 4) {
                showMoreBtn.style.display = 'none';
            }
        });
    };
    showMoreToggle();
});

window.onload = function() {
    document.documentElement.classList.remove('loading');
    setTimeout(() => {
        document.documentElement.classList.add('loading_animate_01');
            setTimeout(() => {
                document.documentElement.classList.remove('loading_animate_01', 'not_yet');
                setTimeout(() => {
                    document.querySelector('.logo_con').remove();
                    document.querySelector('canvas').remove();
                }, 2000);
            }, 3000);
    }, 4500);
}
