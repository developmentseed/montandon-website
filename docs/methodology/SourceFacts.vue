<script setup lang="ts">
// The per-source fact block on the Data Sources page. The prose above it is
// hand-written and site-owned; every fact below it comes from the published
// Monty source manifest. See ./sources.data.ts.
import { VPBadge } from "vitepress/theme";
import { data } from "./sources.data";

const props = defineProps<{ id: string }>();

const source = data.sources.find((s) => s.id === props.id);
if (!source) {
  throw new Error(
    `<SourceFacts id="${props.id}" /> does not match any documented source in ` +
      `the Monty manifest. Known ids: ${data.sources.map((s) => s.id).join(", ")}.`,
  );
}
</script>

<!--
  Each <li> stays on one line: Vue's compiler discards whitespace-only text
  nodes that span a line break, so wrapping between `</strong>` and the value
  would swallow the space after the label.
-->
<template>
  <p v-if="source.badge"><VPBadge type="info" :text="source.badge" /></p>

  <ul>
    <li><strong>Organization:</strong> {{ source.org }}</li>
    <li><strong>Type:</strong> {{ source.orgType }}</li>
    <li><strong>Contributes:</strong> {{ source.contributes }}</li>
    <!-- No license in the manifest means the source publishes no identifiable
         reuse terms — a verified statement, not missing data. -->
    <li v-if="source.license.href"><strong>License:</strong> <a :href="source.license.href" target="_blank" rel="noreferrer">{{ source.license.text }}</a></li>
    <li v-else><strong>License:</strong> <em class="absent">{{ source.license.text }}</em></li>
    <li v-if="source.url"><strong>Source URL:</strong> <a :href="source.url" target="_blank" rel="noreferrer">{{ source.url }}</a></li>
    <li v-if="source.contact"><strong>Contact:</strong> <a :href="source.contact.href" target="_blank" rel="noreferrer">{{ source.contact.text }}</a></li>
    <li v-if="source.collections.length"><strong>Collections:</strong> <template v-for="(collection, i) in source.collections" :key="collection"><span v-if="i"> · </span><code>{{ collection }}</code></template></li>
    <li v-if="source.doc"><strong>Source analysis:</strong> <a :href="source.doc" target="_blank" rel="noreferrer">Monty model documentation</a></li>
    <li v-if="source.etl"><strong>ETL transformer:</strong> <a :href="source.etl" target="_blank" rel="noreferrer"><code>pystac-monty</code></a></li>
  </ul>
</template>

<style scoped>
.absent {
  color: var(--vp-c-text-2);
}
</style>
