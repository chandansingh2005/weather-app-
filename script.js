const userLocation = document.getElementById("userLocation");

converter = document.getElementById("converter");
weathericon = document.querySelector(".weathericon");
temperature = document.querySelector(".temperature");
feelslike = document.querySelector(".feelslike");
destription = document.querySelector(".destription");
date = document.querySelector(".date");
city = document.querySelector(".city");

HValue = document.getElementById("HValue");
WValue = document.getElementById("WValue");
SRValue = document.getElementById("SRValue");
SSalue = document.getElementById("SSValue");
CValue = document.getElementById("CValue");
PValue = document.getElementById("PValue");



WEATHER_API_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = "a5bb4718b30b6f58f58697997567fffa";

function findUserLocation() {

    const cityName = userLocation.value;

    fetch(`${WEATHER_API_ENDPOINT}${cityName}&appid=${API_KEY}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod != 200) {
                alert(data.message);
                return;
            };

            console.log(data);
            city.innerHTML = data.name + " , " + data.sys.country;
            weathericon.style.background = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`;

            // ✅ Correct 2nd API (lat & lon)
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${API_KEY}&units=metric`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    temperature.innerHTML = Tempconverter(data.main.temp);
                    feelslike.innerHTML = " Feels like " + data.main.feels_like;
                    destription.innerHTML = `<i class="fa-brands fa-cloudversify"></i>&nbsp;` + data.weather[0].description;

                    const options = {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                    };
                    date.innerHTML = getLongFormateDataTime(
                        data.dt,
                        data.timezone,
                        options
                    );

                    HValue.innerHTML = Math.round(data.main.humidity) + "<span>%<span></span></span>";
                    WValue.innerHTML = Math.round(data.wind.speed) + "<span>m/s<span></span></span>";

                    const options1 = {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                    };

                    SRValue.innerHTML = getLongFormateDataTime(
                        data.sys.sunrise,
                        data.timezone,
                        options1
                    );
                    SSalue.innerHTML = getLongFormateDataTime(
                        data.sys.sunset,
                        data.timezone,
                        options1
                    );

                    CValue.innerHTML = Math.round(data.clouds.all) + "<span>%<span></span></span>";
                    PValue.innerHTML = data.main.pressure + "<span>hPa<span></span></span>";




                });
        });
}

function formatUnixTime(dtValue, offSet, options = {}) {
    const date = new Date((dtValue + offSet) * 1000);
    return date.toLocaleTimeString([], { timeZone: "UTC", ...options });
}

function getLongFormateDataTime(dtValue, offSet, options) {
    return formatUnixTime(dtValue, offSet, options);
}

function Tempconverter(temp) {
    let tempValue = Math.round(temp);
    let message = "";
    if (converter.value == "°C") {
        message = tempValue + " <span>" + "\xB0C</span>";
    } else {
        let ctof = (tempValue * 9) / 5 + 32;
        message = ctof + "<span>" + "\xB0F</span>";
    }
    return message;
}