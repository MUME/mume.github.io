---
title: "Movement & Doors"
description: "Practise moving between rooms with compass directions, and opening a closed door."
teach:
  - command: "north"
    desc: "step north from the Common Room into the Tavern's Kitchen"
  - command: "open exit down"
    desc: "open a closed door (exits shown as =down= are shut)"
  - command: "down"
    desc: "climb down through the open trapdoor into the cellar"
steps:
  - story: |
      ![Tavern's Kitchen](/assets/images/tutorial-maps/tavern-kitchen.jpg)
  - ask: "north"
    note: "You move between rooms with compass directions - `north`, `south`, `east`, `west` (and `up` / `down`). Type `north` (or `n`) to step into the Tavern's Kitchen."
    accept:
      - "north"
      - "n"
    hint: "Type: north (or n)"
  - story: "The warmth of the fire gives way to the smell of stew as Fuor steps into the busy kitchen."
  - ask: "open exit down"
    note: "Some exits are closed doors, shown in the exit list like `=down=`. Open one before you can pass with `open exit <direction>` - try `open exit down`."
    accept:
      - "open exit down"
      - "open trapdoor"
    hint: "Type: open exit down"
  - ask: "down"
    note: "With the trapdoor open, climb `down` (or `d`) into the Tavern's Cellar."
    accept:
      - "down"
      - "d"
    hint: "Type: down (or d)"
responses:
  north: |
    Tavern's Kitchen
    A stove stands against one wall here.
    A cook is standing here, toiling over a pot.
    Exits: south, =down=.

    !.*>
  n: |
    Tavern's Kitchen
    Exits: south, =down=.

    !.*>
  open exit down: |
    You open the trapdoor.

    !.*>
  open trapdoor: |
    You open the trapdoor.

    !.*>
  down: |
    Tavern's Cellar
    A beer barrel has been left here.
    A tall stone jar with a heavy lid is positioned here.
    A small oaken table has been set here.
    On the table, there are a cooking book and two pieces of cheese.
    Exits: up.

    !.*>
  d: |
    Tavern's Cellar
    Exits: up.

    !.*>
---

# Down to the Cellar

Fuor sets off to explore the inn. You move between rooms with compass directions - `north`, `south`, `east`, `west` (and `up` / `down`). Some exits are closed doors, shown in the exit list like `=down=`; open them with `open exit <direction>` before you pass through. Head `north` into the Tavern's Kitchen, then open the trapdoor and climb `down` to the cellar.
