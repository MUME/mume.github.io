<script setup>
import { withBase } from 'vitepress'
import { data as allChapters } from '../../../play/tutorial/chapters.data.js'
</script>

<template>
  <div class="chapter-grid" role="region" aria-label="Interactive Tutorial Chapters">
    <div v-for="ch in allChapters" :key="ch.chapterNum" class="chapter-card">
      <div class="chapter-num">Chapter {{ ch.chapterNum }} of {{ allChapters.length }}</div>
      <h3>{{ ch.title }}</h3>
      <p>{{ ch.description }}</p>

      <!-- Command Badges / Pills -->
      <div v-if="ch.teach && ch.teach.length" class="chapter-commands">
        <span v-for="item in ch.teach" :key="item.command" class="cmd-pill">
          {{ item.command }}
        </span>
      </div>

      <a class="chapter-btn" :href="withBase(ch.url)">
        Start Chapter {{ ch.chapterNum }} →
      </a>
    </div>
  </div>
</template>

<style scoped>
.chapter-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
  margin: 1.5rem 0 2.5rem;
  box-sizing: border-box;
  max-width: 100%;
}

.chapter-card {
  background: #0b0d14;
  border: 1px solid rgba(215, 166, 63, 0.3);
  border-radius: 8px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, border-color 0.2s;
  box-sizing: border-box;
  max-width: 100%;
}

.chapter-card:hover {
  transform: translateY(-3px);
  border-color: goldenrod;
}

.chapter-num {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #b8860b;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.chapter-card h3 {
  font-family: 'Kelt', serif;
  font-size: 1.2rem;
  color: #f4dd94;
  margin: 0 0 0.5rem 0;
  padding-top: 0;
  border: none;
}

.chapter-card p {
  font-size: 0.88rem;
  line-height: 1.5;
  color: #a0a5b0;
  margin: 0 0 0.75rem 0;
  flex: 1;
}

.chapter-commands {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.cmd-pill {
  font-family: monospace;
  font-size: 0.75rem;
  background: rgba(184, 134, 11, 0.2);
  color: #d4af37;
  border: 1px solid rgba(212, 175, 55, 0.4);
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
}

.chapter-btn {
  display: inline-block;
  font-family: 'Kelt', serif;
  font-size: 0.95rem;
  background: rgba(184, 134, 11, 0.15);
  color: #f4dd94 !important;
  border: 1px solid darkgoldenrod;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  text-align: center;
  text-decoration: none !important;
  transition: background 0.2s, color 0.2s;
  box-sizing: border-box;
  max-width: 100%;
}

.chapter-btn:hover {
  background: darkgoldenrod;
  color: #000 !important;
}
</style>
