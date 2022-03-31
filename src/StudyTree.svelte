<script>
    import Icon from 'svelte-icons-pack/Icon.svelte';
    import FaSolidFolder from 'svelte-icons-pack/fa/FaSolidFolder';
    import {fly} from 'svelte/transition';

    import {getStudies} from './helpers';
    import {formatBytes} from './utils';

    const PARADE = "https://parade-crossfilter.netlify.app/?csv=https://idr.openmicroscopy.org/webclient/omero_table/";

    const promise = getStudies();
</script>

<ul>
{#await promise}
    <li>...waiting</li>
{:then data}
    {#each data as study, i}
        <li class="study" transition:fly="{{ x: -200, duration: 500, delay: i * 50 }}">
            {#if study.objId.includes('screen')}
                <Icon src={FaSolidFolder} size="50" color="rgb(80, 78, 79)"/>
            {:else}
                <Icon src={FaSolidFolder} size="50" color="rgb(131, 143, 163)"/>
            {/if}
            <div>
            {study.Name}
            <ul>
                {#each study.tables as ann}
                    <li>
                        <a target="_blank" href="{PARADE}{ann.file.id}/csv/">
                            {ann.file.name}
                        </a>
                        <span>({formatBytes(ann.file.size)})</span>
                    </li>
                {/each}
            </ul>
            </div>
        </li>
    {/each}
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
</ul>

<style>
    ul {
        width: fit-content;
        text-align: left;
    }

    li.study {
        display: flex;
        flex-direction: row;
    }

    .study div {
        padding: 5px 10px;
    }

    .study span {
        color: #bbb;
    }

    li {
        list-style: none;
    }
</style>
