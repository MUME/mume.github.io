---
title: "Renting: Saving Your Character and their Equipment"
description: "Rent a room at an inn to store your gear and save your character."
teach:
  - command: "up"
    desc: "ascend to the Inn's Private Rooms"
  - command: "examine innkeeper"
    desc: "inspect the innkeeper at his desk"
  - command: "offer"
    desc: "ask the innkeeper for your daily storage rate"
  - command: "rent"
    desc: "safely store your gear and save your character"
steps:
  - story: |
      ![Inn's Private Rooms](/assets/images/tutorial-maps/rent.jpg)
  - ask: "up"
    note: "From the Common Room of The Foaming Mug, climb `up` to the Inn's Private Rooms."
    accept:
      - "up"
      - "u"
    hint: "Type: up (or u)"
  - story: "The old innkeeper looks up from his ledger and greets Fuor with a warm nod."
  - ask: "examine innkeeper"
    note: "Examine the innkeeper standing behind the desk using `examine innkeeper`."
    accept:
      - "examine innkeeper"
      - "ex innkeeper"
    hint: "Type: examine innkeeper"
  - ask: "offer"
    note: "Request a storage cost quote using `offer`."
    accept:
      - "offer"
    hint: "Type: offer"
  - ask: "rent"
    note: "Safely store your equipment and save Fuor using `rent`!"
    accept:
      - "rent"
    hint: "Type: rent"
responses:
  up: |
    Inn's Private Rooms
    The innkeeper is here, smiling at would-be customers.
    Exits: north, down.
    The innkeeper says 'Welcome to the largest inn in Black Hill village! I have never run out of rooms.'

    ![>
  u: |
    Inn's Private Rooms
    The innkeeper stands behind the desk here.
    Exits: north, down.

    ![>
  examine innkeeper: |
    The old innkeeper was maybe in his youth an adventurer like yourself, who
    prospered enough on his travels to buy this inn.
    The innkeeper is in an excellent condition.
    The innkeeper is using:
    <worn on body>       a chequered shirt (flawless)
    <worn on legs>       a pair of cotton pants (worn)
    <worn on finger>     a ring

    ![>
  ex innkeeper: |
    The old innkeeper stands behind the counter, smiling warmly.

    ![>
  offer: |
    The innkeeper tells you 'It will cost you 19 copper pennies per day.'
    You have enough money for at least two years!

    ![>
  rent: |
    The innkeeper tells you 'It will cost you 19 copper pennies per day.'
    You have enough money for at least two years!
    The innkeeper calls for a servant who hurries from attending guests.
    The innkeeper says 'Please bring our esteemed guest to their chamber.'
    You are guided to your private room. Your equipment is safely stored.

    ![>
---

# Securing the Night at the Inn

Simply disconnecting in the wild drops your equipment. **To save your equipment and character**, head `up` to the **Inn's Private Rooms**, `examine innkeeper`, ask the rate with `offer`, then `rent`. There are many inns around Middle-earth - look for the "R" on the map. Remember: always `rent` at the end of a session!
