/*!
	* jQuery Progressive Image Load: ...
	*
	* Dependencies:
	* jQuery 1.4+ (jquery.com)
	*
*/

(function($){
	
	var ver = '0.1',
		$this,
		$body = $('body'),
		$tmpCont = $('<div id="pil-tmp-container" style="display: none !important"/>'),
		queue,
		i = 0;
	
	function _setQueue(a, b){
		var queue = [],
			e;
		
		switch(typeof a){ 
			case 'object':
				if(_isArray(a)){
					e = (b !== undefined && typeof b == 'string') ? b : 'pil::imagesLoadComplete';
					queue.push({files: a, completedEvent: e});
				}else{
					//we have a map, do map stuff...
				}
				break;
			default:
				//if your using a modern browser, you'll get a decent error.
				console.error('You have provided the wrong kind of argument.');
				console.warn('Please pass an Array or Object as your first arg to $.pil');
				break;
		}
		
		return queue;
	}
	
	function _eventController(queue){
		var j,
			qL = queue.length,
			fL;
			
		$this.bind('pil::tmpLoadComplete', _tmpLoadComplete);
		$body.append($tmpCont);
			
		fL = queue[i].files.length-1;
		for(j=fL; j>=0; j--){
			$tmpCont.append('<img src="'+queue[i].files[j]+'" alt="stubbed" />');
		}
		// console.log(queue[i].completedEvent);
		_checkImageLoad($tmpCont.find('img'));

	}
	
	function _isArray(a){
		return a.constructor == (new Array).constructor;
	}
	
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
	
	function _tmpLoadComplete(e){
		//trigger EXTERNAL event here
		$this.trigger(queue[i].completedEvent);
		$this.unbind('pil::tmpLoadComplete', _tmpLoadComplete);
		$tmpCont.remove();
		if(typeof queue[i+1] !== 'undefined'){
			i++;
			_eventController(queue);
		}
	}
	
	function _checkImageLoad($collection){
		var isLoaded = {};
		
		$.each($collection, function(){
			isLoaded[$(this).attr('src')] = false;
		});
		
		$collection
			.load(function(){ 
				isLoaded[$(this).attr('src')] = true;
				
				if(_allTrues(isLoaded)){
					$collection.unbind('load');
					$this.trigger('pil::tmpLoadComplete');
				}
			 })
			.each(function(index) { // check complete in case background images load from cache
				if(this.complete) {
					if(_allTrues(isLoaded) === false ){ $(this).trigger('load'); }
				}
            });
	}
	
	$.fn.pil = function(a, b){
		$this = $(this);
		queue = _setQueue(a, b);
			
		return this.each(function(){
			_eventController(queue);
		});
	};
	
	$.fn.pil.ver = function() { return ver; };
	
})(jQuery);