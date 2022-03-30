<script>
    import Icon from 'svelte-icons-pack/Icon.svelte';
    import FaSolidFolder from 'svelte-icons-pack/fa/FaSolidFolder';
    import {fly} from 'svelte/transition';

    import Nav from './Nav.svelte';
    import {getStudies} from './helpers';
    import {formatBytes} from './utils';

    const PARADE = "https://parade-crossfilter.netlify.app/?csv=https://idr.openmicroscopy.org/webclient/omero_table/";

    const promise = getStudies();
</script>

<Nav></Nav>
<main>

	<h1>IDR tables</h1>
	
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
                            ({formatBytes(ann.file.size)})
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
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		text-transform: uppercase;
		font-size: 3em;
		font-weight: 100;
        margin-top: 40px;
	}

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

    li {
        list-style: none;
    }

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>