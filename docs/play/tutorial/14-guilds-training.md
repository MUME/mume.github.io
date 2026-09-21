---
title: "Guilds & Practicing Skills"
description: "Visit character guilds and spend practice points to learn weapon skills and spells."
teach:
  - command: "prac"
    desc: "check remaining practice points and trained skills"
  - command: "prac slash"
    desc: "train weapon proficiencies or skills at a guildmaster"
steps:
  - story: |
      ![Retired Warrior's Home](/assets/images/tutorial-maps/warrior-guild.jpg)
  - story: "With his stamina restored, Irelm escorts Fuor to the local Warrior Guildmaster to refine his swordcraft."
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

# Training at the Warrior Guild

Refreshed from his rest, Fuor visits the retired warrior who trains newcomers. As you earn experience and travel points you gain practice sessions - spend them to learn skills. `prac` shows what you can learn; `prac <skill>` trains it. The better you know a skill, the more effective you become. Guilds are marked with a "G" on the map.
