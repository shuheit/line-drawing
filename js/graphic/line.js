var stage, line, shape, oldX, oldY, clickX, clickY, size, color, isMouseDown;
var positions = [];

function initCanvas() {
    stage = new createjs.Stage('canvas');
    stage.enableDOMEvents(true);

    shape = new createjs.Shape();
    stage.addChild(shape);
    color = createjs.Graphics.getRGB(50, 50, 50);
    isMouseDown=false;
    clickX = null;
    clickY = null;
    positions = [];

    stage.on("stagemousedown", function(event) {
        isMouseDown=true;
        setClickPosition(event);
    });
    stage.on("stagemouseup", function(event) {
        isMouseDown=false;
        createNewShape();
    });

    stage.on("stagemousemove", draw);
    
    stage.update();
}

function draw(event){
    if( $('#radio1').is(':checked') ) {
        if(isMouseDown) {
            if (oldX) {
                shape.graphics.beginStroke(color).
                setStrokeStyle(1, "round")
                .moveTo(oldX, oldY)
                .lineTo(event.stageX, event.stageY);
            stage.update();
            }
            oldX = event.stageX;
            oldY = event.stageY;
        }    
    } else if( $('#radio2').is(':checked') ) {
        if(clickX) {
            stage.removeAllChildren();
            var line = new createjs.Shape();
            stage.addChild(line);
            line.graphics.setStrokeStyle(1);
            line.graphics.beginStroke("#000");
            line.graphics.moveTo(clickX, clickY);
            line.graphics.lineTo(event.stageX, event.stageY);
            line.graphics.endStroke();
            drawAllLines();
            stage.update();
        }
    }
}

function createNewShape() {
    oldX = null;
    oldY = null;
    shape = new createjs.Shape();
    stage.addChild(shape);
}

function setClickPosition( event ) {
    if( $('#radio2').is(':checked') ) {
        if(clickX){
        }
        clickX = event.stageX;
        clickY = event.stageY;
        addLinePostion(clickX, clickY);
    } else {
        clickX = null;
        clickY = null;
    }
}

function addLinePostion(x, y) {
    positions.push( {'x': x, 'y': y} );
}

function drawAllLines() {
    var allLines = new createjs.Shape();
    stage.addChild(allLines);
    allLines.graphics.setStrokeStyle(1);
    allLines.graphics.beginStroke("#000");
    allLines.graphics.moveTo(positions[0].x, positions[0].y);
    for(var i =1; i<positions.length; i++) {
        allLines.graphics.lineTo(positions[i].x, positions[i].y);
    }
    allLines.graphics.endStroke();
}

function clearCanvas() {
    stage.clear();
    stage.removeChild(shape);
    initCanvas();
}