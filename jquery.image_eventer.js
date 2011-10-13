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
		DEFAULT_EVENT = 'image_eventer::imagesLoadComplete';
	
	function _setQueue(a, b){
		var i, iArr, tQueue = [],
			colLen,
			cEvent = (b !== undefined && typeof b == 'string') ? b : DEFAULT_EVENT;
		
		switch(typeof a){ 
			case 'object':
				
				//if we're dealing w/ an array of imgs
				if(_isArray(a)){
					tQueue.push({files: a, completedEvent: cEvent});
				}
				else {
					//we have a map, do map stuff...
					if(typeof a.collections !== 'undefined' && _isArray(a.collections)){
						colLen = a.collections.length;
						
						for(i=0; i<colLen; i++){
							//array of imgs
							if(_isArray(a.collections[i])){
								tQueue.push({files: a.collections[i], completedEvent: cEvent});
							} 
							// jq parent
							// else if($.contains(a.collections[i].files, document.img)){
							// 			console.log('jq parent');
							// 			iArr = _internalArr($(a.collections[i].files).find('img'));
							// 			tQueue.push({files: iArr, completedEvent: cEvent});
							// 		}
							//formatted 1 to 1
							else {
								if(typeof a.collections[i].completedEvent !== 'undefined'){
									cEvent = a.collections[i].completedEvent;
								}
								tQueue.push({files: a.collections[i].files, completedEvent: cEvent});
							}
						}
						
					//if we have a single jq parent
					} else {
						if($(a).find('img').length > 0){
							iArr = _internalArr($(a).find('img'));
							tQueue.push({files: iArr, completedEvent: (b !== undefined && typeof b == 'string') ? b : DEFAULT_EVENT});
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
		return tQueue;
	}
	
	function _eventController($elem, queue, i){
		var j,fL, uni,
			qL = queue.length;
		
		uni = 'uni-'+ parseInt(Math.random()*2000, 10)+'-'+parseInt(Math.random()*900*Math.random(), 10);

		$('body').append($('<div id="'+uni+'" style="display: none !important"/>'));
		fL = queue[i].files.length-1;
		
		for(j=fL; j>=0; j--){
			$('#'+uni).append('<img src="'+queue[i].files[j]+'" alt="stubbed" />');
		}
		
		_checkImageLoad($elem, $('#'+uni).find('img'), uni, queue, i);

	}
	
	// function _addToQue(files, completedEvent){
	// 	tQueue.push({files: files, completedEvent: completedEvent});
	// }
	
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
	
	function _tmpLoadComplete($elem, uni, queue, i){
		$elem.trigger(queue[i].completedEvent, [queue[i].files]);
		$('#'+uni).empty().remove();

		if(typeof queue[i+1] !== 'undefined'){
			i++;	
			_eventController($elem, queue, i);
		}
	}
	
	function _checkImageLoad($elem, $collection, uni, queue, i){
		var isLoaded = {};
		
		$.each($collection, function(){
			isLoaded[$(this).attr('src')] = false;
		});
		
		$collection
			.load(function(){ 
				isLoaded[$(this).attr('src')] = true;
				
				if(_allTrues(isLoaded)){
					_tmpLoadComplete($elem, uni, queue, i);
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
			
		return this.each(function(){
			var $elem = $(this), 
				i = 0,
				queue = _setQueue(a, b);
				
			_eventController($elem, queue, i);
		});
	};
	
	$.fn.image_eventer.ver = function() { return ver; };
	
})(jQuery);