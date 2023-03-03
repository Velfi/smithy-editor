<script lang="ts">
  import Error from './Error.svelte';
  import Indent from './Indent.svelte';
  import Traits from './traits/Traits.svelte';
  import type { SmithyModel } from '$lib/smithyModel';
  import * as shapes from '$lib/shapes';
  import Members from './Members.svelte';
  import Link from './Link.svelte';

  export let model: SmithyModel;
  export let name: string;
  export let shape: shapes.Operation;
  let uriComponent = encodeURIComponent(name);

  $: input = shape.input.target;
  $: output = shape.input.target;

  // We don't want to resolve members when an input/output is Unit.
  $: inputStructure = input === 'smithy.api#Unit' ? undefined : model.getStructureById(input);
  $: outputStructure = output === 'smithy.api#Unit' ? undefined : model.getStructureById(output);
</script>

<div class="operation">
  <p class="name"><Link {name} href={uriComponent} /></p>
  <Indent>
    {#if shape.traits}
      <p class="member-name">Traits:</p>
      <div class="traits">
        <Traits traits={shape.traits} />
      </div>
    {/if}
    <p class="member-name">
      Input:&nbsp<Link href={shapes.resolveLinkToShape(input)} isTarget name={input} />
    </p>
    {#if inputStructure !== undefined}
      <div class="members">
        <Members name={input} {model} />
      </div>
    {/if}
    <p class="member-name">
      Output:&nbsp<Link href={shapes.resolveLinkToShape(output)} isTarget name={output} />
    </p>
    {#if outputStructure !== undefined}
      <div class="members">
        <Members name={output} {model} />
      </div>
    {/if}
    {#if shape.errors !== undefined && shape.errors.length > 0}
      <p class="member-name">Errors:</p>
      {#each shape.errors as error}
        <Error {model} name={error.target} />
      {/each}
    {/if}
  </Indent>
</div>

<style lang="scss">
  .operation {
    border: 1px solid #eee;
    border-radius: 3px;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;

    p.member-name {
      font-weight: bold;
      font-size: 110%;
      margin: 0.5rem 0;
    }
  }

  .traits,
  .members {
    grid-template-columns: min-content 1fr;
    display: grid;
    margin-bottom: 1rem;
    column-gap: 2rem;
    padding-left: 1rem;
    row-gap: 0.5rem;
  }

  :global(.members > p) {
    grid-column: 1 / 3;
  }

  .name {
    font-size: 130%;
    font-weight: bold;
  }
</style>
