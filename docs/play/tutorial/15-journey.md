---
title: "Hero's Graduation & Web Client"
description: "Familiarize yourself with the MUME Web Client, live mapper, and community Rangers."
teach:
  - command: "look"
    desc: "inspect your surroundings and client layout"
  - command: "map"
    desc: "view live map orientation"
  - command: "who ranger"
    desc: "find online Rangers dedicated to assisting new players"
steps:
  - story: "As dawn rises over the Black Hills, Fuor prepares to step into Middle-earth!"
  - ask: "look"
    note: "Type `look` to orient yourself in the Web Client interface."
    accept:
      - "look"
      - "l"
    hint: "Type: look"
  - story: "![Web Client Interface](/assets/images/tutorial-desc.png)\nWhen connected via the MUME Web Client, you'll enjoy integrated live mapping and stats tracking."
  - ask: "map"
    note: "Type `map` to examine the live MMapper radar view."
    accept:
      - "map"
      - "m"
    hint: "Type: map"
  - story: "![MMapper Live Radar](/assets/images/tutorial-map.png)\nMMapper tracks your position in real-time as you journey through Middle-earth."
  - ask: "who ranger"
    note: "MUME Rangers exist specifically to assist new players! Check active Rangers with `who ranger`."
    accept:
      - "who ranger"
      - "who rangers"
      - "who"
    hint: "Type: who ranger"
responses:
  look: "The Foaming Mug's Beer Garden\nA quiet courtyard paved with cobblestones lies behind the tavern.\nExits: north, east.\nRanger Ermin smiles warmly at you.\n\n*+->"
  map: "    #   .   .\n    |   |   |\n  .-*---*---*-.\n    |   |   |\n    #   .   .\n\n*+->"
  who ranger: "Rangers\n-------\n\n0 such allies or visible Ainur on.\n\n*+->"
  who rangers: "Rangers\n-------\n\n0 such allies or visible Ainur on.\n\n*+->"
  who: "Players Online: Fuor, Martyrson, Elrond, Glorfindel.\n\n*+->"
---

# Chapter 15: Hero's Graduation

Congratulations on guiding Fuor through the Black Hills walkthrough! Follow the interactive quest prompts below to complete your graduation.
