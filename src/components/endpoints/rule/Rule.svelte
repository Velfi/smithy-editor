<script lang="ts">
  import * as traits from '$lib/traits';
  import Indent from '../../Indent.svelte';
  import Conditions from './Conditions.svelte';
  import Rules from './Rules.svelte';
  import Arg from './Arg.svelte';

  export let rule: traits.Rule;
  $: conditions = rule.conditions;
</script>

{#if conditions.length > 0}
  <p>
    <Conditions {conditions}>
      {#if traits.isTreeRule(rule)}
        <Rules rules={rule.rules} />
      {:else if traits.isEndpointRule(rule)}
        return Endpoint(<Arg arg={rule.endpoint.url} />);
      {:else if traits.isErrorRule(rule)}
        return Error(<Arg arg={rule.error} />);
      {/if}
    </Conditions>
  </p>
{:else if traits.isTreeRule(rule)}
  <Rules rules={rule.rules} />
{:else if traits.isEndpointRule(rule)}
  <br />
  return Endpoint(<Arg arg={rule.endpoint.url} />);
{:else if traits.isErrorRule(rule)}
  <br />
  return Error(<Arg arg={rule.error} />);
{/if}
