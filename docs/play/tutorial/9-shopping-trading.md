---
title: "Shopping & Trading"
description: "Browse shop inventory, buy travel rations, and give items to townspeople."
teach:
  - command: "south"
    desc: "head south into the Cluttered Traveller's Shop"
  - command: "list"
    desc: "browse the shopkeeper's available stock and prices"
  - command: "buy bread"
    desc: "purchase travel rations"
  - command: "give bread maelton"
    desc: "give an item to another character (item name comes first)"
steps:
  - ask: "south"
    note: "Head `south` from Market Square into the Cluttered Traveller's Shop."
    accept:
      - "south"
      - "s"
    hint: "Type: south (or s)"
  - story: "Bells jingle as Ermin and Fuor enter the shop, surrounded by dusty boxes of dried fruit and fresh baked bread."
  - ask: "list"
    note: "Type `list` to browse the grocer's wares and prices."
    accept:
      - "list"
    hint: "Type: list"
  - ask: "buy bread"
    note: "Purchase a loaf of travel bread using `buy bread`."
    accept:
      - "buy bread"
    hint: "Type: buy bread"
  - ask: "give bread maelton"
    note: "Give your bread to Maelton. Remember MUME syntax: `give <item> <person>`!"
    accept:
      - "give bread maelton"
      - "give bread to maelton"
    hint: "Type: give bread maelton"
responses:
  south: |
    Cluttered Traveller's Shop
    While the shop may be small it is packed from floor to ceiling with all manner
    of items, most of them stored in dusty boxes upon wooden shelves. It certainly
    seems as if few people have bought much of the shopkeeper's stock recently.
    A large grocer is here, waiting to buy or sell some goods.
    Exits: north.

    *[>
  s: |
    Cluttered Traveller's Shop
    Exits: north.

    *[>
  list: |
    You can buy:
       1. five large yellow apples up to thirteen copper.
       7. five large biscuits up to seven copper.
      71. ten loaves of bread up to thirteen copper.
     124. ten pieces of cheese up to seven copper.

    *[>
  buy bread: |
    You buy a loaf of bread for thirteen copper pennies.

    *[>
  give bread maelton: |
    You give a loaf of bread to Maelton the village elder.
    Maelton says 'Thank you, Fuor! You are truly a friend of Black Hill Village!'

    !+*>
  give bread to maelton: |
    You give a loaf of bread to Maelton the village elder.

    !+*>
---

# Chapter 9: Provisioning the Expedition

Guided by Ermin, Fuor visits the Cluttered Traveller's Shop to buy food for their journey into the hills. Merchant interaction uses `list` to inspect stock and `buy <item>` to make purchases. To share items, MUME syntax uses `give <item> <person>`.

Help Fuor enter the shop (`south`), inspect the grocer's wares (`list`), buy travel rations (`buy bread`), and offer a loaf to Elder Maelton (`give bread maelton`) below!
