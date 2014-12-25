Particle = function(game, x, y, charge, isMainParticle = false) {
	var image = ((charge > 0) ? "blue" : "red") + "_circle";
	this.mainParticle = isMainParticle;
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

	this.vx = 0;
	this.vy = 0;

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

Particle.prototype.updatePosition = function(particles) {
	for (i in particles) {
		var p = particles[i];
		var distance = Math.sqrt((this.x - p.x)*(this.x - p.x) + (this.y - p.y)*(this.y - p.y));

		var distanceSquared = distance*distance;
		console.log(distanceSquared);
		var force = this.charge * p.charge / distanceSquared;
		console.log(force);

		this.vx += force * (this.x - p.x) / distance;
		this.vy += force * (this.y - p.y) / distance;
	}

	this.setPosition(this.x + this.vx, this.y + this.vy);
}
