function doMove ( obj, attr, dir, target, endFn ) {
	dir = parseInt(getStyle( obj, attr )) < target ? dir : -dir;	
	clearInterval( obj.timer );	
	obj.timer = setInterval(function () {	
		var speed = parseInt(getStyle( obj, attr )) + dir;	
		if ( speed > target && dir > 0 ||  speed < target && dir < 0  ) {
			speed = target;
		}
		obj.style[attr] = speed + 'px';
		if ( speed == target ) {
			clearInterval( obj.timer );
			endFn && endFn();
		}
	}, 30);
}
function opacity(obj, num, target, endFn) {	
		num = getStyle(obj, 'opacity')*100 < target ? num : -num;		
		clearInterval( obj.opacity );		
		obj.opacity = setInterval(function () {			
			var speed = parseInt(getStyle(obj, 'opacity')*100) + num;			
			if ( speed > target && num > 0 || speed < target && num < 0 ) {
				speed = target;
			}			
			obj.style.opacity = speed/100;
			obj.style.filter = 'alpha(opacity='+ speed +')';			
			if ( speed == target ) {
				clearInterval( obj.opacity );
				endFn && endFn();
			}
		}, 20);
}
function shake ( obj, attr, endFn ) {	
	if ( obj.onOff ) { return; }
	obj.onOff = true;	
	var pos = parseInt( getStyle(obj, attr) );			// 有隐患的	
	var arr = [];
	var num = 0;
	var timer = null;		
	for ( var i=20; i>0; i-=2 ) {
		arr.push( i, -i );
	}
	arr.push(0);	
	clearInterval( obj.shake );
	obj.shake = setInterval(function (){
		obj.style[attr] = pos + arr[num] + 'px';
		num++;
		if ( num === arr.length ) {
			clearInterval( obj.shake );
			endFn && endFn();
			obj.onOff = false;
		}
	}, 50);
}
//ie8以下版本currentStyle和标准浏览器getComputedStyle获取经过浏览器运算之后的样式，1复合样式不要去获取，2单一样式不要做判断3不要空格4不要获取未设置的东西
function getStyle ( obj, attr ) { return obj.currentStyle?obj.currentStyle[attr] : getComputedStyle( obj )[attr]; }