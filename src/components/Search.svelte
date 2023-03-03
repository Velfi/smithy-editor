<script lang="ts">
  import { searchFilter } from '../stores';

  let value = '';
  $: searchFilter.set(value);
</script>

<div>
  <label for="search-box"> Search: </label>
  <input placeholder="Search" name="search-box" id="search-box" type="text" bind:value />
</div>

<style lang="scss">
  div {
    display: flex;
  }

  #search-box {
    width: 100%;
    font-size: 120%;
    border-radius: 3px;
    border: 1px solid #777;
    padding: 0.5rem;
  }

  label {
    visibility: hidden;
    width: 0;
  }
</style>
