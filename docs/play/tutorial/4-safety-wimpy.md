---
title: "Combat Safety Setup & Wimpy"
description: "Configure automatic emergency flee thresholds and reduce screen text velocity."
teach:
  - command: "change wimpy 15"
    desc: "set automatic flee HP safety threshold"
  - command: "change spam all"
    desc: "enable NoSpam mode to filter unnecessary text velocity"
steps:
  - ask: "change wimpy 15"
    note: "Set your automatic auto-flee safety threshold to 15 HP using `change wimpy 15`."
    accept:
      - "change wimpy 15"
      - "cha wimpy 15"
      - "cha w 15"
    hint: "Type: change wimpy 15"
  - story: "With his combat instincts sharpened, Fuor cleans his vision so no threat escapes his notice."
  - ask: "change spam all"
    note: "Reduce text velocity and spam by enabling `change spam all`."
    accept:
      - "change spam all"
      - "cha spam all"
    hint: "Type: change spam all"
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
  change spam all: |
    All spam settings enabled.

    *+->
  cha spam all: |
    All spam settings enabled.

    *+->
---

# Chapter 4: Steeling Combat Reflexes

Fuor knows that the hills beyond the village gates harbor dangerous beasts and outlaw bands. Before venturing forth, he must configure his survival instincts—setting `change wimpy 15` ensures Fuor automatically flees if injured below 15 HP, while `change spam all` clarifies fast-moving combat text.

Steel Fuor's reflexes by typing `change wimpy 15` followed by `change spam all` below!
