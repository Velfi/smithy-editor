<script lang="ts">
  export let href: string;
  export let name: string;
  export let isTarget = false;

  $: isExternalLink = href.startsWith('http');
</script>

{#if isExternalLink}
  <a rel="noreferrer noopen" target="_blank" class="link" {href}>{name}</a>
{:else}
  <a id={isTarget ? null : name} class="link" href={`#${href}`}>{name}</a>
{/if}
