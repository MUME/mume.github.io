<script setup>
import { ref, computed } from 'vue'
import { withBase } from 'vitepress'

const selectedCategory = ref('All')

const categories = ['All', 'Basics', 'Gear & Inventory', 'Vitals & Stats', 'Combat & Tactics', 'Guild & Rest', 'Social & Rent']

const commands = [
  // Basics
  { category: 'Basics', command: 'look / l', syntax: 'look [object/room]', desc: 'Examine your surroundings, a room, player, or item.', chapter: '2-look-exits', chNum: 2 },
  { category: 'Basics', command: 'examine', syntax: 'examine <item/container>', desc: 'Inspect containers or items in detail.', chapter: '3-examining-containers', chNum: 3 },
  { category: 'Basics', command: 'exits', syntax: 'exits', desc: 'Display all obvious room exit directions.', chapter: '2-look-exits', chNum: 2 },
  { category: 'Basics', command: 'n / s / e / w', syntax: 'north / south / east / west', desc: 'Navigate across Middle-earth rooms and paths.', chapter: '7-movement-doors', chNum: 7 },
  { category: 'Basics', command: 'where', syntax: 'where', desc: 'Locate players currently in your zone.', chapter: '5-vitals-stats', chNum: 5 },
  { category: 'Basics', command: 'time', syntax: 'time', desc: 'Check current Middle-earth time and calendar date.', chapter: '5-vitals-stats', chNum: 5 },

  // Gear & Inventory
  { category: 'Gear & Inventory', command: 'inventory / inv', syntax: 'inventory', desc: 'List items carried in your hands and pack.', chapter: '6-equipment-wielding', chNum: 6 },
  { category: 'Gear & Inventory', command: 'equipment / eq', syntax: 'equipment', desc: 'Display all currently worn gear, armor, and weapons.', chapter: '6-equipment-wielding', chNum: 6 },
  { category: 'Gear & Inventory', command: 'wield', syntax: 'wield <weapon>', desc: 'Equip your main weapon into your primary hand.', chapter: '6-equipment-wielding', chNum: 6 },
  { category: 'Gear & Inventory', command: 'wear', syntax: 'wear <item> [location]', desc: 'Wear armor or attach lanterns/knives to your belt.', chapter: '6-equipment-wielding', chNum: 6 },
  { category: 'Gear & Inventory', command: 'put / get', syntax: 'put item sack / get item sack', desc: 'Stow or retrieve supplies from containers.', chapter: '3-examining-containers', chNum: 3 },

  // Vitals & Stats
  { category: 'Vitals & Stats', command: 'score / sc', syntax: 'score', desc: 'Quick check of Hit Points, Mana, and Movement Points.', chapter: '5-vitals-stats', chNum: 5 },
  { category: 'Vitals & Stats', command: 'stat', syntax: 'stat', desc: 'Display OB, DB, PB combat bonuses and experience needed.', chapter: '5-vitals-stats', chNum: 5 },
  { category: 'Vitals & Stats', command: 'info', syntax: 'info', desc: 'Full character sheet including age, attributes, alignment.', chapter: '5-vitals-stats', chNum: 5 },
  { category: 'Vitals & Stats', command: 'eat / drink', syntax: 'eat <food> / drink <container>', desc: 'Satisfy hunger and thirst to maintain rapid recovery.', chapter: '12-recovery-rest', chNum: 12 },
  { category: 'Vitals & Stats', command: 'change wimpy', syntax: 'change wimpy 15', desc: 'Set automatic flee threshold when HP drops.', chapter: '4-safety-wimpy', chNum: 4 },

  // Combat & Tactics
  { category: 'Combat & Tactics', command: 'consider', syntax: 'consider <target>', desc: 'Assess target difficulty before attacking.', chapter: '10-combat-stances', chNum: 10 },
  { category: 'Combat & Tactics', command: 'hit / kill', syntax: 'hit <target>', desc: 'Engage an enemy target in combat.', chapter: '10-combat-stances', chNum: 10 },
  { category: 'Combat & Tactics', command: 'change mood', syntax: 'cha m <aggressive/wimpy>', desc: 'Adjust combat stance to boost OB or DB.', chapter: '10-combat-stances', chNum: 10 },
  { category: 'Combat & Tactics', command: 'flee', syntax: 'flee', desc: 'Attempt emergency escape from dangerous combat.', chapter: '11-emergency-fleeing', chNum: 11 },

  // Guild & Rest
  { category: 'Guild & Rest', command: 'practice / prac', syntax: 'prac <skill>', desc: 'Train weapon proficiencies and skills at a guildmaster.', chapter: '13-guilds-training', chNum: 13 },
  { category: 'Guild & Rest', command: 'rest / sleep', syntax: 'rest / sleep', desc: 'Sit or sleep to accelerate hit point and move recovery.', chapter: '12-recovery-rest', chNum: 12 },
  { category: 'Guild & Rest', command: 'wake / stand', syntax: 'wake / stand', desc: 'Awaken and stand up to prepare for movement or combat.', chapter: '12-recovery-rest', chNum: 12 },

  // Social & Rent
  { category: 'Social & Rent', command: 'say / tell', syntax: 'say <text> / tell <name> <text>', desc: 'Speak aloud locally or send private direct messages.', chapter: '8-npc-communication', chNum: 8 },
  { category: 'Social & Rent', command: 'follow / fol', syntax: 'follow <player>', desc: 'Follow an experienced player or ranger and join their party.', chapter: '8-npc-communication', chNum: 8 },
  { category: 'Social & Rent', command: 'give', syntax: 'give <item> <person>', desc: 'Give an item to an NPC or player.', chapter: '9-shopping-trading', chNum: 9 },
  { category: 'Social & Rent', command: 'list / buy', syntax: 'list / buy <item>', desc: 'Browse merchant wares and buy provisions.', chapter: '9-shopping-trading', chNum: 9 },
  { category: 'Social & Rent', command: 'offer / rent', syntax: 'offer / rent', desc: 'Check inn room rates and safely save character equipment.', chapter: '14-safe-haven-rent', chNum: 14 }
]

