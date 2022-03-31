<script>
    import {fly} from 'svelte/transition';

    import Icon from 'svelte-icons-pack/Icon.svelte';
    import FaSolidFolder from 'svelte-icons-pack/fa/FaSolidFolder';
    import FaSolidCaretRight from 'svelte-icons-pack/fa/FaSolidCaretRight';

    import {formatBytes} from './utils';
    import TreeChildren from './TreeChildren.svelte';

    const PARADE = "https://parade-crossfilter.netlify.app/?csv=https://idr.openmicroscopy.org/webclient/omero_table/";

    export let study;
    export let index;

    let open = false;

	function toggle() {
		open = !open;
	}
</script>


<li class="study" in:fly="{{ x: -200, duration: 500, delay: index * 50 }}">
    <div class="caret">
        <Icon src={FaSolidCaretRight} size="16" className="icon-caret {open ? 'icon-open' : ''} {study["omero:childCount"] > 0 ? '' : 'hidden'}"/>
    </div>
    <div>
        <div class="treeNode">
            {#if study.objId.includes('screen')}
                <Icon src={FaSolidFolder} size="50" color="rgb(80, 78, 79)"/>
            {:else if study.objId.includes('project')}
                <Icon src={FaSolidFolder} size="50" color="rgb(131, 143, 163)"/>
            {:else if study.objId.includes('plate')}
                <Icon src={FaSolidFolder} size="50" color="rgb(51, 53, 57)"/>
            {:else if study.objId.includes('dataset')}
                <Icon src={FaSolidFolder} size="50" color="rgb(156, 178, 132)"/>
            {:else}
                <Icon src={FaSolidFolder} size="50" color="rgb(226, 226, 227)"/>
            {/if}
            <div class="nodeName">
                <div on:click={toggle}>
                    {study.Name}
                    {#if study["omero:childCount"]}
                        ({study["omero:childCount"]})
                    {/if}
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
        </div>
        <div>
            {#if open && study["omero:childCount"] > 0}
                <TreeChildren parent={study}></TreeChildren>
            {/if}
        </div>
    </div>
</li>

<style>

    :global(.icon-caret) {
        transition: transform 0.2s;
    }
    :global(.icon-open) {
        transform:rotate(90deg);
    }
    :global(.hidden) {
        visibility: hidden;
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
        display: flex;
        flex-direction: row;
    }
    .nodeName {
        padding: 5px 10px;
    }

    .study span {
        color: #bbb;
    }

    li {
        list-style: none;
    }
</style>
