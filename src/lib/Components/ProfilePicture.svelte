<script lang="ts">
  import { getProfilePicture } from "$ts/stores/pfp";
  import { UserDataStore } from "$ts/stores/user";

  export let src: string = "";
  export let height: number;
  export let className: string = "";

  let url = "";

  UserDataStore.subscribe((v) => {
    if (!v) return;

    url = getProfilePicture(v.acc.profilePicture);
  });
</script>

<div
  class="pfprenderer {className} pfp"
  style="background-image:url('{src || url}'); height:{height}px;"
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
  }
</style>
