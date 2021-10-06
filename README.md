# Farnell-Synthesis
Webpage for a Farnell synthesis (implemented in Web Audio)

## {RHPF.ar(LPF.ar(BrownNoise.ar(), 400), LPF.ar(BrownNoise.ar(), 14) * 400 + 500, 0.03, 0.1)}.play

    a = LPF.ar(BrownNoise.ar(), 400) // lowpass filter, input: BrownNoise, frequency: 400
    b = LPF.ar(BrownNoise.ar(), 14) // lowpass filter, input: BrownNoise, frequency: 14
    b = b * 400 + 500
    c = 0.03 // reciprocal of Q
    d = 0.1 // Output will be multiplied by this value
    e = RHPF.ar(a, b, c, d) // highpass filter, input: lowpass filter, frequency: lowpass filter, reciprocal of Q, output multiplied by this value
    {e}.play // plays sound

