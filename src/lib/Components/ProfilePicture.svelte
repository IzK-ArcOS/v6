<script lang="ts">
  import { getProfilePicture } from "$ts/stores/pfp";
  import { UserDataStore } from "$ts/stores/user";

  export let fallback = "";
  export let src: string = fallback || "";
  export let height: number;
  export let className: string = "";
  export let v6 = false;

  let url = "";

  UserDataStore.subscribe((v) => {
    if (!v || src) return (url = src);

    url = fallback || getProfilePicture(v.acc.profilePicture);
  });
</script>

<div
  class="pfprenderer {className} pfp"
  style="background-image:url('{src || url}'); --h: {height}px;"
  class:v6={v6 || ($UserDataStore && $UserDataStore.acc.v6)}
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

  div.pfprenderer.v6 {
    outline: #b78dff 4px solid;
    outline-offset: 1px;
  }
</style>
