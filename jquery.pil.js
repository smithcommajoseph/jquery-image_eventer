/*!
	* jQuery Progressive Image Load: ...
	*
	* Dependencies:
	* jQuery 1.4+ (jquery.com)
	*
*/

(function($){
	
	var ver = '0.1',
		$elem,
		$body = $('body'),
		$tmpCont = $('<div id="pil-tmp-container" style="display: none !important"/>'),
		queue,
		i = 0;
	
	function _setQueue(a, b){
		var queue = [],
			e, i,
			colLen;
		
		switch(typeof a){ 
			case 'object':
				if(_isArray(a)){
					e = (b !== undefined && typeof b == 'string') ? b : 'pil::imagesLoadComplete';
					queue.push({files: a, completedEvent: e});
				} else {
					//we have a map, do map stuff...
					if(typeof a.collections !== 'undefined' && _isArray(a.collections)){
						colLen = a.collections.length;
						
						for(i=0; i<colLen; i++){
							if(_isArray(a.collections[i])){
								e = 'pil::imagesLoadComplete';
								queue.push({files: a.collections[i], completedEvent: e});
							} else {
								queue.push({files: a.collection[i].files, completedEvent: a.collection[i].completedEvent});
							}
						}
						
					} else {
						_errors();
					}
				}
				break;
			default:
				_errors();
				break;
		}
		
		return queue;
	}
	
	function _eventController(queue){
		var j,
			qL = queue.length,
			fL;
			
		$body.append($tmpCont);
			
		fL = queue[i].files.length-1;
		for(j=fL; j>=0; j--){
			$tmpCont.append('<img src="'+queue[i].files[j]+'" alt="stubbed" />');
		}
		
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
	
	function _tmpLoadComplete(){
		$elem.trigger(queue[i].completedEvent, [queue[i].files]);
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
					_tmpLoadComplete();
					$collection.unbind('load');
				}
			 })
			.each(function(index) { // check complete in case background images load from cache
				if(this.complete) {
					if(_allTrues(isLoaded) === false ){ $(this).trigger('load'); }
				}
            });
	}
	
	function _errors(){
		//if your using a modern browser, you'll get a decent error.
		console.error('You have provided the wrong kind of argument.');
		console.warn('Please pass an Array or Object as your first arg to $.pil');
	}
	
	$.fn.pil = function(a, b){
		$elem = $(this);
		queue = _setQueue(a, b);
			
		return this.each(function(){
			_eventController(queue);
		});
	};
	
	$.fn.pil.ver = function() { return ver; };
	
})(jQuery);