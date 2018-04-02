(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var StayTime = function () {
      function StayTime(cb) {
          classCallCheck(this, StayTime);

          typeof cb === 'function' && (this.callback = cb);
          this.clearId = null;
          this.stay_sec = null;
          this.stay_min = null;
          this.true_sec = null;
          this.start();
      }

      createClass(StayTime, [{
          key: 'start',
          value: function start() {
              this.clearId || this.interval();
          }
      }, {
          key: 'stop',
          value: function stop() {
              this.clearId && clearInterval(this.clearId);
              this.stay_sec += Number(StayTime.convert(sessionStorage.getItem('stay_sec'), false));
              sessionStorage.setItem('stay_sec', StayTime.convert(this.stay_sec, true));
              this.true_sec = this.stay_sec; //really stay_min
              this.clearId = null;
          }
      }, {
          key: 'interval',
          value: function interval() {
              var start = new Date().getTime(),
                  that = this;
              that.clearId = setInterval(function _() {
                  var total = Math.round((new Date().getTime() - start) / 1000);
                  // that.stay_sec = total % 60;
                  that.stay_sec = total;
                  that.true_sec = that.stay_sec;
                  that.true_sec > 0 && that.true_sec % 10 === 0 && that.callback();
                  // that.stay_min = ~~Math.round((total - 30) / 60);
                  console.log(that.stay_sec);
                  return _;
              }(), 1000);
          }
      }], [{
          key: 'convert',
          value: function convert(str, status) {
              // status true decode or false uncode
              // must be number or null , avoid NaN
              if (str == null) return null;
              return status ? window.btoa && window.btoa(str) : window.atob && window.atob(str);
          }
      }]);
      return StayTime;
  }();

  var calcTime = new StayTime(function () {
      console.log('~~~~~');
  });

  window.calcTime = calcTime;

})));
