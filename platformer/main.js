var game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');

var mainState = {
	preload: function() {
		game.load.image('player', 'assets/player.png');
		game.load.image('wallV', 'assets/wallVertical.png');
		game.load.image('wallH', 'assets/wallHorizontal.png');
	},

	create: function() { 
		game.stage.backgroundColor = '#3498db';

		this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
		this.player.anchor.setTo(0.5, 0.5);
		game.physics.enable(this.player, Phaser.Physics.ARCADE);

		this.player.body.gravity.y = 250;

		// Create our wall group with Arcade physics
		this.walls = game.add.group();
		this.walls.enableBody = true;

		// Create the 10 walls 
		game.add.sprite(0, 0, 'wallV', 0, this.walls); // Left
		game.add.sprite(480, 0, 'wallV', 0, this.walls); // Right

		game.add.sprite(0, 0, 'wallH', 0, this.walls); // Top left
		game.add.sprite(300, 0, 'wallH', 0, this.walls); // Top right
		game.add.sprite(0, 320, 'wallH', 0, this.walls); // Bottom left
		game.add.sprite(300, 320, 'wallH', 0, this.walls); // Bottom right

		game.add.sprite(-100, 160, 'wallH', 0, this.walls); // Middle left
		game.add.sprite(400, 160, 'wallH', 0, this.walls); // Middle right

		var middleTop = game.add.sprite(100, 80, 'wallH', 0, this.walls);
		middleTop.scale.setTo(1.5, 1);
		var middleBottom = game.add.sprite(100, 240, 'wallH', 0, this.walls);
		middleBottom.scale.setTo(1.5, 1);

		// Set all the walls to be immovable
		this.walls.setAll('body.immovable', true);
		this.walls.setAll('body.allowGravity', false);

		this.cursor = game.input.keyboard.createCursorKeys();
	},

	update: function() {
		game.physics.arcade.collide(this.player, this.walls);
		this.movePlayer();
	},

	movePlayer: function() {
		// If the left arrow key is pressed
		if (this.cursor.left.isDown) {
			// Move the player to the left
			this.player.body.velocity.x = -200;
		}

		// If the right arrow key is pressed
		else if (this.cursor.right.isDown) {
			// Move the player to the right
			this.player.body.velocity.x = 200;
		}

		// If neither the right or left arrow key is pressed
		else {
			// Stop the player
			this.player.body.velocity.x = 0;
		}

		// If the up arrow key is pressed and the player is touching the ground
		if (this.cursor.up.isDown && this.player.body.touching.down) {
			// Move the player upward (jump)
			this.player.body.velocity.y = -250;
		}
	}
};

game.state.add('main', mainState);
game.state.start('main');
