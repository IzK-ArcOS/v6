<script lang="ts">
  import { SpinnerIcon } from "$ts/images/general";
  /* import "$css/components/" */
  export let height: number;
</script>

<img
  src={SpinnerIcon}
  alt="spinner"
  style="height: {height}px;"
  class="spinner-svg"
/>
