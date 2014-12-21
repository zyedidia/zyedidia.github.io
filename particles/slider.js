// ------- Slider Class -------- //
Slider = function(game, x, y, indicatorKey, barKey, min, max) {
	this.sliderValPx = 10;
	this.length = max - min;
	this.bar = new Bar(game, x, y, barKey, this.length * this.sliderValPx);
	this.indicator = new Indicator(game, x, y, indicatorKey);
	this.x = x;
	this.max = max;
	this.min = min;

	this.setVisible(false);
}

Slider.prototype.update = function() {
	if (this.indicator.visible === true) {
		if (this.bar.input.pointerOver() && game.input.mousePointer.isDown) {
			console.log("Input");
			var x = (game.input.mousePointer.position.x - this.x) / this.sliderValPx;
			var maximumX = this.x + Math.abs(this.max) * this.sliderValPx;
			var minimumX = this.x - Math.abs(this.min) * this.sliderValPx;

			var requestedX = this.x + x * this.sliderValPx;

			this.indicator.x = (x > this.max) ? maximumX : requestedX;
			this.indicator.x = (x < this.min) ? minimumX : this.indicator.x;

			this.indicator.setValue((x > this.max) ? this.max : x);
			this.indicator.setValue((x < this.min) ? this.min : this.indicator.value);
		}
	}
}

Slider.prototype.setVisible = function(isVisible) {
	this.indicator.visible = isVisible;
	this.indicator.text.visible = isVisible;
	this.bar.visible = isVisible;
}

Slider.prototype.setPosition = function(x, y) {
	this.bar.x = x; this.bar.y = y;
	this.indicator.x = x; this.indicator.y = y;
	this.indicator.text.x = x; this.indicator.text.y = y + this.indicator.height;
	this.x = x;
}

// ------- Indicator Class -------- //

Indicator = function(game, x, y, key) {
	Phaser.Sprite.call(this, game, x, y, key);
	this.anchor.setTo(0.5, 0.5);
	this.width = 15;
	this.height = 15;
	this.value = value = 0;

	var style = { font: "15px Arial", fill: "#FFFFFF", align: "left" };
	this.text = new Phaser.Text(game, x, y + this.height, this.value, style);
	this.text.anchor.setTo(0.5, 0.5);

	game.add.existing(this);
	game.add.existing(this.text);
}

Indicator.prototype = Object.create(Phaser.Sprite.prototype);
Indicator.prototype.constructor = Indicator;

Indicator.prototype.setValue = function(value) {
	this.value = parseInt(value);
	console.log("Value: " + this.value);

	this.text.setText(this.value);
}

Indicator.prototype.destroy = function() {
	Phaser.Sprite.destroy.call();
}

// ------- Bar Class -------- //

Bar = function(game, x, y, key, width) {
	Phaser.Sprite.call(this, game, x, y, key);
	this.anchor.setTo(0.5, 0.5);
	this.width = width;
	this.height = 10;
	this.inputEnabled = true;

	game.add.existing(this);
}

Bar.prototype = Object.create(Phaser.Sprite.prototype);
Bar.prototype.constructor = Bar;

Bar.prototype.destroy = function() {
	Phaser.Sprite.destroy.call();
}
