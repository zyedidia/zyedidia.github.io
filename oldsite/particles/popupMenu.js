PopupMenu = function(game, x, y) {
	this.okbutton = new Phaser.Button(game, x, y, "okbutton", placeParticle, this);
	this.okbutton.anchor.setTo(0.5, 0.5);
	this.okbutton.width = 35;
	this.okbutton.height = 20;
	this.slider = new Slider(game, x, y, "indicator", "bar", -5, 5);
	this.x = x;
	this.y = y;
	this.visible = false;

	function placeParticle() {
		var newParticle = new Particle(game, this.x, this.y, this.slider.indicator.value);
		newParticle.inputEnabled = true;
		main_state.addParticle(newParticle);

		this.setVisible(false);
	}

	game.add.existing(this.okbutton);
}

PopupMenu.prototype.setPosition = function(x, y) {
	this.okbutton.x = x; this.okbutton.y = y;
	this.slider.setPosition(x, y + 20);
	this.x = x;
	this.y = y;
}

PopupMenu.prototype.setVisible = function(isVisible) {
	this.okbutton.visible = isVisible;
	this.slider.setVisible(isVisible);
	this.visible = isVisible;
}

PopupMenu.prototype.update = function() {
	this.slider.update();
}
