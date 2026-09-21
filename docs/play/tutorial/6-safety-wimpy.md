---
title: "Setting up for combat"
description: "Configure an automatic flee threshold when your hit points reduce to a certain level, and reduce the amount of on-screen text."
teach:
  - command: "change wimpy 15"
    desc: "set an automatic flee HP safety threshold - you flee the fight if your hit points fall below this number"
  - command: "change spam all off"
    desc: "reduce the amount of text on the screen (type change spam to see individual elements you can alter)"
steps:
  - ask: "change wimpy 15"
    note: "Set your automatic auto-flee safety threshold to 15 HP using `change wimpy 15`."
    accept:
      - "change wimpy 15"
      - "cha wimpy 15"
      - "cha w 15"
    hint: "Type: change wimpy 15"
  - story: "With his combat instincts sharpened, Fuor cleans his vision so no threat escapes his notice."
  - ask: "change spam all off"
    note: "Reduce the amount of on-screen text by turning spam off with `change spam all off`."
    accept:
      - "change spam all off"
      - "cha spam all off"
    hint: "Type: change spam all off"
responses:
  change wimpy 15: |
    Wimpy set to: 15

    *+->
  cha wimpy 15: |
    Wimpy set to: 15

    *+->
  cha w 15: |
    Wimpy set to: 15

    *+->
  change spam all off: |
    Disabled all spam settings.

    *+->
  cha spam all off: |
    Disabled all spam settings.

    *+->
---

# Prepare for your life as a Warrior

The hills beyond the village gates harbour dangerous beasts and outlaw bands. Before venturing forth, Fuor configures his survival instincts - `change wimpy 15` makes him automatically flee if injured below 15 HP, and `change spam all off` reduces the fast-moving combat text on screen.
