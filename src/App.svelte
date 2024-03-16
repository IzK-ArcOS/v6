<script lang="ts">
  import StateRenderer from "$lib/StateRenderer.svelte";
  import { SafeMode } from "$state/Desktop/ts/store";
  import { Logo } from "$ts/branding";
  import { Log } from "$ts/console";
  import { ArcOSVersion } from "$ts/env";
  import { ComponentIcon } from "$ts/images/general";
  import { ARCOS_BUILD, ARCOS_MODE, getBuild, getMode } from "$ts/metadata";
  import { PrimaryState } from "$ts/states";
  import { onMount } from "svelte";

  let render = false;
  let logo = ComponentIcon;

  onMount(async () => {
    render = false;

    await getMode();
    await getBuild();

    Log("ArcOS", `***** [v6 -> ArcOS Stable v${ArcOSVersion}-${ARCOS_MODE}_${ARCOS_BUILD}] *****`);

    logo = Logo();

    render = true;
  });
</script>

<svelte:head>
  <link rel="icon" href={logo} />
</svelte:head>

{#if render}
  <div class="app theme-dark fullscreen" class:safemode={$SafeMode}>
    <StateRenderer handler={PrimaryState} renderProcesses />
  </div>
{/if}
