---
title: "Checking Vitals & Stats"
description: "Inspect your hit points, mana points (mana is used for casting spells - you'll need to practise magic later should you want to cast spells), movement points, combat parameters and full character attributes."
teach:
  - command: "score"
    desc: "check current Hit Points, Mana, and Movement Points"
  - command: "stat"
    desc: "view offensive, defensive and parry combat bonuses as well as the experience and travel points needed to level"
  - command: "info"
    desc: "display full character sheet attributes and travel points"
steps:
  - ask: "score"
    note: "Check your core vitals with `score` (or `sc`)."
    accept:
      - "score"
      - "sc"
    hint: "Type: score (or sc)"
  - story: "Feeling healthy and rested, Fuor reviews his martial attributes and adventurer record."
  - ask: "stat"
    note: "Check combat attributes (OB/DB/PB), armor rating, and experience needed with `stat`."
    accept:
      - "stat"
      - "st"
    hint: "Type: stat"
  - ask: "info"
    note: "Display your full character overview sheet with `info`."
    accept:
      - "info"
      - "inf"
    hint: "Type: info"
responses:
  score: |
    36/36 hits, 76/76 mana, and 126/126 moves.

    *+->
  sc: |
    36/36 hits, 76/76 mana, and 126/126 moves.

    *+->
  stat: |
    OB: 10%, DB: 31%, PB: 13%, Armour: 19%. Wimpy: 15. Mood: wimpy.
    Needed: 999 xp, 27 tp. Gold: 0. Alert: normal.

    *+->
  st: |
    OB: 10%, DB: 31%, PB: 13%, Armour: 19%. Needed: 999 xp, 27 tp.

    *+->
  info: |
    You are a male Eriadorian.
    You are 18 years and 3 days old.
    You have played 1 hour (real time). Session: 1 mins (not encrypted).
    This ranks you as Fuor the Man Adventurer (level 1).
    You are five feet eight and weigh eleven stone and six pounds.
    Perception: vision 30, hearing -2, smell -25. Alertness: normal.
    You are a well-meaning person, always glad to help your friends.
    You are welcome in Black Hill Village.
    Your equipment weighs forty-three pounds. A tad uncomfortable, but no problem.
    Your base abilities are: Str:18 Int:12 Wis:11 Dex:17 Con:16 Wil:13 Per:15.
    Offensive Bonus: 10%, Dodging Bonus: 31%, Parrying Bonus: 13%.
    Your armour provides an average protection of 19%.
    You have 36/36 hit, 76/76 mana, and 126/126 movement points.
    Your mood is wimpy. You will flee if your hit points go below 15.
    You have scored 1 experience point and you have 27 travel points.
    You need 999 exp. points and 27 travel points to reach the next level.
    You have 5 silver pennies and 87 copper pennies.
    You are speaking Westron.

    *+->
  inf: |
    Fuor the Man Adventurer (level 1). Hit: 36/36, Mana: 76/76, Moves: 126/126.

    *+->
---

# Checking your Statistics

Standing tall in the morning breeze, Fuor takes stock of his physical stamina and martial capabilities. `score` reveals health and movement points, `stat` measures offensive and defensive bonuses, and `info` presents Fuor's complete hero record.

Check Fuor's readiness by typing `score`, `stat`, and `info` below!
