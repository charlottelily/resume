/**
 * 打印机打印字母效果
 * author：王超 -- charlotte
 * date: 2016.07.13
 */

+function($){
	'use strict';

	var Print = function (element, options) {
		this.options = $.extend({}, Print.DEFAULTS, options);
		this.init(element, options);
		if (this.options.str) {
			this.write(element, this.options);
		}
			
	}


	Print.VERSION = '0.0.1';

	Print.DEFAULTS = {
		'speed' : 300,
		'startIndex' : 0,
		'endIndex' : 0,
		'hasCur' : true,
		'curId' : 'cur',
		'curStr' : '|',
		'curClass' : 'cur',
		'curSpeed' : 100,
		'str': '',
		'delLength': 0
	}

	var flwCurTimer, curSwitch;

	Print.prototype = {
		constructor : Print,

		init : function(element, options){
			var _self = this;
			this.options = this.getOptions(options);

			if(this.options.hasCur) {
				this.initCur(element, this.options);
			}

		},

		//初始化光标
		initCur : function(element, options){
			var _self = this;

			element.innerHTML = _self.flwCur(element, options);
			setInterval(function(){
				var curElement = $('#cur');
				_self.chCur(curElement,options);
			},options.curSpeed);

		},

		write : function(element, options){
			var 
				str = options.str,
				i = options.startIndex,
				end = options.endIndex && options.endIndex <= str.length ? options.endIndex : str.length,
				restr = '',
				_self = this,
				delEnd = 0;

				if(options.delLength > 0) {
					delEnd += options.delLength;
				}

			for( i; i < end + delEnd; i ++){
					(function(i,char){
						setTimeout(function(){
							if(char === '\n'){
								restr += '<br/>'+ options.str;
							}
							if(i >= end) {
								restr = restr.substr(0,restr.length-1);
							}
							else {
								restr += char;
							}
							element.innerHTML = restr + _self.flwCur(element, options);
						},options.speed * (i + 1))
					})(i,str[i]);
			}
			
		},

		getDefaults : function(){
			return Print.DEFAULTS;
		},

		getOptions : function(options){
    	var options = $.extend({}, this.getDefaults(), options)
			return options;
		},

		//创建光标
		flwCur : function(element,options){
			var elem='<span id="'+options.curId+'" class="'+options.curClass+'">'+options.curStr+'</span>';
			return elem
		},

		//跟随光标
		chCur : function(curElement,options){
			curElement.html(curSwitch ? this.options.curStr : '');
			curSwitch = !curSwitch;
		}
	}


	function Plugin(option) {
		return this.each(function () {
      var $this   = $(this);
      var data    = $this.data('print');
      var options = typeof option == 'object' && option;

      if (!data && /destroy|hide/.test(option)) return;
      if (!data) $this.data('print', (data = new Print(this, options)));
    });
  }

	var old = $.fn.print;

	$.fn.print = Plugin;
	$.fn.print.Constructor = Print;

	//放冲突处理
	$.fn.print.noConflict = function(){
		$fn.print = old;
		return this;
	}

}(jQuery);