// var Particle = Phaser.Sprite.extend({
// 	construct: function(game, x, y, key, charge) {
// 		Phaser.Sprite.call(this, game, x, y, key);
// 		this.charge = charge;
// 		console.log("Construct");
// 	},
//
// 	update: function() {
// 		Phaser.Sprite.update();
// 		console.log("Hello");
// 	}
// })

Particle = function(game, x, y, charge) {
	var image = ((charge > 0) ? "blue" : "red") + "_circle";
	Phaser.Sprite.call(this, game, x, y, image);
	this.charge = charge;
	console.log("Instantiated with charge: " + this.charge);

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

Particle.prototype.update = function() {
	console.log("Update!");
}
