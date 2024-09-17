<script>
  import { onMount } from "svelte";
  let deck = []
  let table = [null, null, null, null, null]
  let sprite
  let ctx
  let bet = 100
  let credit = 900
  let holds = [false, false, false, false, false]

  let gameState = "bet" //bet, hold, done, busy
  
  const scores = [500, 100, 50, 10, 7, 5, 3, 2, 1]
  const cardWidth = 102
  const cardHeight = 115
  const cardSpaceX = 11
  const cardSpaceY = 9

  onMount(() => {
    ctx = canvas.getContext('2d')
    loadSprites()
  })

  function newGame() {
    deck = []
    for (let i=0; i<52; i++) {
      deck.push(i)
    }
    shuffle()

    table[0] = deck.pop()
    table[1] = deck.pop()
    table[2] = deck.pop()
    table[3] = deck.pop()
    table[4] = deck.pop()

    drawTable()
  }

  function shuffle() {
    let currentIndex = deck.length;
    while (currentIndex != 0) {
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [deck[currentIndex], deck[randomIndex]] = [
        deck[randomIndex], deck[currentIndex]];
    }
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
      credit += bet - 100
      bet = 100
    }
  }

  function bet100() {
    if (gameState === "bet" && credit >= 100) {
      bet += 100
      credit -= 100
    }
  }

  function deal() {

  }

  function takeScore() {

  }

</script>
<main>
  <div style="display: flex; flex-direction: row;">
    <div style="padding-left:50px; width: 350px; color: white;">
      <p class="txt">Credit {credit}</p>
      <p class="txt">Bet {bet}</p>
    </div>
    <table class="txt">
      <tr><td>Royal Flush</td><td class="right">{bet * scores[0]}</td></tr>
      <tr><td>Straight Flush</td><td class="right">{bet * scores[1]}</td></tr>
      <tr><td>4 of a kind</td><td class="right">{bet * scores[2]}</td></tr>
      <tr><td>Full House</td><td class="right">{bet * scores[3]}</td></tr>
      <tr><td>Flush</td><td class="right">{bet * scores[4]}</td></tr>
      <tr><td>Straight</td><td class="right">{bet * scores[5]}</td></tr>
      <tr><td>3 of a kind</td><td class="right">{bet * scores[6]}</td></tr>
      <tr><td>2 pairs</td><td class="right">{bet * scores[7]}</td></tr>
      <tr><td>Jacks or Better</td><td class="right">{bet * scores[8]}</td></tr>
    </table>
  </div>
  <br><br>
  <canvas id="canvas" width="575" height="137" />
  <div style="width: 1150px; padding-left: 2px; display: flex; flex-direction: row;">
  {#each holds as hold, index}
    <div style="width: 182px; text-align: center;">
      <p style="opacity:{hold === true ? 1.0 : 0.0}" class="holdP">HOLD</p>
      <button on:click={e => {holdClick(index)}} class="holdBtn">Hold</button>
    </div>
    <br>
  {/each}
  </div>
  <br><br>
  <div style="width: 1150px; padding-left: 2px; display: flex; flex-direction: row;">
    <div style="width: 227px; text-align: center;">
      <button on:click={resetBet} class="gameBtn">Reset Bet</button>
    </div>
    <div style="width: 227px; text-align: center;">
      <button on:click={bet100} class="gameBtn">Bet 100</button>
    </div>
    <div style="width: 227px; text-align: center;">
      <button on:click={deal} class="gameBtn">Deal</button>
    </div>
    <div style="width: 227px; text-align: center;">
      <button on:click={takeScore} class="gameBtn">Take Score</button>
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
    background-color: #006600;
  }

  .holdBtn {
    background-color: #339900;
    color: white;
    font-size: 20px;
    border-width: 4px;
    border-color: yellow;
    text-align: center;    
    width: 150px;
    height: 50px;
    margin-left: 0px;
    margin-right: 0px;
  }

  .gameBtn {
    background-color: #339900;
    color: white;
    font-size: 20px;
    border-width: 4px;
    border-color: red;
    text-align: center;    
    width: 150px;
    height: 50px;
    margin-left: 0px;
    margin-right: 0px;
  }

  .holdP {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 20px;
    text-align: center;    
    color: yellow;
    width: 100%;
  }

</style>