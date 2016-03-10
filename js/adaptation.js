/*
 * 适配手机
 */
var _phoneWidth = parseInt(window.screen.width);
var _phoneScale = _phoneWidth/640;
var ua = navigator.userAgent;
if (/Android (\d+\.\d+)/.test(ua)) {
	var _version = parseFloat(RegExp.$1);
	if (_version > 2.3) {
		document.write('<meta id="vp" name="viewport" content="width=640, target-densitydpi=device-dpi, initial-scale='+_phoneScale+', minimum-scale='+_phoneScale+', maximum-scale='+_phoneScale+', user-scalable=no">');
	} else {
		document.write('<meta id="vp" name="viewport" content="width=640, target-densitydpi=device-dpi">');
	}
} else {
	document.write('<meta id="vp" name="viewport" content="width=640, user-scalable=no, target-densitydpi=device-dpi">');
}