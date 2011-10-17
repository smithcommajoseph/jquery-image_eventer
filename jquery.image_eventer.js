/*!
	* jQuery Image Eventer: https://github.com/technicolorenvy/jquery-image_eventer
	*
	* Dependencies:
	* jQuery 1.4+ (jquery.com)
	*
*/

(function($){
	
	var ver = '0.5',
		DEFAULT_EVENT = 'image_eventer::imagesLoadComplete';
	
	function _setQueue(a, b){
		var i, tQ = [],
			colLen,
			cEvent = (b !== undefined && typeof b == 'string') ? b : DEFAULT_EVENT;
		
		switch(typeof a){ 
			case 'object':
				
				//dealing w/ an array of imgs
				if(_isArray(a)){
					tQ.push({files: a, completedEvent: cEvent});
				}
				else {
					if(typeof a.collections !== 'undefined' && _isArray(a.collections)){
						colLen = a.collections.length;
						
						for(i=0; i<colLen; i++){
							//array of imgs
							if(_isArray(a.collections[i])){
								tQ.push({files: a.collections[i], completedEvent: cEvent});
							} 
							// jq parent
							else if(_isjQWrapper($(a.collections[i]))){
								tQ.push({files: _internalArr($(a.collections[i]).find('img')), completedEvent: cEvent});
							}
							//formatted 1 to 1
							else {
								if(typeof a.collections[i].completedEvent !== 'undefined'){
									cEvent = a.collections[i].completedEvent;
								}
								if( _isjQWrapper($(a.collections[i].files))){
									tQ.push({files: _internalArr($(a.collections[i].files).find('img')), completedEvent: cEvent});
								}else{
									tQ.push({files: a.collections[i].files, completedEvent: cEvent});
								}
							}
						}
					} else {
						//a single jq parent
						if($(a).find('img').length > 0){
							tQ.push({files: _internalArr($(a).find('img')), completedEvent: (b !== undefined && typeof b == 'string') 
																							? b 
																							: DEFAULT_EVENT});
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
		return tQ;
	}
	
	function _eventController($elem, queue){
		var j, fL, uni,
			qL = queue.length;
		
		uni = 'uni-'+ parseInt(Math.random()*2000, 10)+'-'+parseInt(Math.random()*900, 10);

		$('body').append($('<div id="'+uni+'" style="display: none !important"/>'));
		fL = queue[0].files.length-1;
		
		for(j=fL; j>=0; j--){
			$('#'+uni).append('<img src="'+queue[0].files[j]+'" alt="jq-image-eventer" />');
		}
		
		_checkImageLoad($elem, $('#'+uni).find('img'), uni, queue);
	}
	
	function _tmpLoadComplete($elem, uni, queue){
		$elem.trigger(queue[0].completedEvent, [queue[0].files]);
		$('#'+uni).empty().remove();

		if(typeof queue[1] !== 'undefined'){
			queue.shift();	
			_eventController($elem, queue);
		}
	}
	
	function _checkImageLoad($elem, $col, uni, queue){
		var isLoaded = {};
		
		$.each($col, function(){
			isLoaded[$(this).attr('src')] = false;
		});
		
		$col
			.load(function(){ 
				isLoaded[$(this).attr('src')] = true;
				
				if(_allTrues(isLoaded)){
					_tmpLoadComplete($elem, uni, queue);
					$col.unbind('load');
				}
			 })
			.each(function(index) { // in case images load from cache
				if(this.complete) {
					if(_allTrues(isLoaded) === false ){ $(this).trigger('load'); }
				}
            });
	}
	
	function _isArray(a){
		return a.constructor == (new Array).constructor;
	}
	
	function _isjQWrapper(a){
		return a.find('img').length > 0;
	}
	
	function _internalArr($col){
		var iArr = [];
		$.each($col, function(){
			iArr.push($(this).attr('src'));
		});
		return iArr;
	}
	
	function _allTrues(obj){
		var key, i,
			alltrue = [];
		
		for(key in obj){
			if(obj.hasOwnProperty(key)) alltrue.push(obj[key]);
		}
		for(i=0; i<alltrue.length; i++){
			if(alltrue[i] === false) return false;
		}
		return true;
	
	}
	
	function _errors(){
		//if using a modern browser, you'll get a decent warning.
		console.warn('Please pass an Array or Object as your first arg to $.image_eventer');
	}
	
	$.fn.image_eventer = function(a, b){
			
		return this.each(function(){
			var $elem = $(this), 
				queue = _setQueue(a, b);
				
			_eventController($elem, queue);
		});
	};
	
	$.fn.image_eventer.ver = function() { return ver; };
	
})(jQuery);