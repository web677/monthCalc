/*
 * Downloads: https://github.com/web677/monthCalc/
 * Autor: 李小白
 * Date: 2016-04-26
 * Contact: 407907175@qq.com
 */
;
(function(root, factory) {
	if (typeof define === 'function' && define.amd) {//amd
		define(factory);
	}else if (typeof define === 'function' && define.cmd) {// cmd
		define(function(require, exports, module) {
			return factory();
		});
	} else if (typeof exports === 'object') { //umd
		module.exports = factory();
	}else {
		root.monthCalc = factory();
	}
})(this,function(){
	var monthCalc = function(option){
		var nowDate = new Date(),
			defaults = {
				container : document.body,	//列表外层容器
				month : 12,					//总月份
				val   : 100,				//每月金额
				sep   : ["-","-"],			//日期格式分隔符
				difM  : [],					//金额不同月份
				difV  : [],					//对应月份金额
				difC  : [],					//到账时间不同月份
				difT  : []					//对应月份时间
			};

		var	cY = nowDate.getFullYear(),
			cM = nowDate.getMonth() + 1,
			cD = nowDate.getDate(),
			innerHtml = '',
			result = (function(op){
				for (var val in op) {
		    		defaults[val] = op[val] ;
		    	}
		    	return defaults;
			})(option);
// 返回每月日期
		for (var i = 0 ;i < result.month ; i++){
			var cTime = (function(y,m,d){
				var _Y = Math.floor((m + i) / 12 ) + y,
					_M = (m + i) % 12 === 0 ? 12 : (m + i) % 12,
					_D = function(){
						if([1,3,5,7,8,10,12].indexOf(_M) > -1 || d <= 28){
							return d ;
						}else{
							if([4,6,9,11].indexOf(_M) > -1 ){
								return d >= 30 ? 30 : d;
							}else{
								return (_Y%4 === 0 && _Y%100 != 0 || _Y%400 === 0 ) ? 29 : 28 ;
							}
						}
					};
				return {
					Y : _Y,
					M : _M,
					D : _D()
				}
			}(cY,cM,cD));

			var valText  = result.difM.indexOf(i) > -1 ? result.difV[result.difM.indexOf(i)] : result.val,
				timeText = result.difC.indexOf(i) > -1 ? result.difT[result.difC.indexOf(i)] :  cTime.Y + (result.sep[0] || result.sep) + cTime.M + (result.sep[1] || result.sep[0] || result.sep) + cTime.D ;

			innerHtml += '<li class="m-item"><span class="m-num">' + valText + '元（' + (i+1) + '/' + result.month + '）</span><span class="m-time">' + timeText +'</span></li>';
		}	
		var ul = document.createElement("ul");
			ul.innerHTML = innerHtml;
			ul.className = "m-list";
		result.container.appendChild(ul);
	};
	return monthCalc;
});