$(document).ready(function() {
	//Canvas stuff
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width(); // Width
	var h = $("#canvas").height(); // Height
	var cw = 10; // Cell width

	var keybindings = [["37", "38", "39", "40"], ["65", "87", "68", "83"]];
	var colors = ["blue", "green", "cyan", "orange", "yellow"];

	var snakes;
	var foods;

	function Snake(id, startingPos, startingDir) {
		this.id = id
		this.body = [];
		this.d = "right";
		this.startingPos = startingPos;
		this.startingDir = startingDir;

		this.length = 20;
		for (var i = this.length - 1; i >= 0; i--) {
			this.body.push({x: startingPos + i, y:startingPos});
		}

		this.respawn = function() {
			this.length = 20;
			this.body = [];
			for (var i = this.length - 1; i >= 0; i--) {
				this.body.push({x: startingPos + i, y:startingPos});
			}
		}

		this.update = function() {
			var nx = this.body[0].x;
			var ny = this.body[0].y;

			if(this.d == "right") nx++;
			else if(this.d == "left") nx--;
			else if(this.d == "up") ny--;
			else if(this.d == "down") ny++;

			if(nx == -1 || nx == w/cw || ny == -1 || ny == h/cw) {
				this.respawn();
				return;
			}

			for (var i = 0; i < snakes.length; i++) {
				if (check_collision(nx, ny, snakes[i].body)) {
					this.respawn();
					return;
				}
			}

			var ateFood = false;
			for (var i = 0; i < foods.length; i++) {
				if(nx == foods[i].x && ny == foods[i].y) {
					var tail = {x: nx, y: ny};
					foods[i].respawn();
					ateFood = true;
				}
			}

			if (ateFood == false) {
				var tail = this.body.pop(); //pops out the last cell
				tail.x = nx; tail.y = ny;
			}

			this.body.unshift(tail); //puts back the tail as the first cell

			for(var i = 0; i < this.body.length; i++) {
				var c = this.body[i];
				paint_cell(c.x, c.y, colors[this.id - 1]);
			}
		}
	}

	function Food() {
		this.x = Math.round(Math.random()*(w-cw)/cw); 
		this.y = Math.round(Math.random()*(h-cw)/cw); 

		this.update = function() {
			paint_cell(this.x, this.y, "red");
		}

		this.respawn = function() {
			this.x = Math.round(Math.random()*(w-cw)/cw); 
			this.y = Math.round(Math.random()*(h-cw)/cw); 
		}
	}


	function check_collision(x, y, array) {
		//This function will check if the provided x/y coordinates exist
		//in an array of cells or not
		for(var i = 0; i < array.length; i++) {
			if(array[i].x == x && array[i].y == y)
				return true;
		}
		return false;
	}

	function paint_cell(x, y, color) {
		ctx.fillStyle = color;
		ctx.fillRect(x * cw, y * cw, cw, cw);
		ctx.strokeStyle = "white";
		ctx.strokeRect(x * cw, y * cw, cw, cw);
	}

	function draw() {
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);

		for (var i = 0; i < snakes.length; i++) {
			snakes[i].update();
		}
		for (var i = 0; i < foods.length; i++) {
			foods[i].update();
		}
	}

	function createSnakes(numSnakes) {
		snakes = [];
		for (var i = 1; i <= numSnakes; i++) {
			snakes[i - 1] = new Snake(i, i + 5, "right");
		}
	}

	function createFoods(numFoods) {
		foods = [];
		for (var i = 0; i < numFoods; i++) {
			foods[i] = new Food();
		}
	}

	function init() {
		var snakeNumStr = prompt("How many players are there? (1 or 2)", "1");
		var snakeNum = parseInt(snakeNumStr);
		createSnakes(snakeNum);
		createFoods(5);
		if (typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(draw, 60);
	}

	init();

	$(document).keydown(function(e) {
		var key = e.which;
		for (var i = 0; i < keybindings.length; i++) {
			if (key == keybindings[i][0] && snakes[i].d != "right") snakes[i].d = "left";
			if (key == keybindings[i][1] && snakes[i].d != "down") snakes[i].d = "up";
			if (key == keybindings[i][2] && snakes[i].d != "left") snakes[i].d = "right";
			if (key == keybindings[i][3] && snakes[i].d != "up") snakes[i].d = "down";
		}
	})

})
