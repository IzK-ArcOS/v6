<script lang="ts">
  import StateRenderer from "$lib/StateRenderer.svelte";
  import { Logo } from "$ts/branding";
  import { ComponentIcon } from "$ts/images/general";
  import { getBuild, getMode } from "$ts/metadata";
  import { PrimaryState } from "$ts/states";
  import { onMount } from "svelte";

  let render = false;
  let logo = ComponentIcon;

  onMount(async () => {
    render = false;

    await getMode();
    await getBuild();

    logo = Logo();

    render = true;
  });
</script>

<svelte:head>
  <link rel="icon" href={logo} />
</svelte:head>

{#if render}
  <div class="app theme-dark fullscreen">
    <StateRenderer handler={PrimaryState} renderProcesses />
  </div>
{/if}
