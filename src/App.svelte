<script>
  import TicTacToe from './components/TicTacToe';

  let squares = 7;
  let winScore = 4;
  let fullStroke = false;
  let players = ['John', 'Tom'];
  let colToLineSizeRelation = 12;

  $: reRenderKey = `${squares}-${winScore}-${+fullStroke}-${players.join('')}-${colToLineSizeRelation}`;
</script>

<style>
  main {
    position: relative;
    max-width: 600px;
    margin: 20px auto;
    padding: 0 20px;
  }
</style>

<main>
  <div style="position: relative;">
    {#key reRenderKey}
      <TicTacToe {squares} {winScore} {fullStroke} {players} {colToLineSizeRelation} />
    {/key}
  </div>

  <hr />

  <h1>Settings</h1>
  <div>
    <label>
      Squares: <input type="number" bind:value={squares} min="1" />
    </label>
    <label>
      Win score: <input type="number" bind:value={winScore} min="1" />
    </label>
    <label>
      Full stroke: <input type="checkbox" bind:checked={fullStroke} />
    </label>
    {#each players as player, i}
      <label>
        Player {i + 1}: <input type="text" bind:value={players[i]} />
      </label>
    {/each}
    <!-- <button on:click={() => players = [...players, 'John Doe']}>Add player</button> -->
  </div>
  <hr />
  <h2>Additional</h2>
  <div>
    <label>
      Field proportion: <input type="number" bind:value={colToLineSizeRelation} min="1" />
    </label>
  </div>
</main>
