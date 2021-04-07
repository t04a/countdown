let pomodoro = {
  isRunning: false,
  timeMS: 0,
  initTimer() {
    let self = this;
    this.secondsDom = document.querySelector('#countdown .seconds');
    this.minutesDom = document.querySelector('#countdown .minutes');
    this.timeMS = this.convTimeToMs(this.secondsDom, this.minutesDom);
    sessionStorage.setItem('initTime', this.timeMS);
    console.log(this);
    // document.querySelector('.btn-timer').addEventListener('click', this.startTimer);
    document.querySelector('.btn-timer').addEventListener('click', function () {
      self.startTimer.apply(self);
    });
    // document.querySelector('.stop-music').addEventListener('click', this.pauseTimer);
    document.querySelector('.stop-music').addEventListener('click', function () {
      self.pauseTimer.apply(self);
    });
    // document.querySelector('.btn.reset').addEventListener('click', this.resetTimer);
    document.querySelector('.btn.reset').addEventListener('click', function () {
      self.resetTimer.apply(self);
    });
    // document.querySelector('.btn.custom').addEventListener('click', this.applyCustomTime);
    document.querySelector('.btn.custom').addEventListener('click', function () {
      self.applyCustomTime.apply(self);
    });
  },
  convTimeToMs(seconds, minutes) {
    let secInMs, minInMs, timeInMs;
    secInMs = seconds.innerHTML * 1000;
    minInMs = minutes.innerHTML * 60000;
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
    if (this.isRunning) {
      return
    }
    this.isRunning = true;
    let self = this;
    this.interval = setInterval(function () {
      self.countdown();
    }, 1000);
  },
  pauseTimer() {
    clearInterval(this.interval);
    this.isRunning = false;
    console.log('pause timer');
  },
  resetTimer() {
    this.isRunning = false;
    console.log(this);
    clearInterval(this.interval);
    this.updateDOM(sessionStorage.getItem('initTime'));
    this.timeMS = sessionStorage.getItem('initTime');
    if (sessionStorage.getItem('time')) {
      sessionStorage.removeItem('time');
      // console.log(sessionStorage.length);
    }
  },
  countdown() {
    console.log('timer 1st action');
    // console.log(this);

    if (this.timeMS > 0) {
      this.timeMS = this.timeMS - 1000;
      sessionStorage.setItem('time', this.timeMS);
      this.updateDOM(this.timeMS);
    }
    if (this.timeMS === 0) {
      sessionStorage.removeItem('time');
      clearInterval(this.interval);
      this.isRunning = false;
    }

    // console.log(this);
    console.log('timer last action');
  },
  updateDOM(time) {
    // console.log(time);
    let normTime = this.convMsToNormTime(time);
    // console.log(normTime);
    this.secondsDom.innerHTML = this.toDoubleDigit(normTime.seconds);
    this.minutesDom.innerHTML = this.toDoubleDigit(normTime.minutes);
    console.log(this);
  },
  toDoubleDigit(num) {
    if (num < 10) {
      return "0" + num;
    }
    return num;
  },
  applyCustomTime() {
    let minutes = document.querySelector('.custom-numbers .min').value * 60000;
    let seconds = document.querySelector('.custom-numbers .sec').value * 1000;
    console.log(minutes, seconds);
    if (minutes >= 0 && seconds >= 0) {
      this.timeMS = minutes + seconds
      console.log(pomodoro.timeMS);
      this.updateDOM(this.timeMS);
    }
  },
};

window.onload = function () {
  pomodoro.initTimer();
  if (sessionStorage.getItem('time')) {
    // console.log(sessionStorage.getItem('time'));
    pomodoro.timeMS = sessionStorage.getItem('time');
    pomodoro.updateDOM(pomodoro.timeMS);
  }
};