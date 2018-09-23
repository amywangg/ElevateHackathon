//   adjustable sidenav
var min = 80, minbot = 0;
var max = 3600, maxbot = -396;
var mainmin = 200;

$('#split-bar').mousedown(function (e) {
    e.preventDefault();
    $(document).mousemove(function (e) {
        e.preventDefault();
        var x = e.pageX - $('.sidenav').offset().left;
        if (x > min && x < max && e.pageX < ($(window).width() - mainmin)) {
            $('.sidenav').css("width", x);
            $('#mainNav').css("width", x);
            $('#collapseNav').css("width", x);
            $('#split-bar-bottom').css("width", x);
            $('#content').css("margin-left", x);
        }
        if (x < 190) {
            $('#navTable').hide();
            $('.treeview').height('calc(100% - 80px)')
            $('.imgDrop').fadeIn('fast');
            $('#split-bar-bottom').fadeOut('fast');
            $('.showLess').fadeOut('fast');
        } else {
            $('#navTable').fadeIn('slow');
            $('.treeview').height('797px')
            $('.imgDrop').fadeOut('fast');
            $('#split-bar-bottom').fadeIn('slow');
            $('.showLess').fadeIn('slow');
        }
    })
});

$('#split-bar-bottom').mousedown(function (e) {
    e.preventDefault();
    $(document).mousemove(function (e) {
        e.preventDefault();
        var y = $('#mainNav').offset().top - e.pageY;
        console.log(y)
        if (y < minbot && y > maxbot) {
            console.log(y)
            $('#mainNav').css("height", y);
            $(this).css("bottom", y)
        }
    })
});

$(document).mouseup(function (e) {
    $(document).unbind('mousemove');
});

function show(element, text) {
    $(element).toggle("slow")
}

// disallow use of spacebar for key value pairs
function AvoidSpace(event) {
    var k = event ? event.which : window.event.keyCode;
    if (k == 32) return false;
}

// Function for selecting buttons on bottom main nav
function selectNav(e, e2){
$(e).toggleClass('active');
$('.navTr').not(e).removeClass('active');
$(e2).toggleClass('active');
$('.iNav').not(e2).removeClass('active');
}

// functions & variables for showing/hiding main navigation items
var shown = 4, botBar = 0, treeHeight=300;//0-4
function showLess() {
    if (shown >= 0) {
        $('#n' + shown).fadeOut('slow');
        $('#s' + shown).fadeIn('slow');
        treeHeight -= 34;
        // increase treeview height
        $('.treeview').css('height','calc(100% - ' + treeHeight + 'px)');
        shown -= 1;
    }
}
function showMore() {
    if (shown < 4) {
        shown += 1;
        $('#n' + shown).fadeIn('slow');
        $('#s' + shown).fadeOut('slow');
        treeHeight += 34;
        // increase treeview height
        $('.treeview').css('height','calc(100% - ' + treeHeight + 'px)');
    }
}

