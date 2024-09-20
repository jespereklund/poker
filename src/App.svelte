<script>
  import { onMount } from "svelte";
  let deck = []
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
    canvas = document.getElementById("canvas")
    ctx = canvas.getContext('2d')
    loadSprites()
    window.setInterval(toggleBlink, 400);
  })

  function newGame() {
    deck = []
    for (let i=0; i<52; i++) {
      deck.push(i)
    }
    shuffle()

    /*
    table[0] = deck.pop()
    table[1] = deck.pop()
    table[2] = deck.pop()
    table[3] = deck.pop()
    table[4] = deck.pop()
    */

    table[0] = 0 + 13
    table[1] = 9 + 13 
    table[2] = 10 + 13
    table[3] = 11 + 13
    table[4] = 12 + 13 

    calcScore()

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

  function calcScore() {
    scoreIndex = -1
    let values = new Array(13).fill(0)

    table.forEach(card => {
      values[card % 13] += 1
    })

    console.log("values", values)

    let score = 0

    //Jacks or better
    const betterIndexes = [0, 9, 10, 11, 12]
    values.forEach((value, index) => {
      if ( betterIndexes.includes(index) && value > 0 ) {
        scoreIndex = 8
      }
    })

    //2 pairs
    let pairs = 0
    values.forEach(value => {
      if (value === 2) {
        pairs += 1
      }
    })
    if (pairs === 2) {
      scoreIndex = 7
    }

    //3 and 4 of a kind
    values.forEach(value => {
      if (value === 3) {
        scoreIndex = 6
      } else if (value === 4) {
        scoreIndex = 2
      }
    })

    //full house
    let fullHouse = 0
    values.forEach(value => {
      if (value === 2) {
        fullHouse += 1
      }

      if (value === 3) {
        fullHouse += 1
      }
    })
    if (fullHouse === 2) {
      scoreIndex = 3
    }

    //flush (cards in same suit)
    const suit = Math.floor(table[0] / 13)
    let sameSuit = true
    table.forEach(card => {
      if (Math.floor(card / 13) != suit) {
        sameSuit = false
      }
    });
    if (sameSuit === true) {
      scoreIndex = 4
    }

    //straight (cards in order, suit irrelevant)
    let straights = 0
    values.forEach(value => {
      if (value === 1) {
        straights += 1
        if (straights === 5 || (values[0] === 1 && values[9] === 1 && values[10] === 1 && values[11] === 1 && values[12] === 1 )) {
          scoreIndex = 5

          //straight flush (straight in same suit)
          const suit = Math.floor(table[0] / 13)
          let sameSuit = true
          table.forEach(card => {
            if (Math.floor(card / 13) != suit) {
              sameSuit = false
            }
          })
          if (sameSuit === true) {
            scoreIndex = 1
          }
        }
      } else {
        straights = 0
      }
    })

    //royal flush (straight: 0, 9, 10, 11, 12 in same suit)
    if (values[0] === 1 && values[9] === 1 && values[10] === 1 && values[11] === 1 && values[12] === 1 ) {
      const suit = Math.floor(table[0] / 13)
      let sameSuit = true
      table.forEach(card => {
        if (Math.floor(card / 13) != suit) {
          sameSuit = false
        }
      });
      if (sameSuit === true) {
        scoreIndex = 0
      } 
    }
    score = scores[scoreIndex]
    console.log("score", score, scoreIndex)
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
      <button on:click={resetBet} class="btn redBorder">Reset Bet</button>
    </div>
    <div style="width: 227px; text-align: center;">
      <button on:click={bet1} class="btn redBorder">Bet 1</button>
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