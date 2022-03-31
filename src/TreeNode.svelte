<script>
    import {fly} from 'svelte/transition';

    import Icon from 'svelte-icons-pack/Icon.svelte';
    import FaSolidFolder from 'svelte-icons-pack/fa/FaSolidFolder';
    import FaSolidCaretRight from 'svelte-icons-pack/fa/FaSolidCaretRight';

    import {formatBytes} from './utils';

    const PARADE = "https://parade-crossfilter.netlify.app/?csv=https://idr.openmicroscopy.org/webclient/omero_table/";

    export let study;
    export let index;

    let open = false;

	function toggle() {
		open = !open;
	}
</script>


<li class="study" transition:fly="{{ x: -200, duration: 500, delay: index * 50 }}">
    <div class="caret">
        <Icon src={FaSolidCaretRight} size="16" className="icon-caret {open ? 'icon-open' : ''}"/>
    </div>
    {#if study.objId.includes('screen')}
        <Icon src={FaSolidFolder} size="50" color="rgb(80, 78, 79)"/>
    {:else}
        <Icon src={FaSolidFolder} size="50" color="rgb(131, 143, 163)"/>
    {/if}
    <div class="treeNode">
        <div on:click={toggle}>
            {study.Name}
        </div>
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

<style>

    :global(.icon-caret) {
        transition: transform 0.2s;
    }
    :global(.icon-open) {
        transform:rotate(90deg);
    }
    .caret {
        padding: 0;
        margin: 0;
        margin-right: 5px;
        margin-top: 16px;
    }
    ul {
        width: fit-content;
        text-align: left;
    }

    li.study {
        display: flex;
        flex-direction: row;
    }

    .treeNode {
        padding: 5px 10px;
    }

    .study span {
        color: #bbb;
    }

    li {
        list-style: none;
    }
</style>
