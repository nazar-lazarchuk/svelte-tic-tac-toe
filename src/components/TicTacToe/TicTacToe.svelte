<script>
  export let squares = 3;
  export let winScore = 3;
  export let players = ['John', 'Tom'];
  export let fullStroke = false;
  export let colToLineSizeRelation;

  import Field from './components/Field';
  import Col from './components/Col';
  import Cross from './components/signs/Cross.svelte';
  import Zero from './components/signs/Zero.svelte';

  import { Game } from './game';

  const signs = [Cross, Zero];

  let game = new Game({ squares, players, winScore });

  $: playerName = game.playerName;
  $: cols = game.cols;
  $: gameState = game.gameState;

  function startNewGame() {
    players.reverse();
    game = new Game({ squares, players, winScore });
  }
</script>

<style>
  button {
    float: right;
  }
  button.active {
    background: green;
    color: white;
  }
</style>

<button on:click={startNewGame} class:active={$gameState.complete}>Restart</button>

{#if !$gameState.complete}
  <h1>Plays: {$playerName}</h1>
{:else if $gameState.draw}
  <h1>Draw!</h1>
{:else}
  <h1>{$gameState.playerName} won! =)</h1>
{/if}

<Field
  {squares}
  {colToLineSizeRelation}
  visibleLinesCount={fullStroke ? squares + 1 : squares - 1}
  let:i
  let:j
>
  <Col disabled={$cols[i][j].playerId >= 0} clickHandler={$cols[i][j].onMove}>
    <svelte:component this={signs[$cols[i][j].playerId]} />
  </Col>
</Field>
