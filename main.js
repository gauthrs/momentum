const _ge = (elem) => {
    return document.querySelector(elem);
}

// fucntion show time
const setTime = () => {
    const daysWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const today = new Date(),
          hour = today.getHours(),
          min = today.getMinutes(),
          sec = today.getSeconds(),
          dayWeek = daysWeek[today.getDay()],
          day = today.getDate(),
          month = months[today.getMonth()],
          year = today.getFullYear();

    const addZero = (n) => {
        return (n < 10 ? '0' : '') + n;
    };

    timeScreen.innerHTML = `${hour}:${addZero(min)}:${addZero(sec)}`;
    dateScreen.innerHTML = `${dayWeek}, ${day} ${month} ${year}`;

    greeting.innerHTML = (hour < 6) ? 'Good night,' :
                              (hour < 12) ? 'Good morning,' :
                              (hour < 18) ? 'Good day,' : 'Good evening,';

    document.body.style.backgroundImage = (hour < 6) ? 'url(./assets/images/night/03.jpg)' :
                                          (hour < 12) ? 'url(./assets/images/morning/10.jpg)' :
                                          (hour < 18) ? 'url(./assets/images/day/02.jpg)' : 'url(./assets/images/evening/02.jpg)';

    setTimeout(() => {
        setTime();
    }, 1000);
};

const getStorage = () => {
    username.innerHTML = (localStorage.getItem('username')) ? localStorage.getItem('username') : '[Enter your username]';
    focus.innerHTML = (localStorage.getItem('focus')) ? localStorage.getItem('focus') : '[Enter your focus]';
    if(localStorage.getItem('city')) {
        city.innerHTML = localStorage.getItem('city');
        getWeather();
    } else {
        city.innerHTML = '[Enter your city]';
    }
};

const setUsernameStorage = (e) => {
    setStorage(e, 'username');
};

const setFocusStorage = (e) => {
    setStorage(e, 'focus');
};

const setCity = (e) => {
    setStorage(e, 'city');
    getWeather(e);
};

const setStorage = (e, key) => {
    let labelDefaultField = {
        'username': '[Enter your username]',
        'focus': '[Enter your focus]',
        'city': '[Enter your city]'
    };

    if (e.target.innerHTML === '' || e.target.innerHTML === null) {
        e.target.innerHTML = (localStorage.getItem(key)) ? localStorage.getItem(key) : labelDefaultField[key];
    } else {
        localStorage.setItem(key, e.target.innerHTML);
        e.target.innerHTML = localStorage.getItem(key);
    }
};

const deleteInner = (e) => {
    e.target.innerHTML = '';
};

const checkElement = (e) => {
    if (e.key === 'Enter') {
        e.target.blur();
    }
};

const getWeather = async () => {
    if (city.innerHTML === '[Enter your city]' || city.innerHTML === 'City not found') return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerHTML}&lang=en&appid=6fb121471878a8b4878c1bf69f302753&units=metric`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        contentWeather.style.display = 'block';
        icon.classList.add(`owf-${data.weather[0].id}`);
        temperature.innerHTML = `${Math.floor(data.main.temp)}&#176;C`;
        description.innerHTML = data.weather[0].description;   
    } catch(err) {
        if (err.message == "Cannot read property '0' of undefined") {
            city.innerHTML = 'City not found';
        }
        localStorage.removeItem('city');
        contentWeather.style.display = 'none';
        temperature.innerHTML = '';
        description.innerHTML = '';
    }

};

const getQuote = async () => {
    const url = 'https://quote-garden.herokuapp.com/api/v2/quotes/random';
    const res = await fetch(url);
    const data = await res.json();
    if (data.quote.quoteText.split('').length > 210) {
        getQuote();
    } else {
        blockquote.innerHTML = data.quote.quoteText;
        figcaption.innerHTML = data.quote.quoteAuthor;
    }
};

window.onload = () => {
    setTime();
    getStorage();
    getWeather();
};

getQuote();

// DOM
const timeScreen = _ge('[data-time-screen]');
const dateScreen = _ge('[data-date-screen]');
const greeting = _ge('[data-greeting]');

const username = _ge('[data-username]');
const focus = _ge('[data-focus]');

const contentWeather = _ge('.content-section__weather-data');
const city = _ge('[data-city]');
const icon = _ge('[data-icon]');
const temperature = _ge('[data-temperature]');
const description = _ge('[data-description]');

const blockquote = _ge('[data-blockquote]');
const figcaption = _ge('[data-figcaption]');
const quoteBtn = _ge('[data-quote-btn]');

quoteBtn.addEventListener('click', () => {
    getQuote();
});

username.addEventListener('keydown', checkElement);
username.addEventListener('blur', setUsernameStorage);
username.addEventListener('click', deleteInner);

focus.addEventListener('keydown', checkElement);
focus.addEventListener('blur', setFocusStorage);
focus.addEventListener('click', deleteInner);

city.addEventListener('keydown', checkElement);
city.addEventListener('blur', setCity);
city.addEventListener('click', deleteInner);