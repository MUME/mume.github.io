---
title: "Shopping & Trading"
description: "Browse a shop, buy provisions for your travels, and give items to players or NPCs."
teach:
  - command: "south"
    desc: "head south into the Cluttered Traveller's Shop"
  - command: "list"
    desc: "browse the shopkeeper's available stock and prices"
  - command: "buy bread"
    desc: "buy travel rations"
  - command: "give bread irelm"
    desc: "give an item to someone in the room (item name comes first)"
steps:
  - story: |
      ![Cluttered Traveller's Shop](/assets/images/tutorial-maps/travellers-shop.jpg)
  - ask: "south"
    note: "Head `south` from Market Square into the Cluttered Traveller's Shop."
    accept:
      - "south"
      - "s"
    hint: "Type: south (or s)"
  - story: "Bells jingle as Irelm and Fuor enter the shop, surrounded by dusty boxes of dried fruit and fresh baked bread."
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
  - ask: "give bread irelm"
    note: "Share your bread with Irelm, who is here with you. Remember MUME syntax: `give <item> <person>`!"
    accept:
      - "give bread irelm"
      - "give bread to irelm"
    hint: "Type: give bread irelm"
responses:
  south: |
    Cluttered Traveller's Shop
    A large grocer is here, waiting to buy or sell some goods.
    Irelm the Dúnadan is here.
    Exits: north.

    *[>
  s: |
    Cluttered Traveller's Shop
    A large grocer is here, waiting to buy or sell some goods.
    Irelm the Dúnadan is here.
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
  give bread irelm: |
    You give a loaf of bread to Irelm the Dúnadan.
    Irelm says 'Thank you, Fuor - good to share provisions on the road!'

    !+*>
  give bread to irelm: |
    You give a loaf of bread to Irelm the Dúnadan.
    Irelm says 'Thank you, Fuor - good to share provisions on the road!'

    !+*>
---

# Provisioning for your Adventures

Irelm takes Fuor to the **Cluttered Traveller's Shop** for food. Use `list` to see the stock, `buy <item>` to purchase, and `give <item> <person>` to hand something over (item name first).
