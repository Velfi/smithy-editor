<script lang="ts">
  export let closed = false;
</script>

<div class="outer">
  <div class:closed class="content-wrapper">
    <slot />
  </div>
  <button type="button" on:click={() => (closed = !closed)}
    >[{#if closed}+{:else}-{/if}]</button
  >
</div>

<style lang="scss">
  div.outer {
    position: relative;
  }

  .content-wrapper.closed {
    max-height: 1.2rem;
    overflow: hidden;
    // TODO add white box shadow to hint at more content.
  }

  button {
    font-family: monospace;
    position: absolute;
    left: -1.8rem;
    top: 0.05rem;
    border: none;
    background: none;
    color: #777;
    cursor: pointer;
  }
</style>
