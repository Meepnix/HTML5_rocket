//Mooiter
//Copyright 2011 Christopher Massey
//See LICENCE for details.


//Module Pattern
init = function()
{
    //Canvas size
    var width = 1000;
    var height = 500;

    var rocketx = 200;
    var rockety = 200;

    //Images
    var rocketImg = new Image();
    var spaceImg = new Image();

    //Setting up canvas
    var canV = document.getElementById('c');
    var ican = canV.getContext('2d');

    //Set Canvas size
    canV.width = width;  
    canV.height = height;
    
    

    
    

    //Rockect direction variables
    var upRocket = false;
    var downRocket = false;
    var leftRocket = false;
    var rightRocket = false;
    
    var temprotation = 0;

    var rotation = 0;
    
    

    var speed = 0;
    
    var gloop;
    
    
    var loadImages = function()
    {
        rocketImg.src = "images/rocket.png";
        spaceImg.src = "images/space.png";
    }
    
    var loopGame = function()
    {
        
    
        clear();
        ican.save();
        ican.drawImage(spaceImg, 0, 0);
        ican.translate(rocketx/2, rockety/2);
        ican.rotate(rotation * Math.PI / 180);
        ican.drawImage(rocketImg, -50, -50, 100, 100);
        ican.restore();
        moveTest();
    
        gLoop = setTimeout(loopGame, 1000 / 50);
    
    }
    
    var clear = function()
    {
        ican.clearRect(0, 0, width, height);
    }
    
    var moveTest = function()
    {
        if (upRocket)
        {
            speed++;
            temprotation = rotation;
        }
    
        if (downRocket)
        {
            if (speed != 0) 
                speed--;
            
        }
    
        if (leftRocket)
        {
            rotation -= 5;
        }
    
        if (rightRocket)
        {
            rotation += 5;
        }
    
        //calculate spaceships new position via trigonometry
        rocketx += Math.sin(temprotation * Math.PI / 180) * speed;
        rockety += Math.cos(temprotation * Math.PI / 180) * -speed;
        
        //Speed limit
        if (Math.abs(speed) > 14)
            speed = 14;

        //Canvas border collision
        if (rockety > canV.height * 2)
            rockety = canV.height * 2;
        
        if (rocketx > canV.width * 2)
            rocketx = canV.width * 2;
        
        if (rockety < 0)
            rockety = 0;
            
        if (rocketx < 0)
            rocketx = 0;
        
       
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
                case 40: downRocket = false;
                         break;
                case 90: downRocket = false;
                         break;
                //key up
                case 38: upRocket = false;
                         break;
                case 65: upRocket = false
                         break;
                //key left
                case 37: leftRocket = false;
                         break;
                //key right
                case 39: rightRocket = false;
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
                case 40: downRocket = true;
                         break;
                case 90: downRocket = true;
                         break;
                //key up
                case 38: upRocket = true;
                         break;
                case 65: upRocket = true;
                         break;
                //key left
                case 37: leftRocket = true;
                         break;
                //key right
                case 39: rightRocket = true;
                         break;
            }
        },

        start : function()
        {
            loadImages();
            loopGame();
        }
        
    };
    
}();


//Engage!!!

window.onload = function(){
	
    init.start();
    //a.start();
   
    //a.width = 100;
	//Keypress event
    document.onkeyup = init.releaseRocket;
	document.onkeydown = init.pressRocket;
	
    
};
