<script>
	let { showModal = $bindable(), header, children, bgColor} = $props();

	let dialog = $state(); // HTMLDialogElement


	$effect(() => {
		if (showModal) dialog.showModal();
	});
</script>


<dialog
	bind:this={dialog}
	onclose={() => (showModal = false)}
	onclick={() => dialog.close()}
    style="background-color: {bgColor}"
>
	<div>
		{@render header?.()}
		<hr style="color: white;"/>
		{@render children?.()}
	</div>
</dialog>

<style>
	dialog {
		max-width: 75vw;
        min-width: 75vw;
        min-height: 25vh;
        position: absolute;
		border-radius: 1rem;
        border: solid black 5px;
        outline: none !important;
		padding: 0;
        color: white;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.69);
	}
	dialog > div {
		padding: 1em;
	}
	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}
	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
