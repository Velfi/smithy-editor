<script lang="ts">
  import type { SmithyModel } from '$lib/smithyModel';
  import { isAuthenticationTrait, isProtocolTrait } from '$lib/traits';
  import { entries } from 'lodash';
  import EndpointRuleSet from './endpoints/EndpointRuleSet.svelte';
  import EndpointTests from './endpoints/EndpointTests.svelte';
  import Indent from './Indent.svelte';
  import Trait from './traits/Trait.svelte';

  export let model: SmithyModel;
  $: traits = model.serviceShape.traits ?? {};
  $: authenticationTraits = entries(traits).filter(isAuthenticationTrait);
  $: protocolTraits = entries(traits).filter(isProtocolTrait);
  $: otherTraits = entries(traits).filter(
    ([name, shape]) =>
      !isSpecialTrait([name, shape]) &&
      !isProtocolTrait([name, shape]) &&
      !isAuthenticationTrait([name, shape])
  );

  function isSpecialTrait([name]: [string, unknown]): boolean {
    switch (name) {
      case 'smithy.api#documentation':
        return true;
      case 'smithy.rules#endpointRuleSet':
        return true;
      case 'smithy.rules#endpointTests':
        return true;
      default:
        return false;
    }
  }
</script>

{#if entries(traits).length === 0}
  <p class="gray-italic">This service has no traits.</p>
{:else}
  {#if traits['smithy.api#documentation']}
    <p>
      smithy.api#documentation <span class="gray-italic">
        See the top of this page for documentation
      </span>
    </p>
  {/if}
  {#if traits['smithy.rules#endpointRuleSet']}
    <p>smithy.rules#endpointRuleSet</p>
    <Indent>
      <EndpointRuleSet ruleSet={traits['smithy.rules#endpointRuleSet']} />
    </Indent>
  {/if}

  {#if traits['smithy.rules#endpointTests']}
    <p>smithy.rules#endpointTests</p>
    <Indent>
      <EndpointTests />
      <!-- TODO add endpoint test rendering -->
      <!-- <EndpointTests tests={traits['smithy.rules#endpointTests']} /> -->
    </Indent>
  {/if}

  {#if protocolTraits.length > 0}
    <p>Protocol Traits:</p>
    <Indent>
      {#each protocolTraits as [name, trait]}
        <Trait {name} {trait} />
      {/each}
    </Indent>
  {/if}

  {#if authenticationTraits.length > 0}
    <p>Authentication Traits:</p>
    <Indent>
      {#each authenticationTraits as [name, trait]}
        <Trait {name} {trait} />
      {/each}
    </Indent>
  {/if}

  {#if otherTraits.length > 0}
    <p>Other Traits:</p>
    <Indent>
      {#each otherTraits as [name, trait]}
        <Trait {name} {trait} />
      {/each}
    </Indent>
  {/if}
{/if}

<style lang="scss">
  .gray-italic {
    color: #777;
    font-style: italic;
  }
</style>
