/*!
	* jQuery Image Eventer: ...
	*
	* https://github.com/technicolorenvy/jquery-image_eventer
	*
	* Dependencies:
	* jQuery 1.4+ (jquery.com)
	*
*/

(function($){
	
	var ver = '0.3',
		$elem,
		$body = $('body'),
		$tmpCont = $('<div id="image_eventer-tmp-container" style="display: none !important"/>'),
		queue = [],
		i = 0,
		
		DEFAULT_EVENT = 'image_eventer::imagesLoadComplete';
	
	function _setQueue(a, b){
		var i, iArr,
			colLen,
			cEvent = (b !== undefined && typeof b == 'string') ? b : DEFAULT_EVENT;
		
		switch(typeof a){ 
			case 'object':
				
				//if we're dealing w/ an array of imgs
				if(_isArray(a)){
					_addToQue(a, cEvent);
				}
				else {
					
					//we have a map, do map stuff...
					if(typeof a.collections !== 'undefined' && _isArray(a.collections)){
						colLen = a.collections.length;
						
						for(i=0; i<colLen; i++){
							//array of imgs
							if(_isArray(a.collections[i])){
								_addToQue(a.collections[i], cEvent);
							} 
							//jq parent
							else if($.contains(a.collections[i].files, document.img)){
								iArr = _internalArr($(a.collections[i].files).find('img'));
								_addToQue(iArr, cEvent);
							}
							//formatted 1 to 1
							else {
								if(typeof a.collection[i].completedEvent !== 'undefined'){
									cEvent = a.collection[i].completedEvent;
								}
								_addToQue(a.collections[i].files, cEvent);
							}
						}
						
					//if we have a single jq parent
					} else {
						if($.contains(a, document.img)){
							iArr = _internalArr($(a).find('img'));
							_addToQue(iArr, (b !== undefined && typeof b == 'string') ? b : DEFAULT_EVENT);
						} else {
							_errors();
						}
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
	
	function _addToQue(files, completedEvent){
		queue.push({files: files, completedEvent: completedEvent});
	}
	
	function _isArray(a){
		return a.constructor == (new Array).constructor;
	}
	
	function _internalArr($collection){
		var iArr = [];
		$.each($collection, function(){
			iArr.push($(this).attr('src'));
		});
		return iArr;
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
		$tmpCont.empty().remove();
		
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
		//if your using a modern browser, you'll get a decent error/warning.
		console.error('You have provided the wrong kind of argument.');
		console.warn('Please pass an Array or Object as your first arg to $.image_eventer');
	}
	
	$.fn.image_eventer = function(a, b){
		$elem = $(this);
		queue = _setQueue(a, b);
			
		return this.each(function(){
			_eventController(queue);
		});
	};
	
	$.fn.image_eventer.ver = function() { return ver; };
	
})(jQuery);