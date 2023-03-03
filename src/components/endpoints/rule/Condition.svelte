<script lang="ts">
  import type * as traits from '$lib/traits';
  import Arg from './Arg.svelte';

  export let condition: traits.EndpointCondition;
  $: fn = condition.fn;
  $: argv = condition.argv;
</script>

{fn}({#each argv as arg, index}{#if index < argv.length - 1}<Arg {arg} />,&nbsp;{:else}<Arg
      {arg}
    />{/if}{/each})
