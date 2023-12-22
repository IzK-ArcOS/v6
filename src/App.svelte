<script lang="ts">
  import StateRenderer from "$lib/StateRenderer.svelte";
  import { Logo } from "$ts/branding";
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

<svelte:head>
  <link rel="icon" href={Logo()} />
</svelte:head>

{#if render}
  <div class="app theme-dark fullscreen" class:gray={$CRASHING}>
    <StateRenderer handler={PrimaryState} renderProcesses />
  </div>
{/if}
