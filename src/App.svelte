<script lang="ts">
  import { PrimaryState } from "$ts/stores/state";
  import StateRenderer from "$lib/StateRenderer.svelte";
</script>

<StateRenderer handler={PrimaryState} />
