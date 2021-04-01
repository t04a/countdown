window.onload = function () {
  if (sessionStorage.getItem('secondsLeft') && sessionStorage.getItem('minutesLeft')) {
    // console.log('chto to est')
    // console.log(sessionStorage.getItem('secondsLeft'))
    seconds.innerHTML = sessionStorage.getItem('secondsLeft');
    minutes.innerHTML = sessionStorage.getItem('minutesLeft');
  }
}

function initTimer() {
  /* let initMinutes = parseInt(minutes.innerHTML);
  let initSeconds = parseInt(seconds.innerHTML); */
  
  function calcRemTime() {
    let secRem, minRem, timeRem;
    if (sessionStorage.getItem('secondsLeft') && sessionStorage.getItem('minutesLeft')) {
      secRem = sessionStorage.getItem('secondsLeft') * 1000;
      minRem = sessionStorage.getItem('minutesLeft') * 60000;
    } else {
      secRem = initSeconds * 1000;
      minRem = initMinutes * 60000;
    }

    return timeRem = secRem + minRem;
  }

  function convRemTime(remTime) {
    let min = parseInt(remTime / 60000);
    let sec = (remTime % 60000) / 1000;
    let result = {
      minutes: min,
      seconds: sec
    }

    return result;
  }

  function stopTimer() {
    clearInterval(countdown);
    console.log('stop timer')
  }

  buttonStopMusic.addEventListener('click', stopTimer);

  let remTimeInSec = calcRemTime();
  console.log(remTimeInSec);

  if (remTimeInSec === 0) {
    return;
  }

  function startTimerCountdown() {
    console.log('first action');

    if (remTimeInSec > 0) {
      remTimeInSec = remTimeInSec - 1000;

      let remTime = convRemTime(remTimeInSec);

      seconds.innerHTML = remTime.seconds;
      minutes.innerHTML = remTime.minutes;

      sessionStorage.setItem('minutesLeft', remTime.minutes);
      console.log(sessionStorage.getItem('minutesLeft'));
      sessionStorage.setItem('secondsLeft', remTime.seconds);
      console.log(sessionStorage.getItem('secondsLeft'));

      if (remTimeInSec === 0) {
        sessionStorage.removeItem('minutesLeft');
        sessionStorage.removeItem('secondsLeft');
        clearInterval(countdown);
      }
    }
    console.log('last action')
  }

  let countdown = setInterval(startTimerCountdown, 1000);
}

let minutes = document.querySelector('#countdown .minutes'); // меняющаяся цифра
let seconds = document.querySelector('#countdown .seconds'); // меняющаяся цифра
// let minutesLeft = parseInt(minutes.innerHTML);
// let secondsLeft = parseInt(seconds.innerHTML);
let initMinutes = parseInt(minutes.innerHTML);
let initSeconds = parseInt(seconds.innerHTML);

let buttonCountdown = document.querySelector('.btn-timer');
// buttonCountdown.addEventListener('click', startCountdown);
buttonCountdown.addEventListener('click', initTimer);

let buttonStopMusic = document.querySelector('.stop-music');
// buttonStopMusic.addEventListener('click', stopMusic)

let buttonResetTimer = document.querySelector('.btn.reset');
buttonResetTimer.addEventListener('click', () => {
  seconds.innerHTML = initSeconds;
  minutes.innerHTML = initMinutes;
  if (sessionStorage.getItem('secondsLeft') && sessionStorage.getItem('minutesLeft')) {
    sessionStorage.removeItem('secondsLeft');
    sessionStorage.removeItem('minutesLeft');
    console.log(sessionStorage.length);
  }
  if(countdown) {
    clearInterval(countdown);
  }
});