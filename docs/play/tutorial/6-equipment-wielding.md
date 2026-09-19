---
title: "Equipment & Wielding"
description: "Inspect carried items, equip body armor, wield primary weapons, and fasten shields."
teach:
  - command: "equipment"
    desc: "display all currently worn items and wielded weapons"
  - command: "inventory"
    desc: "check carried supplies and unequipped gear"
  - command: "wear jerkin"
    desc: "put on soft leather jerkin armor"
  - command: "wield backsword"
    desc: "wield your primary backsword in your main hand"
  - command: "wear shield"
    desc: "fasten small wooden shield on your off-arm"
steps:
  - ask: "equipment"
    note: "Check currently equipped items with `equipment` (or `eq`)."
    accept:
      - "equipment"
      - "eq"
    hint: "Type: equipment (or eq)"
  - ask: "inventory"
    note: "Check unequipped items carried in your hands and pack with `inventory` (or `i`)."
    accept:
      - "inventory"
      - "inv"
      - "i"
    hint: "Type: inventory (or i)"
  - story: "Fuor pulls his soft leather jerkin over his shoulders and buckles his belt tight."
  - ask: "wear jerkin"
    note: "Put on your soft leather jerkin body armor."
    accept:
      - "wear jerkin"
      - "wear soft leather jerkin"
    hint: "Type: wear jerkin"
  - ask: "wield backsword"
    note: "Wield your main backsword into your primary weapon hand."
    accept:
      - "wield backsword"
      - "wield sword"
    hint: "Type: wield backsword"
  - ask: "wear shield"
    note: "Fasten your small wooden shield on your off-arm."
    accept:
      - "wear shield"
    hint: "Type: wear shield"
responses:
  equipment: |
    You are using:
    <wielded>            a backsword (flawless)
    <worn as shield>     a small wooden shield (flawless)
    <worn on body>       a soft leather jerkin (flawless)
    <worn on legs>       a pair of plain trousers (flawless)
    <worn on feet>       a pair of rigid leather boots (flawless)
    <worn across back>   a shortbow
    <worn as belt>       a plain leather belt
    <worn on belt>       a hunting knife (flawless)
    <worn on belt>       a lit lantern
    <worn on belt>       a dark coloured flask
    <worn on belt>       a quiver

    *+->
  eq: |
    You are using:
    <wielded>            a backsword (flawless)
    <worn as shield>     a small wooden shield (flawless)
    <worn on body>       a soft leather jerkin (flawless)
    <worn on legs>       a pair of plain trousers (flawless)
    <worn on feet>       a pair of rigid leather boots (flawless)
    <worn across back>   a shortbow
    <worn as belt>       a plain leather belt
    <worn on belt>       a hunting knife (flawless)
    <worn on belt>       a lit lantern
    <worn on belt>       a dark coloured flask
    <worn on belt>       a quiver

    *+->
  inventory: |
    You are carrying:
    a loaf of bread
    a large biscuit
    a small piece of meat
    a loaf of bread
    a cup
    a large sack

    *+->
  inv: |
    You are carrying:
    a loaf of bread
    a large biscuit
    a small piece of meat
    a loaf of bread
    a cup
    a large sack

    *+->
  i: |
    You are carrying:
    a loaf of bread
    a large biscuit
    a small piece of meat
    a loaf of bread
    a cup
    a large sack

    *+->
  wear jerkin: |
    You wear a soft leather jerkin on your body.

    *+->
  wear soft leather jerkin: |
    You wear a soft leather jerkin on your body.

    *+->
  wear shield: |
    You fasten a small wooden shield on your arm.

    *+->
  wield backsword: |
    You wield a backsword in your right hand.

    *+->
  wield sword: |
    You wield a backsword in your right hand.

    *+->
---

# Chapter 6: Arming for the Road

Carrying armor and weapons in a pack offers no protection—Fuor must don his jerkin (`wear jerkin`), grip his backsword (`wield backsword`), and fasten his wooden shield (`wear shield`).

Arm Fuor for the road ahead by inspecting his `equipment` and `inventory`, then donning his gear below!
