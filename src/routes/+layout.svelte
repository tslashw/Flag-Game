<script lang="ts">
	// import '../app.css';

	let { children } = $props();
</script>

<head>
	<meta charset="UTF-8" />
</head>

<div class="app">

	<main>
		{@render children()}
	</main>

	<!-- <footer> -->
	<!-- 	<p> -->
	<!-- 		This is a footer -->
	<!-- 	</p> -->
	<!-- </footer> -->
</div>


<style>
	.app {
		padding: 0;
		margin: 0;
	}
</style>