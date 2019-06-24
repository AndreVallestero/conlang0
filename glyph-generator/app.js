'use strict';

const TO_RADS = Math.PI / 180,
	GLYPH_SIZE = 96,
	GLPH_THICKNESS = GLYPH_SIZE / 10;

var canvas, context,
	darkMode = 0;

function main() {
	canvas = document.getElementById('mainCanvas');
	canvas.width = window.innerWidth * 0.95;
	canvas.height = window.innerHeight * 0.8;
	
	context = canvas.getContext('2d');
	context.lineWidth = GLPH_THICKNESS;
	
	document.getElementById('numInput').onchange = draw;
	document.getElementById('numInput').onkeyup = draw;
	
	draw();
}

function draw() {
	if(darkMode) context.fillStyle = context.strokeStyle = '#000000';
	else context.fillStyle = context.strokeStyle = '#FFFFFF';
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	if(darkMode) context.fillStyle = context.strokeStyle = '#FFFFFF';
	else context.fillStyle = context.strokeStyle = '#000000';
	
	
	let input = document.getElementById('numInput').value;
	if(!input.length) return;
	let glyphList = int_to_glyph(parseInt(input));
	
	draw_glyph_list(GLYPH_SIZE, GLYPH_SIZE, glyphList);
	draw_glyph_list(GLYPH_SIZE, GLYPH_SIZE * 3, glyphList, 1);
	draw_glyph_list(GLYPH_SIZE, GLYPH_SIZE * 5, glyphList, 0);
}

function int_to_glyph(num) {
	let numStr = num.toString(8).split('').reverse().join(''),
		glyphData = [];
	for (let i = 0; i < numStr.length; ++i)
		glyphData.push([parseInt(numStr[i]), i, 0]);
	return glyphData;
}

function draw_glyph_list(startXPos, startYPos, glyphList, style = 2) {
	for (let i = 0; i < glyphList.length; ++i)
		draw_glyph(startXPos + i * GLYPH_SIZE * 1.05,
			startYPos,
			glyphList[i][0],
			glyphList[i][1],
			glyphList[i][2],
			style);
}

// xPos (float) x position of glyph
// yPos (float) y position of glyph
// node1Val (int) value of left node from 0 to 7, defaults to 0
// node2Val (int) value of right node from 0 to 7, defaults to 0
// node3Val (int) value of bottom node from 0 to 7, defaults to 0
// style (int) draw style, 2 is formal, 1 is semi-formal, 0 is informal, defaults to 2
function draw_glyph(xPos, yPos, node1Val = 0, node2Val = 0, node3Val = 0, style = 2) {
	let halfGlyphSize = GLYPH_SIZE / 2,
		xDelta = Math.sin(60 * Math.PI / 180) * halfGlyphSize,
		yDelta = Math.cos(60 * Math.PI / 180) * halfGlyphSize;
			
	// Draw dots if semi-formal(1) or formal(2)
	if (style) {
			
		draw_dot(xPos, yPos) // Center dot
		draw_dot(xPos, yPos - halfGlyphSize) // Top dot
		draw_dot(xPos - xDelta, yPos + yDelta) // Left dot
		draw_dot(xPos + xDelta, yPos + yDelta) // Right dot
		
		// If formal(2), draw lines aswell
		if (style == 2) {
			draw_line(xPos, yPos, xPos, yPos - halfGlyphSize); // Top line
			draw_line(xPos, yPos, xPos - xDelta, yPos + yDelta); // Top line
			draw_line(xPos, yPos, xPos + xDelta, yPos + yDelta); // Top line
		}
	}
	
	draw_node(xPos - xDelta, yPos - yDelta, node1Val, 0);
	draw_node(xPos + xDelta, yPos - yDelta, node2Val, 1);
	draw_node(xPos, yPos + halfGlyphSize, node3Val, 2);
}

// xPos (float) x position of node
// yPos (float) y position of node
// value (int) value of node from 0 to 7, defaults to 0
// type (int) 0 is left, 1 is right, 2 is bottom
function draw_node(xPos, yPos, value, type = 0) {
	if (!value) return;
	draw_dot(xPos, yPos)
	
	let startAngle = -30 + 120 * type;
	let halfGlyphSize = GLYPH_SIZE / 2;
	
	if ([1, 4, 5, 7].includes(value))
		draw_angled_line(xPos, yPos, startAngle, halfGlyphSize);
	if ([2, 4, 6, 7].includes(value))
		draw_angled_line(xPos, yPos, startAngle + 60, halfGlyphSize);
	if ([3, 5, 6, 7].includes(value))
		draw_angled_line(xPos, yPos, startAngle + 120, halfGlyphSize);
}

function draw_angled_line(xPos, yPos, angle, length) {
	let xPos2 = xPos + Math.cos(angle * TO_RADS) * length,
		yPos2 = yPos + Math.sin(angle * TO_RADS) * length;
	draw_line(xPos, yPos, xPos2, yPos2);
	draw_dot(xPos2, yPos2);
}

function draw_dot(xPos, yPos) {
		context.beginPath();
		context.arc(xPos, yPos, GLPH_THICKNESS/2, 0, Math.PI * 2, true);
		context.closePath();
		context.fill();
}

function draw_line(xPos1, yPos1, xPos2, yPos2) {
	context.beginPath();
	context.moveTo(xPos1, yPos1);
	context.lineTo(xPos2, yPos2);
	context.stroke(); 
}

function base_log(x, y) {
  return Math.log(y) / Math.log(x);
}

window.onload = main;