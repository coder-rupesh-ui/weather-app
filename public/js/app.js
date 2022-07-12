console.log('Client side js loaded..');

// fetch('http://puzzle.mead.io/puzzle').then((res) => {
//     res.json().then((data) => {
//         console.log(data);
//     });
// });

const weatherForm = document.querySelector('form');
const input = document.querySelector('input');
const m1 = document.querySelector('#message-1');
const m2 = document.querySelector('#message-2');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log(input.value);
    getWeatherData(input.value);
})

function getWeatherData(location) {
    m1.textContent = 'Loading...';
    m2.textContent = '';
    fetch('/weather?address='+location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                console.log(data.error);
                m1.textContent = data.error;
                return;
            }
            console.log(data);
            m1.textContent = `There is currently ${data.temperature} degree and it feels like is ${data.feelslike} degrees`;
            m2.textContent = `The forecast is for ${data.place}`;
        });
    });
}