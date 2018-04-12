jQuery(function(){
    //code here
    var lat;
    var lon;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            var url = "https://fcc-weather-api.glitch.me/api/current?lon=" + lon + "&lat=" + lat;
            console.log(url);
            $.getJSON(url, function (data) {
                var weather= data.weather[0].icon;
                var celcius= Math.floor(data.main.temp);
                var humidity=data.main.humidity;
                var wind=data.wind.speed;
                var country=data.sys.country;
                //var Fare=celcius × 9/5 + 32;
                var tempswap=false;
                var FareTemp=celcius*9/5+32;


                $("#icon").css("background-image","url("+weather+")");
                $("#temp").html("Current Temp : "+celcius +" C");
                $("#hum").html("Max Humidity : "+ humidity +" %");
                $("#wind").html("Wind Speed : " + wind    +" mph");
                $("#country").html(" Country : "+country);

                $("#temp").click(function(){
                    if(tempswap===false){
                        $("#temp").html("Current Temp : "+(FareTemp) +" F");
                        tempswap=true;
                    }else{
                        $("#temp").html("Current Temp : "+(celcius) +" C");
                        tempswap=false;
                    }
                });

                if(celcius>=25 || FareTemp>=75){
                    $("#image").attr("src","https://cdn0.iconfinder.com/data/icons/travel-flat-icons/105/sun-512.png")
                }else if ((celcius>=10 && celcius<25)||(FareTemp<75 && FareTemp >45)){
                    $("#image").attr("src","https://www.ocrmobile.com/images/2016/12/21/cloud.png")
                }else if(celcius=0 || FareTemp===32){
                    $("#image").attr("src","https://cdn.iconscout.com/public/images/icon/free/png-512/snow-cold-flake-snowfall-snowflake-weather-388d22cfbc51ea26-512x512.png")
                }else{     $("#image").attr("src","https://www.ocrmobile.com/images/2016/12/21/cloud.png")
                }


            });
        });
    }

});

