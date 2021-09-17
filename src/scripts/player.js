/*let player;
const playerContainer = $('.player');



let eventsInit = () => {
    $(".player__start").click(e => {
        e.preventDefault();

       

        if(playerContainer.hasClass('paused')) {
            //playerContainer.removeClass("paused");
            player.pauseVideo();
        } else {
           //playerContainer.addClass("paused");
            player.playVideo();
        }
    });

    $(".player__playback").click(e => {
        const bar = $(e.currentTarget);
        const clickedPosition = e.originalEvent.layerX;
        const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
        const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPercent;

        $(".player__playback-button").css({
            left: `${newButtonPositionPercent}%`
        });


        player.seekTo(newPlaybackPositionSec);
    });

    $(".player__splash").click(e => {
        player.playVideo();
    })
};

const formatTime = timeSec => {
    const roundTime = Math.round(timeSec);

    const minutes = addZero(Math.floor(roundTime / 60));
    const seconds = addZero(roundTime - minutes * 60);

    function addZero(num) {
        return num < 10 ? `0${num}` : num;
    }

    return `${minutes} : ${seconds}`;
}

const onPlayerReady = () => {
    let interval;

    const durationSec = player.getDuration();

    $(".player__duration-estimate").text(formatTime(durationSec));

    if (typeof interval !== 'undefined') {
        clearInterval(interval);
    }

    interval = setInterval(() => {
        const completedSec = player.getCurrentTime();
        const completedPercent = (completedSec / durationSec) * 100;

        $(".player__playback-button").css({
            left: `${completedPercent}%`
        });
        $(".player__duration-completed").text(formatTime(completedSec));
    }, 1000);
};

const onPlayerStateChange = event => {
    /*
    -1 (воспроизведение видео не начато)
    0 (воспроизведение видео завершено)
    1 (воспроизведение)
    2 (пауза)
    3 (буферизация)
    5 (видео подают реплики)
    */ 
 /*   switch (event.data) {
        case 1:
            playerContainer.addClass('active'); 
            playerContainer.addClass('paused');
            break;

        case 2:
            playerContainer.removeClass('active');
            playerContainer.removeClass('paused');
            break;
    }
}

    function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-player', {
        height: '357',
        width: '659',
        videoId: 'LXb3EKWsInQ',
        events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
        },
        playerVars: {
            controls: 0,
            disablekb: 0,
            showinfo: 0,
            rel: 0,
            autoplay: 0,
            modestbranding: 0
        }
    });
}


eventsInit();*/

//video html5

let video = document.getElementById("video");
let progress = document.querySelector('#progress');
let btnPlay = document.querySelector(".player__start");
let time = document.querySelector(".player__playback");
let videoTrack = document.querySelector("#progress"); 
let videoSplash = document.querySelector("#player__splash"); 
document.querySelector('#volume').onclick = videoVolume;
/*let time = document.querySelector(".timeline");          
let btnPlay = document.querySelector(".play");           
let btnPause = document.querySelector(".pause");        
let btnRewind = document.querySelector(".rewind");       
let btnForward = document.querySelector(".forward");   */

/*video.ontimeupdate = progressUpdate;*/
/*progress.onClick = videoRewind;*/

btnPlay.addEventListener("click", function() {
    const playerContainer = $('.player');

    if (playerContainer.hasClass("paused")) {
        playerContainer.removeClass("paused");
        playerContainer.removeClass('active');
        video.pause();
        clearInterval(videoPlay)
        
    } else {
        playerContainer.addClass("paused");
        playerContainer.addClass('active'); 
        video.play();
    }
    videoPlay = setInterval(function() {
        
        
        let videoTime = Math.round(video.currentTime)
        let d = Math.round(video.duration);
        let completedPercent = (videoTime / d) * 100;
        
        
        $(".player__playback-button").css({
            left: `${completedPercent}%`
          });  
    })
    videoTrack.addEventListener("click", function(e) {
        let posX = e.clientX - 480; // Вычисляем позицию нажатия
        let timePos = (posX * 100) / 500;
        console.log(timePos);
        video.currentTime = (timePos * Math.round(video.duration)) / 100; 
        console.log(video.currentTime)
        /*let timePos = (clickedPosition * 100) / bar.width();  // Вычисляем процент перемотки
        console.log(timePos);
        time.style.width = timePos + '%'; // Присваиваем процент перемотки
        /*video.currentTime = (timePos * Math.round(video.duration)) / 100 // Перематываем*/

       // video.currentTime = (timePos * Math.round(video.duration)) / 100 ;
    
    });
    
});



function videoVolume() {
    let v = this.value;
    
    video.volume = v / 100;
}






    
