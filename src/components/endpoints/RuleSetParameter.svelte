<script lang="ts">
  import type * as traits from '$lib/traits';

  export let parameter: traits.EndpointParameter;
</script>

<p>builtIn: {parameter.builtIn}</p>
<p>required: {parameter.required}</p>
<p>type: {parameter.type}</p>
<p>documentation: {parameter.documentation}</p>
{#if parameter.default}
  <p>default: {parameter.default}</p>
{/if}
