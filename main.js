let currentSlide = 0;
let slides = [];
let transitionType = 'fade';
let transitionDuration = 2000; 
let transitions = {
    fade: 'opacity',
    slide: 'transform',
    zoom: 'transform scale',
};

document.getElementById('fileInput').addEventListener('change', handleFileSelect);
document.getElementById('musicInput').addEventListener('change', handleMusicSelect);
document.getElementById('transitionType').addEventListener('change', changeTransition);
document.getElementById('transitionDuration').addEventListener('change', changeTransitionDuration);

function handleFileSelect(event) {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.type.startsWith('image/')) {
            addImageSlide(file);
        } else if (file.type.startsWith('video/')) {
            addVideoSlide(file);
        }
    }

    showSlides(currentSlide);
}

function addImageSlide(imageFile) {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(imageFile);
    img.className = 'slide';
    slides.push(img);
}

function addVideoSlide(videoFile) {
    const videoContainer = document.createElement('div');
    videoContainer.className = 'slide';

    const video = document.createElement('video');
    video.src = URL.createObjectURL(videoFile);
    video.setAttribute('controls', true);

    video.muted = true;

    videoContainer.appendChild(video);
    slides.push(videoContainer);
}



function showSlides(index) {
    const container = document.getElementById('slideshow-container');
    container.innerHTML = '';

    if (slides.length === 0) {
        return;
    }

    slides.forEach((slide, i) => {
        slide.style.display = i === index ? 'block' : 'none';

        if (transitionType === 'fade') {
            slide.style.transition = `opacity ${transitionDuration / 1000}s`;
            setTimeout(() => {
                slide.style.opacity = i === index ? '1' : '0';
            }, 50); 
        } else if (transitionType === 'slide') {
            slide.style.transition = `transform ${transitionDuration / 1000}s`;
            setTimeout(() => {
                slide.style.transform = i === index ? 'translateX(0)' : 'translateX(100%)';
            }, 50); 
        } else if (transitionType === 'zoom') {
            slide.style.transition = `transform ${transitionDuration / 1000}s`;
            setTimeout(() => {
                slide.style.transform = i === index ? 'scale(1)' : 'scale(1.5)';
            }, 50); 
        }

        container.appendChild(slide);
    });
}





function plusSlides(n) {
    currentSlide += n;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = slides.length - 1;
    }

    showSlides(currentSlide);
}

function handleMusicSelect(event) {
    const musicFile = event.target.files[0];

    if (musicFile) {
        const audio = new Audio(URL.createObjectURL(musicFile));
        audio.setAttribute('controls', true);
        audio.loop = true;
        document.getElementById('slideshow-container').appendChild(audio);
    }
}

function togglePlayPause() {
    const playBtn = document.getElementById('playBtn');
    const audio = document.querySelector('audio');

    if (audio) {
        if (audio.paused) {
            audio.play();
            playBtn.textContent = 'Pause';
        } else {
            audio.pause();
            playBtn.textContent = 'Play';
        }
    } else {
        console.error('Audio element not found.');
    }
}


function changeTransition() {
    transitionType = document.getElementById('transitionType').value;
    showSlides(currentSlide);
}

function changeTransitionDuration() {
    transitionDuration = parseInt(document.getElementById('transitionDuration').value) * 1000;
    showSlides(currentSlide);
}
