<script>
  import TicTacToe from "./components/TicTacToe";
</script>

<style>
  main {
    position: relative;
    max-width: 600px;
    margin: 20px auto;
    padding: 0 20px;
  }
  main > div {
    position: relative;
  }
</style>

<main>
  <div>
    <TicTacToe squares={7} winScore={4} />
  </div>
</main>
