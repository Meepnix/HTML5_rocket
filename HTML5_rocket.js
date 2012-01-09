//HTML5_rocket
//Copyright 2011 Christopher Massey
//See LICENCE for details.


//Module Pattern
var init = function()
{

    var percent = 0;
    //Canvas size
    var width = 1000;
    var height = 500;

    //Resources cacher
    var resou = new ImgReady();
    
    //Ship
    var rocket = new Ship();

    //Images
    var rocketImg = resou.addImage("images/rocket.png");
    var spaceImg = resou.addImage("images/space.png");
    
    //Sound
    var engineAud = resou.addAudio("sounds/thrust.ogg");
    
    var imgCount = 0;
    
    
   //Setting up canvas foreground
    var canFg = document.getElementById('fg');
    var canXfg = canFg.getContext('2d');

    //Setting up canvas background
    var canBg = document.getElementById('bg');
    var canXbg = canBg.getContext('2d');

    //Set foreground canvas size
    canFg.width = width;  
    canFg.height = height;
    
    //Set background canvas size
    canBg.width = width;
    canBg.height = height;
    
    var gloop;
    
    var interLoad;
    
    var soundInt;
    
    var soundSet = false;
    
    
    
    
    var loading = function()
    {
        percent = resou.getPercent();
        
        clear();
        canXfg.fillStyle = "black";
        canXfg.font = "20px sans-serif";
        canXfg.fillText( "loading "+percent+" %", 300, 300 );
        
        
        if (percent == 100)
        {
            clearInterval(interLoad);
            canXbg.drawImage(spaceImg, 0, 0);
            loopGame();
            //Implement game sound
            sound();
        }
        
        
    };
    
    
    
    var loopGame = function()
    {
        clear();
        canXfg.save();
        canXfg.translate(rocket.rocketx/2, rocket.rockety/2);
        canXfg.rotate(rocket.rotation * Math.PI / 180);
        canXfg.drawImage(rocketImg, -50, -50, 100, 100);
        
        canXfg.restore();
        rocket.shipMove();
        
    
        gLoop = setTimeout(loopGame, 15);
    
    };
    
    var clear = function()
    {
        canXfg.clearRect(0, 0, width, height);
    };
    
    
    var sound = function()
    {
        if (!soundSet)
        {
            soundSet = true;
            soundInt = setInterval(thrustforSound, 90);
        }
       
    };
    
    //directional rocket sounds
    var thrustforSound = function()
    {
        if (rocket.upRocket)
        {
            engineAud.currentTime = 0;
            engineAud.play();
        }
    };
    
    return{
        
        releaseRocket : function(e)
        {
            if (!e) e = window.event;
                var code;
            if ((e.charCode) && (e.keyCode == 0))
            {
                code = e.charCode;
            }   
            else
            {   
                code = e.keyCode;
            }
    
            switch(code)
            {
                // key down
                case 40: rocket.downRocket = false;
                         break;
                case 90: rocket.downRocket = false;
                         break;
                //key up
                case 38: rocket.upRocket = false;
                         break;
                case 65: rocket.upRocket = false
                         break;
                //key left
                case 37: rocket.leftRocket = false;
                         break;
                //key right
                case 39: rocket.rightRocket = false;
                         break;        
            }    
        },

        pressRocket : function(e)
        {
            
            if (!e) e = window.event;
                var code;
            if ((e.charCode) && (e.keyCode == 0))
            {
                code = e.charCode;
            
            }
            else
            {
                code = e.keyCode;
            
            }
    
            switch(code)
            {
                // key down
                case 40: rocket.downRocket = true;
                         break;
                case 90: rocket.downRocket = true;
                         break;
                //key up
                case 38: rocket.upRocket = true;
                         
                         break;
                case 65: rocket.upRocket = true;
                         
                         break;
                //key left
                case 37: rocket.leftRocket = true;
                         break;
                //key right
                case 39: rocket.rightRocket = true;
                         break;
            }
        },

        start : function()
        {
            loading();
            
            
        }
        
    };
    
    //Every second checks the status of resources loading
    var interLoad = setInterval(loading, 1000);
    
}();


//Engage!!!

window.onload = function(){
	
    init.start();

    document.onkeyup = init.releaseRocket;
	document.onkeydown = init.pressRocket;
	    
};
