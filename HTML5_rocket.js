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
    
    var imgCount = 0;
    
    
    //Setting up canvas
    var canV = document.getElementById('c');
    var ican = canV.getContext('2d');

    //Set Canvas size
    canV.width = width;  
    canV.height = height;
    
    var gloop;
    
    var interLoad;
    
    
    
    
    var loading = function()
    {
        percent = resou.getPercent();
        
        clear();
        ican.fillStyle = "black";
        ican.font = "20px sans-serif";
        ican.fillText( "loading "+percent+" %", 300, 300 );
        
        
        if (percent == 100)
        {
            clearInterval(interLoad);
            loopGame();
        }
        
        
    };
    
    
    
    var loopGame = function()
    {
        
    
        clear();
        ican.save();
        ican.drawImage(spaceImg, 0, 0);
        ican.translate(rocket.rocketx/2, rocket.rockety/2);
        ican.rotate(rocket.rotation * Math.PI / 180);
        ican.drawImage(rocketImg, -50, -50, 100, 100);
        ican.restore();
        rocket.shipMove();
    
        gLoop = setTimeout(loopGame, 15);
    
    };
    
    var clear = function()
    {
        ican.clearRect(0, 0, width, height);
    };
    
    
    return{
        
        releaseRocket : function(e)
        {
            if (!e) e = window.event;
    
            var code;
            if ((e.charCode) && (e.keyCode==0))
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
            if ((e.charCode) && (e.keyCode==0))
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
