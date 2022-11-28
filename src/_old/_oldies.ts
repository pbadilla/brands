const originReference = item.refmere.replace(/[-]/g, "");
const itemReference =  item.reference.replace(/[-]/g, "");

sameProduct.map((item, index) => {
    const groupString = findDiff(item, sameProduct[index+1]);
    console.log('%cugroupString', 'color: #007acc;', groupString);
  })


export function extracSameProduct(reference:string) {

}

    // console.log('%cproductsList', 'color: #007acc;', productsList);

    // const mapped = products.map((item, index) => ({
    //   ...item,
    //   ean13: JSON.stringify(item.ean),
    //   description: '',
    //   stock: item.stock === 0 ? null : item.stock,
    //   pvp: parseFloat(item.prix * 2.01).toFixed(2),
    //   color: allColors[index],
    //   size: allSizes[index],
    //   active: 0
    // }))

    // //   const transformProduct = (arrayReferences: Object) => {
//     const allReferences: any[] = []
//     const refsMere: any[] = []
//     const references: any[] = []

//     arrayReferences.map((item, index: number) => {
//       allReferences.push(item.reference)
//       refsMere.push(item.refmere)
//       references.push(item.reference)
//     })
//     sizeOfProducts(allReferences, arrayReferences);
//   }

//   const sizeOfProducts = (arrayReferences: string[], allReferences: []) => {
//     const allSizes: any[] | ((prevState: never[]) => never[]) = []
//     const allColors: any[] | ((prevState: never[]) => never[]) = []

//     arrayReferences.map(item => {
//       const pieces = item.split('-')
//       if (pieces.length === 1) {
//         allColors.push('')
//         allSizes.push('')
//       } else if (pieces.length === 2) {
//         const last = pieces[pieces.length - 1]
//         allColors.push(changeColor(last))
//         allSizes.push(changeSize(last))
//       } else if (pieces.length === 3) {
//         const beforeLast = pieces[pieces.length - 2]
//         const last = pieces[pieces.length - 1]
//         if (last === 'S' || last === 'M' || last === 'L' || last === 'XL' || last === 'XXL' || last === 'XXXL' ||
//         last === '36' || last === '37' || last === '38' || last === '39' || last === '40' ||
//         last === '4' || last === '5' || last === '6' || last === '7' || last === '8' || last === '9' || last === '10' || last === '11' || last === '12' || last === '13') {
//           allColors.push(changeColor(beforeLast))
//           allSizes.push(changeSize(last))
//         } else {
//           allColors.push(changeColor(last))
//           allSizes.push(changeSize(last) || changeSize(beforeLast))
//         }
//       } else if (pieces.length === 4) {
//         const beforeLast = pieces[pieces.length - 2]
//         const last = pieces[pieces.length - 1]
//         if (last === 'BK' || last === 'BL' || last === 'WH' || last === 'R' || last === 'BLK' || last === 'GW') {
//           if (beforeLast === 'YE' || beforeLast === 'BK' || beforeLast === 'BLK' || beforeLast === 'PK' ||
//           beforeLast === 'BL' || beforeLast === 'GR' || beforeLast === 'RD' || beforeLast === 'WH' ||
//           beforeLast === 'NA' || beforeLast === 'PU' || beforeLast === 'OR' || beforeLast === 'CO' ||
//           beforeLast === 'DA'
//           ) {
//             allSizes.push(changeSize(''))
//             allColors.push(changeColor(beforeLast))
//           } else {
//             allSizes.push(changeColor(beforeLast))
//             allColors.push(changeSize(last))
//           }
//         } else if (last === '4' || last === '5' || last === '6' || last === '7' || last === '8' || last === '9' || last === '10' || last === '11' || last === '12' || last === '13') {
//           allColors.push(changeColor(beforeLast))
//           allSizes.push(changeSize(last))
//         } else {
//           allColors.push(changeColor(beforeLast))
//           allSizes.push(changeSize(last))
//         }
//       } else if (pieces.length === 5) {
//         const middle = pieces[pieces.length - 3]
//         const beforeLast = pieces[pieces.length - 2]
//         const last = pieces[pieces.length - 1]
//         if (last === 'XS' || last === 'S' || last === 'M' || last === 'L' || last === 'XL' || last === 'XXL' || last === 'XXXL' ||
//            last === '2730' || last === '3134' || last === '3740' || last === '3336' ||
//            last === '36' || last === '37' || last === '38' || last === '39' || last === '40' || last === '41' ||
//            last === '355' || last === '365' || last === '375' || last === '385' || last === '395' || last === '405' || last === '415' || last === '425' || last === '435' || last === '445' ||
//            last === '42' || last === '43' || last === '44' || last === '45' || last === '46' || last === '47' || last === '48' ||
//            last === '202' || last === 'MER' ||
//            last === '17' || last === '170' || last === '18' || last === '180') {
//           allColors.push(changeColor(beforeLast))
//           allSizes.push(changeSize(last))
//         } else if (last === 'BK' || last === 'SV') {
//           allColors.push(changeColor(last))
//           allSizes.push(changeSize(`${beforeLast} - ${last}`))
//         } else {
//           allColors.push(changeColor(middle))
//           allSizes.push(changeSize(`${beforeLast} - ${last}`))
//         }
//       } else if (pieces.length === 6) {
//         const middle = pieces[pieces.length - 3]
//         const beforeLast = pieces[pieces.length - 2]
//         const last = pieces[pieces.length - 1]
//         if (last === '32' || last === '36') {
//           allColors.push(changeColor(middle))
//           allSizes.push(changeSize(`${beforeLast} - ${last}`))
//         } else {
//           allColors.push(changeColor(beforeLast))
//           allSizes.push(changeSize(last))
//         }
//       } else {
//         allColors.push(null)
//         allSizes.push(null)
//       }
//     })

