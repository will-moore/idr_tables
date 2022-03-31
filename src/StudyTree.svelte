<script>
    import TreeNode from './TreeNode.svelte';
    import {getStudies} from './helpers';

    const PARADE = "https://parade-crossfilter.netlify.app/?csv=https://idr.openmicroscopy.org/webclient/omero_table/";

    const promise = getStudies();
</script>

<ul>
{#await promise}
    <li>...waiting</li>
{:then data}
    {#each data as study, i}
        <TreeNode study={study} index={i}></TreeNode>
    {/each}
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
</ul>

<style>
    li {
        list-style: none;
    }
</style>
