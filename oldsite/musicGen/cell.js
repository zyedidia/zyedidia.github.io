Cell = function(x, y, dir, index, color) {
	this.x = x;
	this.y = y;
	this.dir = dir;
	this.index = index;
	this.color = color;
}

Cell.prototype.updatePosition = function() {
	if (this.dir === "up") {
		this.y++;
	} else if (this.dir === "down") {
		this.y--;
	} else if (this.dir === "right") {
		this.x++;
	} else if (this.dir === "left") {
		this.x--;
	}
	// console.log("x: " + this.x + ", y: " + this.y + ", dir: " + this.dir);
}

Cell.prototype.checkCollisions = function(cells) {
	if (this.x <= 0 || this.x >= 8) {
		this.playTone(this.y);
		this.oppositeDir();
	} else if (this.y <= 0 || this.y >= 8) {
		this.playTone(this.x);
		this.oppositeDir();
	}

	for (i in cells) {
		if (i != this.index) {
			var otherCell = cells[i];
			if ((this.x == otherCell.x) && (this.y == otherCell.y)) {
				this.clockwiseDir();
			}
		}
	}
}

Cell.prototype.oppositeDir = function() {
	if (this.dir == "up") this.dir = "down";
	else if (this.dir == "down") this.dir = "up";
	else if (this.dir == "right") this.dir = "left";
	else if (this.dir == "left") this.dir = "right";
}

Cell.prototype.isDirOpposite = function(dir) {
	return this.dir == this.oppositeDir(dir);
}

Cell.prototype.clockwiseDir = function() {
	if (this.dir == "up") this.dir = "right";
	else if (this.dir == "down") this.dir = "left";
	else if (this.dir == "right") this.dir = "down";
	else if (this.dir == "left") this.dir = "up";
}

Cell.prototype.playTone = function(tone) {
	if (tone >= 0 && tone <= 8) {
		var name = "soundFiles/" + tone;
		var sound = new Howl({
			urls: [name + '.mp3', 'soundFiles/tone' + tone + '.ogg']
		}).play();
	}
}
