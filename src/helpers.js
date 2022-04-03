
export const BASE_URL = "https://idr.openmicroscopy.org/";

export async function getStudies(parent) {
    let studies = []
    if (!parent) {
        // No parent - load top-level Projects & Screens
        studies = await Promise.all([
            fetch(BASE_URL + "api/v0/m/projects/?childCount=true"),
            fetch(BASE_URL + "api/v0/m/screens/?childCount=true"),
        ]).then(responses =>
            Promise.all(responses.map(res => res.json()))
        ).then(([projects, screens]) => projects.data.concat(screens.data));
    } else {
        let url;
        if (parent['@type'].includes("Project")) {
            url = BASE_URL + `api/v0/m/projects/${parent["@id"]}/datasets/?childCount=true`
        } else if (parent['@type'].includes("Screen")) {
            url = BASE_URL + `api/v0/m/screens/${parent["@id"]}/plates/?childCount=true`
        } else if (parent['@type'].includes("Dataset")) {
            url = BASE_URL + `api/v0/m/datasets/${parent["@id"]}/images/`
        }
        studies = await fetch(url).then(rsp => rsp.json()).then(result => result.data);
    }

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


export async function getJson(url) {
    return await fetch(url).then(rsp => rsp.json());
} 