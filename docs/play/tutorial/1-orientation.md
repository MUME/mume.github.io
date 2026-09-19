---
title: "Account Registration & Hero Definition"
description: "Learn how player accounts work in MUME with NEW, then enter Fuor to define your character and awaken."
teach:
  - command: "new"
    desc: "begin account creation process"
  - command: "Fuor"
    desc: "enter sample tutorial hero name (Fuor) for this walkthrough"
steps:
  - ask: "new"
    note: "In MUME, each player manages all their characters under a SINGLE ACCOUNT. Type `new` to begin registration."
    accept:
      - "new"
    hint: "Type: new"
  - story: "A quiet morning breaks over Eriador. In the courtyard of The Foaming Mug, Fuor takes his first breath of adventuring air."
  - ask: "Fuor"
    note: "Type `Fuor` to continue this tutorial walkthrough. (When playing MUME live, you will choose your own unique hero name!)."
    accept:
      - "Fuor"
      - "fuor"
    hint: "Type: Fuor"
responses:
  new: |
    Welcome to MUME!

    Your first step here is to create an ACCOUNT.

    MUME characters are organized into accounts. You can only have ONE ACCOUNT, and
    it cannot be shared with other players. You can create as many characters as
    you like, but they must all belong to this single account.

    Do you have another account on MUME [Y/N/?]?
  Fuor: |2
               ~~~
              ~~         _----|        _ _ __ _ _
                          ----|_----|  ]-I-II-I-[
      _ _ _/\_ _ _ _---|      | ----|   \ `  ' /
      ]-I-I--I-I-[  ---|      |     |    |. ` |

    Welcome to MUME! Fuor the Man Warrior has awakened in Middle-earth.

    Your journey begins at The Foaming Mug's Beer Garden in Black Hill Village!

    !.*>
  fuor: |2
               ~~~
              ~~         _----|        _ _ __ _ _
                          ----|_----|  ]-I-II-I-[
      _ _ _/\_ _ _ _---|      | ----|   \ `  ' /
      ]-I-I--I-I-[  ---|      |     |    |. ` |

    Welcome to MUME! Fuor the Man Warrior has awakened in Middle-earth.

    Your journey begins at The Foaming Mug's Beer Garden in Black Hill Village!

    !.*>
---

# Chapter 1: The Awakening of Fuor

Our story begins in **the Black Hills**, a rugged country of rolling slopes, ancient tracks, and quiet hamlets in Eriador. You step into the boots of **Fuor**, an eager Young Warrior awakening at The Foaming Mug's Beer Garden in **Black Hill Village**.

### Understanding MUME Accounts
When you connect to MUME for the first time, you register a single **Account**. All your characters—whether human warriors, elven scouts, or hobbit thieves—are organized safely under this one account with a single password.
