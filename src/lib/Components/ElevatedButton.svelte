<script lang="ts">
  import { SecureIcon } from "$ts/images/general";

  export let className = "";
  export let style = "";
  export let click: () => any = () => {};
  export let disabled = false;
</script>

<button class="button elevated-button {className}" {style} on:click={click} {disabled}>
  <img src={SecureIcon} alt="" class="secure-icon" />
  <span>
    <slot />
  </span>
</button>
