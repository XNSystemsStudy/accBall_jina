var app = {
	initialize: function() {
		this.bindEvents();
	},
	bindEvents: function() {
		document.addEventListener("touchmove", preventBehavior, false);        
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	onDeviceReady: function() {
		alert('hello');
		ball = document.getElementById("ball");
		updateBallCordinates();
		updateBallCordinates(); 
		ball.style.display = "block";	     document.getElementById("startBtn").addEventListener("touchstart",onStartButton,false);

},
	receivedEvent: function(id) {
		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function updateBallCordinates() 
{
	ball.style.right = ( xMin + x ).toString() + 'px';
	ball.style.bottom =  ( yMin  + y ).toString() + 'px';
}

function onStartButton()
{
	if(frameTimer != null)
	{						  						navigator.accelerometer.clearWatch(timer);
		timer = null;
							
		clearInterval(frameTimer);
		frameTimer = null;
	}
	else
	{
		watchAccel();
		frameTimer = setInterval(onFrameUpdate,20);
													}

}

function preventBehavior(e) { 
	e.preventDefault(); 
};
					
var ballSize = 52;
					
var XfieldSize = 350;
var YfieldSize = 510;

					
var top = 150;
var bottom = 445;
					
var x = XfieldSize / 2;
var y = YfieldSize / 2;
					
var accelInputX = 0.01;
var accelInputY = 0.01;
					
var vx = 0;
var vy = 0;
					
var vLimit = 200;
					
var xMin = 6;
var xMax = xMin + XfieldSize - ballSize;
					
var yMin = 32;
var yMax = yMin + YfieldSize - ballSize;
					
var multiplier = 1.5;
					
var ball;
					
var timer = null;
					
var frameTimer = null;
					
var lastFrameTime = 0;
					
function watchAccel() 
{
	if(timer == null)
	{
		timer = 		navigator.accelerometer.watchAcceleration(onAccellUpdate,onAccelError,{frequency:50});
	}
}				
					
function onFrameUpdate()
{
	vx += accelInputX;
	vy -= accelInputY;
						
	if (vx > vLimit) 
		vx = vLimit;
						
	if (vy > vLimit) 
		vy = vLimit;
												
	x += vx;
	y += vy;
	
	if (y > yMax) 
	{
		y = yMax; 
		vy = -vy / 2;
	}
	else if (y < yMin) 
	{
		y = yMin; 
		vy = -vy / 2;
	}
						
	if (x > xMax) 
	{
		x = xMax; 
		vx = -vx / 2;
	}
	else if (x < xMin) 
	{
		x = xMin; 
		vx = -vx / 2;
	}
						
	updateBallCordinates();
						
}
				
function onAccellUpdate(accel)
{
	accelInputX = accel.x;
	accelInputY = accel.y;
}

function onAccelError(e)
{
	alert("fail: " + e );
}
