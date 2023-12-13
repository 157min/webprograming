const button = document.querySelector('.button');
const tempSection = document.querySelector('.temperature');
const placeSection = document.querySelector('.place');
const descSection = document.querySelector('.description');
const weatherListSection = document.querySelector('.weather-list');
const API_KEY = 'ce2899b16ed15363179ce8af3cf74c28'; // 실제 API 키로 바꿔야 합니다.

const updateBackgroundImage = (weatherMain) => {
    if (weatherMain == "Thunderstorm") {
        document.body.style.backgroundImage = `url('https://www.atsdr.cdc.gov/features/images/lightning-safety_456px.jpg?_=46019')`;
    } else if (weatherMain == "Drizzle") {
        document.body.style.backgroundImage = `url('https://www.rmets.org/sites/default/files/Rain.jpg')`;
    } else if (weatherMain == "Rain") {
        document.body.style.backgroundImage = `url('https://media.istockphoto.com/id/1458311785/photo/rain-rainy-season-sky.jpg?b=1&s=612x612&w=0&k=20&c=AvJuLiOq5YGAJHmoG5Izi-EPA6DvHD8budmzNut8J7E=')`;
    } else if (weatherMain == "Snow") {
        document.body.style.backgroundImage = `url('https://media.istockphoto.com/id/1428401936/ko/%EC%82%AC%EC%A7%84/%EC%8A%A4%EB%85%B8%EC%9A%B0-%EB%93%9C%EB%A6%AC%ED%94%84%ED%8A%B8-%EA%B0%95%EC%84%A4%EB%9F%89-%EB%B0%8F-%ED%9D%90%EB%A6%BF%ED%95%9C-%EB%B0%B0%EA%B2%BD%EC%9D%B4%EC%9E%88%EB%8A%94-%ED%81%AC%EB%A6%AC%EC%8A%A4%EB%A7%88%EC%8A%A4-%ED%85%8C%EB%A7%88%EC%9D%98-%EC%95%84%EB%A6%84%EB%8B%A4%EC%9A%B4-%EB%B0%B0%EA%B2%BD.jpg?s=612x612&w=0&k=20&c=RBk3zIJu-uClFrtpDd6gAWV97JdYlm4ZjpdB-VvhhVk=')`;
    } else if (weatherMain == "Mist") {
        document.body.style.backgroundImage = `url('https://upload.wikimedia.org/wikipedia/commons/9/9d/%D0%97%D0%B0_%D1%81%D0%B5%D0%BB%D0%BE%D0%BC_2.jpg')`;
    } else if (weatherMain == "Smoke") {
        document.body.style.backgroundImage = `url('https://img.freepik.com/premium-photo/factory-pipe-polluting-air-smoke-from-chimneys-against-sun-environmental-problems-ecological-theme-industry-scene-global-warming-of-the-weather-climate-a-common-problem-save-planet_771426-5625.jpg')`;
    } else if (weatherMain == "Haze") {
        document.body.style.backgroundImage = `url('https://upload.wikimedia.org/wikipedia/commons/2/2b/NASA_P3B_in_flight_in_Arctic_haze.jpg')`;
    } else if (weatherMain == "Dust") {
        document.body.style.backgroundImage = `url('https://img.freepik.com/premium-photo/coastal-city-skyline-shrouded-in-smog-and-haze-air-pollution-and-climate-change_798657-9447.jpg')`;
    } else if (weatherMain == "Fog") {
        document.body.style.backgroundImage = `url('https://image.imnews.imbc.com/news/2021/econo/article/__icsFiles/afieldfile/2021/07/31/k210731-4.jpg')`;
    } else if (weatherMain == "Sand") {
        document.body.style.backgroundImage = `url('https://img.freepik.com/premium-photo/background-with-realistic-sand-dunes-dry-hot-climate-arid-environment-concept_598586-3241.jpg')`;
    } else if (weatherMain == "Ash") {
        document.body.style.backgroundImage = `url('https://dimg.donga.com/wps/NEWS/IMAGE/2021/03/03/105688563.1.jpg')`;
    } else if (weatherMain == "Squall") {
        document.body.style.backgroundImage = `url('https://www.shutterstock.com/image-photo/rain-squall-passes-over-river-260nw-1774205891.jpg')`;
    } else if (weatherMain == "Tornado") {
        document.body.style.backgroundImage = `url('https://mblogthumb-phinf.pstatic.net/MjAyMTEyMTZfMjM4/MDAxNjM5NjM0OTE2NzA1.UrgufJmwfutVcst0qkAalcVnVgUbfsnjf-trizfevGwg.Y0syVR1YUrlcUJ925pIkv23DoLU14yJOz0ChHPjN63cg.JPEG.greenstartkr/CK_cm08379183.jpg?type=w800')`;
    } else if (weatherMain == "Clear") {
        document.body.style.backgroundImage = `url('https://demo.mangboard.com/wp-content/uploads/mangboard/2020/02/17/F3130_P1000803_1.jpg')`;
    } else if (weatherMain == "Clouds") {
        document.body.style.backgroundImage = `url('https://cdn.pixabay.com/photo/2015/12/25/13/03/sky-1107579_1280.jpg')`;
    }
};
const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    getWeather(latitude, longitude);
};

// const displayWeatherList = (weatherArray) => {
//     const weatherList = weatherArray.map(weather => weather.main).join(', ');
//     weatherListSection.innerText = `날씨 종류: ${weatherList}`;
// };
const error = () => {
    alert('위치 정보를 얻을 수 없습니다. 위치 접근 권한을 확인해 주세요.');
};

const getWeather = (lat, lon) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`)
    .then((response) => response.json())
    .then((json) => {
        const temperature = json.main.temp;
        const place = json.name;
        const weatherArray = json.weather;
        const weatherDescription = weatherArray[0].description;
        const weatherMain = weatherArray[0].main; // 'main' 값을 추출합니다.

        tempSection.innerText = `온도: ${temperature} °C`;
        placeSection.innerText = `위치: ${place}`;
        descSection.innerText = `날씨: ${weatherDescription}`;
        updateBackgroundImage(weatherMain); // 'main' 값을 이용해 배경 이미지 업데이트
    })
    .catch((error) => {
        alert(`날씨 정보를 가져오는 데 실패했습니다: ${error}`);
    });
};
window.onload = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert('이 브라우저에서는 위치 정보가 지원되지 않습니다.');
    }
};