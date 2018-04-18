var draw = (function(){

    //Get the height and width of the main element.
    var mWidth = document.querySelector('main').offsetWidth;
    var mHeight = document.querySelector('main').offsetHeight;

    //Create the canvas
    var canvas = document.createElement('canvas');

    //create the context
    var ctx = canvas.getContext('2d');

    //Create the initial bounding rectangle
    var rect = canvas.getBoundingClientRect();

    //current x,y position
    var x = 0;
    var y = 0;

    //start x,y position
    var x1 = 0;
    var y1 = 0;

    //end x,y position
    var x2 = 0;
    var y2 = 0;

    //set the shape to be drawn
    var shape = '';

    return {

        //Set the x,y cords based on current event data
        setXY: function(evt){
            x = (evt.clientX - rect.left) - canvas.offsetLeft;
            y = (evt.clientY - rect.top) - canvas.offsetTop;
        },

        //Write the x,y cords based on current event data
        writeXY: function(){
            document.getElementById('trackX').innerHTML = 'X: ' + x;
            document.getElementById('trackY').innerHTML = 'Y: ' + y;
        },

        //Sets the shape to be drawn
        setShape: function(shp){
            shape = shp;
            console.log(shape);
        },

        //Set x1,y1
        setStart: function(){
            x1=x;
            y1=y;
        },

        //Set x2,y2
        setEnd: function(){
            x2=x;
            y2=y;
        },

        //Access the canvas
        getCanvas: function(){
            return canvas;
        },

        drawRect: function(x, y, h, w){
            ctx.fillStyle = '#' + Math.floor(Math.random()*16777215).toString(16);
            ctx.fillRect(x1, y1, (x2-x1), (y2-y1));
        },

        //Initialize the object, this must be called before anything else
        init: function(){
            canvas.width = mWidth;
            canvas.height = mHeight;
            document.querySelector('main').appendChild(canvas);
        }
    }

})();

//Initialize draw
draw.init();


draw.getCanvas().addEventListener('mousemove', function(evt){
    draw.setXY(evt);
    draw.writeXY();
});

draw.getCanvas().addEventListener('mousedown', function(){
    draw.setStart();
});

draw.getCanvas().addEventListener('mouseup', function(){
    draw.setEnd();
    draw.drawRect();
});


document.getElementById('btnRect').addEventListener('click', function(){
    draw.setShape('Rectangle');
});