function show_whatever(el, current_scroll, wh) {
    var el_offset_t = el.offset().top;
    if(current_scroll > el_offset_t - (wh * .66)) {
        el.parent().removeClass('wait_scroll');
        el.remove();
    }
}

var wh;
function scroll_effect(sc_y){
    wh =  $(window).height();
    $(".show_trigger").each(function(){
        show_whatever($(this), sc_y, wh);
    });
}

let ticking = false;
document.addEventListener('scroll', function(e) {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            scroll_effect(window.scrollY);
            ticking = false;
        });
        ticking = true;
    }
});