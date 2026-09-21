---
title: "Combat"
description: "Assess enemy strength with CONSIDER and adjust combat stances with CHANGE MOOD."
teach:
  - command: "consider snake"
    desc: "gauge enemy difficulty relative to your hero level"
  - command: "change mood aggressive"
    desc: "boost Offensive Bonus (OB) at the cost of defense"
  - command: "hit snake"
    desc: "engage target in real-time combat"
  - command: "change mood wimpy"
    desc: "restore defensive Parrying Bonus (PB) to increase your defence"
steps:
  - story: |
      ![Deeply-rutted Wagon Trail](/assets/images/tutorial-maps/wagon-trail.jpg)
  - story: "Irelm leads Fuor up a narrow trail into the rocky Black Hills. Grass rustles sharply in the thicket ahead!"
  - ask: "consider snake"
    note: "Gauge a slithering snake's strength using `consider snake`."
    accept:
      - "consider snake"
      - "con snake"
    hint: "Type: consider snake"
  - story: "The snake crouches to spring! Irelm signals Fuor to shift his weight into an aggressive stance."
  - ask: "change mood aggressive"
    note: "Switch to aggressive stance (`change mood aggressive`) to maximize your attack bonus."
    accept:
      - "change mood aggressive"
      - "cha mood aggressive"
      - "cha m aggressive"
    hint: "Type: change mood aggressive"
  - ask: "hit snake"
    note: "Attack the snake with `hit snake`."
    accept:
      - "hit snake"
      - "kill snake"
      - "k snake"
    hint: "Type: hit snake"
  - ask: "change mood wimpy"
    note: "Switch back to defensive stance (`change mood wimpy`) to restore your defense."
    accept:
      - "change mood wimpy"
      - "cha mood wimpy"
      - "cha m wimpy"
    hint: "Type: change mood wimpy"
responses:
  consider snake: |
    A slithering snake looks like an easy target for you.

    *+->
  con snake: |
    A slithering snake looks like an easy target for you.

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
  hit snake: |
    You slash a slithering snake's head hard!

    *+->
  kill snake: |
    You slash a slithering snake's head hard!

    *+->
  k snake: |
    You slash a slithering snake's head hard!

    *+->
  change mood wimpy: |
    Ok.
    Your Parrying Bonus (PB) rises to increase your defence.

    *+->
  cha mood wimpy: |
    Ok.

    *+->
  cha m wimpy: |
    Ok.

    *+->
---

# Encounter in the Black Hills

Irelm and Fuor march out into the rocky slopes of the Black Hills. Suddenly, a wild slithering snake bounds onto the trail! Irelm urges Fuor to gauge the snake's strength (`consider snake`), switch to an offensive stance (`change mood aggressive`), strike (`hit snake`), and balance his defense (`change mood wimpy`).

Guide Fuor through his first real-time combat engagement below!
