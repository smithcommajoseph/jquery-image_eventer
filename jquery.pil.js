/*!
	* jQuery Progressive Image Load: ...
	*
	* Dependencies:
	* jQuery 1.4+ (jquery.com)
	*
*/

(function($){
	
	var ver = '1.0';
	
	var $pil = $.pil = function(arg1, arg2){
		$(window).pil(arg1, arg2);
	};
	
	/****************************************************
	 * _allTrues:boolean
	 * 
	 * checks the values for each prop are true
	 ****************************************************
	/                                                  */
	function _allTrues(obj){
		var key,
			alltrue = [];
		
		for(key in obj){
			if(obj.hasOwnProperty(key)) alltrue.push(obj[key]);
		}
		for(var i=0; i<alltrue.length; i++){
			if(alltrue[i] === false) return false;
		}
		return true;
	
	}
	
	/****************************************************
	 * _imageFirstLoads:void
	 * 
	 * Check to see if we have loaded all the images
	 ****************************************************
	/                                                  */
	function _imageFirstLoads($collection, event){
		var isLoaded = {};
		
		$.each($collection, function(){
			isLoaded[$(this).attr('src')] = false;
		});
		
		$collection
			.load(function(){ 
				isLoaded[$(this).attr('src')] = true;
				
				if(_allTrues(isLoaded)){
					$collection.unbind('load');
					//trigger event here
				}
			 })
			.each(function(index) { // check complete in case background images load from cache
				if(this.complete) {
					if(_allTrues(isLoaded) === false ){ $(this).trigger('load'); }
				}
            });
	}
	
	$.fn.pil = function(arg1, arg2){
		var o = { s: this.selector, c: this.context };

		return this.each(function(){
			
		});
	};
	
	$.fn.pil.ver = function() { return ver; };
	
	$.fn.pil.defaults = {
		
	};
	
})(jQuery);