var player = {};
player.container = document.querySelector('.player');
player.video = player.container.querySelector('video');
player.play = player.container.querySelector('.pause');
player.bar = player.container.querySelector('.bar');
player.cursor = player.container.querySelector('.cursor');
player.fullScreen = player.container.querySelector('.fullScreen');
player.volumeBar = player.container.querySelector('volume-bar');

player.play.addEventListener('click', function() {
	if (player.video.paused) playVid();
	else pauseVid();
});

player.bar.addEventListener('mousedown', function(e) {
	if (!player.video.paused) player.video.pause();
	var ratio = e.offsetX / player.bar.offsetWidth;
	var current = ratio * player.video.duration;
	player.video.currentTime = current;
	player.cursor.style.width = ratio*100 + '%';
	document.addEventListener('mousemove', drag);
	document.addEventListener('mouseup', function() {
		document.removeEventListener('mousemove', drag);
		if (player.video.paused) player.video.play();
	});
});

function playVid() {
	player.video.play();
	player.play.classList.remove('pause');
	player.play.classList.add('play');
	player.TimeInt = setInterval(function() {
		if ((player.video.currentTime/player.video.duration)*100 < 100) player.cursor.style.width = (player.video.currentTime/player.video.duration)*100 + '%';
		else {
			player.cursor.style.width = 100+'%';
			pauseVid();
		}
	}, 50);
}

function pauseVid() {
	player.video.pause();
	player.play.classList.remove('play');
	player.play.classList.add('pause');
	clearInterval(player.TimeInt);
}
	
function drag(e) {
	var ratio = e.offsetX / player.bar.offsetWidth;
	var current = ratio * player.video.duration;
	player.video.currentTime = current;
	player.cursor.style.width = ratio*100 + '%';
}

player.fullScreen.addEventListener('click', function () {
	if (player.video.requestFullscreen) {
	  player.video.requestFullscreen();
	} else if (player.video.mozRequestFullScreen) {
	  player.video.mozRequestFullScreen();
	} else if (player.video.webkitRequestFullscreen) {
	  player.video.webkitRequestFullscreen();
	}
});