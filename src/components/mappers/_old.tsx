{/* <Table striped bordered hover>
<thead>
    <tr>
        <th>Id</th>
        <th>Ref Mere</th>
        <th>Reference</th>
        <th>EAN13</th>
        <th>Prix</th>
        <th>PVP</th>
        <th>Stock</th>
        <th>Nom</th>
        <th>Color</th>
        <th>Sizes</th>
        <th>Active</th>
    </tr>
</thead>
<tbody> 
{
    listName.length > 0
    ? 
    <>
    {listName.map((product, index) => (
            <tr key={index}>
                <td>{ index + 1 }</td>
                <td>{ product.refmere }</td>
                <td>{ product.reference }</td>
                <td>{ product.ean }</td>
                <td>{ product.prix }</td>
                <td>{ product.pvp }</td>
                <td>{ product.stock }</td>
                <td>{ product.nom }</td>
                <td>{ product.color }</td>
                <td>{ product.size }</td>
            </tr> 
        ))}
        {/* <TableFooter range={rangePagination} slice={slicePagination} setPage={setPage} page={page} /> */}
    </>
    :
    <tr>
        <td colSpan="11">
        { !products.length > 0 
            ? <span>Esperando cargar datos</span>
            : <span>Cargando datos...</span>
        }
        </td>
    </tr>
}
</tbody>
</Table> */}



<tr className="tableRowItems" key={el.id}>


                   {/* <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Art. Id</th>
                            <th>Art. Num</th>
                            <th>EAN13</th>
                            <th>Nombre</th>
                            <th>Talla</th>
                            <th>Color</th>
                            <th>Stock</th>
                            <th>PVP</th>
                            <th>active</th>
                        </tr>
                    </thead>
                <tbody>
                {
                    listName.length
                    ?
                    listName.map((product, index) => (
                        <tr key={index}>
                            <td>{ index + 1 }</td>
                            <td>{ product.ArtikelId }</td>
                            <td>{ product.Artikelnr }</td>
                            <td>{ product.EAN }</td>
                            <td>{ product.Artikelbezeichnung }</td>
                            <td>{ product.MM1 }</td>
                            <td>{ product.MM2 }</td>
                            <td>{ product.Bestand }</td>
                            <td>{ product.pvp }</td>
                            <td>{ product.active }</td>
                        </tr> 
                    ))
                    :
                    <tr>
                        <td colSpan="11">
                        { !products.length > 0 
                            ? <span>Esperando cargar datos</span>
                            : <span>Cargando datos...</span>
                        }
                        </td>
                    </tr>
            }
        </tbody>
    </Table> */}

<Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Id</th>
                            <th>Ref Mere</th>
                            <th>reference</th>
                            <th>ean13</th>
                            <th>prix</th>
                            <th>pvp</th>
                            <th>stock</th>
                            <th>nom</th>
                            <th>color</th>
                            <th>sizes</th>
                            <th>active</th>
                        </tr>
                    </thead>
                    <tbody>      
                        {
                            listName.length
                            ?
                            listName.map((product, index) => (
                                <tr key={index}>
                                    <td>{ index + 1 }</td>
                                    <td>{ product.refmere }</td>
                                    <td>{ product.reference }</td>
                                    <td>{ product.ean }</td>
                                    <td>{ product.prix }</td>
                                    <td>{ product.pvp }</td>
                                    <td>{ product.stock }</td>
                                    <td>{ product.nom }</td>
                                    <td>{ product.color }</td>
                                    <td>{ product.size }</td>
                                    <td>{ product.active }</td>
                                </tr> 
                            ))
                            :
                            <tr>
                                <td colSpan="12">
                                { !products.length > 0 
                                    ? <span>Esperando cargar datos</span>
                                    : <span>Cargando datos...</span>
                                }
                                </td>
                            </tr>
                        }
                    </tbody>
                </Table>