<script lang="ts">
  import * as traits from '$lib/traits';
  import { entries, isObject } from 'lodash';
  import { isArrayTrait, isKvPairTrait, isStructureTrait } from '.';
  import Link from '../Link.svelte';
  import SanitizedHtml from '../SanitizedHtml.svelte';

  export let name: string;
  export let trait: unknown;

  $: uri = traits.resolveLinkToSmithyTrait(name);
</script>

<p id={name} class="name">
  <Link href={uri} {name} />
</p>
{#if name === 'smithy.api#documentation' && typeof trait === 'string'}
  <SanitizedHtml html={trait} />
{:else if isKvPairTrait(name)}
  <p class="wide-trait"><code>{trait}</code></p>
{:else if isStructureTrait(name) && isObject(trait)}
  <div class="trait-members">
    {#each entries(trait) as [key, value]}
      <p>{key}:</p>
      <p>{value}</p>
    {/each}
  </div>
{:else if name === 'smithy.api#enum' && Array.isArray(trait)}
  <ul>
    {#each trait as { name, value }}
      <li><p>{name}&nbsp;=&nbsp;{value}</p></li>
    {/each}
  </ul>
{:else if isArrayTrait(name) && Array.isArray(trait)}
  <ul>
    {#each trait as arg}
      <li><p>{arg}</p></li>
    {/each}
  </ul>
{:else if typeof trait === 'object' && trait !== null}
  <div class="trait-members">
    {#each entries(trait) as [key, value]}
      <p>{key}:</p>
      <p>{value}</p>
    {/each}
  </div>
{:else}
  <p class="error wide-trait">Unknown trait type: {trait}</p>
{/if}

<style lang="scss">
  .trait-members {
    display: grid;
    grid-template-columns: min-content 1fr;
    column-gap: 1rem;
  }

  .wide-trait {
    columns: 1 / 3;
  }

  .error {
    color: red;
  }
</style>
