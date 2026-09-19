---
title: "NPC Triggers vs. Player Communication & Ranger Allies"
description: "Understand the difference between simple NPC trigger words and rich player interaction with TELL and FOLLOW."
teach:
  - command: "say yes"
    desc: "speak aloud to respond to an automated NPC trigger"
  - command: "tell ermin hello"
    desc: "send a private direct message to a living player anywhere in Middle-earth"
  - command: "follow ermin"
    desc: "follow an experienced player or ranger and join their adventuring party"
steps:
  - ask: "say yes"
    note: "Maelton the village elder asks for help. NPCs respond to simple keyword triggers spoken aloud. Type `say yes` to accept."
    accept:
      - "say yes"
      - "say y"
    hint: "Type: say yes"
  - story: "Ermin the Ranger steps out from the shadow of the tavern, adjusting his weathered dark grey cloak."
  - ask: "tell ermin hello"
    note: "Unlike automated NPCs, living players and Rangers engage in rich, freeform communication! Reply to Ermin using `tell ermin hello`."
    accept:
      - "tell ermin hello"
      - "tell ermin"
      - "tell"
    hint: "Type: tell ermin hello"
  - story: "Ermin smiles warmly and unslings his longbow, beckoning Fuor to fall into line."
  - ask: "follow ermin"
    note: "Ermin invites you to join his party. Type `follow ermin` to travel alongside the ranger."
    accept:
      - "follow ermin"
      - "fol ermin"
    hint: "Type: follow ermin"
responses:
  say yes: |
    You say 'yes'
    Maelton the village elder says 'Thank you, Fuor! Please visit the local grocer in the southern shop.'

    Ermin the Ranger steps out from the shadow of the inn, smiling warmly.
    Ermin tells you 'Greetings, young Fuor! Are you ready for the wild?'

    !+*>
  say y: |
    You say 'yes'

    Maelton the village elder says 'Thank you, Fuor!'

    Ermin tells you 'Greetings, young Fuor! Are you ready for the wild?'

    !+*>
  tell ermin hello: |
    You tell Ermin 'hello'

    Ermin tells you 'Follow me, young Fuor! I shall guide you through the hills.'

    !+*>
  tell ermin: |
    You tell Ermin 'hello'

    Ermin tells you 'Follow me, young Fuor! I shall guide you through the hills.'

    !+*>
  tell: |
    You tell Ermin 'hello'

    Ermin tells you 'Follow me, young Fuor! I shall guide you through the hills.'

    !+*>
  follow ermin: |
    You now follow Ermin.
    You are now a member of Ermin's group.

    Ermin says 'Excellent! Together we shall explore the eastern countryside.'

    !+*>
  fol ermin: |
    You now follow Ermin.
    You are now a member of Ermin's group.

    !+*>
---

# Chapter 8: Meeting Ermin the Ranger

In Black Hill Market Square, Fuor encounters two very different kinds of characters:

### 1. Automated NPCs (Non-Player Characters)
NPCs like Elder Maelton, shopkeepers, and guildmasters are computer-controlled triggers. They react to specific keyword phrases spoken aloud using `say` (e.g. `say yes`).

### 2. Living Human Players & MUME Rangers
In contrast, **Ermin the Ranger** is a living player and veteran guardian of the Dúnedain. Living players engage in rich, freeform communication (`tell ermin hello`) and group adventuring (`follow ermin`)!

Help Fuor accept Maelton's quest, greet Ermin, and join the Ranger's party by typing `say yes`, `tell ermin hello`, and `follow ermin` below!
