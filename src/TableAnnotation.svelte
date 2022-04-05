
<script>

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

</script>

{#if annotation}
<h1>
    {annotation.link.parent.name} {annotation.file.name} ID: {annotation.file.id}
</h1>
{/if}

{#if tableData}
    <OmeroTable tableData={tableData}></OmeroTable>
{/if}
