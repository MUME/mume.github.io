---
title: "Movement & Doors"
description: "Practice cardinal directions, room transitions, and opening doors."
teach:
  - command: "south"
    desc: "move south into Black Hill Stables"
  - command: "west"
    desc: "move west into Market Square"
  - command: "open door"
    desc: "open closed door or gate"
  - command: "north"
    desc: "move north into Common Room"
steps:
  - ask: "south"
    note: "Move `south` (or `s`) into Black Hill Stables."
    accept:
      - "south"
      - "s"
    hint: "Type: south (or s)"
  - story: "Stable hands wave as Fuor walks past the tethered horses into the morning village square."
  - ask: "west"
    note: "Move `west` (or `w`) into Black Hill Market Square."
    accept:
      - "west"
      - "w"
    hint: "Type: west (or w)"
  - ask: "open door"
    note: "Open closed doors or gates before moving through them using `open door`."
    accept:
      - "open door"
      - "open gate"
      - "open north"
    hint: "Type: open door"
  - ask: "north"
    note: "Move `north` (or `n`) into the Common Room of The Foaming Mug."
    accept:
      - "north"
      - "n"
    hint: "Type: north (or n)"
responses:
  south: |
    Black Hill Stables
    Narrow wooden stalls filled with fresh-cut hay provide basic but comfortable
    accommodation for horses and mules of all kinds. Primitive but functional tack
    for use on the horses has been stored on a wooden trestle against the outer
    wall. A ladder leading to the loft space allows the stable-hands access.
    A long water trough made of wood stands here.
    Exits: north, east, west.

    ![>
  s: |
    Black Hill Stables
    Exits: north, east, west.

    ![>
  west: |
    Black Hill Market Square
    This is the heart and centre of the village. Many residents crowd the square,
    talking and laughing as they go about their business. A small market has been
    set up here specialising in vegetables and other local produce. A rather large
    building dominates the northern side of the square.
    Maelton, village elder of Black Hill, stands here watching the goings-on.
    Exits: north, east, south, =west=.

    !+*>
  w: |
    Black Hill Market Square
    Exits: north, east, south, =west=.

    !+*>
  open door: |
    You open the door.

    !.*>
  open gate: |
    You open the gate.

    !.*>
  open north: |
    You open the north door.

    !.*>
  north: |
    Common Room of The Foaming Mug
    This large room is filled with long, wooden tables and simple benches running
    along each side. The locals appear to be making great use of this inn with most
    tables taken and the room filled with sounds of chattering and clinking of
    mugs. Set into the wall is a large, open fire which burns local peat.
    A bartender watches you calmly, while wiping ale mugs with a grimy cloth.
    Exits: north, east, south, up.

    ![>
  n: |
    Common Room of The Foaming Mug
    Exits: north, east, south, up.

    ![>
---

# Chapter 7: Stepping into Black Hill Village

Fully armed, Fuor leaves the beer garden and steps out into the wider village. He navigates south through the stables (`south`), west into Market Square (`west`), opens the inn's heavy wooden doors (`open door`), and steps inside (`north`).

Guide Fuor through the village paths by typing `south`, `west`, `open door`, and `north` below!
