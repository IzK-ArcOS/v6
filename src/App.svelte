<script lang="ts">
  import { PrimaryState } from "$ts/stores/state";
  import StateRenderer from "$lib/StateRenderer.svelte";
</script>

<div class="app theme-dark">
  <StateRenderer handler={PrimaryState} />
</div>
