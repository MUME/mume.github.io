---
title: "Examining items"
description: "Inspect an object in detail, then take an item from it and put it back."
teach:
  - command: "examine table"
    desc: "inspect a specific object in detail and see what is on it"
  - command: "get cheese table"
    desc: "take an item that is resting on the table"
  - command: "put cheese table"
    desc: "place an item back onto the table"
steps:
  - story: |
      ![Tavern's Cellar](/assets/images/tutorial-maps/tavern-cellar.jpg)
  - ask: "examine table"
    note: "Use `examine` (or `exa`) followed by the thing you want to inspect. Type `examine table` to take a closer look at the small oaken table."
    accept:
      - "examine table"
      - "exa table"
    hint: "Type: examine table"
  - story: "Two pieces of cheese sit beside a well-thumbed cooking book - just the thing for the road."
  - ask: "get cheese table"
    note: "Take a piece of cheese from the table with `get <item> <source>` - type `get cheese table`."
    accept:
      - "get cheese table"
      - "get cheese from table"
    hint: "Type: get cheese table"
  - ask: "put cheese table"
    note: "Changed your mind? Put it back with `put <item> <target>` - type `put cheese table`."
    accept:
      - "put cheese table"
      - "put cheese on table"
    hint: "Type: put cheese table"
  - story: "Provisions sorted, Fuor climbs back towards the Common Room."
  - ask: "up"
    note: "Head back `up` (or `u`) to the Tavern's Kitchen."
    accept:
      - "up"
      - "u"
    hint: "Type: up (or u)"
  - ask: "south"
    note: "From the kitchen, go `south` (or `s`) to return to the Common Room."
    accept:
      - "south"
      - "s"
    hint: "Type: south (or s)"
responses:
  examine table: |
    A small oaken table crafted from local timber.
    On the table, there are a cooking book and two pieces of cheese.

    !.*>
  exa table: |
    A small oaken table crafted from local timber.
    On the table, there are a cooking book and two pieces of cheese.

    !.*>
  get cheese table: |
    You get a piece of cheese from a small oaken table.

    !.*>
  get cheese from table: |
    You get a piece of cheese from a small oaken table.

    !.*>
  put cheese table: |
    You put a piece of cheese on a small oaken table.

    !.*>
  put cheese on table: |
    You put a piece of cheese on a small oaken table.

    !.*>
  up: |
    Tavern's Kitchen
    A stove stands against one wall here.
    A cook is standing here, toiling over a pot.
    Exits: south, =down=.

    !.*>
  u: |
    Tavern's Kitchen
    Exits: south, =down=.

    !.*>
  south: |
    Common Room of The Foaming Mug
    A large stone fireplace with a roaring fire warms the room.
    A bartender watches you calmly, while wiping ale mugs with a grimy cloth.
    Exits: north, east, south, up.

    !.*>
  s: |
    Common Room of The Foaming Mug
    Exits: north, east, south, up.

    !.*>
---

# Managing your Items

Down in the cool of the **Tavern's Cellar**, Fuor prepares his supplies for the road ahead. Detailed inspection uses `examine`, and you move items around with `get <item> <source>` and `put <item> <target>`. Examine the table, pocket a piece of cheese, then climb back `up` and `south` to the Common Room.
