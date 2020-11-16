<script>
  export let clickHandler;
  export let disabled;
</script>

<style>
  .col {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 5%;
    transition: background-color 0.1s ease-in-out;
    cursor: pointer;
    user-select: none;
  }
  .col:hover {
    background-color: #ccc;
  }

  .disabled {
    pointer-events: none;
  }
</style>

<div class="col" class:disabled={disabled} on:click={clickHandler}>
  <slot />
</div>
