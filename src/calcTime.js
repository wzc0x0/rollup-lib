class StayTime {
    constructor() {
        /* this.origin = Number(localStorage.getItem("_origin")) || time;
        this.before = Number(localStorage.getItem("now_min"));
        this.now_time = null;
        this.now_min = null;
        this.stop = null;
        this.startInterval();
        this.before = Number(localStorage.getItem("now_time"))
        this.origin = (new Date().getTime() - this.before) */
        this.stop = null;
        this.now_time = null;
        this.startInterval()
    }

    startInterval() {
        let origin = new Date().getTime() - Number(localStorage.getItem("now_time"));
        this.stop = setInterval(() => {
            let
                now_time = new Date().getTime(),
                total_sec = Math.round((now_time - origin) / 1000),
                stay_sec = total_sec % 60,
                stay_min = ~~Math.round((total_sec - 30) / 60);
            console.log(stay_min, stay_sec, total_sec)
            this.now_time = now_time
                // this.now_min = stay_min
        }, 1000)
    }

    stopInterval() {
        if (this.stop) {
            clearInterval(this.stop)
            localStorage.setItem("now_time", this.now_time)
                // this.origin = this.now_time
                // this.interval(true)
                // return this.now
        }
    }
}
// 计算总时间、每隔多少时间发一次请求、可以暂停、可以继续


export default new StayTime()