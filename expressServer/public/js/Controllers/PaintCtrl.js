'use strict';

var shauli = angular.module('shauli');

shauli.controller('PaintCtrl', ['$scope', '$timeout', function($scope, $timeout) {
    
    $timeout(function() {
        var canvas = $('#canvasInAPerfectWorld');
        var context = canvas[0].getContext("2d");
        var clickX = new Array();
        var clickY = new Array();
        var clickDrag = new Array();
        var paint;
        var colorPurple = "#cb3594";
        var colorGreen = "#659b41";
        var colorYellow = "#ffcf33";
        var colorRed = "#df4b26";
        var colorGray = "#f0f0f0";
        var curTool = "no";
        var curColor = colorPurple;
        var clickColor = new Array();
        var canvasImage;

        context.fillStyle = colorGray;
        context.fillRect(20, 20, canvas[0].width, canvas[0].height);
        canvas.mousedown(function (event) {
            var mouseX = event.pageX - this.offsetLeft;
            var mouseY = event.pageY - this.offsetTop;

            paint = true;
            addClick(event.pageX - this.offsetLeft, event.pageY - this.offsetTop, false, clickX, clickY, clickDrag, clickColor, curTool, curColor, colorGray);
            redraw(clickX, clickY, clickDrag, clickColor, context);
        });
        canvas.mousemove(function (event) {
            if (paint) {
                addClick(event.pageX - this.offsetLeft, event.pageY - this.offsetTop, true, clickX, clickY, clickDrag, clickColor, curTool, curColor, colorGray);
                redraw(clickX, clickY, clickDrag, clickColor, context);
            }
        });
        canvas.mouseup(function (event) {
            paint = false;
        });
        canvas.mouseleave(function (event) {
            paint = false;
        });

        // Registering to events of colors
        $('#choosePurple').mousedown (function (event) {
            curColor = colorPurple;
            curTool = "no";
        });
        $('#chooseGreen').mousedown(function (event) {
            curColor = colorGreen;
            curTool = "no";
        });
        $('#chooseYellow').mousedown(function (event) {
            curColor = colorYellow;
            curTool = "no";
        });
        $('#chooseRed').mousedown(function (event) {
            curColor = colorRed;
            curTool = "no";
        });
        $('#Eraser').mousedown(function (event) {
            curTool = "eraser";
        });
    })
    
    // A click was indicated
    function addClick(x, y, dragging, clickX, clickY, clickDrag, clickColor, curTool, curColor, colorGray) {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
        if (curTool == "eraser") {
            clickColor.push(colorGray);
        } else {
            clickColor.push(curColor);
        }
    }
    // Redrawing after a click/drag
    function redraw(clickX, clickY, clickDrag, clickColor, context) {
        
        context.lineJoin = "round";
        context.lineWidth = 5;

        for (var i = 0; i < clickX.length; i++) {
            context.beginPath();
            if (clickDrag[i] && i) {
                context.moveTo(clickX[i - 1], clickY[i - 1]);
            } else {
                context.moveTo(clickX[i] - 1, clickY[i]);
            }
            context.lineTo(clickX[i], clickY[i]);
            context.closePath();
            context.strokeStyle = clickColor[i];
            context.stroke();
        }
    }
}])