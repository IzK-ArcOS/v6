<script lang="ts">
  import StateRenderer from "$lib/StateRenderer.svelte";
  import { SafeMode } from "$state/Desktop/ts/store";
  import { Logo } from "$ts/branding";
  import { Log } from "$ts/console";
  import { ArcOSVersion } from "$ts/env";
  import { ComponentIcon } from "$ts/images/general";
  import { ARCOS_BUILD, ARCOS_MODE, getBuild, getMode } from "$ts/metadata";
  import { DESKTOP_MODE, getDesktopMode } from "$ts/metadata/desktop";
  import { getBuildTimestamp } from "$ts/metadata/timestamp";
  import { flushVirtualFilesystem } from "$ts/server/fs/virtual";
  import { PrimaryState } from "$ts/states";
  import { onMount } from "svelte";

  let render = false;
  let logo = ComponentIcon;

  onMount(async () => {
    render = false;

    await getMode();
    await getBuild();
    await getDesktopMode();
    await getBuildTimestamp();
    await flushVirtualFilesystem();

    Log(
      "ArcOS",
      `***** [v6 -> ArcOS Stable v${ArcOSVersion}-${ARCOS_MODE}_${ARCOS_BUILD} -> ${DESKTOP_MODE}] *****`,
    );

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
