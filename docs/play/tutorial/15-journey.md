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
  - story: |
      ![Web Client Interface](/assets/images/tutorial-desc.png)
      When connected via the MUME Web Client, you'll enjoy integrated live mapping and stats tracking.
  - ask: "map"
    note: "Type `map` to examine the live MMapper radar view."
    accept:
      - "map"
      - "m"
    hint: "Type: map"
  - story: |
      ![MMapper Live Radar](/assets/images/tutorial-map.png)
      MMapper tracks your position in real-time as you journey through Middle-earth.
  - ask: "who ranger"
    note: "MUME Rangers exist specifically to assist new players! Check active Rangers with `who ranger`."
    accept:
      - "who ranger"
      - "who rangers"
      - "who"
    hint: "Type: who ranger"
responses:
  look: |
    The Foaming Mug's Beer Garden
    A quiet courtyard paved with cobblestones lies behind the tavern.
    Exits: north, east.
    Ranger Ermin smiles warmly at you.

    *+->
  map: |
    #   .   .
    |   |   |
    .-*---*---*-.
    |   |   |
    #   .   .

    *+->
  who ranger: |
    Rangers
    -------

    0 such allies or visible Ainur on.

    *+->
  who rangers: |
    Rangers
    -------

    0 such allies or visible Ainur on.

    *+->
  who: |
    Players Online: Fuor, Martyrson, Elrond, Glorfindel.

    *+->
---

# Chapter 15: Hero's Graduation

Congratulations on guiding Fuor through the Black Hills walkthrough! Follow the interactive quest prompts below to complete your graduation.
