var w = window.innerWidth * window.devicePixelRatio,
	h = window.innerHeight * window.devicePixelRatio;

var game = new Phaser.Game(((h > w) ? h : w) - 50, ((h > w) ? w : h) - 50, Phaser.AUTO, 'game_div');

var main_state = {
	preload: function() {
		console.log("Preload");

		game.stage.backgroundColor = '#71c5cf';

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

		this.running = false;

		this.dragging = false;
		this.draggingParticle = null;

		this.runButton = new Phaser.Button(game, 75, 20, "okbutton", toggleRun, this);
		this.runButton.anchor.setTo(0.5, 0.5);
		this.runButton.width = 35; this.runButton.height = 20;
		this.runButton.inputEnabled = true;
		game.add.existing(this.runButton);

		function toggleRun() {
			console.log("here");
			this.running = !this.running;
			console.log("running: " + this.running);
			if (!this.running) {
				this.mainParticle.remove();
				this.mainParticle = new Particle(game, 100, 100, 5, true);
			}
		}

		this.mainParticle = new Particle(game, 100, 100, 5, true);
		this.particles = [];

		this.popupMenu = new PopupMenu(game, 0, 0);
		this.popupMenu.setVisible(false);

		this.trash = new Phaser.Sprite(game, 0, 0, "trash");
		this.trash.inputEnabled = true;
		this.trash.width = 40; this.trash.height = 40;
		game.add.existing(this.trash);

		game.input.onUp.add(onUp, this);
		game.input.onDown.add(mouseClick, this);

		function onUp() {
			if (this.trash.input.pointerOver() && this.dragging) {
				var index = this.particles.indexOf(this.draggingParticle);
				this.particles[index].remove();
				this.particles.splice(index, 1);
			}
			this.dragging = false;
			this.draggingParticle = null;
		}

		function mouseClick() {
			console.log(this.runButton.input.pointerOver());
			if (!this.running && !this.runButton.input.pointerOver()) {
				for (i in this.particles) {
					if (this.particles[i].input.pointerOver()) {
						this.dragging = !this.dragging;
						if (this.dragging) {
							this.draggingParticle = this.particles[i];
							return;
						}
					}
				}
				if (!this.popupMenu.visible) {
					var mouseX = game.input.activePointer.x;
					var mouseY = game.input.activePointer.y;

					this.popupMenu.setVisible(true);
					this.popupMenu.setPosition(mouseX, mouseY);
				}
			}
		}
	},

	update: function() {
		if (!this.running) {
			if (this.draggingParticle) {
				var x = game.input.activePointer.x;
				var y = game.input.activePointer.y;
				this.draggingParticle.setPosition(x, y);
			}

			this.popupMenu.update();
		} else {
			this.mainParticle.updatePosition(this.particles);
			game.add.existing(this.mainParticle);
		}

	},

	addParticle: function(particle) {
		this.particles.push(particle);
		this.trash.bringToTop();
	}
};

game.state.add('main', main_state);
game.state.start('main');
