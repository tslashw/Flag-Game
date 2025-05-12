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

<div class="quiz">
    {#if game.gameRunning}

    <!-- score display -->
    <div class="score-wrapper">
        <p>{game.progress} / {game.totalCountries}</p>
        <progress value={game.progress} max={game.totalCountries}></progress>
        <p>SCORE: {game.score}</p>
    </div>


    <!-- Score: -->
	<div class="flag-wrapper">
		<img class="flag-svg" src={game.round.currentFlagPath} alt="flag" />
	</div>

    <!-- THIS IS FUCKING DISGUSTING PLEASE MAKE THIS BETTER SOMEHOW! -->
     <!-- Lives -->
    <div class="lives">
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
        <progress value={game.timeLeft} max={10}></progress>
		<button onclick={() => game.checkAnswer(game.round.options[0])} class="answer-button">{game.round.options[0]}</button>
        <button onclick={() => game.checkAnswer(game.round.options[1])} class="answer-button">{game.round.options[1]}</button>
        <button onclick={() => game.checkAnswer(game.round.options[2])} class="answer-button">{game.round.options[2]}</button>
	</div>

    {:else}
    <div class="game-over">
        <h1>GAME OVER!</h1>
        <p>You scored {game.score} / {game.totalCountries}</p>
    </div>
    {/if}
</div>

<style>
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
		/* border-radius: 25px; */
	}

	.answer-button:hover {
		background-color: orange;
	}

    .score-wrapper {
        text-align: center;
        size: 200%;
    }

    .lives {
        display: flex;
		flex-direction: row;
		gap: 3rem;
		max-width: 70vw;
		margin: auto auto auto auto;
    }

    .life {
        width: max(15vw);
        height: max(15vh);
    }

	p {
		color: white;
	}
</style>
