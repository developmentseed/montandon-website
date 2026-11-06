<script setup lang="ts">
// Overview table on the Data Sources page, generated from the published
// Monty source manifest. See ./sources.data.ts.
import { VPBadge } from "vitepress/theme";
import { data } from "./sources.data";
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Source</th>
        <th>Organization</th>
        <th>Type</th>
        <th>Contributes</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="source in data.sources" :key="source.id">
        <!-- One line: a line break here would swallow the space before the badge. -->
        <td><a :href="`#${source.anchor}`">{{ source.name }}</a> <VPBadge v-if="source.badge" type="info" :text="source.badge" /></td>
        <td>{{ source.org }}</td>
        <td>{{ source.orgType }}</td>
        <td>{{ source.contributes }}</td>
      </tr>
    </tbody>
  </table>
</template>
