// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

// Creates a new 'main' state that wil contain the game
var main_state = {

	preload: function() { 
		// Function called first to load all the assets
		this.game.stage.backgroundColor = '#71c5cf';

		this.game.load.image('bird', 'assets/squash.png');
		this.game.load.image('pipe', 'assets/pipe.png');

		this.game.load.audio('jump', 'assets/sfx_wing.wav');
		this.game.load.audio('fall', 'assets/sfx_die.wav');
		this.game.load.audio('die', 'assets/sfx_hit.wav');
		this.game.load.audio('point', 'assets/sfx_point.wav');
	},

	create: function() { 
		// Fuction called after 'preload' to setup the game    
		this.bird = this.game.add.sprite(100, 245, 'bird');
		this.bird.anchor.setTo(-0.2, 0.5);  
		this.pipes = game.add.group();
		this.pipes.createMultiple(20, 'pipe');

		this.jump_sound = this.game.add.audio('jump');
		this.fall_sound = this.game.add.audio('fall');
		this.die_sound = this.game.add.audio('die');
		this.point_sound = this.game.add.audio('point');

		this.bird.body.gravity.y = 1000;

		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		space_key.onDown.add(this.jump, this);
		game.input.onDown.add(this.jump, this);

		this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);  
		this.score = 0;
		var style = { font: "30px Arial", fill: "#ffffff" };
		this.label_score = this.game.add.text(20, 20, "0", style);

	},

	update: function() {
		// Function called 60 times per second
		if (this.bird.inWorld == false) {
			this.die_sound.play();
			this.restart_game();
		}

		if (this.bird.alive) {
			if (this.bird.angle < 20) {
				this.bird.angle += 1;
			}
		} else {
			if (this.bird.angle < 90) {
				this.bird.angle += 2;
			}
		}

		this.game.physics.overlap(this.bird, this.pipes, this.hit_pipe, null, this);
	},

	jump: function() {
		if (!this.bird.alive) {
			return;
		}
		this.jump_sound.play();
		this.bird.body.velocity.y = -350;

		var animation = this.game.add.tween(this.bird);

		animation.to({angle: -20}, 100);

		animation.start();  
	},

	hit_pipe: function() {
		if (this.bird.alive == false) {
			return;
		}

		this.fall_sound.play();

		this.bird.alive = false;

		this.game.time.events.remove(this.timer);

		this.pipes.forEachAlive(function(p) {
			p.body.velocity.x = 0;
		}, this);
	},

	restart_game: function() {
		this.game.state.start('main');
		this.game.time.events.remove(this.timer);
	},

	add_one_pipe: function(x, y) {  
		var pipe = this.pipes.getFirstDead();

		pipe.reset(x, y);

		pipe.body.velocity.x = -200; 

		pipe.outOfBoundsKill = true;
	},

	add_row_of_pipes: function() {  
		var hole = Math.floor(Math.random()*5)+1;

		for (var i = 0; i < 8; i++)
			if (i != hole && i != hole +1) 
				this.add_one_pipe(400, i*60+10);   
		this.score++;
		this.label_score.content = this.score;
		this.point_sound.play();
	},
};

// Add and start the 'main' state to start the game
game.state.add('main', main_state);  
game.state.start('main'); 