//   setSizeProducts(allSizes)
//   setColorProducts(allColors)

//   const mapped = allReferences.map((item, index) => ({
//     ...item,
//     ean13: JSON.stringify(item.ean),
//     description: '',
//     stock: item.stock === 0 ? null : item.stock,
//     pvp: parseFloat(item.prix * 2.01).toFixed(2),
//     color: allColors[index],
//     size: allSizes[index],
//     active: 0
//   }))

//   const productList: any[] = []
//   let counter = 0;
//   mapped.map((item, index) => {
//     if (item.stock !== null) {
//       productList.push({...item, id: counter})
//       counter++;
//     };
//   })

//   setProducts(productList)
//   setListName(productList)
// }

         // transformProduct(rows);

         Actividad: "Patinaje"
         ArtCodigo: "061P0100"
         ArtNombre: "PROTECCIONES ANKLE WRAP"
         Año: "23"
         CantidadMinima: "0"
         CodArancelario: "9506 99 90"
         CodPais: "VN"
         ColorBase: "NEGRO"
         ColorCodigo: "100"
         ColorNombre: "BLACK"
         Composición: "Alta resistencia a la tracción; la envoltura aumenta la longevidad del revestimiento"
         Descripcionlarga: "Reduce la fricción. Ayuda a prevenir las ampollas. Cómodo. Lavable para múltiples usos. Es mejor llevarlo descalzo o con calcetines ultrafino y ligero. Construcción de doble capa Poliéster (55%), TPU (40%), Elastan (5%)"
         EAN: "8050459837773"
         EnMultiplosde: "0"
         Estacion: "SS"
         Familia: "ACCESORIOS TEXTIL"
         Foto: "http://bmsportech.es/media/images/marcas/rollerblade/products/061P0100 100.UNICA.1.jpg"
         Foto2: "http://bmsportech.es/media/images/marcas/rollerblade/products/061P0100 100.UNICA.2.jpg"
         Foto3: "http://bmsportech.es/media/images/marcas/rollerblade/products/061P0100 100.UNICA.3.jpg"
         Foto4: "http://bmsportech.es/media/images/marcas/rollerblade/products/061P0100 100.UNICA.4.jpg"
         Foto5: "http://bmsportech.es/media/images/marcas/rollerblade/products/061P0100 100.UNICA.5.jpg"
         Foto6: "http://bmsportech.es/media/images/marcas/rollerblade/products/061P0100 100.UNICA.6.jpg"
         Foto7: "http://bmsportech.es/media/images/marcas/rollerblade/products/061P0100 100.UNICA.7.jpg"
         Foto8: "http://bmsportech.es/media/images/marcas/rollerblade/products/061P0100 100.UNICA.8.jpg"
         Linea: "CALCETINES"
         Marca: "ROLLERBLADE"
         PVPR: "19,99"
         Perfil: "Unisex"
         SKU: "061P0100 100 L"
         Talla: "42-44"
         Udsxpack: "1"
         VendorItemNo: "061P0100 100"
         active: 0
         id: 0