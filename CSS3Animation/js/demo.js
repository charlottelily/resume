$(document).ready(function(){

	//------------- BEGIN VARIABLES --------------
	var jqueryMap = {},
		afterLoad, onLeave;

		jqueryMap.ballon = $('.ballon');
		jqueryMap.fun    = $('.fun');
		jqueryMap.nail   = $('.nail');
	//------------- END VARIABLES --------------

	//------------- BEGIN PLUGIN CONFIG ------------
	$('#pages').fullpage({
		anchors: ['page1','page2','page3','page4'],
		css3: true,
		navigation: false,
		afterLoad: function(anchor, index){
			afterLoad(anchor, index);
		},
		onLeave: function(anchor, index){
			onLeave(anchor, index);
		}
	});
	//------------- END PLUGIN CONFIG ------------

	//------------- BEGIN DOM METHOD --------------

	// Begin public method /afterLoad/
	function afterLoad(anchor, index){

		if(index == 4) {
			setTimeout(function(){
				jqueryMap.ballon.addClass('active');
			},3500);
		}

		if(index == 3) {
			setTimeout(function(){
				jqueryMap.fun.addClass('active');
			},3500);
		}

		if(index == 2) {
			setTimeout(function(){
				jqueryMap.nail.addClass('active');
			},3500);
		}
	}

	// Begin public method /onLeave/
	function onLeave(anchor, index){

		//重置第二屏的效果
		if(index == 2) {
				jqueryMap.nail.removeClass('active');
		}

		//重置第三屏的效果
		if(index == 3) {
				jqueryMap.fun.removeClass('active');
		}

		//重置第四屏的效果
		if(index == 4) {
				jqueryMap.ballon.removeClass('active');
		}
	}
	//------------- END DOM METHOD --------------
});