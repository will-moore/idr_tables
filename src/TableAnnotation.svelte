
<script>

    import { fly } from 'svelte/transition';
    import {getJson} from './helpers';
    import OmeroTable from './OmeroTable.svelte';

    import {fileAnnotation} from './store.js';

    let annotation;
    let tableData;

    fileAnnotation.subscribe(async function(value) {
        if (!value) {
            return;
        }
        annotation = value;
        // clear previous table data
        tableData = undefined;
		
        // load table data
        let tableId = annotation.file.id;
        const BASE_URL = "https://idr.openmicroscopy.org/";
        let url = BASE_URL + `webclient/omero_table/${tableId}/json/?limit=100`;

        const data = await getJson(url);
        tableData = data.data;
	});

    function close() {
        annotation = undefined;
        tableData = undefined;
    }

</script>

{#if annotation}
<section transition:fly="{{ y: 200, duration: 1000 }}">
    <div>
        <h2>
            {annotation.link.parent.name} {annotation.file.name} ID: {annotation.file.id}
        </h2>
        <button on:click={close}>X</button>
    </div>

    <div class="table">
        {#if tableData}
            <OmeroTable tableData={tableData}></OmeroTable>
        {/if}
    </div>
</section>
{/if}

<style>
section {
    border-top: 1px solid #ddd;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 75%;
    background: white;
    display: flex;
    flex-direction: column;
}

div {
    width: 100%;
}

.table {
    flex: 1;
    overflow: auto;
}

h2 {
    margin: 5px;
    font-size: 1.25em;
    font-weight: 200;
}

button {
    position: absolute;
    right: 0;
    top: 0;
}

</style>
