<script lang="ts">
  import type { Traits } from '$lib/traits';
  import Trait from './Trait.svelte';

  export let traits: Traits = {};
  $: list = Object.entries(traits);
</script>

{#if list.length > 0}
  {#each list as [name, trait]}
    <Trait {name} {trait} />
  {/each}
{:else}
  <p class="no-traits">This shape has no traits.</p>
{/if}

<style lang="scss">
  .no-traits {
    grid-column: 1 / 3;
    font-style: italic;
    color: #888;
  }
</style>
