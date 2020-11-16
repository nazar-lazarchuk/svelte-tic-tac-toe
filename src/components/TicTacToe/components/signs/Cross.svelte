<style>
  .cross {
    box-sizing: border-box;
  }
  .line {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .line:first-child {
    animation: crossBeforeIn .3s ease-out both;
  }
  .line:last-child {
    animation: crossAfterIn .3s .2s ease-out both;
  }

  .line > div {
    position: absolute;
    background: blue;
    width: 1em;
    height: 90%;
    top: 50%;
    left: 50%;
    border-radius: 9999px;
  }
  .line:first-child > div {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  .line:last-child > div {
    transform: translate(-50%, -50%) rotate(-45deg);
  }

  @keyframes crossBeforeIn {
    from {
      transform: translate(15%, -15%);
      opacity: 0;
    }
  }
  @keyframes crossAfterIn {
    from {
      transform: translate(-15%, -15%);
      opacity: 0;
    }
  }
</style>

<div class="cross">
  <div class="line">
    <div />
  </div>
  <div class="line">
    <div />
  </div>
</div>