const filteredCommands = computed(() => {
  if (selectedCategory.value === 'All') return commands
  return commands.filter(c => c.category === selectedCategory.value)
})
</script>

<template>
  <div class="mume-command-guide">
    <!-- Category Filter Tabs -->
    <div class="guide-filter-bar">
      <button
        v-for="cat in categories"
        :key="cat"
        class="filter-tab"
        :class="{ active: selectedCategory === cat }"
        @click="selectedCategory = cat"
      >
        {{ cat }}
      </button>
    </div>

    <!-- Desktop View: Table -->
    <div class="guide-table-wrapper desktop-only">
      <table class="command-table">
        <thead>
          <tr>
            <th>Command</th>
            <th>Syntax / Usage</th>
            <th>Description</th>
            <th>Try in Terminal</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cmd in filteredCommands" :key="cmd.command">
            <td class="cmd-cell">
              <code>{{ cmd.command }}</code>
            </td>
            <td class="syntax-cell">
              <span class="syntax-badge">{{ cmd.syntax }}</span>
            </td>
            <td class="desc-cell">{{ cmd.desc }}</td>
            <td class="action-cell">
              <a :href="withBase(`/play/tutorial/${cmd.chapter}`)" class="try-btn">
                Ch. {{ cmd.chNum }} ➔
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile View: Card Stack -->
    <div class="guide-cards-wrapper mobile-only">
      <div v-for="cmd in filteredCommands" :key="cmd.command" class="cmd-card">
        <div class="cmd-card-header">
          <code class="cmd-pill">{{ cmd.command }}</code>
          <span class="cat-pill">{{ cmd.category }}</span>
        </div>
        <div class="cmd-card-body">
          <div class="cmd-syntax"><strong>Syntax:</strong> <code>{{ cmd.syntax }}</code></div>
          <p class="cmd-desc">{{ cmd.desc }}</p>
        </div>
        <div class="cmd-card-footer">
          <a :href="withBase(`/play/tutorial/${cmd.chapter}`)" class="try-btn-mobile">
            Practice in Ch. {{ cmd.chNum }} ➔
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mume-command-guide {
  margin: 1.5rem 0 2.5rem 0;
  box-sizing: border-box;
  max-width: 100%;
}

.guide-filter-bar {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.75rem;
  margin-bottom: 1rem;
  -webkit-overflow-scrolling: touch;
}

.filter-tab {
  background: var(--vp-c-bg-soft, rgba(255, 255, 255, 0.05));
  border: 1px solid var(--vp-c-divider, #3a3a3a);
  color: var(--vp-c-text-2, #bbb);
  padding: 0.4rem 0.85rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.filter-tab:hover {
  border-color: #b8860b;
  color: #d4af37;
}

.filter-tab.active {
  background: #b8860b;
  color: #ffffff;
  border-color: #d4af37;
}

.guide-table-wrapper {
  overflow-x: auto;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider, #3a3a3a);
  background: var(--vp-c-bg-soft, #1a1a1a);
}

.command-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.9rem;
}

.command-table th {
  background: rgba(184, 134, 11, 0.15);
  color: #d4af37;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--vp-c-divider, #3a3a3a);
}

.command-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.cmd-cell code {
  color: #e5c07b;
  background: rgba(0,0,0,0.3);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-weight: bold;
}

.syntax-cell .syntax-badge {
  font-family: monospace;
  font-size: 0.82rem;
  color: var(--vp-c-text-2, #aaa);
}

.try-btn {
  display: inline-block;
  background: #b8860b;
  color: #ffffff !important;
  padding: 0.3rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  text-decoration: none !important;
  transition: background 0.2s ease;
}

.try-btn:hover {
  background: #d4af37;
}

/* Mobile responsive styles */
.desktop-only {
  display: block;
}
.mobile-only {
  display: none;
}

@media (max-width: 768px) {
  .desktop-only {
    display: none;
  }
  .mobile-only {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .cmd-card {
    background: var(--vp-c-bg-soft, #1e1e1e);
    border: 1px solid var(--vp-c-divider, #333);
    border-radius: 8px;
    padding: 0.85rem;
    box-sizing: border-box;
    max-width: 100%;
  }

  .cmd-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .cmd-pill {
    color: #d4af37;
    background: rgba(184, 134, 11, 0.2);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.95rem;
    font-weight: bold;
  }

  .cat-pill {
    font-size: 0.75rem;
    color: var(--vp-c-text-3, #888);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .cmd-card-body {
    margin-bottom: 0.75rem;
  }

  .cmd-syntax {
    font-size: 0.82rem;
    color: var(--vp-c-text-2, #ccc);
    margin-bottom: 0.3rem;
  }

  .cmd-syntax code {
    color: #e5c07b;
  }

  .cmd-desc {
    font-size: 0.88rem;
    margin: 0;
    color: var(--vp-c-text-1, #ddd);
  }

  .try-btn-mobile {
    display: block;
    text-align: center;
    background: #b8860b;
    color: #ffffff !important;
    padding: 0.5rem;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: bold;
    text-decoration: none !important;
  }
}
</style>
