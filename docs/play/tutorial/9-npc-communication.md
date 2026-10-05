---
title: "NPCs and Player Interaction"
description: "Converse with people in the room and interact directly with tell and follow."
teach:
  - command: "south"
    desc: "follow Irelm south to the Black Hill Market Square"
  - command: "say yes"
    desc: "speak aloud to everyone in the room (NPCs react to keywords)"
  - command: "tell irelm hello"
    desc: "send a private message to an actual player anywhere"
  - command: "follow irelm"
    desc: "follow a player and join their group"
steps:
  - story: |
      ![Black Hill Market Square](/assets/images/tutorial-maps/market-square.jpg)
  - story: "Irelm the Dúnadan strides in from the north, a weathered ranger with a longbow across his back. 'Well met, young Fuor! Walk with me to the square.'"
  - ask: "south"
    note: "Follow Irelm out of the inn: type `south` (or `s`) to step into the Black Hill Market Square."
    accept:
      - "south"
      - "s"
    hint: "Type: south (or s)"
  - ask: "say yes"
    note: "In the village Fuor meets two kinds of character. **NPCs** (game-generated characters, also called \"mobs\") react to keyword phrases spoken aloud with `say`. Maelton the village elder asks for help - type `say yes` to accept."
    accept:
      - "say yes"
      - "say y"
    hint: "Type: say yes"
  - story: "Irelm nods approvingly. 'A friend of the village already. Speak to me directly - I am a real person, not a mob.'"
  - ask: "tell irelm hello"
    note: "**Actual players** like Irelm talk freely and can be reached anywhere. Send him a private message with `tell <player> <message>` - type `tell irelm hello`."
    accept:
      - "tell irelm hello"
      - "tell irelm"
    hint: "Type: tell irelm hello"
  - ask: "follow irelm"
    note: "Irelm invites you along. Type `follow irelm` to travel with him and join his group. You can also `group` to share experience points on your adventures."
    accept:
      - "follow irelm"
      - "fol irelm"
    hint: "Type: follow irelm"
responses:
  south: |
    Black Hill Market Square
    Maelton, village elder of Black Hill, stands here watching the goings-on.
    Irelm the Dúnadan is here.
    Exits: north, east, south, west.

    !+*>
  s: |
    Black Hill Market Square
    Maelton, village elder of Black Hill, stands here watching the goings-on.
    Irelm the Dúnadan is here.
    Exits: north, east, south, west.

    !+*>
  say yes: |
    You say 'yes'
    Maelton the village elder says 'Thank you, Fuor! Please visit the local grocer in the southern shop.'

    !+*>
  say y: |
    You say 'yes'
    Maelton the village elder says 'Thank you, Fuor! Please visit the local grocer in the southern shop.'

    !+*>
  tell irelm hello: |
    You tell Irelm 'hello'

    Irelm tells you 'Stay close, young Fuor, and I shall guide you through the hills.'

    !+*>
  tell irelm: |
    You tell Irelm 'hello'

    Irelm tells you 'Stay close, young Fuor, and I shall guide you through the hills.'

    !+*>
  follow irelm: |
    You now follow Irelm.
    You are now a member of Irelm's group.

    Irelm says 'Excellent! Together we shall explore the countryside.'

    !+*>
  fol irelm: |
    You now follow Irelm.
    You are now a member of Irelm's group.

    Irelm says 'Excellent! Together we shall explore the countryside.'

    !+*>
---

# Meeting Irelm the Dúnadan

Fuor meets two kinds of character in Black Hill. **Non-Player Characters** (game-generated characters, also called "mobs") such as Maelton the village elder react to keyword phrases spoken aloud with `say`. **Actual players**, like **Irelm the Dúnadan**, talk freely (`tell irelm hello`) and let you follow them around (`follow irelm`). Follow Irelm `south` to the Market Square to meet the elder.
