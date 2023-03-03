<!-- For whatever reason, my IDE refuses to accept typescript in this file  -->
<script lang="ts">
  import ModelFileInput from '../components/ModelFileInput.svelte';
  import Link from '../components/Link.svelte';
  import '../global.scss';
  import * as stores from '../stores';
  import Service from '../components/Service.svelte';
  import Search from '../components/Search.svelte';
  import LoadingSpinner from '../components/LoadingSpinner.svelte';

  let modelIsLoaded = false;
  let modelIsLoading = false;

  stores.isModelLoaded.subscribe((isLoaded) => {
    modelIsLoaded = isLoaded;
  });

  stores.isLoadingModel.subscribe((isLoading) => {
    modelIsLoading = isLoading;
  });
</script>

<header>
  <h1>Smithy Editor</h1>
  <p>
    Visit <Link name="smithy.io" href="https://smithy.io" /> to read the documentation
  </p>
</header>
<div class="app-container">
  {#if modelIsLoaded}
    <Search />
    <Service />
  {:else if modelIsLoading}
    <div class="loader">
      <LoadingSpinner />
      <p class="apologetic">loading... please be patient</p>
    </div>
  {:else}
    <ModelFileInput />
  {/if}
</div>

<style lang="scss">
  header {
    background-color: #f90;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2rem;
    color: #232f3e;
    font-family: AmazonEmber-Bold, Helvetica, Helvetica, sans-serif;
  }

  .app-container {
    padding: 1rem 2rem;
    margin: 0 auto;
    max-width: 1000px;
  }

  .loader {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50vh;
    width: 100%;
  }

  .apologetic {
    font-size: 0.8rem;
    color: #777;
    font-style: italic;
  }
</style>
