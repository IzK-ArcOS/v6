<script lang="ts">
  import { getProfilePicture } from "$ts/stores/pfp";
  import { UserDataStore } from "$ts/stores/user";

  export let fallback = "";
  export let src: string = fallback || "";
  export let height: number;
  export let className: string = "";

  let url = "";

  UserDataStore.subscribe((v) => {
    if (!v || src) return (url = src);

    url = fallback || getProfilePicture(v.acc.profilePicture);
  });
</script>

<div
  class="pfprenderer {className} pfp"
  style="background-image:url('{src || url}'); --h: {height}px;"
/>

<style scoped>
  div.pfprenderer {
    aspect-ratio: 1/1;
    background-size: cover;
    overflow: hidden;
    border-radius: 50%;
    background-position: center;
    display: inline-block;
    background-color: var(--button-glass-bg);
    min-width: var(--h);
    max-width: var(--h);
    height: var(--h);
    min-height: var(--h);
    max-height: var(--h);
  }
</style>
