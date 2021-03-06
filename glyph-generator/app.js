'use strict';

const TO_RADS = Math.PI / 180,
	CONSONANTS = " nptkwlj",
	VOWELS = "əeɪɔuæiɑ";

var canvas, context,
	glyphSize, glyphThickness,
	darkMode = 0;

function main() {
	canvas = document.getElementById('mainCanvas');
	canvas.width = window.innerWidth * 0.98;
	canvas.height = window.innerHeight * 0.8;
	
	context = canvas.getContext('2d');
	
	document.getElementById('textInput').onchange = draw;
	document.getElementById('textInput').onkeyup = draw;
	
	update_size();
	draw();
}

function update_size() {
	glyphSize = parseInt(document.getElementById("sizeInput").value);
	glyphThickness = glyphSize / 12;
	context.lineWidth = glyphThickness;
}

function draw() {
	if(darkMode) context.fillStyle = context.strokeStyle = '#000000';
	else context.fillStyle = context.strokeStyle = '#FFFFFF';
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	if(darkMode) context.fillStyle = context.strokeStyle = '#FFFFFF';
	else context.fillStyle = context.strokeStyle = '#000000';
	
	let input = document.getElementById('textInput')
		.value.replace(/\s+/g, " ").trim();
	if(!input.length) return;
	let glyphList = text_to_glyph(input);
	
	draw_glyph_list(glyphSize, glyphSize, glyphList);
	draw_glyph_list(glyphSize, glyphSize * 3.5, glyphList, 1);
	draw_glyph_list(glyphSize, glyphSize * 6, glyphList, 0);
}

function text_to_glyph(text) {
	let textList = text.split(" "),
		glyphList = [];
	for (let glyphText of textList) {
		let glyphData = [],
			vowelIndex = glyphText.search(
				new RegExp(VOWELS.split("").join("|"), "g"));
		if(!vowelIndex)
			glyphData.push(0);
		
		for (let i = 0; i < glyphText.length; ++i) {
			let textChar = glyphText[i];
			let val = CONSONANTS.indexOf(textChar);
			if (val < 0 && i == vowelIndex)
				val = VOWELS.indexOf(textChar);
			if (val < 0)
				val = parseInt(textChar);
			if (isNaN(val))
				val = 0;
			glyphData.push(val);
		}
		
		if (glyphData.length < 3)
			glyphData.push(0);
		glyphList.push(glyphData);
	}
	return glyphList;
}

function draw_glyph_list(startXPos, startYPos, glyphList, style = 2) {
	for (let i = 0; i < glyphList.length; ++i)
		draw_glyph(startXPos + i * glyphSize * 1.05,
			startYPos,
			glyphList[i][0],
			glyphList[i][1],
			glyphList[i][2],
			style);
}

// xPos (float) x position of glyph
// yPos (float) y position of glyph
// node0Val (int) value of left node from 0 to 7, defaults to 0
// node1Val (int) value of top node from 0 to 7, defaults to 0
// node2Val (int) value of right node from 0 to 7, defaults to 0
// style (int) draw style, 2 is formal, 1 is semi-formal, 0 is informal, defaults to 2
function draw_glyph(xPos, yPos, node0Val = 0, node1Val = 0, node2Val = 0, style = 2) {
	let halfGlyphSize = glyphSize / 2,
		xDelta = Math.sin(60 * Math.PI / 180) * halfGlyphSize,
		yDelta = Math.cos(60 * Math.PI / 180) * halfGlyphSize;
			
	// Draw dots if semi-formal(1) or formal(2)
	if (style) {
			
		draw_dot(xPos, yPos) // Center dot
		draw_dot(xPos - xDelta, yPos - yDelta) // Left dot
		draw_dot(xPos, yPos + halfGlyphSize) // Top dot
		draw_dot(xPos + xDelta, yPos - yDelta) // Right dot
		
		// If formal(2), draw lines aswell
		if (style == 2) {
			draw_line(xPos, yPos, xPos - xDelta, yPos - yDelta); // Left line
			draw_line(xPos, yPos, xPos, yPos + halfGlyphSize); // Top line
			draw_line(xPos, yPos, xPos + xDelta, yPos - yDelta); // Right line
		}
	}
	
	draw_node(xPos - xDelta, yPos + yDelta, node0Val, 0);
	draw_node(xPos, yPos - halfGlyphSize, node1Val, 1);
	draw_node(xPos + xDelta, yPos + yDelta, node2Val, 2);
}

// xPos (float) x position of node
// yPos (float) y position of node
// value (int) value of node from 0 to 7, defaults to 0
// type (int) 0 is left, 1 is top, 2 is right
function draw_node(xPos, yPos, value, type = 0) {
	if (!value) return;
	draw_dot(xPos, yPos)
	
	let startAngle = 30 + 120 * type;
	let halfGlyphSize = glyphSize / 2;
	
	if ([1, 4, 5, 7].includes(value))
		draw_angled_line(xPos, yPos, startAngle, halfGlyphSize);
	if ([2, 4, 6, 7].includes(value))
		draw_angled_line(xPos, yPos, startAngle - 60, halfGlyphSize);
	if ([3, 5, 6, 7].includes(value))
		draw_angled_line(xPos, yPos, startAngle - 120, halfGlyphSize);
}

function draw_angled_line(xPos, yPos, angle, length) {
	let xPos2 = xPos + Math.cos(angle * TO_RADS) * length,
		yPos2 = yPos + Math.sin(angle * TO_RADS) * length;
	draw_line(xPos, yPos, xPos2, yPos2);
	draw_dot(xPos2, yPos2);
}

function draw_dot(xPos, yPos) {
		context.beginPath();
		context.arc(xPos, yPos, glyphThickness/2, 0, Math.PI * 2, true);
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