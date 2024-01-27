<script lang="ts">
  export let height: number;
  export let stopped = false;
</script>

<div class="html-spinner" style="--size: {height}px;" class:going={!stopped} />
