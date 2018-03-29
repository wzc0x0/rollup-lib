class StayTime {
    constructor(time) {
        this.origin = time
        this.showTime()
    }

    stop;
    getNow() {
        return ((new Date().getTime() - this.origin) / 1000);
    }

    calcTime() {
        let total_sec = Math.round(this.getNow()),
            stay_sec = total_sec % 60,
            stay_min = ~~Math.round((total_sec - 30) / 60);
        console.log(stay_min)
        return stay_min;
    }

    showTime(isStop = false) {
        if (!isStop) {
            this.stop = setInterval(() => {
                    now = this.calcTime()
                }, 1000),
                now;
        } else {
            clearInterval(this.stop)
            localStorage.getItem('now', now)
        }
    }

    stopTime() {
        this.calcTime(true)
    }
}

export default new StayTime(new Date())