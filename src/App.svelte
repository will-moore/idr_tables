<script>
    import Nav from './Nav.svelte';
    import TreeChildren from './TreeChildren.svelte';
    import TableAnnotation from './TableAnnotation.svelte';
</script>


<main>
    <nav>
        <Nav></Nav>
    </nav>
    <section class="treeSection">
        <h1>IDR tables</h1>
        <TreeChildren></TreeChildren>
    </section>
    <TableAnnotation></TableAnnotation>
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
        overflow: auto;
        width: 100%;
        flex: 1;
        padding: 1em;
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