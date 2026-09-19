---
title: "Guilds & Practicing Skills"
description: "Visit character guilds and spend practice points to learn weapon skills and spells."
teach:
  - command: "prac"
    desc: "check remaining practice points and trained skills"
  - command: "prac slash"
    desc: "train weapon proficiencies or skills at a guildmaster"
steps:
  - story: "With his stamina restored, Ermin escorts Fuor to the local Warrior Guildmaster to refine his swordcraft."
  - ask: "prac"
    note: "Check your available practice points using `prac`."
    accept:
      - "prac"
      - "practice"
    hint: "Type: prac"
  - ask: "prac slash"
    note: "Train your slash weapon skill with `prac slash`."
    accept:
      - "prac slash"
      - "practice slash"
    hint: "Type: prac slash"
responses:
  prac: |
    You have 10 practice sessions left.

    Skill       Knowledge  Difficulty  Class
    ------------------------------------------
    Bandage     Bad        Easy        None
    Wilderness  Bad        Normal      None
    Dodge       Bad        Hard        Thief
    Search      Bad        Normal      Thief
    Parry       Bad        Normal      Warrior

    *+->
  practice: |
    You have 10 practice sessions left.
  prac slash: |
    You practice slash.
    Your skill in slash is now 45%!

    *+->
  practice slash: |
    You practice slash.
    Your skill in slash is now 45%!

    *+->
---

# Chapter 13: Training at the Warrior Guild

Refreshed from his rest, Fuor visits the local Warrior Guildmaster in Black Hill Village. As heroes gain experience and travel points across Middle-earth, they earn practice sessions to train weapon proficiencies and skills.

Help Fuor inspect his training sessions (`prac`) and hone his blade skill (`prac slash`) below!
