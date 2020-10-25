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
    
    setTimeout(() => {
        setTime();
    }, 1000);
};

const getUsername = () => {
    if (localStorage.getItem('username') === null || localStorage.getItem('username') === '') {
        username.textContent = '[Enter your name]';
    } else {
        username.textContent = localStorage.getItem('username');
    }
};

const setUsername = (e) => {
    if (e.type === 'keypress') {
        if (e.which === 13 || e.keyCode === 13) {
            if (e.target.innerText === null || e.target.innerText === '') {
                getUsername();
            } else {
                localStorage.setItem('username', e.target.innerText);
                username.blur();
            }
        }
    } else {
        localStorage.setItem('username', e.target.innerText);
    }
};

let storage = {
    'username': '',
    'focus': '',
    'city': ''
};

// DOM
const timeScreen = document.querySelector('[data-time-screen]');
const dateScreen = document.querySelector('[data-date-screen]');

const username = document.querySelector('[data-username]');
const focus = document.querySelector('[data-focus]');

//username.addEventListener('keypress', setUsername);
//username.addEventListener('blur', setUsername);

username.addEventListener('mousedown', (e) => {
    console.log(e.target.innerText);
    if (e.target.innerText || e.target.innerText != null || e.target.innerText != '') {
        
    } else {
        console.log(1);
    }
});


setTime();
getUsername();