var Slider = function (btn, bar, step) {
	this.btn = document.getElementById(btn); //滑块
	this.bar = document.getElementById(bar); // div
	this.step = document.getElementById(step); // 已滑
};
Slider.prototype = {
	init: function (callback) {
		var f = this, g = document, b = window, m = Math;	
		// 拖拉事件	
		f.btn.onmousedown = function (e) {
			var x = (e || b.event).clientX;
			var l = this.offsetLeft;
			var max = f.bar.offsetWidth - this.offsetWidth;
			g.onmousemove = function (e) {
				var thisX = (e || b.event).clientX;
				var to = m.min(max, m.max(-2, l + (thisX - x)));
				f.btn.style.left = to + 'px';
				f.ondrag((m.max(0, to / max) * 100).toFixed(1),to);
				callback.call(f,f.ondrag((m.max(0, to / max) * 100).toFixed(1)));
				b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
			};
			g.onmouseup = new Function('this.onmousemove=null');
		};
		// 点击事件
		f.bar.onclick = function(e){
			var x = (e || b.event).clientX; // 鼠标坐标
			var l = this.offsetLeft;
			var obj = this;
		    while (obj = obj.offsetParent) {
		        l += obj.offsetLeft; 
		    } 			
			var s = f.btn.clientWidth;
			var a = x-l-f.btn.clientWidth/2 < 0 ? 0 : x-l-f.btn.clientWidth/2;
			var max = Math.min(a,this.clientWidth-s); // 鼠标相当于0的坐标
			f.btn.style.left = max + 'px';
			f.ondrag((max*100/(this.offsetWidth-s)).toFixed(1),max);
			callback.call(f,f.ondrag((max*100/(this.offsetWidth-s)).toFixed(1)));
		}
	},
	ondrag: function (pos,x) {
		this.step.style.width = Math.max(0, x) + 'px';
		return pos;
	},
	setSlider:function(num){
		if (num > 100){
			num = 100;
		}
		this.btn.style.left = (this.bar.offsetWidth - this.btn.offsetWidth)*num/100  + 'px';
		this.ondrag(num,(this.bar.offsetWidth - this.btn.offsetWidth)*num/100);
	}
}