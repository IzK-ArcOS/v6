<script lang="ts">
  import SvelteMarkdown from "svelte-markdown";

  export let content: string;
</script>

<div class="markdownrenderer">
  <SvelteMarkdown source={content} />
</div>
