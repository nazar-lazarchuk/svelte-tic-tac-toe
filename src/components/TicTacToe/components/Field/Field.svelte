<script>
  export let squares;

  export let colToLineSizeRelation = 12;
  export let visibleLinesCount = squares - 1;

  $: lineCount = squares + 1;
  $: lineSize = 100 / (squares * colToLineSizeRelation + lineCount);

  function getLineOffset(i) {
    const lineOffset = (lineCount - visibleLinesCount) / 2;
    const colOffset = lineOffset * colToLineSizeRelation;
    const indexOffset = colToLineSizeRelation * i + i;
    return (lineOffset + colOffset + indexOffset) * lineSize;
  }

  function getColStyles(i, j) {
    return [
      `width: ${colToLineSizeRelation * lineSize}%`,
      `height: ${colToLineSizeRelation * lineSize}%`,
      `top: ${getColIndexOffset(i)}%`,
      `left: ${getColIndexOffset(j)}%`,
    ].join("; ");
  }

  function getColIndexOffset(i) {
    const indexOffset = 1 + (colToLineSizeRelation + 1) * i;
    return indexOffset * lineSize;
  }
</script>

<style>
  .field {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 100%;
    overflow: hidden;
  }

  .line {
    position: absolute;
    background: black;
    border-radius: 999px;
    width: 100%;
    height: 100%;
  }

  .col-box {
    position: absolute;
  }
</style>

<div class="field">
  {#each new Array(visibleLinesCount) as line, i}
    <div
      class="line"
      style={`height: ${lineSize}%; top: ${getLineOffset(i)}%`} />
    <div
      class="line"
      style={`width: ${lineSize}%; left: ${getLineOffset(i)}%`} />
  {/each}

  {#each new Array(squares) as row, i}
    {#each new Array(squares) as col, j}
      <div class="col-box" style={getColStyles(i, j)}>
        <slot {i} {j} />
      </div>
    {/each}
  {/each}
</div>
