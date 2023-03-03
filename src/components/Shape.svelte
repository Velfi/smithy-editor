<script lang="ts">
  import * as shapes from '$lib/shapes';
  import type { SmithyModel } from '$lib/smithyModel';
  import EnumMembers from './EnumMembers.svelte';
  import Indent from './Indent.svelte';
  import Link from './Link.svelte';
  import Members from './Members.svelte';
  import Traits from './traits/Traits.svelte';

  export let model: SmithyModel;
  export let name: string;
  export let shape: shapes.Shape;

  $: uriComponent = shapes.isTarget(shape)
    ? encodeURIComponent(shape.target)
    : encodeURIComponent(name);
</script>

<div class="shape">
  <div class="header">
    <p id={name} class="name">
      <Link {name} href={uriComponent} />
    </p>
    &nbsp;&mdash;&nbsp;
    <p class="type">{shape.type}</p>
  </div>
  <Indent>
    <p>Traits:</p>
    <div class="traits">
      <Traits traits={shape.traits} />
    </div>
    {#if shapes.isStructure(shape)}
      <p>Members:</p>
      <div class="members">
        <Members {name} {model} />
      </div>
    {/if}
    {#if shapes.isEnum(shape)}
      <p>Variants:</p>
      <div class="members">
        <EnumMembers {name} {model} />
      </div>
    {/if}
  </Indent>
</div>

<style lang="scss">
  .shape {
    margin-bottom: 1rem;
  }

  .header {
    display: flex;
  }

  .type {
    color: #777;
  }

  .traits {
    grid-template-columns: min-content 1fr;
    display: grid;
    margin-bottom: 1rem;
    column-gap: 2rem;
    padding-left: 1rem;
    row-gap: 0.25rem;
  }

  .members {
    display: grid;
    grid-template-columns: min-content 1fr;
    margin-bottom: 1rem;
    row-gap: 0.25rem;
    padding-left: 1rem;
  }

  :global(.members > p) {
    grid-column: 1 / 3;
  }
</style>
