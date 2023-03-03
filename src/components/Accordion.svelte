<script lang="ts">
  import Indent from './Indent.svelte';

  export let name: string;
  export let open: boolean = false;
</script>

<details {open} class="accordion">
  <summary
    ><p>{name}</p>
    <p class="show">&nbsp;(show)</p>
    <p class="hide">&nbsp;(hide)</p>
    <div class="info">
      <slot name="info" />
    </div>
  </summary>
  <slot />
</details>

<style lang="scss">
  details.accordion {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 0.5rem 1rem 0.75rem 1rem;

    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

    summary {
      display: flex;
      align-items: center;
      cursor: pointer;

      & > p {
        font-size: 150%;
        font-weight: bold;

        &.show,
        &.hide {
          color: #888;
          font-weight: normal;
          font-size: 100%;
        }
      }

      & > .info {
        margin-left: auto;
        color: #888;
        font-style: italic;
        font-size: 80%;
      }
    }

    &:not([open]) summary p.hide {
      display: none;
    }

    &[open] summary p.show {
      display: none;
    }

    &[open] summary {
      margin-bottom: 1rem;
      padding-top: 0.5rem;
    }
  }
</style>
