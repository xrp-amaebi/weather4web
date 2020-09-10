console.log('Client side javascript file is loaded');

fetch('http://puzzle.mead.io/puzzle').then(res => {
    res.json().then(data => {
        console.log(data);
    }); 
});

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#msg1');
const messageTwo = document.querySelector('#msg2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch(`http://localhost:3001/weather?address=${location}`).then(res => {
        res.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.city;
                messageTwo.textContent = JSON.stringify(data.forecast);
            };
        });
    });
});