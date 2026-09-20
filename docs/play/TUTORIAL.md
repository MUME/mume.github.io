# Non-Technical Authoring Guide for MUME Interactive Tutorial

This directory (`docs/play/tutorial/`) contains all the interactive tutorial chapters for MUME.
The system is designed so that **anyone** can edit existing chapters or add new chapters using simple Markdown and YAML frontmatter without writing any code.

---

## Quick Start: How It Works

1. **Automatic Chapter Discovery**: Every Markdown file in this directory named `[number]-[slug].md` (e.g., `1-orientation.md`, `2-look-exits.md`, `16-new-topic.md`) is automatically detected, sorted by number, and added to the interactive tutorial sequence and command guides.
2. **Zero Code Required**: You do not need to edit any JavaScript, Vue files, or templates. Just create or edit a `.md` file!
3. **Pure Markdown**: Chapter content is written in standard Markdown. The website layout automatically wraps your chapter inside the interactive terminal player.

---

## How to Add a New Chapter

1. Create a new file in `docs/play/tutorial/` following the naming convention `[number]-[slug].md` (for example, `16-advanced-tactics.md`).
2. Copy the template below into your file.
3. Fill in the title, description, commands, interactive steps, and lesson text.
4. Save and commit your file!

---

## Chapter Template

```markdown
---
title: "Chapter Title Here"
description: "A short 1-sentence summary of what the player will learn."
teach:
  - command: "example command"
    desc: "brief explanation of what this command does"
steps:
  - ask: "primary command"
    note: "Instructional note explaining what the player should do."
    accept:
      - "primary command"
      - "short alias"
    hint: "Type: primary command"
    response: |
      Simulated MUD output displayed in the terminal when entered correctly.
      !.*>
---

# Chapter Title Here

Write your lesson introduction here using standard Markdown. Explain the concepts clearly to new players.
```

---

## Easy Multiline Text Formatting (No `\n` Required!)

**Do NOT use `\n` for line breaks in tutorial files.** Non-technical contributors should write natural multiline text.

Always use the YAML multiline literal pipe character `|` for multi-line story beats, step notes, or simulated MUD outputs:

```yaml
steps:
  - story: |
      ![Web Client Interface](/assets/images/tutorial-desc.png)
      When connected via the MUME Web Client, you'll enjoy integrated live mapping and stats tracking.
responses:
  score: |
    36/36 hits, 76/76 mana, and 126/126 moves.

    *+->
```

---

## Frontmatter Reference

| Field | Type | Description |
|---|---|---|
| `title` | String | The title of the chapter displayed in headers, navigation, and progress indicators. |
| `description` | String | A concise summary displayed on the chapter selection cards in the Newcomers Hub. |
| `teach` | List | Commands introduced in this chapter. Appears in the "Command Sheet" sidebar/drawer. Each item has `command` and `desc`. |
| `steps` | List | Interactive practice steps executed sequentially in the terminal emulator. |
| `steps[].ask` | String | (Optional) The target command prompt (e.g., `look`). If omitted, step is an automatic story beat. |
| `steps[].story` | String | (Optional) Story beat that streams automatically into the terminal without requiring typing (can also use `beat:` or `text:`). Supports inline images `![alt](url)`. |
| `steps[].note` | String | Highlighting note giving context and guidance for the task. |
| `steps[].accept` | List | Accepted command variations (e.g., `["look", "l"]`). Case-insensitive. |
| `steps[].hint` | String | (Optional) Hint displayed if the user types an unaccepted command. Defaults to `Type: <ask>`. |
| `steps[].response` | String | The simulated MUD terminal output printed when the user enters an accepted command. |
| `responses` | Object | (Optional) Map of additional ambient command responses for non-step commands typed in the terminal. |

---

## Example: Step-by-Step Definition

```yaml
steps:
  - ask: "score"
    note: "Check your character's Hit Points, Mana, and Movement with SCORE."
    accept:
      - "score"
      - "sc"
    response: |
      36/36 hits, 76/76 mana, and 126/126 moves.
      !.*>
  - story: "Ermin the Ranger steps out from the shadow of the inn, adjusting his grey cloak."
  - ask: "stat"
    note: "View combat parameters and experience needed to level with STAT."
    accept:
      - "stat"
      - "st"
    response: |
      OB: 10%, DB: 31%, PB: 13%, Armour: 19%. Needed: 999 xp, 27 tp.
      !.*>
```

---

## Embedded Images & Step-by-Step Paging

For chapters introducing visual concepts or UI previews (such as client interface screenshots):
1. **Stream Images via Story Beats or Responses:** Instead of dumping large images into the Markdown body at the bottom of the file, attach images to specific `story` beats using Markdown image syntax: `![alt text](/assets/images/filename.png)`.
2. **Automated Terminal Pager:** When images or large text outputs stream into the log, the terminal's built-in MUD pager activates automatically if content overflows the viewport. Users can press `Space` or `Enter` (or tap the prompt on touch devices) to page through content line-by-line without needing to scroll manually with a mouse.
3. **Compact Initial Card:** Keep the Markdown lesson text below frontmatter concise so that when a chapter opens, the initial intro card and first quest prompt fit within the terminal log without initial overflow.

---

## Summary Checklist for Authors

- [ ] File name starts with `[number]-` (e.g. `16-`).
- [ ] Valid YAML frontmatter between `---` markers at top of file.
- [ ] Chapter title and description provided.
- [ ] List of interactive `steps` with `ask`, `note`, `accept`, and `response`.
- [ ] Plain Markdown lesson text below frontmatter.
