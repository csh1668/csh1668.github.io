const canvasWrapper = document.getElementsByClassName('canvas-wrapper')[0];
const canvas = document.getElementById('main-canvas');
const ctx = canvas.getContext('2d');
const video = document.getElementById('video');
const textInput = document.getElementById('my-text');
const stopButton = document.getElementById('stop-button');
const speedRange = document.getElementById('speed-range');
const speedShow = document.getElementById('speed-show');

let mouseClickCount = -1;
let animationId = null;
let playing = false;
let videoX = 0, videoY = 0, textX = 0;
let speed = 1;

function startAnimation() {
    ctx.save();
    ctx.beginPath();
    
    // AI 사용한 부분
    if (mouseClickCount == 0) { // 원 모양
        ctx.arc(videoX + video.videoWidth / 2, videoY + video.videoHeight / 2, video.videoWidth / 2, 0, Math.PI * 2);
    } else if (mouseClickCount == 1) { // 다이아몬드 모양
        ctx.moveTo(videoX + video.videoWidth / 2, videoY);
        ctx.lineTo(videoX + video.videoWidth, videoY + video.videoHeight / 2);
        ctx.lineTo(videoX + video.videoWidth / 2, videoY + video.videoHeight);
        ctx.lineTo(videoX, videoY + video.videoHeight / 2);
        ctx.closePath();
    } else { // 오각형 모양
        ctx.moveTo(videoX + video.videoWidth / 2, videoY);
        ctx.lineTo(videoX + video.videoWidth, videoY + video.videoHeight * 0.4);
        ctx.lineTo(videoX + video.videoWidth * 0.8, videoY + video.videoHeight);
        ctx.lineTo(videoX + video.videoWidth * 0.2, videoY + video.videoHeight);
        ctx.lineTo(videoX, videoY + video.videoHeight * 0.4);
        ctx.closePath();
    }
    ctx.clip(); // 지정된 모양으로 클리핑 설정
    ctx.drawImage(video, videoX, videoY, video.videoWidth, video.videoHeight); // 고해상도로 그리기
    ctx.restore();

    const text = textInput.value;
    ctx.font = '30px NanumSquareNeo';
    ctx.fillStyle = 'blue';
    ctx.fillText(text, textX, 50);


    function animateVideo() {
        playing = true;
        animationId = requestAnimationFrame(animateVideo);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        startAnimation();
        videoX += speed;
        textX += speed;

        if (videoX > canvas.width) {
            cancelAnimationFrame(animationId);
            playing = false;
            return;
        }

        if (textX > canvas.width) textX = 0;

        // console.log('videoX', videoX);
    }

    if (!playing) {
        animateVideo();
    }
}

function stopAnimation() {
    cancelAnimationFrame(animationId);
    playing = false;
}

canvas.addEventListener('click', (event) => {
    mouseClickCount = (mouseClickCount + 1) % 3;

    video.src = `video${mouseClickCount + 1}.mp4`
    // canvas의 위치를 감안한 실제 위치 계산
    videoX = event.offsetX - 150;
    videoY = event.offsetY - 150;

    startAnimation();
});

document.addEventListener('DOMContentLoaded', () => {
    canvas.width = canvasWrapper.offsetWidth;
    canvas.height = canvasWrapper.offsetHeight;
});

stopButton.addEventListener('click', () => {
    stopAnimation();
});

speedRange.addEventListener('input', (event) => {
    speed = parseFloat(event.target.value);
    speedShow.innerText = speed.toFixed(1);
});