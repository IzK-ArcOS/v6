<script lang="ts">
  import StateRenderer from "$lib/StateRenderer.svelte";
  import { getBuild, getMode } from "$ts/metadata";
  import { PrimaryState } from "$ts/states";
  import { CRASHING } from "$ts/stores/crash";
  import { onMount } from "svelte";

  let render = false;

  onMount(async () => {
    render = false;

    await getMode();
    await getBuild();

    render = true;
  });
</script>

{#if render}
  <div class="app theme-dark fullscreen" class:gray={$CRASHING}>
    <StateRenderer handler={PrimaryState} />
  </div>
{/if}
