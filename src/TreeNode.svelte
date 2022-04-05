<script>
    import {fly} from 'svelte/transition';

    import Icon from 'svelte-icons-pack/Icon.svelte';
    import FaSolidFolder from 'svelte-icons-pack/fa/FaSolidFolder';
    import FaSolidCaretRight from 'svelte-icons-pack/fa/FaSolidCaretRight';

    import {formatBytes} from './utils';
    import TreeChildren from './TreeChildren.svelte';
    import {fileAnnotation} from './store';

    const PARADE = "https://parade-crossfilter.netlify.app/?csv=https://idr.openmicroscopy.org/webclient/omero_table/";

    export let study;
    export let index;

    let open = false;

	function toggleOpen() {
		open = !open;
	}

	function handleTableClick(ann) {
        console.log('handleTableClick..', ann)
		fileAnnotation.update(() => ann);
	}
</script>


<li class="study {study["omero:childCount"] > 0 ? '' : 'noChildren'}" in:fly="{{ x: -200, duration: 500, delay: Math.min(index * 50, 600) }}">
    <div on:click={toggleOpen} class="caret">
        <Icon src={FaSolidCaretRight} size="16" className="icon-caret {open ? 'icon-open' : ''}"/>
    </div>
    <div>
        <div class="treeNode">
            <div on:click={toggleOpen} class="nodeIcon">
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
            </div>
            <div class="nodeText">
                <div class="nodeName" on:click={toggleOpen}>
                    {study.Name}
                    {#if study["omero:childCount"]}
                        ({study["omero:childCount"]})
                    {/if}
                </div>
                <ul>
                    {#each study.tables as ann}
                        <li>
                            <a on:click|preventDefault="{e => handleTableClick(ann)}" target="_blank" href="#">
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

    /* styling of icons uses global styles */
    :global(.icon-caret) {
        transition: transform 0.2s;
    }
    :global(.icon-open) {
        transform:rotate(90deg);
    }
    :global(.icon-caret) {
        cursor: pointer;
    }
    :global( .noChildren .icon-caret) {
        cursor: default;
    }
    .caret {
        padding: 0;
        margin: 0;
        margin-right: 5px;
        margin-top: 16px;
    }
    .noChildren .caret {
        visibility: hidden;
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

    .nodeIcon {
        cursor: pointer;
    }
    .noChildren .nodeIcon, .noChildren .nodeName {
        cursor: default;
    }
    .nodeText {
        text-align: left;
        padding: 5px 10px;
        /* all shrinking handled by this element */
        flex-shrink: 10000000000;
    }

    .nodeName {
        cursor: pointer;
    }

    .study span {
        color: #bbb;
    }

    li {
        list-style: none;
    }
</style>
