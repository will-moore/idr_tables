
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
    <h1>
        {annotation.link.parent.name} {annotation.file.name} ID: {annotation.file.id}
    </h1>

    <button on:click={close}>X</button>

    {#if tableData}
        <OmeroTable tableData={tableData}></OmeroTable>
    {/if}
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
    overflow: auto;
}
</style>
