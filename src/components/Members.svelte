<script lang="ts">
  import * as shapes from '$lib/shapes';
  import type { SmithyModel } from '$lib/smithyModel';
  import Target from './Target.svelte';
  import Shape from './Shape.svelte';
  import Traits from './traits/Traits.svelte';

  export let model: SmithyModel;
  export let name: string;

  $: members = model.getMembersForStructure(name);
</script>

<!-- <div class="members"> -->
{#if members.length > 0}
  {#each members as [name, shape]}
    {#if shapes.isShape(shape)}
      <Shape {name} {shape} {model} />
    {:else}
      <Target {name} target={shape} />
    {/if}
    <div class="traits">
      <Traits traits={shape.traits} />
    </div>
  {/each}
{:else}
  <p class="none">this structure has no members</p>
{/if}

<!-- </div> -->
<style lang="scss">
  .traits {
    grid-column: 1 / 3;
    grid-template-columns: subgrid;
    display: grid;
    margin-bottom: 1rem;
    column-gap: 2rem;
    row-gap: 0.25rem;
    padding-left: 1rem;
  }
</style>
