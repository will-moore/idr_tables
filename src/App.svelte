<script>
    import Nav from './Nav.svelte';
    import StudyTree from './StudyTree.svelte';
</script>

<Nav></Nav>
<main>

	<h1>IDR tables</h1>
	
    <StudyTree></StudyTree>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	h1 {
		text-transform: uppercase;
		font-size: 3em;
		font-weight: 100;
        margin-top: 40px;
	}

	/* @media (min-width: 640px) {
		main {
			max-width: none;
		}
	} */
</style>