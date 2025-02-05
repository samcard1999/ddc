
let url = window.location.href;

// CUSTOM MOUSE
(function() {
    var cursor = document.querySelector(".cursor");
    var cursorLazy = document.querySelector(".cursor-lazy");
    var cInfo = document.querySelector(".c-info");
    var cursorActive = function cursorActive(event) {
        cursor.style.left = event.clientX + "px";
        cursor.style.top = event.clientY + "px";
        cursorLazy.style.left = event.clientX + "px";
        cursorLazy.style.top = event.clientY + "px";
        cInfo.style.left = event.clientX + "px";
        cInfo.style.top = event.clientY + "px";
    };
    window.addEventListener("mousemove", cursorActive);
})();

// ClASS CLENSER
$('.active').removeClass('active');
$('.c-wrap').removeClass('off');

// ------ CURSOR HOVER ----- //
// to turn curson off

$('[cursorOff]').on('mouseover mouseenter', function() {
$('.c-wrap').addClass('off');
});
$('[cursorOff]').on('mouseout mouseleave', function() {
$('.c-wrap').removeClass('off');
});

// IS WHITE (contents are too light for the cursor to contrast)
$('[white]').on('mouseover mouseenter', function() {
    $('.cursor').addClass('white');
});
$('[white]').on('mouseout mouseleave', function() {
    $('.cursor').removeClass('white');
});


// HoverIn a link
$('a').on('mouseover mouseenter', function() {
if ($(this).closest('div').is('[draggy]')) {
    $('.cursor').addClass('active');
    if (!(url.includes('/es')) || !(url.includes('lang=es'))) {
    $(this).attr('info', 'VIEW');}
    if ((url.includes('/es')) || (url.includes('lang=es'))) {
    $(this).attr('info', 'VER');}
    $('.c-info').text($(this).attr('info'));
} else if ($(this).attr('info') && $(this).attr('white')) {
    $('.cursor').addClass('white active');
    $('.c-info').addClass('active');
} else if ($(this).attr('white') || $(this).is('.button')
|| $(this).is('.left-slide') || $(this).is('.right-slide')) {
    $('.cursor').addClass('white active');
} else {
    $('.cursor').addClass('active');
}
});

// HoverOut a link
$('a').on('mouseout mouseleave', function() {
if ($(this).attr('info') && $(this).attr('white')) {
    $('.cursor').removeClass('active white');
    $('.c-info').removeClass('active');
} else if ($(this).attr('info')) {
    $('.cursor').removeClass('active');
    $('.c-info').removeClass('active');
} else if ($(this).attr('white') || $(this).is('.button') 
|| $(this).is('.left-slide') || $(this).is('.right-slide')) {
    $('.cursor').removeClass('active white');
    $('.c-info').removeClass('active');
} else {
    $('.cursor').removeClass('active');
    $('.c-info').removeClass('active');
}
});

// TRACK CONTROL
var track = document.querySelector('.body');
var trackWidth = track.offsetWidth / 2;

$('.right-slide').on('click', function() {
$(this).closest('.track-control').siblings('.track')
.animate({scrollLeft: $(this).closest('.track-control')
.siblings('.track').scrollLeft() + trackWidth}, 800);
});
$('.left-slide').on('click', function() {
$(this).closest('.track-control').siblings('.track')
.animate({scrollLeft: $(this).closest('.track-control')
.siblings('.track').scrollLeft() - trackWidth}, 800);
});
// TRACK CONTROL

// ---- FORM ---- //
$('[datepicker]').attr('type', 'datetime-local');
$('[read-only]').attr('readonly', '1');


var inputRequired = function() {

$('.f-field-wrap:has(> input:not([required])~span.required-ball)').find('span.required-ball').remove();
$('.f-field-wrap:has(> select:not([required])~span.required-ball)').find('span.required-ball').remove();
$('.f-field-wrap:has(> textarea:not([required])~span.required-ball)').find('span.required-ball').remove();
$('.f-field-wrap').has('div:has(>div input:not([required]))~span.required-ball').find('span.required-ball').remove();

$('input[required], textarea[required], select[required]').closest('.f-field-wrap').not(':has(>span.required-ball)')
.append('<span class="required-ball"info="Required Field"></span>');
$('[info]').on('mouseover mouseenter', function() {
$('.c-info').text($(this).attr('info'));
$('.c-info').addClass('active');
});
$('[info]').on('mouseout mouseleave', function() {
$('.c-info').removeClass('active');
});
}
inputRequired();

// HAS INFO
$('[info]').on('mouseover mouseenter', function() {
    $('.c-info').text($(this).attr('info'));
    $('.c-info').addClass('active');
});
$('[info]').on('mouseout mouseleave', function() {
    $('.c-info').removeClass('active');
});

// ------ CURSOR HOVER ----- //

$.urlParam = function(name) {
var results = new RegExp('[\?&]' + name + '=([^]*)').exec(window.location.href);
if (results == null) { return null; } else { return results[1] || 0; }
}

$('a[lang="en"]').each(function () {
var href = $(this).attr('href');
$(this).attr('href', href + '?lang=en');
});
$('a[lang="es"]').each(function () {
var href = $(this).attr('href');
$(this).attr('href', href + '?lang=es');
});

// ANIMATIONS HERE //




