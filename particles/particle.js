Particle = function(game, x, y, charge, isMainParticle = false) {
	var image = ((charge > 0) ? "blue" : "red") + "_circle";
	if (isMainParticle) {
		image = "green_circle";
	}
	Phaser.Sprite.call(this, game, x, y, image);
	this.charge = charge;

	this.width = 30;
	this.height = 30;

	var style = { font: "15px Arial", fill: "#FFFFFF", align: "left" };
	this.text = new Phaser.Text(game, x, y, charge, style);
	this.text.anchor.setTo(0.5, 0.5);
	this.anchor.setTo(0.5, 0.5);
	
	game.add.existing(this);
	game.add.existing(this.text);
}

Particle.prototype = Object.create(Phaser.Sprite.prototype);
Particle.prototype.constructor = Particle;

Particle.prototype.setPosition = function(x, y) {
	this.x = x; this.y = y;
	this.text.x = x; this.text.y = y;
}

Particle.prototype.remove = function() {
	this.destroy();
	this.text.destroy();
}

Particle.prototype.update = function() {
}
