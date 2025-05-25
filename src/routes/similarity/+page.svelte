<script lang="ts">
    import similarity from "$lib/data/similarity/similarity.json"
    import similarity_histogram from "$lib/data/similarity/similarity_histogram.json"
    import similarity_deep from "$lib/data/similarity/similarity_deep.json"

    let data = similarity_deep;


    let switchAlgo = (algo:string) => {
        if (algo == "resnet-50") {
            data = similarity;
        }
        if (algo == "histogram") {
            data = similarity_histogram;
        }
    }
</script>

<svelte:head>
	<title>Flag Game</title>
	<meta name="description" content="A flag quiz game" />
</svelte:head>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Tomorrow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

<!--
    <div class="algo-selector">
        <button onclick={() => switchAlgo("resnet-50")}>ResNet-50</button>
        <button onclick={() => switchAlgo("histogram")}>Histogram</button>
    </div>
-->


<div class="grid-table">
    {#each Object.entries(data) as [outerKey, innerObj]}
        <div class="cell left"><img src="flags/4x3/{outerKey}" alt="flag"/></div>
        <div class="cell right">
            {#each Object.entries(innerObj) as [innerKey, value]}
                <img src="flags/4x3/{innerKey}" alt="flag"/><br>
            {/each}
        </div>
    {/each}
</div>



<style>
    .grid-table {
        display: grid;
        grid-template-columns: 200px 1fr;
        gap: 0.5rem;
        align-items: start;
    }

    .cell {
        padding: 0.5rem;
        border-bottom: 1px solid #ccc;
    }

    .left {
        font-weight: bold;
        background-color: #f0f0f0;
    }

    .right {
        white-space: pre-line;
        display: flex;
        flex-direction: row;
    }

    .algo-selector {
        display: flex;
        align-items: center;
        margin-bottom: 5rem;
    }

    img {
        max-width: 10vw;
    }
</style>