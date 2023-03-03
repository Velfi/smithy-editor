<script lang="ts">
  import Rule from './Rule.svelte';
  import type * as traits from '$lib/traits';

  export let rules: traits.Rule[];
</script>

{#each rules as rule}
  <Rule {rule} />
{/each}
