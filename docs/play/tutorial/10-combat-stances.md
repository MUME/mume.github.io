---
title: "Combat Safety & Stances"
description: "Assess enemy strength with CONSIDER and adjust combat stances with CHANGE MOOD."
teach:
  - command: "consider wolf"
    desc: "gauge enemy difficulty relative to your hero level"
  - command: "change mood aggressive"
    desc: "boost Offensive Bonus (OB) at the cost of defense"
  - command: "hit wolf"
    desc: "engage target in real-time combat"
  - command: "change mood wimpy"
    desc: "restore defensive Dodging Bonus (DB) to protect your health"
steps:
  - story: "Ermin leads Fuor up a narrow trail into the rocky Black Hills. Grass rustles sharply in the thicket ahead!"
  - ask: "consider wolf"
    note: "Gauge a hungry timber wolf's strength using `consider wolf`."
    accept:
      - "consider wolf"
      - "con wolf"
    hint: "Type: consider wolf"
  - story: "The wolf crouches to spring! Ermin signals Fuor to shift his weight into an aggressive stance."
  - ask: "change mood aggressive"
    note: "Switch to aggressive stance (`change mood aggressive`) to maximize your attack bonus."
    accept:
      - "change mood aggressive"
      - "cha mood aggressive"
      - "cha m aggressive"
    hint: "Type: change mood aggressive"
  - ask: "hit wolf"
    note: "Attack the wolf with `hit wolf`."
    accept:
      - "hit wolf"
      - "kill wolf"
      - "k wolf"
    hint: "Type: hit wolf"
  - ask: "change mood wimpy"
    note: "Switch back to defensive stance (`change mood wimpy`) to restore your defense."
    accept:
      - "change mood wimpy"
      - "cha mood wimpy"
      - "cha m wimpy"
    hint: "Type: change mood wimpy"
responses:
  consider wolf: |
    A hungry timber wolf looks like an easy target for you.

    *+->
  con wolf: |
    A hungry timber wolf looks like an easy target for you.

    *+->
  change mood aggressive: |
    Ok.
    Your Offensive Bonus (OB) increases while your Dodging Bonus (DB) decreases.

    *+->
  cha mood aggressive: |
    Ok.

    *+->
  cha m aggressive: |
    Ok.

    *+->
  hit wolf: |
    You slash a hungry timber wolf's side with your backsword!
    A hungry timber wolf growls and snaps at you!

    *+->
  kill wolf: |
    You slash a hungry timber wolf's side with your backsword!

    *+->
  k wolf: |
    You slash a hungry timber wolf's side with your backsword!

    *+->
  change mood wimpy: |
    Ok.
    Your Dodging Bonus (DB) increases to protect your health.

    *+->
  cha mood wimpy: |
    Ok.

    *+->
  cha m wimpy: |
    Ok.

    *+->
---

# Chapter 10: Encounter in the Black Hills

Ermin and Fuor march out into the rocky slopes of the Black Hills. Suddenly, a wild timber wolf bounds onto the trail! Ermin urges Fuor to gauge the wolf's strength (`consider wolf`), switch to an offensive stance (`change mood aggressive`), strike (`hit wolf`), and balance his defense (`change mood wimpy`).

Guide Fuor through his first real-time combat engagement below!
