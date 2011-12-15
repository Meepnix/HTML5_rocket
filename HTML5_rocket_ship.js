
var Ship = (function create() {

    function Ship(width, height)
    {
        //Canvas size
        this.width = width;
        this.height = height;
        
        
        this.rocketx = 200;
        this.rockety = 200;
        
        //Rockect direction variables
        this.upRocket = false;
        this.downRocket = false;
        this.leftRocket = false;
        this.rightRocket = false;
    
        this.preRotation = 0;

        this.rotation = 0;
    
        this.speed = 0;
    
    }
    
    Ship.prototype.shipMove = function()
    {
        if (this.upRocket)
        {
            this.speed++;
            this.preRotation = this.rotation;
        }
    
        if (this.downRocket)
        {
            if (this.speed != 0) 
                this.speed--;
            
        }
    
        if (this.leftRocket)
        {
            this.rotation -= 5;
        }
    
        if (this.rightRocket)
        {
            this.rotation += 5;
        }
    
        //calculate spaceships new position via trigonometry
        this.rocketx += Math.sin(this.preRotation * Math.PI / 180) * this.speed;
        this.rockety += Math.cos(this.preRotation * Math.PI / 180) * -this.speed;
        
        //Speed limit
        if (Math.abs(this.speed) > 14)
        {
            this.speed = 14;
        }
        
        //Canvas border collision
        if (this.rockety > this.height * 2)
        {
            this.rockety = this.height * 2;
        }
        
        if (this.rocketx > this.width * 2)
        {
            this.rocketx = this.width * 2;
        }
        
        if (this.rockety < 0)
            this.rockety = 0;
            
        if (this.rocketx < 0)
            this.rocketx = 0;
    
    
    };
    
    
    
    return Ship;
    
        
    
}());