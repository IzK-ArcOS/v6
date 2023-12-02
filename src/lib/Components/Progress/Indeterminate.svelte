<script lang="ts">
  export let width = 250;
  export let active = true;
</script>

<div class="progressbar" style="width: {width}px;">
  {#if active}
    <div class="inc" />
    <div class="dec" />
  {/if}
</div>
