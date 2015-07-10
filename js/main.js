$(document).ready(function(){
    function init() {
        var mapOptions = {
            center: new google.maps.LatLng(53.2225657,50.1905889),
            zoom: 14,
            zoomControl: false,
            disableDoubleClickZoom: true,
            mapTypeControl: false,
            scaleControl: false,
            scrollwheel: true,
            panControl: false,
            streetViewControl: false,
            draggable : true,
            overviewMapControl: true,
            overviewMapControlOptions: {
                opened: false,
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}],
        }
        var mapElement = document.getElementById('gmap');
        var map = new google.maps.Map(mapElement, mapOptions);
        var locations = [
            ['WiFiX', 'undefined', 'undefined', 'undefined', 'undefined', 53.2225657, 50.1905889, 'undefined']
        ];
        new google.maps.Marker({
            icon: "http://aruba.wifix.pro/img/pin.png",
            position: new google.maps.LatLng(53.2225657, 50.1905889),
            map: map
        })
    }
    init();

    $firstOffset = 0;
    $firstHeight = 0;
    $secondHeight = 0;
    $secondOffset =0;
    $thirdHeight = 0;
    $thirdOffset = 0;
    $fourthHeight = 0;
    $fourthOffset = 0;

    function onScroll(){
        var scrollPos = $(document).scrollTop()+60;
        $('.fixed .main-menu a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.fixed .main-menu a').removeClass("active");
                currLink.addClass("active");
            }
            else{
                currLink.removeClass("active");
            }
        });
    }

    function resize(){
        if($(window).width()<1070){
            $('body').addClass('mobile');
        }else{
            $('body').removeClass('mobile');
        }
    }

    resize();

    $(window).resize(function(){
        resize()
    });

    $('.call-us').click(function(){
        $('body').addClass('opened');
    });

    $('.dark').click(function(e) {
        if( e.target !== this )
            return;
        $('body').removeClass('opened');
    });

    $('.close-feedback').click(function(){
       $('body').removeClass('opened');
    });

    $(window).scroll(function(){
        var curScroll = $(window).scrollTop()+$(window).height();
        if(curScroll >= $('.third-section').offset().top){
            setTimeout(function(){
                $('.third-section').addClass('started');
            },1000);
        }
        if(curScroll >= $('.map').offset().top){
            $('.map').addClass('started');
        }
        if(curScroll >= $('.fourth-section').offset().top){
            setTimeout(function() {
                $('.fourth-section').addClass('started');
            },1000);
        }
        if($(window).scrollTop() >= $('.main-section').height()*0.75){
            $('.main-head.fixed').addClass('active');
        }else{
            $('.main-head.fixed').removeClass('active');
        }
        onScroll();
    });

    $("a[href^='#']").click(function(){
        var body = $("html, body");
        $this = $(this);
        $elem = $('[id='+$this.attr('href').substring(1)+']');
        body.animate({scrollTop:$elem.offset().top}, '500', 'swing', function(){});
    });

    if( navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ){
        $('body').addClass('mozilla');
    }

    $('#name').keyup(function(){
        if($('#name').val().length==0){
            $('.feedback-form').addClass('error-name');
            $('.feedback-form').removeClass('ok-name');
        }else{
            $('.feedback-form').removeClass('error-name');
            $('.feedback-form').addClass('ok-name');
        }
    });

    $('#phone').keyup(function(){
        if($(this).val().indexOf('_')==-1){
            $('.feedback-form').removeClass('error-phone');
            $('.feedback-form').addClass('ok-phone');
        }else{
            $('.feedback-form').addClass('error-phone');
            $('.feedback-form').removeClass('ok-phone');
        }
    });

    $('.feedback-button').click(function(e){
        $.get('/sendmail.php?phone='+$('#phone').val()+"&name="+$('#name').val(),function(data){
            console.log(data);
            $d = $.parseJSON(data);
            if($d.error=="null"){
                $('body').addClass('message-sent');
                setTimeout(function(){
                    $('body').removeClass('opened message-sent');
                    $('#phone').val('');
                    $('#name').val('');
                },2000);
            }else
            if($d.error=="name"){
                $('.feedback-form').addClass('error-name');
                $('.feedback-form').removeClass('ok-name');
            }else
            if($d.error=="phone"){
                $('.feedback-form').addClass('error-phone');
                $('.feedback-form').removeClass('ok-phone');
            }
        });
        e.preventDefault();
        return false;
    });

    $("#phone").mask("+7 999 999 9999");

});