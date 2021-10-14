/*
 * Sedona Thomas snt2127, Rami Matar rhm2142, Carolyn Wang cw3136
 * farnellSynthesis.js:
 */

var audioCtx;
var lowpass1;
var freq1 = 400;
var lowpass2;
var freq2 = 14;
var highpass;
var highpassMult = 400;
var highpassAdd = 500;
var rq = 0.03;
var mul = 0.1;

const playButton = document.getElementById("play");
playButton.addEventListener('click', play, false);
function play(event) {
    if (!audioCtx) {
        audioCtx = initAudio();
        lowpass1 = initLowpass(freq1);
        highpass = initHighpass(lowpass1);
        lowpass2 = initLowpass(freq2);
        lowpass2.connect(highpass.frequency);
        return;
    }
    else if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    else if (audioCtx.state === 'running') {
        audioCtx.suspend();
    }
}

function initAudio() {
    return new (window.AudioContext || window.webkitAudioContext)();
}

function initHighpass(lowpass) {
    var high = audioCtx.createBiquadFilter();
    high.type = "highpass";
    high.frequency.setValueAtTime(0, audioCtx.currentTime);
    high.gain.setValueAtTime(0, audioCtx.currentTime);
    lowpass.connect(high).connect(audioCtx.destination); // connect lowpass as highpass input?
    high.Q.value = 1 / rq;
    return high;
}

function initLowpass(freq) {
    var brown = makeBrownNoise();
    lowpass = audioCtx.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.setValueAtTime(freq, audioCtx.currentTime);
    lowpass.gain.setValueAtTime(0, audioCtx.currentTime);
    brown.connect(lowpass).connect(audioCtx.destination);
    return lowpass;
}

function makeBrownNoise() {
    var bufferSize = 10 * audioCtx.sampleRate,
        noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate),
        output = noiseBuffer.getChannelData(0);

    var lastOut = 0;
    for (var i = 0; i < bufferSize; i++) {
        var brown = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * brown)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;

        //output[i] = output[i] * 400 + 500; //directly change freq?
    }

    brownNoise = audioCtx.createBufferSource();
    brownNoise.buffer = noiseBuffer;
    brownNoise.loop = true;
    brownNoise.start(0);
    return brownNoise;
}
