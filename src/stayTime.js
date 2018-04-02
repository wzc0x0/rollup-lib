import { local as sessionStorage } from "./storage";
import visible from './visible'

window.onload = function() {
    visible(function() {
        document.body.className === "hidden" && window.calcTime.start()
        document.body.className === "visible" && window.calcTime.stop()
    })
}

class StayTime {
    constructor(params) {
        typeof params.callback === "function" && (this.callback = params.callback);
        this.timespan = StayTime.isNum(params.timespan);
        this.clearId = null;
        this.stay_sec = null;
        this.true_sec = null;
        this.start();
    }

    start() {
        this.clearId || this.interval();
    }
    stop() {
        if (this.clearId) {
            clearInterval(this.clearId);
            this.stay_sec += Number(StayTime.convert(this.isEffective("stay_sec"), false));
            sessionStorage.set("stay_sec", {
                total_sec: StayTime.convert(this.stay_sec, true),
                timestamp: Math.round(new Date().getTime() / 1000)
            });
            this.true_sec = this.stay_sec; //really stay_sec
            this.clearId = null;
        }
    }
    interval() {
        let start = new Date().getTime(),
            that = this;
        that.clearId = setInterval(
            (function _() {
                let total = Math.round((new Date().getTime() - start) / 1000);
                that.stay_sec = total;
                that.true_sec = that.stay_sec;
                that.true_sec > 0 && that.true_sec % that.timespan === 0 && that.callback();
                // console.log(that.stay_sec);
                return _;
            })(),
            1000
        );
    }

    isEffective(key) {
        let obj = sessionStorage.get(key);
        if (obj && "timestamp" in obj) {
            if (StayTime.checkDated(obj["timestamp"])) {
                return obj["total_sec"];
            } else {
                sessionStorage.remove(key);
                return null;
            }
        } else {
            return null; // convert can avoid null;
        }
    }

    static convert(str, status) {
        // status true decode or false uncode
        // must be number or null , avoid NaN
        if (str == null) return null;
        return status ?
            window.btoa && window.btoa(str) :
            window.atob && window.atob(str);
    }

    static isNum(num) {
        let param = Number(num)
        return (!isNaN(param) && param > 10) ? param : 10
    }

    static checkDated(timestamp) {
            let date = new Date(timestamp * 1000), // timestamp must be * 1000
                Y = date.getFullYear(),
                M = date.getMonth() + 1,
                D = date.getDate() + 1,
                tomorrow = `${Y}-${M < 10 ? `0${M}` : M}-${D} 00:00:00`;
        return (Date.parse(tomorrow) / 1000) > timestamp;// true is today,false is tomorrow
    }
}

export default StayTime