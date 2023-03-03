<script lang="ts">
  import * as traits from '$lib/traits';
  import { isEndpointCondition } from '$lib/traits';
  import Condition from './Condition.svelte';

  export let arg: traits.Arg;
</script>

{#if traits.isRef(arg)}
  &amp;{arg.ref}
{:else if typeof arg === 'string'}
  "{arg}"
{:else if typeof arg === 'boolean' || typeof arg === 'number'}
  {arg}
{:else if isEndpointCondition(arg)}
  <Condition condition={arg} />
{:else}
  <span class="error">unknown Arg type: {arg}</span>
{/if}

<style lang="scss">
  .error {
    color: red;
  }
</style>
