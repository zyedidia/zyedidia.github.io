var w = window.innerWidth * window.devicePixelRatio,
    h = window.innerHeight * window.devicePixelRatio;

console.log(w);
console.log(h);

var game = new Phaser.Game(((h > w) ? h : w) - 50, ((h > w) ? w : h) - 50, Phaser.AUTO, 'game_div');

var main_state = {
	preload: function() {
		console.log("Preload");

		this.game.stage.backgroundColor = '#71c5cf';

		game.load.image("blue_circle", "assets/blue_circle.png");
		game.load.image("red_circle", "assets/red_circle.png");
	},

	create: function() {
		console.log("Create");

		this.particle = new Particle(game, 100, 100, 5);
	},

	update: function() {
		this.particle.update();
	}
};

game.state.add('main', main_state);
game.state.start('main');

