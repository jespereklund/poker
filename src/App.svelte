<script>
  import { onMount } from "svelte";
  import { calcScore } from "./helpers";
  import Deck from "./deck";

  let deck
  let table = [null, null, null, null, null]
  let sprite
  let ctx
  let bet = 1
  let credit = 99
  let holds = [false, false, false, false, false]
  let gameState = "bet" //bet, hold, done, busy
  let canvas
  let blink = false
  let scoreIndex = -1
  
  const scores = [500, 100, 50, 10, 7, 5, 3, 2, 1]
  const scoreTexts = ["Royal Flush", "Straight Flush", "4 of a kind", "Full House", "Flush", "Straight", "3 of a kind", "2 pairs", "Jacks or Better"]
  const cardWidth = 102
  const cardHeight = 115
  const cardSpaceX = 11
  const cardSpaceY = 9

  onMount(() => {
    deck = new Deck()
    canvas = document.getElementById("canvas")
    ctx = canvas.getContext('2d')
    loadSprites()
    window.setInterval(toggleBlink, 400);
  })

  function newGame() {
    table[0] = deck.popCard()
    table[1] = deck.popCard()
    table[2] = deck.popCard()
    table[3] = deck.popCard()
    table[4] = deck.popCard()
    table[0] = deck.popCard()
    table[1] = deck.popCard()
    table[2] = deck.popCard()
    table[3] = deck.popCard()
    table[4] = deck.popCard()
    table[0] = deck.popCard()
    table[1] = deck.popCard()
    table[2] = deck.popCard()
    table[3] = deck.popCard()
    table[4] = deck.popCard()
    table[0] = deck.popCard()
    table[1] = deck.popCard()
    table[2] = deck.popCard()
    table[3] = deck.popCard()
    table[4] = deck.popCard()
    table[0] = deck.popCard()
    table[1] = deck.popCard()
    table[2] = deck.popCard()
    table[3] = deck.popCard()
    table[4] = deck.popCard()
    table[0] = deck.popCard()
    table[1] = deck.popCard()
    table[2] = deck.popCard()
    table[3] = deck.popCard()
    table[4] = deck.popCard()
    table[0] = deck.popCard()
    table[1] = deck.popCard()
    table[2] = deck.popCard()
    table[3] = deck.popCard()
    table[4] = deck.popCard()
    table[0] = deck.popCard()
    table[1] = deck.popCard()
    table[2] = deck.popCard()
    table[3] = deck.popCard()
    table[4] = deck.popCard()
    table[0] = deck.popCard()
    table[1] = deck.popCard()
    table[2] = deck.popCard()
    table[3] = deck.popCard()
    table[4] = deck.popCard()
    table[4] = deck.popCard()
    table[4] = deck.popCard()
    table[4] = deck.popCard()
    table[4] = deck.popCard()
    table[4] = deck.popCard(true)
    table[4] = deck.popCard(true)
    table[4] = deck.popCard(true)
    table[4] = deck.popCard()

    scoreIndex = calcScore(table)
    drawTable()
  }

  function loadSprites() {
    sprite = new Image()
    sprite.onload = function() {
      newGame()
    }
    sprite.src = 'deck.png'
  }  

  function drawTable() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    let spriteX, spriteY
    for (let i=0; i<5; i++) {
      const cardValue = (table[i] % 13)
      spriteX = cardValue * (cardWidth + cardSpaceX)
      spriteY = Math.floor(table[i] / 13) * (cardHeight + cardSpaceY)
      const ctxX = 10 + (i)*(cardWidth + cardSpaceX)
      ctx.drawImage(sprite, 6 + spriteX, 5 + spriteY, cardWidth, cardHeight, ctxX, 10, cardWidth, cardHeight)
    }
  }

  function holdClick(index) {
    let sum = 0
    for (let i=0; i<5; i++) {
      if (holds[i] === true) {
        sum += 1
      }
    }
    console.log(sum)
    if (sum < 3 || holds[index] === true) {
      holds[index] = !holds[index]
    }
  }

  function resetBet() {
    if (gameState === "bet") {
      credit += bet - 1
      bet = 1
    }
  }

  function bet1() {
    if (gameState === "bet" && credit >= 1) {
      bet += 1
      credit -= 1
    }
  }

  function deal() {

  }

  function takeScore() {

  }

  function toggleBlink() {
    blink = !blink
  }

</script>
<main>
  <div style="display: flex; flex-direction: row;">
    <div style="padding-left:50px; width: 350px; color: white;">
      <p class="txt">Credit {credit}</p>
      <p class="txt">Bet {bet}</p>
    </div>
    <table class="txt">
      {#each scoreTexts as text, index}
        <tr style="opacity:{(scoreIndex === index && blink) ? 0.0 : 1.0}"><td>{text}</td><td class="right">{bet * scores[index]}</td></tr>  
      {/each}
    </table>
  </div>
  <br><br>
  <canvas id="canvas" width="575" height="137" />
  <div style="width: 1150px; padding-left: 2px; display: flex; flex-direction: row;">
  {#each holds as hold, index}
    <div style="width: 182px; text-align: center;">
      <p style="opacity:{hold === true ? 1.0 : 0.0}" class="holdP">HOLD</p>
      <button on:click={e => {holdClick(index)}} class="btn yellowBorder">Hold</button>
    </div>
    <br>
  {/each}
  </div>
  <br><br>
  <div style="width: 1150px; padding-left: 2px; display: flex; flex-direction: row;">
    <div style="width: 227px; text-align: center;">
      <button on:click={resetBet} disabled={gameState != "bet"} class="btn redBorder">Reset Bet</button>
    </div>
    <div style="width: 227px; text-align: center;">
      <button on:click={bet1} disabled={gameState != "bet"} class="btn redBorder">Bet 1</button>
    </div>
    <div style="width: 227px; text-align: center;">
      <button on:click={deal} class="btn redBorder">Deal</button>
    </div>
    <div style="width: 227px; text-align: center;">
      <button on:click={takeScore} class="btn redBorder">Take Score</button>
    </div>
  </div>
  </main>
<style>
  table {
    width: 500px;
  }
  .txt {
    color: yellow;
    font-family: 'Courier New', Courier, monospace;
    font-weight: bolder;
    font-size: 30px;
  }
  .right {
    text-align: right;
  }
  canvas {
    zoom: 1.6;
  }

  .btn {
    background-color: #339900;
    color: yellow;
    font-size: 20px;
    border-width: 4px;
    text-align: center;    
    width: 150px;
    height: 50px;
    margin-left: 0px;
    margin-right: 0px;
  }

  .btn:disabled, .btn[disabled]{
  border: 2px solid #006600;
  background-color: #003300;
  color: #666600;
}

  .yellowBorder {
    border-color: yellow;
  }

  .redBorder {
    border-color: red;
  }

  .holdP {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 20px;
    text-align: center;    
    color: yellow;
    width: 100%;
  }

</style>