<script lang="ts">
  import type { SmithyModel } from '$lib/smithyModel';
  import Shape from './Shape.svelte';

  export let model: SmithyModel;
  export let name: string;

  $: shape = model.getShapeById(name);
</script>

{#if shape}
  <div class="error">
    <Shape {name} {model} {shape} />
  </div>
{/if}

<style lang="scss">
  .error {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
</style>
