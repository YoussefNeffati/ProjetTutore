class imageRepository {
	constructor() {
		// Define images
		this.background = new Image();
		this.spaceship = new Image();
		this.bullet = new Image();
		this.enemy = new Image();
		this.enemyBullet = new Image();
		this.numImages = 5;
		this.numLoaded = 0;
		this.spaceship.src = "images/ship.png";
		this.bullet.src = "images/bullet.png";
	}


// Ensure all images have loaded before starting the game

imageLoaded() {
	numLoaded++;
	if (numLoaded === numImages) {
		window.init();
	}
}

}

this.spaceship.onload = function () {
	imageLoaded();
}
this.bullet.onload = function () {
	imageLoaded();
}
this.enemy.onload = function () {
	imageLoaded();
}
this.enemyBullet.onload = function () {
	imageLoaded();
}