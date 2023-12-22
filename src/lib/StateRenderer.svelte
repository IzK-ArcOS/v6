<script lang="ts">
  import ProcessRenderer from "$state/Desktop/Components/ProcessRenderer.svelte";
  import { AppRuntime } from "$ts/apps";
  import { StateHandler } from "$ts/states";
  import { State } from "$types/state";
  import { onMount } from "svelte";

  export let runtime: AppRuntime = null;
  export let handler: StateHandler;
  export let renderProcesses = false;

  let state: State;

  onMount(() => handler.current.subscribe((v) => (state = v)));
</script>

{#if handler && state}
  <div class="state-renderer {handler.id} state-{handler.id}-{state.key}">
    {#if state.content}
      <svelte:component
        this={state.content}
        thisState={state}
        {handler}
        {runtime}
      />
    {/if}
  </div>
  {#if state.key != "desktop" && renderProcesses}
    <ProcessRenderer />
  {/if}
{/if}
