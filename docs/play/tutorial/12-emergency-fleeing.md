---
title: "Fleeing from fights"
description: "Master emergency tactical retreats to disengage from dangerous combat."
teach:
  - command: "flee"
    desc: "immediately disengage and run away through a random exit"
steps:
  - story: |
      ![Tower Hills](/assets/images/tutorial-maps/tower-hills.jpg)
  - story: "The slithering snake hits Fuor's arm hard. Irelm says, 'Disengage! Flee back to the path!'"
  - ask: "flee"
    note: "When a fight turns deadly, type `flee` (or `f`) to break combat immediately!"
    accept:
      - "flee"
      - "f"
    hint: "Type: flee"
responses:
  flee: |
    You flee head over heels.
    You flee north.

    Deeply-rutted Wagon Trail
    Exits(emulated): -north-, south, east, -west-.

    *+->
  f: |
    You flee head over heels.
    You flee north.

    Deeply-rutted Wagon Trail
    Exits(emulated): -north-, south, east, -west-.

    *+->
---

# Tactical Retreat

The snake strikes Fuor's arm hard! Irelm reminds him that knowing when to retreat is a true warrior's wisdom - `flee` instantly breaks engagement and escapes through an available exit.

Help Fuor execute a swift emergency retreat back toward the village by typing `flee` below!
