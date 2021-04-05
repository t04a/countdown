let pomodoro = {
  time: 0,
  initTimeMs: 0,
  initTimer() {
    this.secondsDom = document.querySelector('#countdown .seconds');
    this.minutesDom = document.querySelector('#countdown .minutes');
    this.time = this.initTimeMs = this.convTimeToMs();
    console.log(this);
    document.querySelector('.btn-timer').addEventListener('click', this.startTimer);
    document.querySelector('.stop-music').addEventListener('click', this.pauseTimer);
    document.querySelector('.btn.reset').addEventListener('click', this.resetTimer);
  },
  convTimeToMs() {
    let secInMs, minInMs, timeInMs;
    secInMs = this.secondsDom.innerHTML * 1000;
    minInMs = this.minutesDom.innerHTML * 60000;
    return timeInMs = secInMs + minInMs;
  },
  convMsToNormTime(timeMs) {
    let minutes, seconds, normTime;
    minutes = parseInt(timeMs / 60000);
    seconds = (timeMs % 60000) / 1000;
    normTime = {
      minutes: minutes,
      seconds: seconds,
    }

    return normTime;
  },
  startTimer() {
    pomodoro.interval = setInterval(function() {
      pomodoro.countdown();
    }, 1000);
  },
  pauseTimer() {
    clearInterval(pomodoro.interval);
    console.log('pause timer');
  },
  resetTimer() {
    clearInterval(pomodoro.interval);
    pomodoro.updateDOM(pomodoro.time);
    pomodoro.initTimeMs = pomodoro.time;
    if(sessionStorage.getItem('time')) {
      sessionStorage.removeItem('time');
      console.log(sessionStorage.length);
    }
  },
  countdown() {
    console.log('timer 1st action');
    
    if (this.initTimeMs > 0) {
      this.initTimeMs = this.initTimeMs - 1000;
      sessionStorage.setItem('time', this.initTimeMs);
      this.updateDOM(this.initTimeMs);
    }
    if(this.initTimeMs === 0) {
      sessionStorage.removeItem('time');
      clearInterval(this.interval);
    }
    
    console.log(this);
    console.log('timer last action');
  },
  updateDOM(time) {
    console.log(time);
    let normTime = this.convMsToNormTime(time);
    console.log(normTime);
    this.secondsDom.innerHTML = normTime.seconds;
    this.minutesDom.innerHTML = normTime.minutes;
  },

};

window.onload = function () {
  pomodoro.initTimer();
  if (sessionStorage.getItem('time')) {
    console.log(sessionStorage.getItem('time'));
    pomodoro.initTimeMs = sessionStorage.getItem('time');
    pomodoro.updateDOM(pomodoro.initTimeMs);
  }
};