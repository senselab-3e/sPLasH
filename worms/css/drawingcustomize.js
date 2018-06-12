var coloroptions = [ '#003f8e', '#A7EBCA', '#FFFFFF', '#D8EBA7',  ];
		document.getElementById("demo").innerHTML = coloroptions[0];
			
		coloroptions.length = mm;	
			
			
        var COLOURS = coloroptions[0];
			
			
        var radius = 0;

        Sketch.create({

            container: document.getElementById( 'container' ),
            autoclear: false,
            retina: 'auto',

            setup: function() {
                console.log( 'setup' );
            },

            update: function() {
                radius = 2 + abs( sin( this.millis * 0.003 ) * 50 );
            },

            // Event handlers

            keydown: function() {
                if ( this.keys.C ) this.clear();
            },

            // Mouse & touch events are merged, so handling touch events by default
            // and powering sketches using the touches array is recommended for easy
            // scalability. If you only need to handle the mouse / desktop browsers,
            // use the 0th touch element and you get wider device support for free.
			touchmove: function (){
				
            //touchmove: function() {

                for ( var i = this.touches.length - 1, touch; i >= 0; i-- ) {

                    touch = this.touches[i];

                    this.lineCap = 'round';
                    this.lineJoin = 'round';
                    this.fillStyle = this.strokeStyle = COLOURS; //[ i % COLOURS.length ] i deleted this bit. i'm trying to sort/randomize what colour it loads.
                    this.lineWidth = radius;
					this.globalAlpha = 0.2;

                    this.beginPath();
                    this.moveTo( touch.ox, touch.oy );
                    this.lineTo( touch.x, touch.y );
                    this.stroke();
                }
            }
        });// JavaScript Document