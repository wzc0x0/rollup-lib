var ap_name = navigator.appName;
var ap_vinfo = navigator.appVersion;
var ap_ver = parseFloat(ap_vinfo.substring(0, ap_vinfo.indexOf('('))); // 获取版本号
var time_start = new Date();
var clock_start = time_start.getTime();
var dl_ok = false;

function init() {
  if (ap_name == "netscape" && ap_ver >= 3.0)
    dl_ok = true;
  return true;
}
//已经打开页面多少秒
function get_time_spent() {
  var time_now = new Date();
  return ((time_now.getTime() - clock_start) / 1000);
}

function show_secs() { // show the time user spent on the side
  var i_total_secs = Math.round(get_time_spent());
  var i_secs_spent = i_total_secs % 60;
  var i_mins_spent = Math.round((i_total_secs - 30) / 60); //四舍五入，超60s，大于0.5，四舍五入就是1min
  var s_secs_spent = "" + ((i_secs_spent > 9) ? i_secs_spent : "0" + i_secs_spent); //改显示格式：个位数-> 0+个位数，如7->07
  var s_mins_spent = "" + ((i_mins_spent > 9) ? i_mins_spent : "0" + i_mins_spent);
  document.fm0.time_spent.value = s_mins_spent + ":" + s_secs_spent; //把值放入form中name为time_spent的input中
  window.setTimeout('show_secs()', 1000); //每隔1s刷新一次input里的值
}
/**
 * <form name="fm0" onsubmit="0">
        <font color="#888888" size="-1">您在本网页的停留时间:</font>
        <input type="text" name="time_spent" size=7 onfocus="this.blur()">
    </form>
*/
