/*
 * Sedona Thomas snt2127, Rami Matar rhm2142, Carolyn Wang cw3136
 * farnellSynthesis.js:
 */

var audioCtx;
var biquadFilter;
var whiteNoise;
var analyser;
var dataArray;
var bufferLength;

document.addEventListener("DOMContentLoaded", function(event) 
{
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    const playButton = document.getElementById("play");
    playButton.addEventListener('click', play, false);

    function play(event) 
    {
        
        
        
    }

    function initLowpass() 
    {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)

        var bufferSize = 10 * audioCtx.sampleRate,
            noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate),
            output = noiseBuffer.getChannelData(0);
        for (var i = 0; i < bufferSize; i++) 
        {
            output[i] = Math.random() * 2 - 1;
        }
        whiteNoise = audioCtx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;
        whiteNoise.start(0);

        biquadFilter = audioCtx.createBiquadFilter();

        biquadFilter.type = "lowpass";
        biquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);
        biquadFilter.gain.setValueAtTime(0, audioCtx.currentTime);

        whiteNoise.connect(biquadFilter).connect(audioCtx.destination);

        analyser = audioCtx.createAnalyser();
        biquadFilter.connect(analyser);
        analyser.connect(audioCtx.destination);
        analyser.fftSize = 256;
        bufferLength = analyser.frequencyBinCount;
        console.log(bufferLength);
        dataArray = new Uint8Array(bufferLength);
    }

    function initHighpass() 
    {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)

        var bufferSize = 10 * audioCtx.sampleRate,
            noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate),
            output = noiseBuffer.getChannelData(0);
        for (var i = 0; i < bufferSize; i++) 
        {
            output[i] = Math.random() * 2 - 1;
        }
        whiteNoise = audioCtx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;
        whiteNoise.start(0);

        biquadFilter = audioCtx.createBiquadFilter();

        biquadFilter.type = "highpass";
        biquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);
        biquadFilter.gain.setValueAtTime(0, audioCtx.currentTime);

        whiteNoise.connect(biquadFilter).connect(audioCtx.destination);

        analyser = audioCtx.createAnalyser();
        biquadFilter.connect(analyser);
        analyser.connect(audioCtx.destination);
        analyser.fftSize = 256;
        bufferLength = analyser.frequencyBinCount;
        console.log(bufferLength);
        dataArray = new Uint8Array(bufferLength);
    }



    function brownNoise()
    {
        var bufferSize = 10 * audioCtx.sampleRate,
        noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate),
        output = noiseBuffer.getChannelData(0);

        var lastOut = 0;
        for (var i = 0; i < bufferSize; i++) 
        {
            var brown = Math.random() * 2 - 1;
            output[i] = (lastOut + (0.02 * brown)) / 1.02;
            lastOut = output[i];
            output[i] *= 3.5;
        }

        brownNoise = audioCtx.createBufferSource();
        brownNoise.buffer = noiseBuffer;
        brownNoise.loop = true;
        brownNoise.start(0);
        return brownNoise;
    }
    
}, false);
