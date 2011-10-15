var jQIe = jQIe || {};

(function($){
	var self = this;
	
	self.Examples = (function(){
		var pub = {},
			$body,
			spinner;
		
		pub.init = function(){
			$body = $('body');
			_spins()
			_binds();
		};
		
		function _spins(){
			var opts = {
			  lines: 10,
			  length: 7,
			  width: 4,
			  radius: 10,
			  color: '#333',
			  speed: 1,
			  trail: 30,
			  shadow: true
			};
			
			spinner = new Spinner(opts).spin();
		}
		
		function _binds(){
			$('#orange-btn').one('click', _orange);
			$('#green-btn').one('click', _green);
			$('#grey-btn').one('click', _grey);
			$('#sienna-btn').one('click', _sienna);
		}
		
		function _orange(e){
			var cnt = 8, i, frag, img,
				color = "orange",
				collection = [],
				frags = [];
			
			//add a spinner
			// $('#'+color+'-collection .spins').append(spinner.el);
			
			for(i=1; i<=cnt; i++){ 
				img = 'imgs/'+color+i+'.jpg';
				frag = '<img src="'+img+'" alt="'+color+' collection image" />';
				collection.push(img);
				frags.push(frag); 
			}
			
			$body
				.bind(color+'CollectonLoaded', function(lE, files){
					//kill the spinner
					// $('#'+color+'-collection .spins').empty().remove();
					
					//append and show imgs
					$('#'+color+'-collection .collection')
						.html(frags.join(''))
						.fadeIn('slow')
						.removeClass('hidden');
				})
				.image_eventer(collection, color+'CollectonLoaded');
				
		}
		
		function _green(e){
			var cnt = 8, i,
				color = "green",
				frags = [];
			
			//add a spinner
			// $('#'+color+'-collection .spins').append(spinner.el);
				
			for(i=1; i<=cnt; i++){ 
				frags.push('<img src="imgs/'+color+i+'.jpg" alt="'+color+' collection image" />'); 
			}
			
			$('#'+color+'-collection .collection').html(frags.join(''));
			
			$body
				.bind(color+'CollectonLoaded', function(lE, files){
					//kill the spinner
					// $('#'+color+'-collection .spins').empty().remove();
					
					//fade in img wrapper
					$('#'+color+'-collection .collection')
						.fadeIn('slow')
						.removeClass('hidden');
				})
				.image_eventer($('#'+color+'-collection .collection'), color+'CollectonLoaded');
		}
		
		function _grey(e){
			var cnt = 12, i, frag,
				img, color = "grey",
				collection1 = [],
				collection2 = [],
				frags1 = [], frags2 = [];
			
			//add a spinners
			// $('#'+color+'-collection #s1').append(spinner.el);
			
			for(i=1; i<=cnt; i++){
				img = 'imgs/'+color+i+'.jpg';
				frag = '<img src="'+img+'" alt="'+color+' collection image" />';
				if(i<=6){ collection1.push(img); frags1.push(frag); }
				else	{ collection2.push(img); frags2.push(frag); }
			}
			
			$body
				.bind({
					'greys1Loaded': function(e){
						// $('#'+color+'-collection #s1').empty().remove();
						$('#'+color+'-collection .collection').append(frags1.join(''));
						// $('#'+color+'-collection #s2').append(spinner.el);
					},
					'greys2Loaded': function(e){
						// $('#'+color+'-collection #s2').empty().remove();
						$('#'+color+'-collection .collection').append(frags2.join(''));
					}
				})
				.image_eventer({
					collections:[
						{files: collection1, completedEvent: 'greys1Loaded'},
						{files: collection2, completedEvent: 'greys2Loaded'}
					]
				});
		}
		
		function _sienna(e){
			var cnt = 35, i, img, frag,
				color = "sienna",
				collections = [],
				frags = [];
				
			for(i=1; i<=cnt; i++){
				img = 'imgs/'+color+i+'.jpg';
				frag = '<img src="'+img+'" alt="'+color+' collection image" class="hidden" />';
				collections.push([img]);
				frags.push(frag); 
			}
			
			$('#'+color+'-collection .collection').html(frags.join(''));
			
			$body
				.bind(color+'CollectonLoaded', function(e,file){
					$('#'+color+'-collection .collection img[src="'+file.join('')+'"]').fadeIn().removeClass('hidden');
				})
				.image_eventer({collections: collections}, color+'CollectonLoaded')
		}
		
		return pub;
	})();
	
	self.Construct =(function(){
		$(document).ready(function(){
			jQIe.Examples.init();
		});
	})();
	
}).call(jQIe, jQuery);