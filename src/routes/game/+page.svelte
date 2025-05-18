<script lang="ts">
	import { getAllContexts, onMount } from 'svelte';
	import { GameRunner } from './game.svelte';

	let game: any = {};

	onMount(() => {
		let game;
	});
</script>

<svelte:head>
	<title>Flag Quiz</title>
	<meta name="description" content="A flag quiz" />
</svelte:head>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Tomorrow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">


<!-- MAIN MENU: -->
{#if !game.gameRunning && !game.gameOver}
<div class="main-menu">
	<h1 class="main-font">Untitled Flag Game</h1>
	<div class="continent-buttons">
		<button onclick={() => game = new GameRunner("world")} class="answer-button main-font">WHOLE WORLD</button>
		<button onclick={() => game = new GameRunner("asia")} class="answer-button main-font">ASIA</button>
		<button onclick={() => game = new GameRunner("europe")} class="answer-button main-font">EUROPE</button>
	</div>
	<p>Game created by Tommy Wilson</p>
</div>
{/if}

{#if game.gameRunning}
<div class="game-background" style="background-image: url({game.round.currentFlagPath})">

	<div class="game">

		<!-- score display -->
		<div class="score-wrapper">
			<p class="main-font">{game.progress} / {game.totalCountries}</p>
			<!-- <progress value={game.progress} max={game.totalCountries}></progress> -->
			<p class="main-font">SCORE: {game.score}</p>
		</div>
		
		
		<!-- Score: -->
		<div class="flag-wrapper">
			<img class="flag-svg" src={game.round.currentFlagPath} alt="flag" />
		</div>
		
		<!-- THIS IS FUCKING DISGUSTING PLEASE MAKE THIS BETTER YOU FOOL! -->
		<!-- Lives -->
		<div class="lives">
			{#if game.lives == 5}
			<img class="life" src="heart-svgrepo-com.svg" alt="life" />
			<img class="life" src="heart-svgrepo-com.svg" alt="life" />
			<img class="life" src="heart-svgrepo-com.svg" alt="life" />
			<img class="life" src="heart-svgrepo-com.svg" alt="life" />
			<img class="life" src="heart-svgrepo-com.svg" alt="life" />
			{/if}
			{#if game.lives == 4}
			<img class="life" src="heart-svgrepo-com.svg" alt="life" />
			<img class="life" src="heart-svgrepo-com.svg" alt="life" />
			<img class="life" src="heart-svgrepo-com.svg" alt="life" />
			<img class="life" src="heart-svgrepo-com.svg" alt="life" />
			{/if}
			{#if game.lives == 3}
			<img class="life" src="heart-svgrepo-com.svg" alt="life" />
			<img class="life" src="heart-svgrepo-com.svg" alt="life" />
			<img class="life" src="heart-svgrepo-com.svg" alt="life" />
			{/if}
			{#if game.lives == 2}
			<img class="life" src="heart-svgrepo-com.svg" alt="life" />
			<img class="life" src="heart-svgrepo-com.svg" alt="life" />
			{/if}
			{#if game.lives == 1}
			<img class="life" src="heart-svgrepo-com.svg" alt="life" />
			{/if}
		</div>
		
		
		<!-- Answers: -->
		<div class="answer-menu">
			<!-- <progress value={game.timeLeft} max={10}></progress> -->
			<button onclick={() => game.checkAnswer(game.round.options[0].name)} class="answer-button main-font">{game.round.options[0].name}</button>
			<button onclick={() => game.checkAnswer(game.round.options[1].name)} class="answer-button main-font">{game.round.options[1].name}</button>
			<button onclick={() => game.checkAnswer(game.round.options[2].name)} class="answer-button main-font">{game.round.options[2].name}</button>
		</div>
			
	</div>

</div>
{/if}

{#if game.gameOver}
<div class="game-over">
	<h1 class="main-font">GAME OVER!</h1>
	<p class="main-font">You scored {game.score} / {game.totalCountries}</p>
	<button onclick={() => game = new GameRunner()} class="answer-button main-font">Play again</button>
</div>
{/if}

<style>

	.main-menu {
		display: flex;
		align-items: center;
		flex-direction: column;
		
	}

	.continent-buttons {
		margin-bottom: 80vw;
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 2rem;
	}

	.main-menu button {
		min-width: 50vw;
		border: solid black 5px;
	}

	.game-background {
		background-color: white;
		position: fixed;
		height: 100vh;
		width: 100vw;
		left: 0;
		top: 0;
	}

	.game {
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		border: 2px solid white;
		border-radius: 2rem;
		width: 95vw;
		height: 95vh;
		margin: 1rem auto;
		box-sizing: border-box;
		overflow: hidden;
	}

	.flag-wrapper {
		/*
		margin-left: 15vw;
		margin-right: 25vw;
		*/
		display: flex;
		align-items: center;
		flex-direction: column;
		
		
	}

	.flag-svg {
        width: max(70vw);
		height: max(25vh);
		box-shadow: 0 0 50px rgba(0, 0, 0, 0.905);
		object-fit: cover;
		overflow: hidden;

	}

	.answer-menu {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		max-width: 75vw;
		margin: 0rem auto auto auto;
		padding-bottom: 2rem;
	}

	.answer-button {
		padding: 1rem;
		font-size: 1rem;
		cursor: pointer;
		background-color: #ffffff;
		color: rgb(0, 0, 0);
		font-family: "Tomorrow", sans-serif;
		font-weight: 400;
		font-style: normal;
		border-radius: 1rem;
	}

    .score-wrapper {
        text-align: center;
        /* size: 200%; */
		width: 50%;
		margin-left: 25%;
		margin-bottom: 0.5rem;
		margin-top: 0.5rem;
		background-color: white;
		border-radius: 1rem;
		padding: 0.5rem 0 0.5rem 0;
    }

    .lives {
        display: flex;
		flex-direction: row;
		justify-content: center;
		gap: 1rem;
		max-width: 95vw;
		margin: auto auto auto auto;
    }

    .life {
        width: max(10vw);
        height: max(10vh);
    }

	.main-font {
		color: black;
		font-family: "Tomorrow", sans-serif;
  		font-weight: 400;
  		font-style: normal;
	}

	.game-over {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

</style>
