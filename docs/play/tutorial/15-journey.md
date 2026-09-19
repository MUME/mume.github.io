---
title: "Hero's Graduation & Web Client"
description: "Familiarize yourself with the MUME Web Client, live mapper, and community Rangers."
teach:
  - command: "look"
    desc: "inspect your surroundings and client layout"
  - command: "map"
    desc: "view live map orientation"
  - command: "who ranger"
    desc: "find online Rangers dedicated to assisting new players"
steps:
  - story: "As dawn rises over the Black Hills, Fuor prepares to step into Middle-earth!"
  - ask: "look"
    note: "Type `look` to orient yourself in the Web Client interface."
    accept:
      - "look"
      - "l"
    hint: "Type: look"
  - ask: "map"
    note: "Type `map` to examine the live MMapper radar view."
    accept:
      - "map"
      - "m"
    hint: "Type: map"
  - ask: "who ranger"
    note: "MUME Rangers exist specifically to assist new players! Check active Rangers with `who ranger`."
    accept:
      - "who ranger"
      - "who rangers"
      - "who"
    hint: "Type: who ranger"
responses:
  look: "The Foaming Mug's Beer Garden\nA quiet courtyard paved with cobblestones lies behind the tavern.\nExits: north, east.\nRanger Ermin smiles warmly at you.\n\n*+->"
  map: "    #   .   .\n    |   |   |\n  .-*---*---*-.\n    |   |   |\n    #   .   .\n\n*+->"
  who ranger: "Rangers\n-------\n\n0 such allies or visible Ainur on.\n\n*+->"
  who rangers: "Rangers\n-------\n\n0 such allies or visible Ainur on.\n\n*+->"
  who: "Players Online: Fuor, Martyrson, Elrond, Glorfindel.\n\n*+->"
---

# Chapter 15: Hero's Graduation

Congratulations on guiding Fuor through the Black Hills walkthrough! You have mastered navigation, combat reflexes, equipment, trading, and resting.

### Web Client & MMapper Preview

When you launch into MUME using the Web Client, you'll see an integrated live mapper (**MMapper**) and character stats panel:

<div style="display: flex; gap: 12px; margin: 12px 0; flex-wrap: wrap;">
  <img src="../../assets/images/tutorial-desc.png" alt="Web Client Interface" style="max-width: 48%; border-radius: 6px; border: 1px solid rgba(215,166,63,0.3);" />
  <img src="../../assets/images/tutorial-map.png" alt="MMapper Live Map" style="max-width: 48%; border-radius: 6px; border: 1px solid rgba(215,166,63,0.3);" />
</div>

Follow the interactive quest prompts below to complete your graduation!
