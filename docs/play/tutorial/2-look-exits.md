---
title: "Look & Exits"
description: "Build muscle memory inspecting your room environment and displaying available exits."
teach:
  - command: "look"
    desc: "describe your current room surroundings"
  - command: "exits"
    desc: "list all obvious exit directions"
steps:
  - ask: "look"
    note: "Type `look` (or `l`) to inspect your room in The Foaming Mug's Beer Garden."
    accept:
      - "look"
      - "l"
    hint: "Type: look (or l)"
  - story: "The sun glistens on the stone well, and the distant neighing of horses echoes from the stables."
  - ask: "exits"
    note: "Type `exits` to display obvious cardinal exit directions."
    accept:
      - "exits"
      - "ex"
    hint: "Type: exits"
responses:
  look: |
    The Foaming Mug's Beer Garden
    Wooden tables have been set on the grass in this garden allowing those staying
    at the inn to eat and drink outdoors when the weather permits. A simple stone
    wall running around the edge of the grass keeps this area private. Faint sounds
    of horses neighing and whinnying can be heard from mounts tethered in the
    stables to the south.
    A large lamp stands on the wall here, locked into an iron fixture.
    A small oaken table has been set here.
    On the table, there is a piece of cheese.
    A circular stone well has been built here.
    Exits: south, west.

    !.*>
  l: |
    The Foaming Mug's Beer Garden
    Wooden tables have been set on the grass in this garden allowing those staying
    at the inn to eat and drink outdoors when the weather permits.
    A small oaken table has been set here.
    Exits: south, west.

    !.*>
  exits: |
    South   - Black Hill Stables
    West    - Common Room of The Foaming Mug

    !.*>
  ex: |
    South   - Black Hill Stables
    West    - Common Room of The Foaming Mug

    !.*>
---

# Chapter 2: Taking in the Surroundings

Awakening under the morning sun in **Black Hill Village**, Fuor pauses to take his bearings. In MUME, your eyes are your most critical asset—`look` describes your immediate room, while `exits` lists all available paths out.
