<script>
  export let squares = 3;
  export let winScore = 3;
  export let players = ['John', 'Tom'].sort(() => .5 - Math.random());

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
</style>

{#if !$gameState.complete}
  <h1>Plays: {$playerName}</h1>
{:else if $gameState.draw}
  <button on:click={startNewGame}>Start new game</button>
  <h1>Draw!</h1>
  {:else}
  <button on:click={startNewGame}>Start new game</button>
  <h1>{$gameState.playerName} won! =)</h1>
{/if}

<Field {squares} let:i={i} let:j={j}>
  <Col disabled={$cols[i][j].playerId >= 0} clickHandler={$cols[i][j].onMove}>
    <svelte:component this={signs[$cols[i][j].playerId]} />
  </Col>
</Field>
