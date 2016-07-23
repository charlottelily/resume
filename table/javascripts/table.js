
//jQuery ready 

+function ($) {

	var old = $.fn.Table,

			Table = function(element, options){
		 		this.$element  = $(element);
		    this.options   = $.extend({}, Table.DEFAULTS, options);

		    this.init(this.options);
			};

	Table.DEFAULTS = {
		tHeader 		: '.row-header',
		tBody 			: '.table tbody',
		sortUp 			: '.btn-sort-up',
		sortDown 		: '.btn-sort-down',
		defaultSort : '',
		defaultSortReverse : false
	};


	Table.prototype.init = function(options){
		var self = this;

		self.options = self.getOptions(options);
		self.tHeader = self.getjQElem(self.options.tHeader);
		self.tBody = self.getjQElem(self.options.tBody);
		self.sortUp = self.options.sortUp,
		self.sortDown = self.options.sortDown;



		$(self.tHeader).on('click.sort-up',self.sortUp, function(e){

			self.handletHeaderClick($(this),false);

			return false;
		});

		$(self.tHeader).on('click.sort-down',self.sortDown,function(e){
			
			self.handletHeaderClick($(this),true);

			return false;
		});


		if(self.options.defaultSort !== '') {
			var $defaultSort = self.getjQElem(self.options.defaultSort);
			if(self.options.defaultSortReverse){
				console.log('default sort down');
				$defaultSort.find(self.sortDown).trigger('click.sort-down');
			}else{
				console.log('default sort up');
				$defaultSort.find(self.sortUp).trigger('click.sort-up');
			}
		}
	}

	Table.prototype.handletHeaderClick = function($this,isReverse){

		if($this.hasClass('active')) return;
		
		this.setOrder($this,isReverse);
	}



	Table.prototype.setOrder = function($this, isReverse){
		this.tHeader.find('i.btn').removeClass('active');
		$this.addClass('active');

		var parent = $this.parents('td'),
				sortIndex = parent.index(),
				isReverse = isReverse,
				sortArr, sortedArr;

		sortArr = this.getSortArr(this.tBody,sortIndex);

		sortedArr = this.bubbleSort(sortArr, isReverse);
		
		this.appendSortedElems(this.tBody, sortedArr);
	}
	
	//获取比较前数组
	Table.prototype.getSortArr = function (tBody,index){
		var sortArr = [],
				sortObj = {};

		tBody.find('tr').each(function(){
			var $this = $(this);
			sortObj = {};
			sortObj.sortBy = $this.find('td').eq(index).text();
			sortObj.value = $this;
			sortArr.push(sortObj);
		});

		return sortArr;
	}

		//对数组进行冒泡排序
	Table.prototype.bubbleSort = function (sortArr, isReverse){
		var i = 0, j , length = sortArr.length;
		var isTrans = false;

		for(i; i < length - 1; i ++){
			var flag = '';

			for(j = i; j < length; j ++){
				isTrans = this.compare(sortArr[i].sortBy,sortArr[j].sortBy);
				if(isTrans && !isReverse){
					flag = sortArr[i];
					sortArr[i] = sortArr[j];
					sortArr[j] = flag;
				}
				else if(!isTrans && isReverse){
					flag = sortArr[j];
					sortArr[j] = sortArr[i];
					sortArr[i] = flag;
				}
			}
		}

		return sortArr;
	}

	//绑定新元素到table
	Table.prototype.appendSortedElems = function (tBody, sortedArr){
		var length = sortedArr.length, 
				i;

		for(i = 0; i < length; i ++){
			tBody.append(sortedArr[i].value);
		}
	}

		//比较函数
	Table.prototype.compare = function (a, b){
		if(a <= b) {
			return false;
		}else if( a > b){
			return true;;
		}
	}

	Table.prototype.getOptions = function(options){
		options = $.extend({}, this.getDefaults(), this.$element.data(), options)
    return options
	}

	Table.prototype.getDefaults = function () {
    return Table.DEFAULTS
  }

  Table.prototype.getjQElem = function(selector){
  	return "string" == typeof (selector) ? $(selector) : selector;
  }

	function Plugin(option){
		return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.table')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.table', (data = new Table(this, options)))
    })
	
	}

	$.fn.Table = Plugin;
	$.fn.Table.Construct = Table;

	$.fn.Table.noConflict = function(){
		$.fn.Table = old;
		return this;
	}

}(window.jQuery);
