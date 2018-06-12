// JavaScript Document
var VELOCITY2 = 1;
			var PARTICLES2 = 30;
			
			var mouse2 = {x:0, y:0};
			var particles2 = [];
			var colors2 = [ "#086b8f","#0db1cf","#3c8ed3"];
			var canvas2 = document.getElementById('projector2');
			var context2;
			
			if (canvas2 && canvas2.getContext) {
				context2 = canvas2.getContext('2d');
				
				for( var i = 0; i < PARTICLES2; i++ ) {
					particles2.push( { 
						x: Math.random()*window.innerWidth, 
						y: Math.random()*window.innerHeight, 
						vx: ((Math.random()*(VELOCITY2*7))-VELOCITY2),
						vy: ((Math.random()*(VELOCITY2*7))-VELOCITY2),
						size: 1+Math.random()*3,
						color: colors2[ Math.floor( Math.random() * colors2.length ) ]
					} );
				}
				
				Initialize();
			}
			
			function Initialize() {
				canvas2.addEventListener('mousemove', MouseMove, false);
				window.addEventListener('mousedown', MouseDown, false);
				window.addEventListener('resize', ResizeCanvas, false);
				setInterval( TimeUpdate, 40 );
				
				ResizeCanvas();
			}
			
			function TimeUpdate(e) {
				
				context2.clearRect(0, 0, window.innerWidth, window.innerHeight);
				
				var len = particles2.length;
				var particle;
				
				for( var i = 0; i < len; i++ ) {
					particle = particles2[i];
					
					if (!particle.frozen) {
						particle.x += particle.vx;
						particle.y += particle.vy;
						
						if (particle.x > window.innerWidth) {
							particle.vx = -VELOCITY2 - Math.random();
						}
						else if (particle.x < 0) {
							particle.vx = VELOCITY2 + Math.random();
						}
						else {
							particle.vx *= 1 + (Math.random() * 0.008);
						}
						
						if (particle.y > window.innerHeight) {
							particle.vy = -VELOCITY2 - Math.random();
						}
						else if (particle.y < 0) {
							particle.vy = VELOCITY2 + Math.random();
						}
						else {
							particle.vy *= 1 + (Math.random() * 0.005);
						}
						
						var distanceFactor = DistanceBetween( mouse, particle );
						distanceFactor = Math.max( Math.min( 5 - ( distanceFactor / 20 ), 5 ), 1 );
						
						particle.currentSize = particle.size*distanceFactor;
					}
					
					context2.fillStyle = particle.color;
					context2.beginPath();
					context2.globalAlpha = 0.92;
					context2.arc(particle.x,particle.y,particle.currentSize,0,Math.PI*2,true);
					context2.closePath();
					context2.fill();
					
				}
			}
			
			function MouseMove(e) {
				mouse.x = e.layerX;
				mouse.y = e.layerY;
			}
			
			function MouseDown(e) {
				var len = particles2.length;
				
				var closestIndex = 0;
				var closestDistance = 2000;
				
				for( var i = 0; i < len; i++ ) {
					var thisDistance = DistanceBetween( particles[i], mouse );
					
					if( thisDistance < closestDistance ) {
						closestDistance = thisDistance;
						closestIndex = i;
					}
					
				}
				
				if (closestDistance < particles2[closestIndex].currentSize) {
					particles2[closestIndex].frozen = true;
				}
			}
			
			function ResizeCanvas(e) {
				canvas2.width = window.innerWidth;
				canvas2.height = window.innerHeight;
			}
			
			function DistanceBetween(p1,p2) {
				var dx = p2.x-p1.x;
				var dy = p2.y-p1.y;
				return Math.sqrt(dx*dx + dy*dy);
			}