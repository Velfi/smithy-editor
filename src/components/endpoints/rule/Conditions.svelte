<script lang="ts">
  import type * as traits from '$lib/traits';
  import Indent from '../../Indent.svelte';
  import Condition from './Condition.svelte';

  export let conditions: traits.EndpointCondition[];

  if (conditions.length === 0) {
    throw new Error('<Conditions /> requires at least one condition.');
  }
</script>

{#if conditions.length === 2 && 'assign' in conditions[1]}
  if <Condition condition={conditions[0]} />&nbsp;&lbrace;
  <Indent>
    <p>
      let&nbsp;{conditions[1].assign}&nbsp;&equals;&nbsp;<Condition
        condition={conditions[1]}
      />&semi;
    </p>
    <br />
    <slot />
  </Indent>
  &rbrace;
{:else}
  if ({#each conditions as condition, index}{#if index < conditions.length - 1}<Condition
        {condition}
      /> &amp;&amp;&nbsp;{:else}<Condition {condition} />{/if}{/each})&nbsp;&lbrace;
  <Indent>
    <slot />
  </Indent>
  &rbrace;
{/if}
