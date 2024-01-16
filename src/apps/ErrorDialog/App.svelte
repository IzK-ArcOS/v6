<script lang="ts">
  import { ErrorDialog } from "$types/error";
  import { onMount } from "svelte";
  import "./css/main.css";
  import { Runtime } from "./ts/runtime";

  export let runtime: Runtime;

  let data: ErrorDialog = null;
  let disabled = false;

  onMount(() => {
    data = runtime.process.args[0] as ErrorDialog;
  });

  function e(cb: () => void) {
    cb();

    closeThis();
  }

  function closeThis() {
    runtime.process.handler.kill(runtime.process.pid, true);
  }
</script>

{#if data}
  <div class="top" class:shrunk={data.shrunk}>
    {#if data.image}
      <div class="error-image">
        <img src={data.image} alt="" />
      </div>
    {/if}
    <div class="content">
      <h3 class="error-title">
        {data.title}
      </h3>
      <p class="error-message">
        {#if data.component}
          <div class="component">
            <svelte:component
              this={data.component}
              error={data}
              bind:disabled
            />
          </div>
        {:else}
          {@html data.message || "$error.message"}
        {/if}
      </p>
    </div>
  </div>
  <div class="bottom">
    <div class="buttons">
      {#each data.buttons as button}
        <button
          on:click={() => e(button.action)}
          class:suggested={button.suggested}
          disabled={disabled && button.suggested}
        >
          {button.caption}
        </button>
      {/each}
    </div>
  </div>
{/if}
