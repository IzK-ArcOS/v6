<script lang="ts">
  import "./css/main.css";
  import { Runtime } from "./ts/runtime";

  export let runtime: Runtime;

  const { File, wordWrap, monospace, buffer } = runtime;

  let contents = "";

  File.subscribe((v) => {
    if (!v) return;

    contents = $buffer;
  });

  function update() {
    buffer.set(contents);
  }
</script>

<textarea
  bind:value={contents}
  on:input={update}
  on:keydown={update}
  class:nowrap={!$wordWrap}
  class:monospace={$monospace}
  wrap="soft"
/>
