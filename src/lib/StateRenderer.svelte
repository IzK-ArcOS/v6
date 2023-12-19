<script lang="ts">
  import { AppRuntime } from "$ts/apps";
  import { StateHandler } from "$ts/states";
  import { State } from "$types/state";
  import { onMount } from "svelte";

  export let runtime: AppRuntime = null;
  export let handler: StateHandler;

  let state: State;

  onMount(() => handler.current.subscribe((v) => (state = v)));
</script>

{#if handler && state}
  <div class="state-renderer {handler.id} state-{handler.id}-{state.key}">
    <svelte:component
      this={state.content}
      thisState={state}
      {handler}
      {runtime}
    />
  </div>
{/if}
