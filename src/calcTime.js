class StayTime {
    constructor(cb) {
        typeof cb === 'function' && (this.callback = cb);
        this.clearId = null;
        this.stay_sec = null;
        this.stay_min = null;
        this.true_sec = null;
        this.start()
    }

    start() {
        this.clearId || this.interval()
    }
    stop() {
        this.clearId && clearInterval(this.clearId)
        this.stay_sec += Number(StayTime.convert(sessionStorage.getItem('stay_sec'), false))
        sessionStorage.setItem('stay_sec', StayTime.convert(this.stay_sec, true))
        this.true_sec = this.stay_sec; //really stay_min
        this.clearId = null;

    }
    interval() {
        let start = new Date().getTime(),
            that = this;
        that.clearId = setInterval((function _() {
            let total = Math.round((new Date().getTime() - start) / 1000);
            // that.stay_sec = total % 60;
            that.stay_sec = total;
            that.true_sec = that.stay_sec;
            (that.true_sec > 0 && that.true_sec % 10 === 0) && that.callback()
                // that.stay_min = ~~Math.round((total - 30) / 60);
            console.log(that.stay_sec)
            return _
        })(), 1000)
    }
    static convert(str, status) {
        // status true decode or false uncode
        // must be number or null , avoid NaN
        if (str == null) return null;
        return status ? (window.btoa && window.btoa(str)) :
            (window.atob && window.atob(str))
    }
}

export default new StayTime(function() {
    console.log('~~~~~')
})