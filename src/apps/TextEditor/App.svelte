<script lang="ts">
  import { getAppById, spawnOverlay } from "$ts/apps";
  import { PersonalizationIcon } from "$ts/images/general";
  import { Runtime } from "./ts/runtime";

  export let runtime: Runtime;

  let contents = "";
  let path = "";

  runtime.File.subscribe((v) => {
    if (!v) return;

    path = v.path;
    contents = runtime.buffer.get();
  });

  function load() {
    spawnOverlay(getAppById("LoadSaveDialog"), runtime.pid, [
      {
        title: "Load File",
        icon: PersonalizationIcon,
      },
    ]);
  }
</script>

<p>{path}</p>
<button on:click={load}>Load</button>

<button on:click={() => runtime.save(contents)}>Save</button>
<textarea bind:value={contents}></textarea>
