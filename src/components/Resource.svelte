<script lang="ts">
  import type * as shapes from '$lib/shapes';
  import Link from './Link.svelte';
  import Target from './Target.svelte';

  export let name: string;
  export let shape: shapes.Resource;
  let uriComponent = encodeURIComponent(name);
  $: hasNoMembers =
    !shape.identifiers &&
    !shape.create &&
    !shape.put &&
    !shape.read &&
    !shape.update &&
    !shape.delete &&
    !shape.list &&
    !shape.operations &&
    !shape.collectionOperations &&
    !shape.resources;
</script>

<div class="resource">
  <p class="name">
    <Link href={uriComponent} {name} />
  </p>
  {#if hasNoMembers}
    <p class="no-members">This resource defines no members</p>
  {:else}
    <ul>
      {#if shape.identifiers}
        <li>
          <p>identifiers:</p>
          <ul>
            {#each Object.entries(shape.identifiers) as [name, target]}
              <li><Target {name} {target} /></li>
            {/each}
          </ul>
        </li>
      {/if}
      {#if shape.create}
        <li>
          <p>create:</p>
          <Target target={shape.create} />
        </li>
      {/if}
      {#if shape.put}
        <li>
          <p>put:</p>
          <Target target={shape.put} />
        </li>
      {/if}
      {#if shape.read}
        <li>
          <p>read:</p>
          <Target target={shape.read} />
        </li>
      {/if}
      {#if shape.update}
        <li>
          <p>update:</p>
          <Target target={shape.update} />
        </li>
      {/if}
      {#if shape.delete}
        <li>
          <p>delete:</p>
          <Target target={shape.delete} />
        </li>
      {/if}
      {#if shape.list}
        <li>
          <p>list:</p>
          <Target target={shape.list} />
        </li>
      {/if}
      {#if shape.operations}
        <li>
          <p>operations:</p>
          <ul>
            {#each shape.operations as operation}
              <li><Target target={operation} /></li>
            {/each}
          </ul>
        </li>
      {/if}
      {#if shape.collectionOperations}
        <li>
          <p>collectionOperations:</p>
          <ul>
            {#each shape.collectionOperations as operation}
              <li><Target target={operation} /></li>
            {/each}
          </ul>
        </li>
      {/if}
      {#if shape.resources}
        <li>
          <p>resources:</p>
          <ul>
            {#each shape.resources as resource}
              <li><Target target={resource} /></li>
            {/each}
          </ul>
        </li>
      {/if}
    </ul>
  {/if}
</div>

<style lang="scss">
  .resource {
    border: 1px solid #eee;
    border-radius: 3px;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;

    & > ul {
      display: grid;
      grid-template-columns: min-content 1fr;
      column-gap: 1rem;
      row-gap: 0.5rem;
      padding-left: 2.5rem;

      li {
        display: grid;
        grid-template-columns: subgrid;
        grid-column-start: 1;
        grid-column-end: 3;

        ul {
          padding-left: 0;
        }
      }
    }
  }

  .no-members {
    padding: 1rem 2.5rem;
    font-style: italic;
    color: #888;
  }

  .name {
    font-size: 130%;
    font-weight: bold;
  }
</style>
