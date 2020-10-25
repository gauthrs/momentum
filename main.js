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

    setTimeout(() => {
        setTime();
    }, 1000);
};

const getStorage = () => {
    username.innerHTML = (localStorage.getItem('username')) ? localStorage.getItem('username') : '[Enter your name]';
    focus.innerHTML = (localStorage.getItem('focus')) ? localStorage.getItem('focus') : '[Enter your focus]';
};

const setUsernameStorage = (e) => {
    setStorage(e, 'username');
};

const setFocusStorage = (e) => {
    setStorage(e, 'focus');
};

const setStorage = (e, key) => {
    let labelDefaultField = {
        'username': '[Enter your name]',
        'focus': '[Enter your focus]'
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

window.onload = () => {
    setTime();
    getStorage();
};

// DOM
const timeScreen = _ge('[data-time-screen]');
const dateScreen = _ge('[data-date-screen]');
const greeting = _ge('[data-greeting]');

const username = _ge('[data-username]');
const focus = _ge('[data-focus]');

username.addEventListener('keydown', checkElement);
username.addEventListener('blur', setUsernameStorage);
username.addEventListener('click', deleteInner);

focus.addEventListener('keydown', checkElement);
focus.addEventListener('blur', setFocusStorage);
focus.addEventListener('click', deleteInner);