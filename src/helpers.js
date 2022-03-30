
export const BASE_URL = "https://idr.openmicroscopy.org/";

export async function getStudies() {
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