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
  let classes = "";

  onMount(() =>
    handler.current.subscribe((v) => {
      state = v;

      classes = (v.attribs.classes as string) || "";
    }),
  );
</script>

{#if handler && state}
  <div class="state-renderer {classes} {handler.id} state-{handler.id}-{state.key}">
    {#if state.content}
      <svelte:component this={state.content} thisState={state} {handler} {runtime} />
    {/if}
  </div>
  {#if !state.attribs.noProcesssRenderer && renderProcesses}
    <ProcessRenderer />
  {/if}
{/if}
