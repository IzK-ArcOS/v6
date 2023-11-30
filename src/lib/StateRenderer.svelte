<script lang="ts">
  import { StateHandler } from "$ts/states";
  import { State } from "$types/state";
  import { onMount } from "svelte";

  export let handler: StateHandler;

  let state: State;

  onMount(() => handler.current.subscribe((v) => (state = v)));
</script>

{#if handler}
  <div class="state-renderer {handler.id}">
    {#if state && state.content}
      <svelte:component this={state.content} thisState={state} {handler} />
    {/if}
  </div>
{/if}
