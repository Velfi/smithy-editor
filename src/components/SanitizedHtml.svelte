<script lang="ts">
  import DOMPurify from 'dompurify';

  export let html: string;

  $: sanitizedHtml = DOMPurify.sanitize(html);
</script>

<div>{@html sanitizedHtml}</div>
