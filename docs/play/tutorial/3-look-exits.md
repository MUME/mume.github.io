---
title: "Rooms and Exits"
description: "Build the habit of reading a room and checking the ways out before you move."
teach:
  - command: "look"
    desc: "describe the room you are standing in"
  - command: "exits"
    desc: "list the obvious ways out"
steps:
  - story: |
      ![Common Room of The Foaming Mug](/assets/images/tutorial-maps/common-room.jpg)
  - ask: "look"
    note: "Type `look` (or `l`) to take in the Common Room of The Foaming Mug, where your journey begins."
    accept:
      - "look"
      - "l"
    hint: "Type: look (or l)"
  - story: "The bartender gives you a nod over the rim of the mug he is polishing."
  - ask: "exits"
    note: "Type `exits` to list the obvious ways out of the room."
    accept:
      - "exits"
      - "ex"
    hint: "Type: exits"
responses:
  look: |
    Common Room of The Foaming Mug
    A large stone fireplace with a roaring fire warms the room.
    A bartender watches you calmly, while wiping ale mugs with a grimy cloth.
    Exits: north, east, south, up.

    !.*>
  l: |
    Common Room of The Foaming Mug
    A large stone fireplace with a roaring fire warms the room.
    A bartender watches you calmly, while wiping ale mugs with a grimy cloth.
    Exits: north, east, south, up.

    !.*>
  exits: |
    North  - Tavern's Kitchen
    East   - The Foaming Mug's Beer Garden
    South  - Black Hill Market Square
    Up     - Inn's Private Rooms

    !.*>
  ex: |
    North  - Tavern's Kitchen
    East   - The Foaming Mug's Beer Garden
    South  - Black Hill Market Square
    Up     - Inn's Private Rooms

    !.*>
---

# Taking in the Surroundings

Fuor wakes on a bench in the **Common Room of The Foaming Mug**, the busy inn at the heart of Tower Hills. In MUME your eyes are your most important tool: `look` describes the room around you, and `exits` lists the ways out.
