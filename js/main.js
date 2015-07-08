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
        //for (i = 0; i < locations.length; i++) {
        //    if (locations[i][1] =='undefined'){ description ='';} else { description = locations[i][1];}
        //    if (locations[i][2] =='undefined'){ telephone ='';} else { telephone = locations[i][2];}
        //    if (locations[i][3] =='undefined'){ email ='';} else { email = locations[i][3];}
        //    if (locations[i][4] =='undefined'){ web ='';} else { web = locations[i][4];}
        //    if (locations[i][7] =='undefined'){ markericon ='';} else { markericon = locations[i][7];}
        //    marker = new google.maps.Marker({
        //        icon: markericon,
        //        position: new google.maps.LatLng(locations[i][5], locations[i][6]),
        //        map: map,
        //        title: locations[i][0],
        //        desc: description,
        //        tel: telephone,
        //        email: email,
        //        web: web
        //    });
        //    link = '';     }
//
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

    $('.call-us').click(function(){
        $('body').addClass('opened');
    });

    $('.close-feedback').click(function(){
       $('body').removeClass('opened');
    });

    $(window).scroll(function(){
        var curScroll = $(window).scrollTop()+$(window).height();
        if(curScroll >= $('.third-section').offset().top){
            $('.third-section').addClass('started');
        }
        if(curScroll >= $('.map').offset().top){
            $('.map').addClass('started');
        }
        if(curScroll >= $('.fourth-section').offset().top){
            $('.fourth-section').addClass('started');
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

    if($.browser.mozilla){
        $('body').addClass('mozilla');
    }
});