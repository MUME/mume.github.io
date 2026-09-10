// Tutorial content for the new-player walkthrough.
// Extracted from the original standalone tutorial; edit lessons here.
export const TUTORIAL = {
  "version": 3,
  "lessons": [
    {
      "section": "Before you start",
      "title": "What is a MUD?",
      "body": [
        "MUME is a MUD: a Multi-User Dungeon. It is a game world made of text, played by hundreds of people at the same time.",
        "There are no graphics. The game describes a room, and you type what you want to do. That is the whole loop.",
        "Nothing is on a timer while you read. Take as long as you like."
      ],
      "teach": [],
      "practice": null
    },
    {
      "section": "Before you start",
      "title": "What is MUME?",
      "body": [
        "MUME is Middle-earth. The map is built from Tolkien, from the Shire to Bree to the Misty Mountains, and it has been growing since 1991.",
        "You pick a side. The Free Peoples defend the West. The forces of Mordor attack it.",
        "As a new player, you'll start on the side of men, hobbits, dwarves and elves. You will begin your journey near the Tower Hills as a new character with only the most basic of equipment. That is normal. Everyone starts there."
      ],
      "teach": [],
      "practice": null
    },
    {
      "section": "Talking to the game",
      "title": "How to type",
      "body": [
        "You talk to MUME in short instructions. Usually a verb, then a thing.",
        "look sign",
        "get sword",
        "The game only understands the words it knows. If it does not understand you, it says so, and nothing bad happens. Guessing is free.",
        "Try it now. Type the word below and press Enter."
      ],
      "teach": [
        {
          "c": "look",
          "d": "describe the room you are in"
        }
      ],
      "practice": {
        "ask": "look",
        "accept": [
          "look",
          "l"
        ],
        "hint": "Type: look"
      },
      "example": "> look\nEast of the Bridge\nYou are standing on the Old East Road, just east of the Brandywine bridge.\nA dusty road leads to a gate in a tall hedgerow to the south - the High Hay.\nIt was grown to protect Buckland from the old forest many years ago, and is\nthick and nearly impenetrable.\nExits: north, south, east, west."
    },
    {
      "section": "The basics",
      "title": "Moving around",
      "body": [
        "You move by compass direction, not left and right. North, south, east, west, up, down.",
        "You can type the whole word or just the first letter.",
        "Every room lists its exits. If a direction is not listed, you cannot go that way.",
        "Doors sometimes need opening first: open north."
      ],
      "teach": [
        {
          "c": "north / n",
          "d": "move north (also s, e, w, u, d)"
        },
        {
          "c": "exits",
          "d": "list the ways out of this room"
        },
        {
          "c": "open north",
          "d": "open a closed door"
        }
      ],
      "practice": {
        "ask": "exits",
        "accept": [
          "exits",
          "ex"
        ],
        "hint": "Type: exits"
      },
      "example": "> exits\nExits:\n  North   - Prancing Pony Inn\n -East-   - Cobble Street\n -South-  - Old East Road\n -West-   - Old East Road"
    },
    {
      "section": "The basics",
      "title": "Looking at things",
      "body": [
        "look on its own describes the room again. Useful when text has scrolled past you.",
        "examine a specific thing to study it closely. Most objects, people and signs have their own description, and examine shows you the detail.",
        "It works on anything you can see: examine sword, examine elf, examine sign."
      ],
      "teach": [
        {
          "c": "look",
          "d": "describe the room again"
        },
        {
          "c": "examine sword",
          "d": "study one thing closely (also: exa)"
        }
      ],
      "practice": {
        "ask": "examine elf",
        "accept": [
          "examine elf",
          "exa elf",
          "examine",
          "exa"
        ],
        "hint": "Type: examine elf"
      },
      "example": "> examine elf\nFair and graceful this child of Eru is, and with but a cursory glance in your\ndirection he continues to walk, dreaming of mysterious things.\nAn elf is in an excellent condition.\nAn elf is using:\n<worn on head>       a green hood (flawless)\n<worn on body>       a grey shirt (well-maintained)\n<worn on arms>       a white pair of sleeves (satisfactory)\n<worn on legs>       a grey pair of pants (flawless)\n<worn on feet>       a pair of soft leather boots (neglected)\n\n> examine sword\nThis narrow, single-edged blade has been inlaid with gold filigree from point\nto pommel. The grip is black leather, embossed with the image of a red hill\nagainst a setting sun. An intricately fashioned guard of silver cages the\nhandle."
    },
    {
      "section": "The basics",
      "title": "Carrying and wearing",
      "body": [
        "Picking something up is not the same as using it. You get it, then you wear it or wield it.",
        "Two lists matter. inventory is what you are carrying. equipment is what you have on you and in your hands.",
        "Word order counts when you give things away: give sword to guard."
      ],
      "teach": [
        {
          "c": "inventory / i",
          "d": "what you are carrying"
        },
        {
          "c": "equipment / eq",
          "d": "what you are wearing and holding"
        },
        {
          "c": "get sword",
          "d": "pick something up"
        },
        {
          "c": "wear cloak",
          "d": "put on armour or clothing"
        },
        {
          "c": "wield sword",
          "d": "hold a weapon ready"
        },
        {
          "c": "remove cloak",
          "d": "take something off"
        }
      ],
      "practice": {
        "ask": "inventory",
        "accept": [
          "inventory",
          "inv",
          "i"
        ],
        "hint": "Type: inventory"
      },
      "example": "You are carrying:\na sturdy rope\na water skin\na coach ticket\na lantern\na dark coloured flask\na ticket for a trained horse"
    },
    {
      "section": "The basics",
      "title": "Food, water and light",
      "body": [
        "Your character gets hungry and thirsty, and will tell you when. Ignore it long enough and you weaken.",
        "Buy food in towns and drink at fountains, wells and rivers. Carry a water skin so you can drink anywhere.",
        "Away from towns it gets dark, and in the dark you cannot see the room or the exits. Carry a torch or wear a lantern before you leave."
      ],
      "teach": [
        {
          "c": "eat bread",
          "d": "eat something you are carrying"
        },
        {
          "c": "drink water",
          "d": "drink from a fountain, well or river"
        },
        {
          "c": "pour fountain skin",
          "d": "refill your water skin at a water source"
        },
        {
          "c": "light torch",
          "d": "make light so you can see"
        }
      ],
      "practice": {
        "ask": "drink water",
        "accept": [
          "drink water",
          "drink"
        ],
        "hint": "Type: drink water"
      },
      "example": "> drink water\nYou drink the water."
    },
    {
      "section": "The basics",
      "title": "Talking to people",
      "body": [
        "There are real people in this world, and they will help you. Rangers exist specifically to help new players.",
        "say talks to everyone in the room. tell talks to one person anywhere in the world.",
        "Characters run by the game respond to simple things. If one asks you a question, nod or say yes.",
        "If you are stuck, this is the fastest fix in the game. Find a ranger and ask."
      ],
      "teach": [
        {
          "c": "who",
          "d": "see who is playing right now"
        },
        {
          "c": "who ranger",
          "d": "find a ranger who can help you"
        },
        {
          "c": "say hello",
          "d": "speak to the room"
        },
        {
          "c": "tell relim hello",
          "d": "speak to one person by name"
        },
        {
          "c": "nod",
          "d": "answer yes to a character talking to you"
        }
      ],
      "practice": {
        "ask": "who ranger",
        "accept": [
          "who ranger",
          "who rangers"
        ],
        "hint": "Type: who ranger"
      },
      "example": "> who ranger\nRangers\n-------\n      Martyrson N'Ekasrof"
    },
    {
      "section": "Staying alive",
      "title": "Fighting, and running",
      "body": [
        "Combat is fast and it is not turn based. You attack, then the fight continues on its own until someone stops it.",
        "Check what you are up against before you swing. Most things that kill new characters were avoidable.",
        "You are allowed to run. flee gets you out through a random exit, and it is often the right move.",
        "score shows your health and how tired you are. Watch it during a fight."
      ],
      "teach": [
        {
          "c": "score",
          "d": "your health, movement and condition"
        },
        {
          "c": "kill snake",
          "d": "attack something"
        },
        {
          "c": "flee",
          "d": "break off and run!"
        },
        {
          "c": "rest/sleep",
          "d": "recover health and movement"
        }
      ],
      "practice": {
        "ask": "score",
        "accept": [
          "score",
          "sc"
        ],
        "hint": "Type: score"
      },
      "example": "> score\nScore: 354/354 hits, 114/114 mana, and 132/132 moves."
    },
    {
      "section": "Staying alive",
      "title": "Stopping for the day",
      "body": [
        "This is the one that catches people out. If you simply close the window, you keep your character but you lose the equipment you were carrying.",
        "To keep your things, go to an inn and \"rent\". Your gear is stored until you come back. ",
        "Offer tells you the price first. Inns are marked on the map.",
        "Quit leaves the game - but you will lose your equipment!"
      ],
      "teach": [
        {
          "c": "offer",
          "d": "ask an inn what storage will cost"
        },
        {
          "c": "rent",
          "d": "store your equipment and log out safely"
        },
        {
          "c": "quit",
          "d": "leave the game"
        }
      ],
      "practice": {
        "ask": "rent",
        "accept": [
          "rent"
        ],
        "hint": "Type: rent"
      },
      "example": "> rent\nBarliman tells you 'It will cost you 6 silver pennies, and 21 copper\npennies per day.'\nYou have enough money for at least one year!\nBarliman calls for Nob who hurries from attending the Prancing Pony\nInn's guests to look at his employer inquiringly.\nBarliman says 'Please bring our esteemed guest to their chamber.'\nNob greets you with a smile before directing you to your room."
    },
    {
      "section": "Getting unstuck",
      "title": "Where to find help",
      "body": [
        "help on its own lists the subjects the game can explain. help basic is the wider command list.",
        "The hint line at the top of your screen changes as you play, and is worth reading.",
        "Your command sheet stays on the right. Type commands to print it into the game window at any time.",
        "This whole walkthrough stays available while you are still marked as new. Type tutorial to run it again.",
        "And there is always a person. Type who ranger and ask."
      ],
      "teach": [
        {
          "c": "help",
          "d": "list what the game can explain"
        },
        {
          "c": "help basic",
          "d": "the full basic command list"
        },
        {
          "c": "commands",
          "d": "your sheet from this tutorial"
        },
        {
          "c": "tutorial",
          "d": "run this walkthrough again while you are new"
        }
      ],
      "practice": {
        "ask": "help",
        "accept": [
          "help",
          "?"
        ],
        "hint": "Type: help"
      },
      "example": "> help\nHELP INDEX, INDEX\nThe help files of MUME are extensive. Below is a list of extra important\nhelp topics to explore.\n\nType the command to the left (for example \"help new\") to read about that\ntopic. You can also write \"?\" instead of \"help\": \"?new\"."
    },
    {
      "section": "Staying alive",
      "title": "Dying is not the end",
      "body": [
        "You will die. Everybody dies, often, and it is a normal part of the game rather than a failure.",
        "When you die you wake up in the Halls of Mandos. From here you \"pray <city>\" (ie, \"pray Bree\") to return to one of the towns around Middle-Earth. Your equipment stays behind on your corpse and you can go back for it, or ask someone to help you recover it.",
        "You do not lose your character and you do not start again."
      ],
      "teach": [],
      "practice": null
    },
    {
      "section": "Playing the game",
      "title": "The Map and the Description panel",
      "body": [
        "When you start shortly, the map will appear on the left and the description panel on the right.",
        "The map shows where you are in the game. Various icons will be displayed - \"R\" for \"Rent\" (at Inns), \"S\" for a shop, \"G\" for a guild and so on.",
        "The Description panel gives you the description of the room you're in. This adds enormously to the immersive nature of the game."
      ],
      "teach": [],
      "practice": null
    },
    {
      "section": "Your character",
      "title": "Making your character",
      "body": [
        "Next you choose a side, then a race, then a name.",
        "Free Peoples play as humans, elves, half-elves, dwarves or hobbits. The forces of Mordor play as orcs, trolls and black numenoreans.",
        "If you have no strong feeling, take a human or a hobbit on the Free Peoples side. They are the most forgiving to learn on.",
        "Pick a name that fits Middle-earth. It stays with you."
      ],
      "teach": [],
      "practice": null
    },
    {
      "section": "Quests",
      "title": "Quests",
      "body": [
        "You'll find many quests from non-player characters across the world. When you start, explore Tower Hills and respond when any of the characters in the town talk to you - a simple \"nod\" or \"say yes\" will help that interaction. They'll then set you off on a few quests which will help you learn the game."
      ],
      "teach": [],
      "practice": null
    },
    {
      "section": "Guilds and Levels",
      "title": "Improving your character",
      "body": [
        "There's much to learn in MUME - it's a huge world. So we won't continue too much further in the tutorial except two more things:",
        "Levels: Every time you level your character, by earning enough experience points (earned by killing various creatures) and travel points (earned by travelling far and wide), you'll gain practise points. You spend these in Guilds on various abilities - from Ranger and Scout skills, through to Warrior, Cleric and Mage abilities",
        "Guilds: You'll find guilds all over Middle-Earth. At early levels, it's best to learn basic combat skills (pierce, slash, shoot) and Ranger abilities (climb, ride, swim). Don't worry about experimenting on various abilities - you can (slowly) forget them later!"
      ],
      "teach": [],
      "practice": null
    },
    {
      "section": "Your character",
      "title": "What happens next",
      "body": [
        "Once your character exists, Gandalf finds you and asks for your help. That is the introduction to the world, and it will move you through several places quickly.",
        "Text will scroll past faster than you can read it. That is fine. Nothing is lost, you can scroll back, and look brings the room back at any time.",
        "You do not have to finish it. If you would rather explore Bree on your own, you can.",
        "You know enough to start."
      ],
      "teach": [],
      "practice": null
    }
  ]
}
