<script lang="ts">
  import type { SmithyModel } from '$lib/smithyModel';
  import Operation from './Operation.svelte';
  import Error from './Error.svelte';
  import Resource from './Resource.svelte';
  import Shape from './Shape.svelte';
  import Accordion from './Accordion.svelte';
  import ServiceTraits from './ServiceTraits.svelte';
  import { SIMPLE_SHAPE_TYPES } from '$lib/simple-shapes';
  import SanitizedHtml from './SanitizedHtml.svelte';
  import MiniAccordion from './MiniAccordion.svelte';
  import { smithyModel } from '../stores';

  let model: SmithyModel | undefined = undefined;
  let otherShapes: readonly [string, any][] = [];
  let serviceDocs: string | undefined = undefined;
  let serviceTitle: string | undefined = undefined;
  let serviceName: string | undefined = undefined;
  let smithyIDLVersion: string | undefined = undefined;
  let numberOfTraits: number = 0;
  let numberOfOperations: number = 0;
  let numberOfResources: number = 0;
  let numberOfErrors: number = 0;
  let numberOfOtherShapes: number = 0;

  smithyModel.subscribe((m) => {
    if (m) {
      model = m;
    }
  });

  $: if (model) {
    otherShapes = model.getShapesByType(...SIMPLE_SHAPE_TYPES, 'list', 'map', 'structure', 'union');
    serviceDocs = model.serviceShape.traits?.['smithy.api#documentation'];
    serviceTitle = model.serviceShape.traits?.['smithy.api#title'];
    serviceName = model.serviceName;
    smithyIDLVersion = model.serviceShape.version;

    numberOfTraits = Object.keys(model.serviceShape.traits ?? {}).length;
    numberOfOperations = model.serviceOperations.length;
    numberOfResources = model.serviceResources.length;
    numberOfErrors = model.serviceErrors.length;
    numberOfOtherShapes = otherShapes.length;
  }
</script>

<div class="service-header">
  <h2>{serviceTitle} &mdash; <span class="service-name">{serviceName}</span></h2>
  <p class="gray-italic">v{smithyIDLVersion}</p>
</div>

<div class="service-info">
  {#if serviceDocs !== undefined && serviceDocs !== '<p></p>'}
    <MiniAccordion>
      <SanitizedHtml html={serviceDocs} />
    </MiniAccordion>
  {:else}
    <p class="gray-italic no-declare">This service is undocumented.</p>
  {/if}
</div>

{#if model}
  {#if numberOfTraits > 0}
    <Accordion name="Service Traits">
      <svelte:fragment slot="info">
        {numberOfTraits} traits
      </svelte:fragment>
      <ServiceTraits {model} />
    </Accordion>
  {:else}
    <p class="gray-italic no-declare">This service declares no traits.</p>
  {/if}
  {#if numberOfOperations > 0}
    <Accordion name="Operations">
      <svelte:fragment slot="info">
        {numberOfOperations} operations
      </svelte:fragment>
      {#each model.serviceOperations as [name, shape]}
        <Operation {name} {shape} {model} />
      {/each}
    </Accordion>
  {:else}
    <p class="gray-italic no-declare">This service declares no operations.</p>
  {/if}
  {#if numberOfResources > 0}
    <Accordion name="Resources">
      <svelte:fragment slot="info">
        {numberOfResources} resources
      </svelte:fragment>
      {#each model.serviceResources as [name, shape]}
        <Resource {name} {shape} />
      {/each}
    </Accordion>
  {:else}
    <p class="gray-italic no-declare">This service declares no resources.</p>
  {/if}
  {#if numberOfErrors > 0}
    <Accordion name="Errors">
      <svelte:fragment slot="info">
        {numberOfErrors} errors
      </svelte:fragment>
      {#each model.serviceErrors as [name]}
        <Error {model} {name} />
      {/each}
    </Accordion>
  {:else}
    <p class="gray-italic no-declare">This service declares no errors.</p>
  {/if}
  {#if numberOfOtherShapes > 0}
    <Accordion name="Other Shapes">
      <svelte:fragment slot="info">
        {numberOfOtherShapes} shapes
      </svelte:fragment>
      <div class="other-shapes">
        {#each otherShapes as [name, shape]}
          <Shape {name} {shape} {model} />
        {/each}
      </div>
    </Accordion>
  {:else}
    <p class="gray-italic no-declare">This service declares no other shapes.</p>
  {/if}
{/if}

<style lang="scss">
  :global(p) {
    margin: 0;
  }

  :global(.other-shapes > .shape > .header > .name) {
    font-weight: bold;
  }

  :global(.other-shapes > .shape > .header) {
    margin-bottom: 0.25rem;
  }

  .service-name {
    color: #777;
    font-weight: normal;
  }

  .service-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h2 {
      margin: 1rem 0;
      font-size: 170%;
    }
  }

  .service-info {
    margin-bottom: 1rem;
  }

  .gray-italic {
    color: #777;
    font-style: italic;
  }

  .no-declare {
    margin-bottom: 1rem;
    margin-left: 1rem;
  }
</style>
