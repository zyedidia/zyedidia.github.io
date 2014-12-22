var w = window.innerWidth * window.devicePixelRatio,
	h = window.innerHeight * window.devicePixelRatio;

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
		game.load.image("trash", "assets/trash.png");
	},

	create: function() {
		console.log("Create");

		this.popupMenu = false;
		this.dragging = false;
		this.draggingParticle = null;

		this.particle = new Particle(game, 100, 100, 5);
		this.particles = [];

		this.slider = new Slider(game, 0, 0, "indicator", "bar", -5, 5);

		this.trash = new Phaser.Sprite(game, 0, 0, "trash");
		this.trash.inputEnabled = true;
		this.trash.width = 40; this.trash.height = 40;
		game.add.existing(this.trash);

		game.input.onUp.add(onUp, this);
		game.input.onDown.add(mouseClick, this);
		game.input.touch.touchEndCallback = onUp;
		game.input.touch.touchEnterCallback = mouseClick;

		function onUp() {
			console.log("Trash pointer over: " + this.trash.input.pointerOver());
			if (this.trash.input.pointerOver() && this.dragging) {
				console.log("Removing");
				var index = this.particles.indexOf(this.draggingParticle);
				this.particles[index].remove();
				this.particles.splice(index, 1);
			}
			this.dragging = false;
			this.draggingParticle = null;
		}

		function mouseClick() {
			for (i in this.particles) {
				if (this.particles[i].input.pointerOver()) {
					this.dragging = !this.dragging;
					if (this.dragging) {
						this.draggingParticle = this.particles[i];
						return;
					}
				}
			}
			if (!this.popupMenu) {
				this.popupMenu = true;
				var mouseX = game.input.activePointer.x;
				var mouseY = game.input.activePointer.y;

				this.slider.setPosition(mouseX, mouseY + 20);
				this.slider.setVisible(true);

				var okbutton = new Phaser.Button(game, mouseX, mouseY + 80, "okbutton", placeParticle, this);
				okbutton.x = mouseX; okbutton.y = mouseY;
				okbutton.width = 35; okbutton.height = 20;
				okbutton.anchor.setTo(0.5, 0.5);

				game.add.existing(okbutton);
			}

			function placeParticle() {
				var newParticle = new Particle(game, mouseX, mouseY, this.slider.indicator.value);
				newParticle.inputEnabled = true;
				this.particles.push(newParticle);
				this.slider.setVisible(false);
				okbutton.destroy();

				this.popupMenu = false;

				this.trash.bringToTop();
			}
		}
	},

	update: function() {
		for (i in this.particles) {
			if (this.draggingParticle == this.particles[i]) {
				var x = game.input.activePointer.x;
				var y = game.input.activePointer.y;
				this.draggingParticle.setPosition(x, y);
			}
		}
		this.slider.update();
	}
};

game.state.add('main', main_state);
game.state.start('main');
