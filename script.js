const slides = document.querySelectorAll('.slide');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const voiceBtn = document.getElementById('voiceBtn');
const progress = document.getElementById('progress');
let currentIndex = 0;

// ভয়েস ফাংশন
function speak(text) {
    window.speechSynthesis.cancel(); // আগের কথা বন্ধ করা
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'bn-BD'; // বাংলা ভাষা সেট করা
    utterance.rate = 0.9;     // কথা বলার গতি কিছুটা কমানো
    window.speechSynthesis.speak(utterance);
}

function updateSlide(index) {
    slides.forEach((s, i) => {
        s.classList.toggle('active', i === index);
    });
    
    // প্রগ্রেস বার আপডেট
    const percentage = ((index + 1) / slides.length) * 100;
    progress.style.width = percentage + '%';
    
    // অটোমেটিক ভয়েস প্লে (ইচ্ছানুযায়ী)
    const voiceText = slides[index].getAttribute('data-voice');
    speak(voiceText);
}

nextBtn.addEventListener('click', () => {
    if (currentIndex < slides.length - 1) {
        currentIndex++;
        updateSlide(currentIndex);
    }
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlide(currentIndex);
    }
});

// ভয়েস বাটন ক্লিক করলে আবার শুনবে
voiceBtn.addEventListener('click', () => {
    const voiceText = slides[currentIndex].getAttribute('data-voice');
    speak(voiceText);
});

// কিবোর্ড সাপোর্ট
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'ArrowLeft') prevBtn.click();
});

// প্রথমবার পেজ লোড হলে ভয়েস শুরু হবে (ইউজার ইন্টারেকশন প্রয়োজন হতে পারে)
window.onload = () => {
    updateSlide(0);
};
      
