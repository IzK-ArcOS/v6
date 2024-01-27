<script lang="ts">
  import { SpinnerIcon } from "$ts/images/general";
  export let height: number;
  export let stopped = false;
</script>

<img
  src={SpinnerIcon}
  alt="spinner"
  style="height: {height}px;"
  class="spinner-svg"
  class:hide={stopped}
/>
