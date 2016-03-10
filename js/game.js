/**
* @author yefeng
* @date 2016-03-04
* @version v1.0
* @param {String}   bindBox             绑定容器
* @param {String}   countDown           倒计时容器
* @param {Boolean}  isStart             判断游戏是否可以开始，默认false
* @param {Boolean}  isFirst             判断是否第一次游戏，默认true
* @param {Function} success             游戏成功的回调函数
* @param {Function} failed              游戏失败的回调函数
* @param {Function} overTime            游戏次数用完
* @param {Number}   timeout             倒计时时间
* @param {Number}   count               游戏次数
*/
var cd;

var arr = [[5,8,9,14,16,21,22],[1,4,7,8,9,10,12,13,14,16,17,18,19,22,25],[1,2,4,5,11,12,14,15,21,22,24,25],[1,2,4,5,6,15,18,19,24]];    //可以随机二位数组

var random = Math.floor(Math.random() * arr.length + 1)-1;

function Light(option){
	this.bindBox = option.bindBox;
	this.countDown = option.countDown;
	this.count = option.count;
	this.isStart = option.isStart || false;
	this.isFirst = option.isFirst || true;
	this.success = option.success;
	this.failed = option.failed;
	this.overTime = option.overTime;
	this.timeout = option.timeout;
	this.render();
	this.bindEvent();
}
Light.prototype = {
	render: function(){
		var instance = this;
		var col=row=5;
		var str = "",li;
		var t = 0;
		for(var i=1;i<=row;i++){
			for(var j=1;j<=col;j++){
				t++;
				if($.inArray(t,arr[random])>-1){
					li = "<li data-idx="+i+"-"+j+" class='icon-light'></li>";
				}else{
					li = "<li data-idx="+i+"-"+j+"></li>";
				}
				str+=li;
			}
		}
		$(instance.bindBox).html(str);
		
		$(instance.countDown).text(instance.timeout);
	},
	bindEvent: function(){
		var instance = this;
		var bindBox = instance.bindBox;
		$(document).on(CLICK,bindBox+" li",function(){
			if(!instance.isStart){
				return;
			}
			if($(this).hasClass("icon-light")){
				$(this).removeClass("icon-light");
			}else{
				$(this).addClass("icon-light");
			}
			
			var idx = $(this).data("idx");
			var row = parseInt(idx.split('-')[0]);
			var col = parseInt(idx.split('-')[1]);
			
			
			//上
			var top = (row-1)+"-"+col;
			var topNode = $(bindBox+' li[data-idx="'+top+'"]');
			if(topNode.hasClass("icon-light")){
				topNode.removeClass("icon-light");
			}else{
				topNode.addClass("icon-light");
			}
			
			//下
			var bottom = (row+1)+"-"+col;
			var bottomNode = $(bindBox+' li[data-idx="'+bottom+'"]');
			if(bottomNode.hasClass("icon-light")){
				bottomNode.removeClass("icon-light");
			}else{
				bottomNode.addClass("icon-light");
			}
			
			//左
			var left = row+"-"+(col-1);
			var leftNode = $(bindBox+' li[data-idx="'+left+'"]');
			if(leftNode.hasClass("icon-light")){
				leftNode.removeClass("icon-light");
			}else{
				leftNode.addClass("icon-light");
			}
			
			//右
			var right = row+"-"+(col+1);
			var rightNode = $(bindBox+' li[data-idx="'+right+'"]');
			if(rightNode.hasClass("icon-light")){
				rightNode.removeClass("icon-light");
			}else{
				rightNode.addClass("icon-light");
			}
			
			//判断是否消失
			var len = $(".icon-light").length;
			if(len==0){
				//clearInterval(cd);
				instance.isStart = false;
				instance.success();
			}
		});
	},
	startCD: function(){
		var instance = this;
		var bindBox = instance.bindBox;
		$(".icon-battery").width("100%");
		if(instance.count==0){
			instance.overTime();
			return false;
		}
		
		instance.count--;
		
		instance.isStart = true;
		
		if(instance.isFirst){
			instance.isFirst = false;
		}else{
			random = Math.floor(Math.random() * arr.length + 1)-1;
		}
		$(bindBox+" li").removeClass("icon-light");
		
		$(instance.countDown).text(instance.timeout);
		
		for(var i=0;i<arr[random].length;i++){
			$(bindBox+" li").eq(arr[random][i]-1).addClass("icon-light");
		}
		
		cd = setInterval(function(){
			var second = parseInt($(instance.countDown).text());
			if(second<1){
				$(".icon-battery").width(percent);
				instance.isStart = false;
				clearInterval(cd);
				var len = $(".icon-light").length;
				if(len>0){
					instance.failed();
				}
				return;
			}
			second--;
			var percent;
			if(second==0){
				percent = 0;
			}else if(second>13){
				percent = (second*5-1.1)*4.25+"px";
			}else{
				percent = (second*5+0.1)*4.25+"px";
			}
			$(".icon-battery").width(percent);
			$(instance.countDown).text(second);
		},1000);
	},
	clearCD: function(){
		clearInterval(cd);
	}
}
