
<script>

    // column_types, columns, rows, name, id, path
    export let tableData;

</script>

<table>
    <thead>
        {#each tableData.columns as column}
            <th>{column}</th>
        {/each}
    </thead>
    <tbody>
        {#each tableData.rows as rowData}
        <tr>
            {#each rowData as value}
                <td>{value}</td>
            {/each}
        </tr>
        {/each}
    </tbody>
</table>

<style>
    table {
        border-collapse: collapse;
        border-spacing: 0;
        position: relative;
        margin: 0 10px;
    }

    th, td {
        font-size: 0.9em;
    }
    th {
        font-weight: 400;
        position: sticky;
        top: 0;
        background: white;
        padding: 5px;
    }
    td {
        border: solid #ddd 1px;
        padding: 5px;
        font-weight: 300;
    }
</style>
