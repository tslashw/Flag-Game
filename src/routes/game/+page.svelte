<script lang="ts">
	import { onMount } from 'svelte';
	import { GameRunner } from './game.svelte';

	let game: any = {};

	onMount(() => {
		game = new GameRunner();
	});
</script>

<svelte:head>
	<title>Flag Quiz</title>
	<meta name="description" content="A flag quiz" />
</svelte:head>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Tomorrow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

<div class="test">

	<div class="quiz">
		{#if !game.gameRunning && !game.gameOver}
		<p class="main-font">blah blah blah</p>
		<button onclick={() => game.newGame()} class="answer-button main-font">START GAME</button>
		{/if}
		
		
		{#if game.gameRunning}
		
		<!-- score display -->
		<div class="score-wrapper">
			<p class="main-font">{game.progress} / {game.totalCountries}</p>
			<progress value={game.progress} max={game.totalCountries}></progress>
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
			<button onclick={() => game.checkAnswer(game.round.options[0])} class="answer-button main-font">{game.round.options[0]}</button>
			<button onclick={() => game.checkAnswer(game.round.options[1])} class="answer-button main-font">{game.round.options[1]}</button>
			<button onclick={() => game.checkAnswer(game.round.options[2])} class="answer-button main-font">{game.round.options[2]}</button>
		</div>
		
		{:else if game.gameOver}
		<div class="game-over">
			<h1 class="main-font">GAME OVER!</h1>
			<p class="main-font">You scored {game.score} / {game.totalCountries}</p>
			<button onclick={() => game = new GameRunner()} class="answer-button main-font">Play again</button>
		</div>
		{/if}
	</div>
	
</div>


<style>
	.test {
		background-image: url("flags/SVG/GB.svg");
		width: 100%;
		height: 100%;
	}
	.quiz {
		background-color: #252424;
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}

	.flag-wrapper {
		margin-left: 15vw;
		margin-right: 25vw;
	}

	.flag-svg {
        width: max(70vw);
		height: max(25vh);
		object-fit: fill;
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
		background-color: #4f4b4b;
		color: white;
		font-family: "Tomorrow", sans-serif;
		font-weight: 400;
		font-style: normal;
		/* border-radius: 25px; */
	}

    .score-wrapper {
        text-align: center;
        size: 200%;
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
		color: white;
		font-family: "Tomorrow", sans-serif;
  		font-weight: 400;
  		font-style: normal;
	}
</style>
