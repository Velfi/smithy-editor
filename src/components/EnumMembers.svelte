<script lang="ts">
  import type * as traits from '$lib/traits';
  import type { SmithyModel } from '$lib/smithyModel';

  export let model: SmithyModel;
  export let name: string;

  $: members = Object.entries(model.getEnumById(name)?.members ?? {});

  function enumValue(member: { target: string; traits: traits.Traits }): string {
    const v = member.traits?.['smithy.api#enumValue'] as string | undefined;
    return v ?? '';
  }
</script>

{#if members.length > 0}
  {#each members as [name, shape]}
    <p>{name} = <code>{enumValue(shape)}</code></p>
  {/each}
{:else}
  <p class="none">this enum has no variants</p>
{/if}
