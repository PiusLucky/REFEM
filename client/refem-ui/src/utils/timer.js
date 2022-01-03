
const startTimer = (duration, setTimer) => {
    var timer = duration, // duration assigned to timer
        seconds; //seconds initialized
    const timeInterval = setInterval(function () {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? seconds : seconds;
        setTimer(seconds);
        if (--timer < 0) {
            timer = duration;
        }
        if(seconds === 0) {
            clearInterval(timeInterval)
        }
    }, 1000);


};

export default startTimer;
