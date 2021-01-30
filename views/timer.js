
// setup
const curTime = document.getElementById('current-time')
const sound = document.getElementById('ring')
const startBtn = document.getElementById('start')
const cancelBtn = document.getElementById('cancel');
let running = false;
var timeInt;
let currentTime;
// import inputs
const hoursInput = document.getElementById('hours');
const minutesInput = document.getElementById('min');
const secondsInput = document.getElementById('sec');


function setProgress(percent) {
    const circle = document.querySelector('.progress-ring__circle');
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    const offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
}

function Timer(timeSecs, dispEl) {
    const timeMilli = timeSecs * 1000
    currentTime = timeSecs

    timeInt = setInterval(() => {
        currentTime -= 1;
        let currentPerc = Math.round(currentTime / timeSecs * 100);
        console.log(currentPerc)
        let dispTime = `${Math.floor(currentTime / 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })} : ${Math.round(currentTime % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`
        if (currentTime > 0) {
            setProgress(currentPerc);
            dispEl.textContent = dispTime;
        } else {
            setProgress(0)
            dispEl.textContent = "00 : 00"
            sound.play();
            clearInterval(timeInt)
            startBtn.textContent = "START"
            running = false
            currentTime = 0;
        }
    }, 1000)

}

function startStopHandler() {
    let timeToStart = 0;
    if (!running) {
        if (currentTime){
            Timer(currentTime, curTime)
        running = true;
        startBtn.textContent = "STOP"
        }else{
            console.log(hoursInput.value, minutesInput.value, secondsInput.value)
        timeToStart = (hoursInput.value * 60 * 60) + (minutesInput.value * 60) + (secondsInput.value)
        Timer(timeToStart, curTime)
        running = true;
        startBtn.textContent = "STOP"
        }
    } else if (running) {
        clearInterval(timeInt)
        running = false
        startBtn.textContent = "START"
    }

}

function cancelHandler() {
    setProgress(100)
    curTime.textContent = "00 : 00"
    clearInterval(timeInt)
    startBtn.textContent = "START"
    running = false
    currentTime = 0
}

setProgress(100)
startBtn.addEventListener('click', startStopHandler)
cancelBtn.addEventListener('click', cancelHandler)
