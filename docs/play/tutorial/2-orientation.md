---
title: "Creating your account and first character"
description: "See how MUME accounts work, then wake the practice hero Fuor. Nothing here is saved - you make your own account and character (including name and race) when you play for real."
teach:
  - command: "new"
    desc: "how a player begins account creation (here it is just for show)"
  - command: "wake"
    desc: "wake the ready-made practice hero for this walkthrough"
steps:
  - story: |
      ![Common Room of The Foaming Mug](/assets/images/tutorial-maps/common-room.jpg)
  - ask: "new"
    note: "This is a practice run - you are **not** creating a real account here. Type `new` to see how a first-time player would begin. When you play for real, this is where you would make your own account."
    accept:
      - "new"
    hint: "Type: new"
  - story: "A quiet morning breaks over Eriador. In the courtyard of The Foaming Mug, Fuor takes his first breath of adventuring air."
  - ask: "wake"
    note: "**Fuor** is a ready-made hero we lend you just for this walkthrough - when you play for real you will pick your own race, class and name. Type `wake` to wake him and begin."
    accept:
      - "wake"
      - "Wake"
    hint: "Type: wake"
responses:
  new: |
    Welcome to MUME!

    Your first step here is to create an ACCOUNT.

    MUME characters are organized into accounts. You can only have ONE ACCOUNT, and
    it cannot be shared with other players. You can create as many characters as
    you like, but they must all belong to this single account.

    Do you have another account on MUME [Y/N/?]?
  wake: |2
               ~~~
              ~~         _----|        _ _ __ _ _
                          ----|_----|  ]-I-II-I-[
      _ _ _/\_ _ _ _---|      | ----|   \ `  ' /
      ]-I-I--I-I-[  ---|      |     |    |. ` |

    Welcome to MUME! Fuor the Man Warrior has awakened in Middle-earth.

    Your journey begins at The Foaming Mug's Beer Garden in Black Hill Village!

    !.*>
  Wake: |2
               ~~~
              ~~         _----|        _ _ __ _ _
                          ----|_----|  ]-I-II-I-[
      _ _ _/\_ _ _ _---|      | ----|   \ `  ' /
      ]-I-I--I-I-[  ---|      |     |    |. ` |

    Welcome to MUME! Fuor the Man Warrior has awakened in Middle-earth.

    Your journey begins at The Foaming Mug's Beer Garden in Black Hill Village!

    !.*>
---

# The Awakening of Fuor

For this walkthrough you borrow the boots of **Fuor**, a ready-made young warrior - a stand-in so you can try each command without setting anything up.

Our story begins in **the Black Hills**, a rugged country of rolling slopes, ancient tracks, and quiet hamlets in Eriador, where Fuor awakens in the Common Room of The Foaming Mug.

### Understanding MUME Accounts
When you connect to MUME for the first time, you register a single **Account**. All your characters - whether human warriors, elven clerics or hobbit scouts - are organised safely under this one account with a single password.
