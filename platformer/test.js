$(document).ready(function() {
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width(); // Width
	var h = $("#canvas").height(); // Height
	var cw = 100; // Cell width

	var rooms = new Array(4);

	for (i = 0; i < 4; i++) {
		rooms[i] = new Array(4);
		for (j = 0; j < 4; j++) {
			rooms[i][j] = 0;
		}
	}

	function paint_cell(x, y, color) {
		ctx.fillStyle = color;
		ctx.fillRect(x * cw, y * cw, cw, cw);
		ctx.strokeStyle = "white";
		ctx.strokeRect(x * cw, y * cw, cw, cw);
	}

	function getPath() {
		var minRooms = 6;
		var steps = 0;
		var x = 0; var y = 0;
		while (steps < minRooms) {
			var r = Math.random();
			var oldX = x; var oldY = y;
			if      (r < 0.50 && x != 3) x++;
			else if (r < 1.00 && y != 3) y++;
			steps++;
			console.log(x + " " + y);
			rooms[x][y] = steps;
		}
	}

	function draw() {
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);

		for (i in rooms) {
			for (j in rooms[i]) {
				if (rooms[i][j] > 0) {
					paint_cell(i, j, "blue");
				}
			}
		}
	}

	getPath();
	draw();
})
