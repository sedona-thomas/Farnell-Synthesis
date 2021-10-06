# Farnell-Synthesis
Webpage for a Farnell synthesis (implemented in Web Audio)

## {RHPF.ar(LPF.ar(BrownNoise.ar(), 400), LPF.ar(BrownNoise.ar(), 14) * 400 + 500, 0.03, 0.1)}.play

    a = LPF.ar(BrownNoise.ar(), 400)
    b = LPF.ar(BrownNoise.ar(), 14) * 400 + 500
    c = 0.03
    d = 0.1
    e = RHPF.ar(a, b, c, d)
    {e}.play

