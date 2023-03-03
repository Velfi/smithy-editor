<script lang="ts">
  import * as shapes from '$lib/shapes';
  import Link from './Link.svelte';

  export let name: string | undefined = undefined;
  export let target: shapes.Target;
</script>

{#if shapes.isInSmithyNamespace(target.target)}
  <p class="name">
    {name}
    &nbsp;&mdash;&nbsp;

    <Link href={shapes.resolveLinkToSmithyShape(target.target)} name={target.target} isTarget />
  </p>
{:else}
  <p class="name">
    {#if name}
      {name}
      &nbsp;&mdash;&nbsp;
    {/if}
    <Link href={encodeURIComponent(target.target)} name={target.target} isTarget />
  </p>
{/if}

<style lang="scss">
</style>
