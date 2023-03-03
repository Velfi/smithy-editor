<script lang="ts">
  import type * as traits from '$lib/traits';
  // import { entries } from 'lodash';
  import Indent from '../../Indent.svelte';
  import Arg from './Arg.svelte';
  import Conditions from './Conditions.svelte';

  export let rule: traits.EndpointRule;
  $: conditions = rule.conditions;
  $: endpoint = rule.endpoint;
  // $: hasHeaders = entries(endpoint.headers).length > 0;
  // $: hasProperties = entries(endpoint.properties).length > 0;
</script>

{#if conditions.length > 0}
  <Conditions {conditions}>
    return Endpoint(<Arg arg={endpoint.url} />)&semi;
  </Conditions>
{:else}
  <br />
  return Endpoint(<Arg arg={endpoint.url} />)&semi;
{/if}

<!-- TODO return headers and props if they exist
{#if hasHeaders || hasProperties}
  <Indent>
    <Arg arg={endpoint.url} />

    {#if hasHeaders}
      <p>Headers:</p>
      <Indent>
        {#each entries(endpoint.headers) as [key, value]}
          <p>{key}: {value}</p>
        {/each}
      </Indent>
    {/if}

    {#if hasProperties}
      <p>Properties:</p>
      <Indent>
        {#each entries(endpoint.properties) as [key, value]}
          <p>{key}: {value}</p>
        {/each}
      </Indent>
    {/if}
  </Indent>
{/if} -->
