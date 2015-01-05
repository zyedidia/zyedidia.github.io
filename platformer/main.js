var game = new Phaser.Game(500, 340, Phaser.AUTO, 'gameDiv');

var mainState = {
	preload: function() {
		game.load.image('player', 'assets/player.png');
		
		game.load.tilemap('mario', 'assets/tilemaps/super_mario.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('tiles', 'assets/tilemaps/super_mario.png');
	},

	create: function() { 
		game.stage.backgroundColor = '#3498db';

		this.player = game.add.sprite(game.world.centerX, game.world.centerY - 20, 'player');
		this.player.anchor.setTo(0.5, 0.5);
		game.physics.enable(this.player, Phaser.Physics.ARCADE);

		this.player.body.gravity.y = 250;

		game.camera.follow(this.player);

		this.cursor = game.input.keyboard.createCursorKeys();

		this.map = game.add.tilemap('mario');
		this.map.addTilesetImage('SuperMarioBros-World1-1', 'tiles');
		this.map.setCollisionBetween(15, 16);
		this.map.setCollisionBetween(20, 25);
		this.map.setCollisionBetween(27, 29);
		this.map.setCollision(40);

		this.layer = this.map.createLayer('World1');
		this.layer.resizeWorld();
		this.player.bringToTop();
	},

	update: function() {
		game.physics.arcade.collide(this.player, this.layer);
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
		if (this.cursor.up.isDown && this.player.body.onFloor()) {
			// Move the player upward (jump)
			this.player.body.velocity.y = -250;
		}
	}
};

game.state.add('main', mainState);
game.state.start('main');
