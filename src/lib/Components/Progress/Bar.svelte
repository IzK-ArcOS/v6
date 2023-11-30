<script lang="ts">
  export let indeterminate = false;
  export let max = 100;
  export let value = 50;
</script>

<progress aria-busy={indeterminate} {max} {value}></progress>

<style>
  progress {
    height: 10px;
  }
  progress::-webkit-progress-bar {
    background-color: var(--button-bg);
    border: var(--button-hover-bg) 1px solid;
    border-radius: 5px;
  }
  progress::-webkit-progress-value {
    height: 8px;
    border-radius: 4px;
    margin: 0;
    background-color: var(--accent);
  }
</style>
