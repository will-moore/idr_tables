
<script>

    import {getJson} from './helpers';
    import OmeroTable from './OmeroTable.svelte';

    export let annotation;

    let tableId = annotation.file.id;
    const BASE_URL = "https://idr.openmicroscopy.org/";
    let url = BASE_URL + `webclient/omero_table/${tableId}/json/?limit=100`;

    const promise = getJson(url);
</script>

<h1>
    {annotation.file.name} ID: {annotation.file.id}
</h1>

{#await promise}
    <li>loading table...</li>
{:then data}
    <OmeroTable tableData={data.data}></OmeroTable>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
