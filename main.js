const callAppend = _.appId(_.key()).id;

$(document).ready(function(){
    getLocation();
});

var getLocation = function() {
        if(navigator.geolocation) {
            var geolocation = navigator.geolocation;
            geolocation.getCurrentPosition(defineLocation);
        }
        else {

        }
    }

var defineLocation = function(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    var background = {
                jpg: '',
                webM: '',
                mp4: ''
            };
    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5//weather?lat=' + lat + '&lon=' + long + callAppend,
        success: function(json) {
            if($('.app-info h1').length) {
                $('.app-info h1, .app-info h2, .details-block, .fullscreen-bg').remove();
            }
            var currentJson = json;
            weatherBackground(currentJson, background);
            $('.app-info').prepend(templates.weatherBlock.render({
                city: currentJson.name,
                description: _.titleCase(currentJson.weather[0].description)
            }));
            $('body').append(templates.vidBG.render({
                        jpg: background.jpg,
                        webM: background.webM,
                        mp4: background.mp4
                    }));
            $.ajax({
                url: 'http://api.openweathermap.org/data/2.5//forecast/daily?id=' + currentJson.id + callAppend,
                success: function(json) {
                    var forcastJson = json;
                    renderWeatherDetails(currentJson, forcastJson, $('.met-imp-toggle'));
                    $('.met-imp-toggle').click(function() {
                        renderWeatherDetails(currentJson, forcastJson, $('.met-imp-toggle'));
                    });
                }
            });
        }
    });
    updateWeatherDetails(position, background);
}

var renderWeatherDetails = function(currentJson, forcastJson, toggle) {
    if($('.temp').length) {
        $('.temp').remove();
        $('.range-container').remove();
    }
    $('.details-block').append(templates.weatherDetails.render({
            temp: whichTemp(currentJson.main.temp, toggle),
            high: whichTemp(forcastJson.list[0].temp.max, toggle),
            low: whichTemp(forcastJson.list[0].temp.min, toggle)
        }));
}

var whichTemp = function(temp, toggle) {
    var cel = (temp - 273.15).toFixed(0);
    var fah = ((cel * 1.8) + 32).toFixed(0);
    var celDisplay = cel  + String.fromCharCode(176) + 'C';
    var fahDisplay = fah + String.fromCharCode(176) + 'F';
    if(toggle.is(':checked')) {
        return fahDisplay;
    }
    else {
        return celDisplay;
    }
}

var weatherBackground = function(json, background) {
    switch(json.weather[0].description) {
        /*case 'clear sky':
            background.jpg = '';
            background.webm = '';
            background.mp4 = '';
            break;*/
        case 'few clouds':
            background.jpg = 'https://thumbs.gfycat.com/PlumpWeeklyHornedtoad-poster.jpg';
            background.webm = 'https://fat.gfycat.com/PlumpWeeklyHornedtoad.webm';
            background.mp4 = 'https://giant.gfycat.com/PlumpWeeklyHornedtoad.mp4';
            break;
        case 'broken clouds':
            background.jpg = 'https://thumbs.gfycat.com/SecondhandCarelessDassierat-poster.jpg';
            background.webm = 'https://fat.gfycat.com/SecondhandCarelessDassierat.webm';
            background.mp4 = 'https://giant.gfycat.com/SecondhandCarelessDassierat.mp4';
            break;
        case 'scattered clouds':
            background.jpg = 'https://thumbs.gfycat.com/NeedyNextHornet-poster.jpg';
            background.webm = 'https://fat.gfycat.com/NeedyNextHornet.webm';
            background.mp4 = 'https://giant.gfycat.com/NeedyNextHornet.mp4';
            break;
        case 'shower rain':
            background.jpg = 'https://thumbs.gfycat.com/ImpressiveAnyArizonaalligatorlizard.jpg';
            background.webm = 'https://fat.gfycat.com/ImpressiveAnyArizonaalligatorlizard.webm';
            background.mp4 = 'https://giant.gfycat.com/ImpressiveAnyArizonaalligatorlizard.mp4';
            break;
        case 'rain':
            background.jpg = 'https://thumbs.gfycat.com/YellowFlickeringDogwoodtwigborer-poster.jpg';
            background.webm = 'https://giant.gfycat.com/YellowFlickeringDogwoodtwigborer.webm';
            background.mp4 = 'https://giant.gfycat.com/YellowFlickeringDogwoodtwigborer.mp4';
            break;
        case 'light rain':
            background.jpg = 'https://thumbs.gfycat.com/CriminalInbornAustrianpinscher-poster.jpg';
            background.webm = 'https://zippy.gfycat.com/CriminalInbornAustrianpinscher.webm';
            background.mp4 = 'https://giant.gfycat.com/CriminalInbornAustrianpinscher.mp4';
            break;
        case 'thunderstorm':
            background.jpg = 'https://thumbs.gfycat.com/VacantCompleteGorilla.jpg';
            background.webm = 'https://giant.gfycat.com/VacantCompleteGorilla.webm';
            background.mp4 = 'https://giant.gfycat.com/VacantCompleteGorilla.mp4';
            return 'https://giant.gfycat.com/VacantCompleteGorilla.gif'
            break;
        case 'snow':
            background.jpg = 'https://thumbs.gfycat.com/AcrobaticFriendlyAfricanmolesnake-poster.jpg';
            background.webm = 'https://giant.gfycat.com/AcrobaticFriendlyAfricanmolesnake.webm';
            background.mp4 = 'https://giant.gfycat.com/AcrobaticFriendlyAfricanmolesnake.mp4';
            break;
        case 'mist':
            background.jpg = 'https://thumbs.gfycat.com/DisgustingScrawnyEquine-poster.jpg';
            background.webm = 'https://giant.gfycat.com/DisgustingScrawnyEquine.webm';
            background.mp4 = 'https://giant.gfycat.com/DisgustingScrawnyEquine.mp4';
            break;
        default:
            background.jpg = 'https://thumbs.gfycat.com/HomelyImperfectCapeghostfrog-poster.jpg';
            background.webM = 'https://giant.gfycat.com/HomelyImperfectCapeghostfrog.webm';
            background.mp4 = 'https://giant.gfycat.com/HomelyImperfectCapeghostfrog.mp4';
    }
}

var updateWeatherDetails = function(position, background) {
        setTimeout(function() {
            defineLocation(position);
        }, 600000);
}