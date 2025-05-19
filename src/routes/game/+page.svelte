<script lang="ts">
	import { getAllContexts, onMount } from 'svelte';
	import { GameRunner } from './game.svelte';
    import ResponseModal from './ResponseModal.svelte';

	let game: any = $state({});

	let showModal = $state(false);
	let modalColor = $state("");
	let answerResponse = $state({
            "correct": false,
            "funFacts": {
                "capital" : ""
            }
		});

	onMount(() => {
		let game;
	});

	let evaluateAnswer = (answer:string) => {
		answerResponse = game.checkAnswer(answer);
		if (answerResponse.correct) {
			modalColor = "green";
		}
		else {
			modalColor = "red";
		}
		showModal = true;
	}

	let resetGame = () => {
		game.gameRunning = false;
		game.gameOver = false;
		game = "";
	}
</script>

<svelte:head>
	<title>Flag Game</title>
	<meta name="description" content="A flag quiz game" />
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
		<button onclick={() => game = new GameRunner("north-america")} class="answer-button main-font">NORTH AMERICA</button>
		<button onclick={() => game = new GameRunner("south-america")} class="answer-button main-font">SOUTH AMERICA</button>
		<button onclick={() => game = new GameRunner("oceania")} class="answer-button main-font">OCEANIA</button>
		<button onclick={() => game = new GameRunner("africa")} class="answer-button main-font">AFRICA</button>
		<button onclick={() => game = new GameRunner("easy")} class="answer-button main-font">EASY MODE</button>
	</div>
	<p class="main-font">Game created by Tommy Wilson</p>
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
			<img class="life" src="heart.svg" alt="life" />
			<img class="life" src="heart.svg" alt="life" />
			<img class="life" src="heart.svg" alt="life" />
			<img class="life" src="heart.svg" alt="life" />
			<img class="life" src="heart.svg" alt="life" />
			{/if}
			{#if game.lives == 4}
			<img class="life" src="heart.svg" alt="life" />
			<img class="life" src="heart.svg" alt="life" />
			<img class="life" src="heart.svg" alt="life" />
			<img class="life" src="heart.svg" alt="life" />
			{/if}
			{#if game.lives == 3}
			<img class="life" src="heart.svg" alt="life" />
			<img class="life" src="heart.svg" alt="life" />
			<img class="life" src="heart.svg" alt="life" />
			{/if}
			{#if game.lives == 2}
			<img class="life" src="heart.svg" alt="life" />
			<img class="life" src="heart.svg" alt="life" />
			{/if}
			{#if game.lives == 1}
			<img class="life" src="heart.svg" alt="life" />
			{/if}
		</div>
		
		
		<!-- Answers: -->
		<div class="answer-menu">
			<!-- <progress value={game.timeLeft} max={10}></progress> -->
			<button onclick={() => evaluateAnswer(game.round.options[0].name)} class="answer-button main-font">{game.round.options[0].name}</button>
			<button onclick={() => evaluateAnswer(game.round.options[1].name)} class="answer-button main-font">{game.round.options[1].name}</button>
			<button onclick={() => evaluateAnswer(game.round.options[2].name)} class="answer-button main-font">{game.round.options[2].name}</button>
		</div>
			
	</div>

</div>
{/if}

{#if game.gameOver}
<div class="game-over">
	<h1 class="main-font">GAME OVER!</h1>
	<p class="main-font">You scored {game.score} / {game.totalCountries}</p>
	{#if game.score == game.totalCountries}
	<p class="main-font">You got them all correct! That is amazing!</p>
	{/if}
	<button onclick={() => resetGame()} class="answer-button main-font">Play again</button>
</div>
{/if}


<!-- Response Modal: -->
<ResponseModal bind:showModal bgColor={modalColor}>
	{#snippet header()}
		{#if answerResponse.correct}
		<h2>
			Correct!
		</h2>
		{:else if !answerResponse.correct}
		<h2> Incorrect!</h2>
		{/if}
	{/snippet}
	
	{#snippet children()}
	{#if answerResponse.correct}
	<h2>Fun Facts:</h2>
	<p>Capital City: {answerResponse.funFacts.capital}</p>
	<hr style="color: white;"/>
	{/if}
	{#if !answerResponse.correct}
	<p>The correct answer was {answerResponse.answer}</p>
	{/if}
	{/snippet}

</ResponseModal>

<style>
	body {
		background-color: white;
	}

	.main-menu {
		display: flex;
		align-items: center;
		flex-direction: column;
		
	}

	.continent-buttons {
		margin-bottom: 5vh;
		display: flex;
		align-items: center;
		flex-direction: column;
		gap: 1rem;
	}

	.main-menu button {
		min-width: 50vw;
		border: solid black 5px;
	}

	.game-background {
		background-color: white;
		background-size: contain;
		background-repeat: repeat;
		position: fixed;
		height: 100vh;
		width: 100vw;
		left: 0;
		top: 0;
	}

	.game {
		-webkit-backdrop-filter: blur(10px);
		backdrop-filter: blur(10px);
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
		justify-content: center;
		align-items: center;
		flex-direction: column;
		
		
	}


	/* ‼️ THESE MEDIA QUERIES MAY NOT BE NEEDED AND CAN DEFFO BE CLEANED UP! PLEASE GO OVER THIS AT SOME POINT ‼️ */
	@media (width <= 600px){
		.flag-svg {
			width: max(auto, 75vw);
			height: max(25vh);
			box-shadow: 0 0 50px rgba(0, 0, 0, 0.905);
			object-fit: contain;
			overflow: hidden;
			
		}
		.lives {
			display: flex;
			flex-direction: row;
			justify-content: center;
			gap: 1rem;
			max-width: 95vw;
		}

		.life {
			width: 10vw;
			height: 10vh;
			object-fit: contain;
			animation: 1.5s ease 0s infinite beat;
		}
	}
	@media (width >= 600px) {
		.flag-svg {
			width: max(auto, 75vw);
			height: max(35vh);
			box-shadow: 0 0 50px rgba(0, 0, 0, 0.905);
			object-fit: contain;
			overflow: hidden;
			background-color: rgba(255, 255, 255, 0);
			
		}
		.lives {
			display: flex;
			flex-direction: row;
			justify-content: center;
			gap: 1rem;
			max-width: 95vw;
			margin-top: 1em;
			margin-bottom: 1em;
		}

		.life {
			width: min(10vw, 7vw);
			height: min(10vh, 7vh);
			object-fit: contain;
			animation: 1.5s ease 0s infinite beat;
		}
		.main-font {
			color: black;
			font-family: "Tomorrow", sans-serif;
			font-weight: 400;
			font-style: normal;
			font-size: x-large;
		}
		.answer-button {
			padding: 2rem;
			font-size: 1rem;
			cursor: pointer;
			background-color: #ffffff;
			color: rgb(0, 0, 0);
			font-family: "Tomorrow", sans-serif;
			font-weight: 400;
			font-style: normal;
			border: solid black 5px;
			border-radius: 1rem;
			box-shadow: 0 0 50px rgba(0, 0, 0, 0.905);
		}
		.answer-menu {
			display: flex;
			flex-direction: column;
			gap: 2rem;
			max-width: 10%;
			margin: 0rem auto auto auto;
			padding-bottom: 2rem;
		}
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
		padding: 0.5rem;
		font-size: 1rem;
		cursor: pointer;
		background-color: #ffffff;
		color: rgb(0, 0, 0);
		font-family: "Tomorrow", sans-serif;
		font-weight: 400;
		font-style: normal;
		border: solid black 5px;
		border-radius: 1rem;
		box-shadow: 0 0 50px rgba(0, 0, 0, 0.905);
	}

    .score-wrapper {
        text-align: center;
        /* size: 200%; */
		width: 50%;
		margin-left: 25%;
		margin-bottom: 0.5rem;
		margin-top: 0.5rem;
		background-color: white;
		border: solid black 5px;
		border-radius: 1rem;
    }




	@media (height <= 550px) {
		.main-font {
			color: black;
			font-family: "Tomorrow", sans-serif;
			font-weight: 400;
			font-style: normal;
			font-size: small;
		}
	}
	@media (height >= 550px) {
		.main-font {
			color: black;
			font-family: "Tomorrow", sans-serif;
			font-weight: 400;
			font-style: normal;
			font-size: large;
		}
	}

	.game-over {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	/* ANIMATIONS: */

	@keyframes beat {
		0%, 50%, 100% { transform: scale(1, 1); }
		30%, 80% { transform: scale(0.92, 0.95); }
	}

</style>
