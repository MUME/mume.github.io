---
title: "Emergency Fleeing"
description: "Master emergency tactical retreats to disengage from dangerous combat."
teach:
  - command: "flee"
    desc: "immediately disengage and run away through a random exit"
steps:
  - story: "The timber wolf growls fiercely, snapping its jaws near Fuor's arm! Ermin shouts, 'Disengage! Flee back to the path!'"
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

    Bend in the Path
    The road turns here to pass between the tall homes on either side of the road.
    High above, a laundry line stretches across the street, the bed sheets pegged
    to it flapping in the wind.
    A little boy is here, running around.
    Exits: =south=, =west=.

    *+->
  f: |
    You flee head over heels.
    You flee north.

    Bend in the Path
    Exits: =south=, =west=.

    *+->
---

# Chapter 11: Tactical Retreat

The wolf snaps viciously, grazing Fuor's arm! Ermin shouts that knowing when to retreat is a true warrior's wisdom—`flee` instantly breaks engagement and escapes through an available exit.

Help Fuor execute a swift emergency retreat back toward the village by typing `flee` below!
