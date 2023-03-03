<script lang="ts">
  import Rule from './Rule.svelte';
  import type * as traits from '$lib/traits';
  import MiniAccordion from '../../MiniAccordion.svelte';

  export let rules: traits.Rule[];
</script>

{#each rules as rule}
  <MiniAccordion>
    <Rule {rule} />
  </MiniAccordion>
{/each}
