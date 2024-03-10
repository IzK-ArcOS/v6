<script lang="ts">
  import { Logo } from "$ts/branding";
  import { ARCOS_MODE } from "$ts/metadata";

  export let className = "glowing-logo";
</script>

<img src={Logo()} alt={ARCOS_MODE} class={className} />

<style scoped>
  img {
    background-image: url("../../assets/branding/glow.png");
    background-size: cover;
    background-position: center;
  }
</style>
