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

    //previous x,y
    var lx=0;
    var ly=0;

    //set the shape to be drawn
    var shape = '';

    return {

        //Set the x,y cords based on current event data
        setXY: function(evt){
            //Track the last x,y position
            lx=x;
            ly=y;

            //set the current x,y position
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

        //Get the current shape
        getShape: function(){
            return shape;
        },

        //Draws the selected shape
        draw: function(){
            ctx.restore();
            if(shape==='rectangle'){
                this.drawRect();
            }else if(shape==='line'){
                this.drawLine();
            }else if(shape==='circle'){
                this.drawCircle();
            }else if(shape==='path'){
                this.drawPath();
            }else{
                alert('Please choose a shape');
            }
            ctx.save();
        },

        //Draw a line
        drawLine: function(){
            ctx.strokeStyle = '#' + Math.floor(Math.random()*16777215).toString(16);
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        },

        //Draw a rectangle
        drawRect: function(){
            ctx.fillStyle = '#' + Math.floor(Math.random()*16777215).toString(16);
            ctx.fillRect(x1, y1, (x2-x1), (y2-y1));
        },

        //Draw a circle
        drawCircle: function(){
            ctx.fillStyle = '#' + Math.floor(Math.random()*16777215).toString(16);
            ctx.strokeStyle = '#' + Math.floor(Math.random()*16777215).toString(16);
            ctx.beginPath();

            var a = (x1-x2);
            var b = (y1-y2);
            radius = Math.sqrt(a*a+b*b);


            ctx.arc(x1, y1, radius, 0, 2*Math.PI);
            
            

            ctx.stroke();
            ctx.fill();
        },

        //Draw a path during a drag event
        drawPath: function(){
            ctx.strokeStyle = '#' + Math.floor(Math.random()*16777215).toString(16);
            ctx.beginPath();
            ctx.moveTo(lx, ly);
            ctx.lineTo(x, y);
            ctx.stroke();
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
    if(draw.getShape()==='path'){
        draw.draw();
    }
});

draw.getCanvas().addEventListener('mousedown', function(){
    draw.setStart();
});

draw.getCanvas().addEventListener('mouseup', function(){
    draw.setEnd();
    draw.draw();
});

document.getElementById('btnRect').addEventListener('click', function(){
    draw.setShape('rectangle');
});

document.getElementById('btnLine').addEventListener('click', function(){
    draw.setShape('line');
});

document.getElementById('btnCircle').addEventListener('click', function(){
    draw.setShape('circle');
});


document.getElementById('btnPath').addEventListener('click', function(){
    draw.setShape('path');
});

