---
title: "Recovery & Rest"
description: "Sit or sleep to recover faster, and eat and drink to stay healthy."
teach:
  - command: "rest"
    desc: "sit down to accelerate health and move recovery"
  - command: "stand"
    desc: "stand back up after resting"
  - command: "drink water"
    desc: "drink water from a well or waterskin"
  - command: "eat biscuit"
    desc: "eat rations to maintain fast health regeneration"
steps:
  - story: "Breathless, Fuor and Irelm arrive back at the warm peat hearth inside The Foaming Mug."
  - ask: "rest"
    note: "Sit down to rest and regenerate health faster using `rest`."
    accept:
      - "rest"
    hint: "Type: rest"
  - ask: "stand"
    note: "Stand up and prepare to move again using `stand`."
    accept:
      - "stand"
      - "wake"
      - "st"
    hint: "Type: stand"
  - ask: "drink water"
    note: "Quench thirst at the village well with `drink water`."
    accept:
      - "drink water"
    hint: "Type: drink water"
  - ask: "eat biscuit"
    note: "Satisfy hunger with `eat biscuit`."
    accept:
      - "eat biscuit"
    hint: "Type: eat biscuit"
responses:
  rest: |
    You sit down and rest your tired bones.

    *+->
  wake: |
    You stop resting and stand up.

    *+->
  stand: |
    You stop resting and stand up.

    *+->
  st: |
    You stop resting and stand up.

    *+->
  drink water: |
    You drink the water from the stone well.

    *+->
  drink: |
    You drink the water from the stone well.

    *+->
  eat biscuit: |
    You eat a large biscuit.
    You are full.

    *+->
---

# Recovery by the Fire

Safely back inside **The Foaming Mug**, Fuor and Irelm sit by the peat fire. `rest` accelerates recovery, `drink water` and `eat biscuit` keep hunger and thirst at bay, and `stand` stands you back up. To recover even faster you can `sleep` - but you are vulnerable to attack while asleep, so choose your room wisely! Tip: resting or sleeping in a room with a bed or a fire recovers you quicker; you can make a fire with the `camp` command. Use `wake` to wake up from sleep.
