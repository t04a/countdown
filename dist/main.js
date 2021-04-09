let pomodoro = {
  isRunning: false,
  timeMS: 0,
  fillerWidth: 0,
  fillerIncrement: 0,
  initTimer() {
    let self = this;
    this.secondsDom = document.querySelector('.countdown .seconds');
    this.minutesDom = document.querySelector('.countdown .minutes');
    this.fillerDom = document.querySelector('.countdown-filler');
    this.timeMS = this.convTimeToMs(this.secondsDom, this.minutesDom);
    sessionStorage.setItem('initTime', this.timeMS);
    document.querySelector('.btn-timer').addEventListener('click', function () {
      self.startTimer.apply(self);
    });
    document.querySelector('.stop-music').addEventListener('click', function () {
      self.pauseTimer.apply(self);
    });
    document.querySelector('.btn.reset').addEventListener('click', function () {
      self.resetTimer.apply(self);
    });
    document.querySelector('.btn.custom').addEventListener('click', function () {
      self.applyCustomTime.apply(self);
    });
    // console.log(this.fillerWidth);
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
    this.fillerIncrement = 400 / (sessionStorage.getItem('initTime') ? sessionStorage.getItem('initTime') / 1000 : this.timeMS / 1000);
    this.interval = setInterval(function () {
      self.countdown();
    }, 1000);
  },
  pauseTimer() {
    clearInterval(this.interval);
    this.isRunning = false;
  },
  resetTimer() {
    this.isRunning = false;
    clearInterval(this.interval);
    this.fillerWidth = 0;
    this.fillerIncrement = 0;
    this.updateDOM(sessionStorage.getItem('initTime'));
    this.timeMS = sessionStorage.getItem('initTime');
    if (sessionStorage.getItem('time')) {
      sessionStorage.removeItem('time');
      if(sessionStorage.getItem('fillerWidth')) {
        sessionStorage.removeItem('fillerWidth');
        // console.log('session filler delete');
      }
    }
  },
  countdown() {
    if (this.timeMS > 0) {
      this.timeMS = this.timeMS - 1000;
      sessionStorage.setItem('time', this.timeMS);
      this.updateDOM(this.timeMS);
      sessionStorage.setItem('fillerWidth', this.fillerWidth);
      // console.log(this.fillerWidth, this.fillerIncrement);
      // console.log('session filler write');
    }
    if (this.timeMS === 0) {
      sessionStorage.removeItem('time');
      sessionStorage.removeItem('fillerWidth');
      // console.log('session filler delete');
      clearInterval(this.interval);
      this.isRunning = false;
    }
  },
  updateDOM(time) {
    let normTime = this.convMsToNormTime(time);
    this.secondsDom.innerHTML = this.toDoubleDigit(normTime.seconds);
    this.minutesDom.innerHTML = this.toDoubleDigit(normTime.minutes);
    this.fillerWidth = this.fillerWidth + this.fillerIncrement;
    this.fillerDom.style.width = this.fillerWidth + 'px';
  },
  toDoubleDigit(num) {
    if (num < 10) {
      return "0" + num;
    }
    return num;
  },
  applyCustomTime() {
    let minutes = Math.abs(document.querySelector('.custom-numbers .min').value * 60000);
    let seconds = Math.abs(document.querySelector('.custom-numbers .sec').value * 1000);
    this.timeMS = minutes + seconds
    this.fillerWidth = 0;
    this.fillerIncrement = 0;
    sessionStorage.setItem('initTime', this.timeMS);
    // console.log(this.fillerWidth, this.fillerIncrement);
    this.updateDOM(this.timeMS);
  },
  /* filler() {

  }, */
};

window.onload = function () {
  pomodoro.initTimer();
  if (sessionStorage.getItem('time')) {
    pomodoro.timeMS = sessionStorage.getItem('time');
    if(sessionStorage.getItem('fillerWidth')) {
      pomodoro.fillerWidth = +sessionStorage.getItem('fillerWidth');
    }
    pomodoro.updateDOM(pomodoro.timeMS);
  }
};