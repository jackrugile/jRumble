/*
jRumble v1.1 - http://jackrugile.com/jrumble
by Jack Rugile - http://jackrugile.com
Copyright 2011, Jack Rugile
MIT license - http://www.opensource.org/licenses/mit-license.php
*/

(function($){
	$.fn.jrumble = function(options){
	
    // -ms-transform translates to MsTransform, but the correct property is msTransform
    var vendors = ['-webkit','-moz','-o','ms']; 
		function addTransform(obj, value){
      for(var i=vendors.length;i--;){
        obj[vendors[i]+'-transform'] = value;
      } 
      obj.transform = value;
      return obj;
		}
		
		// JRUMBLE OPTIONS
		//---------------------------------
		var defaults = {
			rangeX: 2,
			rangeY: 2,
			rangeRot: 1,
			rumbleSpeed: 10,
			rumbleEvent: 'hover',
			posX: 'left',
			posY: 'top'
		};

		var opt = $.extend(defaults, options);

		return this.each(function(){
			
			// VARIABLE DECLARATION
			//---------------------------------
			$obj = $(this);			
			var rumbleInterval,	
        rangeX = opt.rangeX * 2,
        rangeY = opt.rangeY * 2,
        rangeRot = opt.rangeRot * 2,
        rumbleSpeed = opt.rumbleSpeed,
        objPosition = $obj.css('position'),
        objXrel = opt.posX,
        objYrel = opt.posY,
        objXmove,
        objYmove,
        inlineChange;
			
			// SET POSITION RELATION IF CHANGED
			//---------------------------------
			if(objXrel === 'left'){
				objXmove = parseInt($obj.css('left'),10);
			}
			if(objXrel === 'right'){
				objXmove = parseInt($obj.css('right'),10);
			}
			if(objYrel === 'top'){
				objYmove = parseInt($obj.css('top'),10);
			}
			if(objYrel === 'bottom'){
				objYmove = parseInt($obj.css('bottom'),10);
			}
			
			// RUMBLER FUNCTION
			//---------------------------------			
			function rumbler(elem) {				
				var randBool = Math.random(),
          randX = Math.floor(Math.random() * (rangeX+1)) -rangeX/2,
          randY = Math.floor(Math.random() * (rangeY+1)) -rangeY/2,
          randRot = Math.floor(Math.random() * (rangeRot+1)) -rangeRot/2,
          css = addTransform({}, 'rotate('+randRot+'deg)');
				
				// IF INLINE, MAKE INLINE-BLOCK FOR ROTATION
				//---------------------------------
				if(elem.css('display') === 'inline'){
					inlineChange = true;
					css.display = 'inline-block';
				}
			
				// ENSURE MOVEMENT
				//---------------------------------			
				if(randX === 0 && rangeX !== 0){
					if(randBool < .5){
						randX = 1;
					}
					else {
						randX = -1;
					}
				}
				
				if(randY === 0 && rangeY !== 0){
					if(randBool < .5){
						randY = 1;
					}
					else {
						randY = -1;
					}
				}
			 
				// RUMBLE BASED ON POSITION
				//---------------------------------
				if(objPosition === 'absolute' || objPosition === 'fixed'){
				  randX += objXmove;
				  randY += objYmove;
				} else {
          css.position = 'relative';
				}
				css[objXrel] = randX;
				css[objYrel] = randY;
				elem.css(css);
				
			} // End rumbler function
			
      function startRumble(){
        var rumblee = $(this);
        rumbleInterval = setInterval(function() { rumbler(rumblee); }, rumbleSpeed);
      }
      
      function stopRumble(){
          var rumblee = $(this);
          clearInterval(rumbleInterval);
          rumblee.css(resetRumblerCSS);
          rumblee.css(objXrel, objXmove+'px');
          rumblee.css(objYrel, objYmove+'px');
          if(inlineChange === true){
            rumblee.css('display','inline');
          }		
      }
			
			// EVENT TYPES (rumbleEvent)
			//---------------------------------	
			var resetRumblerCSS = addTransform({'position':objPosition}, 'rotate(0deg)');
			
			if(opt.rumbleEvent === 'hover'){
				$obj.hover(startRumble, stopRumble);
			}
			
			if(opt.rumbleEvent === 'click'){
				$obj.toggle(startRumble, stopRumble);
			}
			
			if(opt.rumbleEvent === 'mousedown'){
				$obj.bind({
					mousedown: startRumble, 
					mouseup: stopRumble,
					mouseout: stopRumble
				});
			}
			
			if(opt.rumbleEvent === 'constant'){
        startRumble.call(this);
			}
			
		});
	}; 
})(jQuery);