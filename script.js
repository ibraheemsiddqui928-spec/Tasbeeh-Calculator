let count = 0;
let totalCount = 0;
let laps = 0;
let soundEnable = true;

const countDisplay = document.getElementById('countDisplay');
const totalCountDisplay = document.getElementById('totalCount');
const lapCountDisplay = document.getElementById('lapCount');
const progressText = document.getElementById('progressText');

const dhikrSelect = document.getElementById('dhikrSelect');
const targetSelect = document.getElementById('targetSelect');
const arabicText = document.getElementById('arabicText');
const transliterationText = document.getElementById('transliterationText');
const countBtn = document.getElementById('countBtn');
const resetBtn = document.getElementById('resetBtn');
const resetTotalBtn = document.getElementById('resetTotalBtn');
const soundToggle = document.getElementById('soundToggle');

//Web Audio API Sound Generator
function playClickSound() {
    if(!soundEnable)return;
    const audioCtx = new
    (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osctype = 'sine';
     osc.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
}

function playCompletionSound(){
    if(!soundEnable) return;
    const audioCtx = new
    (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440,audioCtx.currentTime);
      osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
}

function updateDisplay(){
    countDisplay.textContent = count;
    totalCountDisplay.textContent = totalCount;
    lapCountDisplay.textContent = laps;
    const target = parseInt(targetSelect.value);
    if (target > 0) {
        progressText.textContent =  `Progress: \({count} /\){target}`;
    } else { 
        progressText.textContent =  `Unlimited Mode`;
    }
}

function handleincrement() {
    const target = parseInt(targetSelect.value);
    count++;
    totalCount++;
    playClickSound();
    if (navigator.vibrate) {
        navigator.vibrate(30);
    }

    if (target > 0 && count === target) {
        laps++;
        playCompletionSound();
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
        count = 0;
    }
    updateDisplay();
}

// Event Listeners
countBtn.addEventListener('click', handleincrement);

resetBtn.addEventListener('click', () => {
    count = 0;
    updateDisplay();
});

resetTotalBtn.addEventListener('click',() => {
    count = 0;
    totalCount = 0;
    laps = 0;
    updateDisplay();
});