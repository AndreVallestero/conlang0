'use strict';

const CONSONANTS = " nptkwlj",
	VOWELS = "əeɪɔuæiɑ";

var canvas, context, baseGlyph, rowLen,
	darkMode = 0;

function main() {
	baseGlyph = new Image();
	baseGlyph.src = "glyph.bmp";
	
	canvas = document.getElementById('mainCanvas');
	canvas.width = window.innerWidth * 0.98;
	canvas.height = window.innerHeight * 0.8;
	
	context = canvas.getContext('2d');
	context.imageSmoothingEnabled = false;
	context.fillStyle = context.strokeStyle = '#FFFFFF';
	
	document.getElementById('textInput').onchange = draw;
	document.getElementById('textInput').onkeyup = draw;
	
	update_len();
	setTimeout(draw, 100);
}

function update_len() {
	rowLen = parseInt(document.getElementById("rowLen").value);
}

function draw() {
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	let input = document.getElementById('textInput')
		.value.replace(/\s+/g, " ").trim();
	if(!input.length) return;
	let glyphList = text_to_glyph(input);
	
	draw_glyph_list(5, 5, glyphList);
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

function draw_glyph_list(startXPos, startYPos, glyphList) {
	let rows = Math.ceil(glyphList.length / rowLen);
	for (let i = 0; i < rows; ++i) {
		for (let j = 0; j < Math.min(glyphList.length - i * rowLen, rowLen); ++j)
			draw_glyph(startXPos + j * 12,
				startYPos + i * 12, glyphList[i * rowLen + j][0], glyphList[i * rowLen + j][1], glyphList[i * rowLen + j][2]);
	}
}

// xPos (float) x position of glyph
// yPos (float) y position of glyph
// node0Val (int) value of left node from 0 to 7, defaults to 0
// node1Val (int) value of top node from 0 to 7, defaults to 0
// node2Val (int) value of right node from 0 to 7, defaults to 0
function draw_glyph(xPos, yPos, node0Val = 0, node1Val = 0, node2Val = 0) {
	// Base glyph
	context.drawImage(baseGlyph, 1, 2, 4, 4, xPos + 1, yPos + 2, 4, 4);
	context.drawImage(baseGlyph, 5, 5, 1, 6, xPos + 5, yPos + 5, 1, 6);
	context.drawImage(baseGlyph, 6, 2, 4, 4, xPos + 6, yPos + 2, 4, 4);
	
	// Left node
	if ([1, 4, 5, 7].includes(node0Val))
		context.drawImage(baseGlyph, 1, 8, 4, 3, xPos + 1, yPos + 8, 4, 3);
	if ([2, 4, 6, 7].includes(node0Val))
		context.drawImage(baseGlyph, 1, 5, 4, 4, xPos + 1, yPos + 5, 4, 4);
	if ([3, 5, 6, 7].includes(node0Val))
		context.drawImage(baseGlyph, 0, 3, 1, 5, xPos + 0, yPos + 3, 1, 5);
	
	// Top node
	if(node1Val)
		context.drawImage(baseGlyph, 5, 0, 1, 1, xPos + 5, yPos + 0, 1, 1);
	if ([1, 4, 5, 7].includes(node1Val))
		context.drawImage(baseGlyph, 1, 0, 4, 3, xPos + 1, yPos + 0, 4, 3);
	if ([2, 4, 6, 7].includes(node1Val))
		context.drawImage(baseGlyph, 5, 0, 1, 5, xPos + 5, yPos + 0, 1, 5);
	if ([3, 5, 6, 7].includes(node1Val))
		context.drawImage(baseGlyph, 6, 0, 4, 3, xPos + 6, yPos + 0, 4, 3);
	
	// Right node
	if ([1, 4, 5, 7].includes(node2Val))
		context.drawImage(baseGlyph, 10, 3, 1, 5, xPos + 10, yPos + 3, 1, 5);
	if ([2, 4, 6, 7].includes(node2Val))
		context.drawImage(baseGlyph, 6, 5, 4, 4, xPos + 6, yPos + 5, 4, 4);
	if ([3, 5, 6, 7].includes(node2Val))
		context.drawImage(baseGlyph, 6, 8, 4, 3, xPos + 6, yPos + 8, 4, 3);
}

window.onload = main;