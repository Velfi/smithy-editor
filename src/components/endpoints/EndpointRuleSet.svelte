<script lang="ts">
  import type * as traits from '$lib/traits';
  import { entries } from 'lodash';
  import Indent from '../Indent.svelte';
  import MiniAccordion from '../MiniAccordion.svelte';
  import Rules from './rule/Rules.svelte';
  import RuleSetParameter from './RuleSetParameter.svelte';

  export let ruleSet: traits.EndpointRuleSet;
  $: rules = ruleSet.rules;
  $: parameters = entries(ruleSet.parameters);
</script>

<p class="field">Version: v{ruleSet.version}</p>

<MiniAccordion closed>
  <p class="field">Parameters:</p>
  {#each parameters as [key, parameter]}
    <div class="space-children">
      <div>
        <p>{key}:</p>
        <Indent>
          <RuleSetParameter {parameter} />
        </Indent>
      </div>
    </div>
  {/each}
</MiniAccordion>

<MiniAccordion closed>
  <p class="field">Rules:</p>
  <div class="space-children code">
    <Rules {rules} />
  </div>
</MiniAccordion>

<style lang="scss">
  .field {
    font-weight: bold;
    margin-bottom: 0.25rem;
  }

  :global(.space-children > *:not(:last-child)) {
    margin-bottom: 1rem;
  }

  .space-children {
    margin-bottom: 1rem;
  }

  .code {
    font-family: 'Fira Code', monospace;
    background-color: #f5f5f5;
    padding: 1rem;
  }
</style>
