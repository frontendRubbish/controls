<script lang="ts">
  import { inputStatus } from './stores.js';

  import { onMount } from 'svelte';
  
  const fps = 60
  const fpsInterval = 1000 / fps
  let gamepad: Gamepad;
  let then = 0;

  function gameLoop(): void {
    const now = Date.now();
    let delta = now - then;
 
  if (delta > fpsInterval) {
    then = now - (delta % fpsInterval);
    gamepad = getGamepad();
    if (gamepad) {
      inputStatus.set({
        up: checkButton(gamepad, 12),
        right:  checkButton(gamepad, 15),
        down:  checkButton(gamepad, 13),
        left: checkButton(gamepad, 14),
        buttonA: checkButton(gamepad, 0),
        buttonB: checkButton(gamepad, 1),
        buttonX: checkButton(gamepad, 2),
        buttonY: checkButton(gamepad, 3),
      });
    }
  }
  requestAnimationFrame(gameLoop)
}

function checkButton(gamepad: Gamepad, buttonIdx: number): boolean {
  let button = gamepad.buttons[buttonIdx];
  return button.pressed;
}

function getGamepad(): Gamepad {
  const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
  return gamepads[0]
}

  function connecthandler(event): void {
    gamepad = event.gamepad;
  }

  function addConnectListener(): void {
    window.addEventListener('gamepadconnected', connecthandler);
  }

  onMount(() => {
    addConnectListener();   
    then = Date.now();
    requestAnimationFrame(gameLoop);
  });

</script>

<div class="controller-view">
  <div class="direction-display">
    <div class="{ $inputStatus.up ? 'control control--active': 'control' }">

    </div>
    <div style="display: flex;">
      <div class="{ $inputStatus.left ? 'control control--active': 'control' }">
      
      </div>
      <div class="{ $inputStatus.right ? 'control control--active': 'control' }">
        
      </div>
      
    </div>
    <div class="{ $inputStatus.down ? 'control control--active': 'control' }">
      
    </div>
  </div>

  <div class="direction-display">
    <div class="{ $inputStatus.buttonY ? 'control control--active': 'control control--yellow' }">

    </div>
    <div style="display: flex;">
      <div class="{ $inputStatus.buttonX ? 'control control--active': 'control control--blue' }">
      
      </div>
      <div class="{ $inputStatus.buttonB ? 'control control--active': 'control control--red' }">
        
      </div>
      
    </div>
    <div class="{ $inputStatus.buttonA ? 'control control--active': 'control control--green' }">
      
    </div>
  </div>
</div>

<style>
  .controller-view {
    border: 1px solid black;
    display: flex;
    height: 120px;
    position: fixed;
    width: 240px;
    right: 0;
    top: 0;
  }

  .direction-display {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
  }

  .control {
    background-color: grey;
    height: 20px;
    margin: 10px;
    width: 20px;
  }

  .control--green {
    background-color: green;
  }

  .control--red {
    background-color: red;
  }

  .control--blue {
    background-color: blue;
  }

  .control--yellow {
    background-color: yellow;
  }

  .control--active {
    background-color: pink;
  }
</style>