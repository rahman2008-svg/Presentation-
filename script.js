const slides = document.querySelectorAll('.slide');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const voiceBtn = document.getElementById('voiceBtn');
const progress = document.getElementById('progress');

let index = 0;

function speak(text){
    window.speechSynthesis.cancel();

    let utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'bn-BD';
    utter.rate = 0.9;

    window.speechSynthesis.speak(utter);
}

function showSlide(i){
    slides.forEach((s, idx)=>{
        s.classList.toggle('active', idx === i);
    });

    progress.style.width = ((i+1)/slides.length)*100 + "%";

    let text = slides[i].getAttribute('data-voice');
    if(text) speak(text);
}

nextBtn.onclick = ()=>{
    if(index < slides.length-1){
        index++;
        showSlide(index);
    }
};

prevBtn.onclick = ()=>{
    if(index > 0){
        index--;
        showSlide(index);
    }
};

voiceBtn.onclick = ()=>{
    let text = slides[index].getAttribute('data-voice');
    if(text) speak(text);
};

window.addEventListener('keydown',(e)=>{
    if(e.key==='ArrowRight') nextBtn.click();
    if(e.key==='ArrowLeft') prevBtn.click();
});

window.onload = ()=>{
    showSlide(0);
};
