// var url = document.URL;
// if (url.indexOf('#') > -1) {
// 	console.log(Math.seedrandom(url.substring(url.indexOf('#') + 1)));
//
// }

Math.seedrandom();

var dirs = ["up", "down", "right", "left"];
var colors = ["blue", "red", "green", "yellow"];

//Canvas stuff
var canvas = $("#canvas")[0];
var ctx = canvas.getContext("2d");
var w = $("#canvas").width(); // Width
var h = $("#canvas").height(); // Height
var cw = 50; // Cell width

newCells();

setInterval(update, 150);

function update() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, w, h);
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, w, h);
	for (i in cells) {
		cells[i].updatePosition();
		paint_cell(cells[i].x, cells[i].y, cells[i].color);
	}
	for (i in cells) {
		cells[i].checkCollisions(cells);
	}
}

function paint_cell(x, y, color) {
	ctx.fillStyle = color;
	ctx.fillRect(x * cw, y * cw, cw, cw);
	ctx.strokeStyle = "white";
	ctx.strokeRect(x * cw, y * cw, cw, cw);
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function newCells() {
	var numCells = document.getElementById("cellInput").value;
	console.log(numCells);
	cells = [];
	for (i = 0; i < numCells; i++) {
		cells.push(new Cell(randomInt(1, 7), randomInt(1, 7), dirs[randomInt(0, 3)], i, colors[randomInt(0, colors.length)]));
	}
}
