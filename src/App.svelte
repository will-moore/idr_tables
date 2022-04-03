<script>
    import Nav from './Nav.svelte';
    import TreeChildren from './TreeChildren.svelte';
    import TableAnnotation from './TableAnnotation.svelte';

    let annotationObj;

    function setTableId(event) {
		console.log('tableId', event.detail)
        annotationObj = event.detail.annotation;
	}
</script>


<main>
    <nav>
        <Nav></Nav>
    </nav>
    <section class="treeSection">
        <h1>IDR tables</h1>
        <TreeChildren on:tableclick={setTableId}></TreeChildren>
    </section>
    <section>
        {#if annotationObj}
        <TableAnnotation annotation={annotationObj}></TableAnnotation>
        {/if}
    </section>
</main>

<style>
	main {
        display: flex;
        flex-direction: column;
        height: 100%;
	}

    nav {
        height: 48px;
        margin: 0;
        padding: 0;
    }

    section {
        flex: 1;
        overflow: auto;
        width: 100%;
    }

    .treeSection {
        text-align: center;
		padding: 1em;
		margin: 0 auto;
        border-bottom: 1px solid #ddd;
    }

	h1 {
		text-transform: uppercase;
		font-size: 3em;
		font-weight: 100;
	}

	/* @media (min-width: 640px) {
		main {
			max-width: none;
		}
	} */
</style>