var w = window.innerWidth * window.devicePixelRatio,
	h = window.innerHeight * window.devicePixelRatio;

console.log(w);
console.log(h);

var game = new Phaser.Game(((h > w) ? h : w) - 50, ((h > w) ? w : h) - 50, Phaser.AUTO, 'game_div');

var main_state = {
	preload: function() {
		console.log("Preload");

		this.game.stage.backgroundColor = '#71c5cf';

		game.load.image("green_circle", "assets/green_circle.png");
		game.load.image("blue_circle", "assets/blue_circle.png");
		game.load.image("red_circle", "assets/red_circle.png");
		game.load.image("bar", "assets/bar.png");
		game.load.image("indicator", "assets/indicator.png");
		game.load.image("okbutton", "assets/okbutton.png");
	},

	create: function() {
		console.log("Create");

		this.popupMenu = false;

		this.particle = new Particle(game, 100, 100, 5);
		this.particles = [];

		this.slider = new Slider(game, 0, 0, "indicator", "bar", -5, 5);

		game.input.onDown.add(mouseClick, this);

		function mouseClick() {
			if (!this.popupMenu) {
				game.paused = false;
				this.popupMenu = true;
				var mouseX = game.input.mousePointer.x;
				var mouseY = game.input.mousePointer.y;

				this.slider.setPosition(mouseX, mouseY + 20);
				this.slider.setVisible(true);

				var okbutton = new Phaser.Button(game, mouseX, mouseY + 80, "okbutton", placeParticle, this);
				okbutton.x = mouseX; okbutton.y = mouseY;
				okbutton.width = 35; okbutton.height = 20;
				okbutton.anchor.setTo(0.5, 0.5);

				game.add.existing(okbutton);
			}

			function placeParticle() {
				this.particles.push(new Particle(game, mouseX, mouseY, this.slider.indicator.value));
				this.slider.setVisible(false);
				okbutton.destroy();

				this.popupMenu = false;

				game.paused = true;
			}
		}
	},

	update: function() {
		for (i in this.particles) {
			this.particles[i].update();
		}
		this.slider.update();
	}
};

game.state.add('main', main_state);
game.state.start('main');
