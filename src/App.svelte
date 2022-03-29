<script>

    const BASE_URL = "https://idr.openmicroscopy.org/";

    const PARADE = "https://parade-crossfilter.netlify.app/?csv=https://idr.openmicroscopy.org/webclient/omero_table/";

    function formatBytes(bytes, decimals) {
        // https://gist.github.com/zentala/1e6f72438796d74531803cc3833c039c
        if (bytes == 0) return '0 Bytes';
        var k = 1024,
            dm = decimals || 2,
            sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
            i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

	async function getStudies() {
        let studies = await Promise.all([
            fetch(BASE_URL + "api/v0/m/projects/?childCount=true"),
            fetch(BASE_URL + "api/v0/m/screens/?childCount=true"),
        ]).then(responses =>
            Promise.all(responses.map(res => res.json()))
        ).then(([projects, screens]) => projects.data.concat(screens.data));


        studies = studies.map(study => {
            let objId = `${study["@type"].split("#")[1].toLowerCase()}-${study["@id"]}`;
            return {...study, objId, tables:[]}
        });

        studies.sort((a, b) => {
            var nameA = a.Name.toUpperCase();
            var nameB = b.Name.toUpperCase();
            return (nameA < nameB) ? -1 : 1;
        });
        
        let ids = studies.map(study => study.objId.replace("-", "="));
        const filesUrl = BASE_URL + "webclient/api/annotations/?type=file&" + ids.join('&');

        let fileAnns = await fetch(filesUrl).then(rsp => rsp.json());

        fileAnns.annotations.forEach(ann => {
            if (ann?.file?.mimetype === "OMERO.tables"){
                // find parent
                let parentId = `${ann.link.parent.class.slice(0,-1).toLowerCase()}-${ann.link.parent.id}`;
                let study = studies.find(study => study.objId === parentId);
                study.tables.push(ann);
            }
        });
        return studies;
    }

    const promise = getStudies();
</script>

<main>
	<h1>IDR tables</h1>
	
	{#await promise}
		<p>...waiting</p>
	{:then data}
		<ul>
		{#each data as study}
			<li>
                {study.Name} {study.objId} {study.tables.length}
                <ul>
                    {#each study.tables as ann}
                        <li>
                            <a target="_blank" href="{PARADE}{ann.file.id}/csv/">
                                {ann.file.name} {formatBytes(ann.file.size)}
                            </a>
                        </li>
                    {/each}
                </ul>
            </li>
		{/each}
		</ul>
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

    ul {
        width: fit-content;
        text-align: left;
    }

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>