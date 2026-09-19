---
title: "Examining & Containers"
description: "Inspect specific objects in detail and practice putting items in or retrieving them from bags."
teach:
  - command: "examine table"
    desc: "inspect a specific object in detail"
  - command: "get cheese sack"
    desc: "retrieve an item from inside a container"
  - command: "put cheese sack"
    desc: "store an item inside a bag or container"
steps:
  - ask: "examine table"
    note: "Use `examine` (or `exa`) to inspect the small oaken table in detail."
    accept:
      - "examine table"
      - "exa table"
      - "examine"
    hint: "Type: examine table"
  - story: "Fuor unclasps his leather pack to double-check his travelling provisions."
  - ask: "get cheese sack"
    note: "Retrieve rations from inside your sack using `get <item> <container>`."
    accept:
      - "get cheese sack"
      - "get cheese from sack"
    hint: "Type: get cheese sack"
  - ask: "put cheese sack"
    note: "Store items back in your bag using `put <item> <container>`."
    accept:
      - "put cheese sack"
      - "put cheese in sack"
    hint: "Type: put cheese sack"
responses:
  examine table: |
    A small oaken table crafted from local timber rests on the garden lawn.
    On the table, there is a piece of cheese.

    !.*>
  exa table: |
    A small oaken table crafted from local timber rests on the garden lawn.

    !.*>
  get cheese sack: |
    You get a piece of cheese from a large sack.

    !.*>
  get cheese from sack: |
    You get a piece of cheese from a large sack.

    !.*>
  put cheese sack: |
    You put a piece of cheese in a large sack.

    !.*>
  put cheese in sack: |
    You put a piece of cheese in a large sack.

    !.*>
---

# Chapter 3: Unpacking the Travel Sack

Sitting at a simple oaken table in the beer garden, Fuor prepares his supplies for the road ahead. Detailed inspection uses `examine`, while pack organization follows `get <item> <container>` and `put <item> <container>`.

Help Fuor examine the table, unpack his travel cheese, and stow it securely by typing `examine table`, `get cheese sack`, and `put cheese sack` below!
