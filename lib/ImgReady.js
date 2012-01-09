/**
 * @fileoverview Function scope class module, containing a resource caching Utility.
 * @Author Christopher Massey
 * @preserve Copyright 2011-2012 Christopher Massey.
 *     See LICENCE for details.
 */

var ImgReady = (function create() {
    /**
      @lends ImgReady.prototype
    */

    /**
     * Class for caching and status of image resources being loaded.
     * @constructor
     */
    function ImgReady() 
    {
    
        this.imageArray = new Array();
        this.loadCount = 0;
        this.compPointer = undefined;
    }
    
    /**
     * Method allows for a png image file to be cached in this instance of ImgReady 
     *     and returns a reference of the specfic image that was just cached.
     * @parameter {string} url This parameter receives a relative uniform resource locator.
     *     Example: "images/rocket.png"
     * @returns {Image} Returns reference of image instance.
     */
    ImgReady.prototype.addImage = function(url) 
    {
        var locate = 0;
        
        locate = this.imageArray.push(new Image())
        this.imageArray[locate - 1].loadStat = false;
        //Once the image has loaded run function to change load status.
        this.imageArray[locate - 1].onload = this._imageLoaded(locate - 1);
        this.imageArray[locate - 1].src = url;
        
        
        return this.imageArray[locate - 1];
    };
    
     /**
     * Method allows for a browser compartible audio file to be cached and returns a reference to 
     *     the cached file.
     * @parameter {string} url This parameter receives a relative uniform resource locator.
     *     Example: "sounds/alert.ogg"
     * @returns {Audio} Returns reference of audio instance.
     */
    ImgReady.prototype.addAudio = function(url)
    {
        var locate = 0;
        
        locate = this.imageArray.push(new Audio());
        this.imageArray[locate - 1].loadStat = false;
        //Once the audio data has loaded run function to change load status.
        this.imageArray[locate - 1].oncanplaythrough = this._imageLoaded(locate - 1);
        this.imageArray[locate - 1].src = url;
        
        return this.imageArray[locate - 1];
    };
    
    /**
     * Private Method is for changing the status of the received Image 
     *     and running an external function, if implemented
     * @parameter {Image} locat This is a reference to an Image instance with an 
     *     extra boolean property: loadStat.
     */
    ImgReady.prototype._imageLoaded = function(locat)
    {
        this.loadCount++;
        this.imageArray[locat].loadStat = true;
        if (typeof this.compPointer == "function")
            {
                this.compPointer();
            }
    };
    
    /**
     * Method for storing an external function reference.
     * @parameter {function} External function, no parameters need. 
     */
    ImgReady.prototype.setCompFunction = function(func)
    {
        this.compPointer = func
    };
    
    /**
     * Method for showing the percentage of images loaded.
     * @return {integer} 0 to 100 percentage.
     */
    ImgReady.prototype.getPercent = function()
    {
        var count = this.loadCount;
        var len = this.imageArray.length;
    
        if (count == len)
        {
            return 100;
        }
        else
        {
            return Math.floor(count / len * 100);
        }
    };
    
    /**
     * Method for accessing the image instance for debugging purposes.
     * @return {Array.<Image>} direct access to the image cache.
     */
    ImgReady.prototype.debugStatus = function()
    {
        return this.imageArray;
    };
    
    /**
     * Method for deleting the resource cache.
     */
    ImgReady.prototype.deleteCache = function()
    {
        this.imageArray = [];
        this.loadCount = 0;
    };
    
    /**
     * Method for removing the external function reference.
     */
    ImgReady.prototype.deleteCompFunction = function()
    {
        this.compPointer = undefined;
    };
    
    return ImgReady;
    
}());