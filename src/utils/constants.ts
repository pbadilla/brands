export const headingsSeba = [
, 'reference',
  'ean13',
  'Price tax excluded',
  'stock',
  'name',
  'image',
  'brand',
  'refmere',
  'color',
  'sizes',
  'Unit price',
  'Quantity',
  'ean13',
  'pvp',
  'active'
]

export const headingsRollerblade = [
  'ArtCodigo',
  'ArtNombre',
  'ColorNombre',
  'Descripcionlarga',
  'EAN', 
  'Foto', 
  'Marca',
  'PVPR',
  'SKU',
  'Talla',
  'Udsxpack'
]

export const headingsRlbDiary = [
  'id',
  'Activo',
  'CodProducto',
  'Marca',
  'PVP',
  'Stock'
]

export const headingsRlbDiaryCombinations = [
  'CodProducto',
  'Talla'
]

export const headingsRlbCatalog = [
  'id',
  'Activo',
  'Nombre',
  'PVPR',
  'Reference',
  'Marca',
  'EAN13',
  'Quantity',
  'Descripcion',
  'Image',
  'Stock'
]

export const headersRlbCatalog = [
  "EAN",
  "UPC",
  "SKU",
  "VendorItemNo",
  "ArtCodigo",
  "ArtNombre",
  "ColorCodigo",
  "ColorNombre",
  "ColorBase",
  "Talla",
  "TallEUR",
  "PVPR",
  "Año",
  "Marca",
  "Familia",
  "Linea",
  "Tipo",
  "Estacion",
  "Udsxpack",
  "CantidadMinima",
  "EnMultiplosde",
  "Noservirantesde",
  "Foto",
  "Foto2",
  "Foto3",
  "Foto4",
  "Foto5",
  "Foto6",
  "Foto7",
  "Foto8",
  "Foto9",
  "Foto10",
  "Foto11",
  "Foto12",
  "Descripcionlarga",
  "CodArancelario",
  "FEDAS",
  "CodPais",
  "Actividad",
  "Botín",
  "Capacidad",
  "Chasis",
  "Composición",
  "Construcción",
  "Dimensiones",
  "Freno",
  "Guía",
  "Perfil",
  "Pesoaproximado",
  "Rodamiento",
  "RuedasPatines",
  "Tecnología",
  "TipoCierre"
]

export const headingsPower = [
  'Id',
  'EAN13',
  'Reference',
  'Prix',
  'PVP',
  'Stock',
  'Nom',
  'Desxcription',
  'Color',
  'Sizes',
  'active'
]

export const headersTable = [
  'id',
  'Ref. Origin',
  'EAN13',
  'PVD',
  'Stock',
  'Name',
  'Image',
  'Brand',
  'Reference',
  'Description',
  'PVP',
  'Color',
  'Sizes',
  'Active'
]

const headers = [
  'id',
  'Ref. Origin',
  'EAN13',
  'PVD',
  'Stock',
  'Name',
  'Image',
  'Brand',
  'Reference',
  'Description',
  'PVP',
  'Color',
  'Sizes',
  'Active'
]

const dataItems = [
  'id',
  'refmere',
  'ean13',
  'prix',
  'stock',
  'nom',
  'image',
  'brand',
  'reference',
  'description',
  'pvp',
  'color',
  'size',
  'active'
]

export const changeColor = (originColor: string) => {
  switch (originColor) {
    case 'BK':
    case 'BLK':
      return 'Negro'
      break
    case 'BL':
      return 'Azul'
      break
    case 'BG':
      return 'Rosa chicle'
      break
    case 'CRBN':
    case 'R':
      return 'Carbon'
      break
    case 'DA':
      return 'Negro Transparente'
      break
    case 'CL':
      return 'Blanco Transparente'
      break
    case 'CO':
      return 'Coral'
      break
    case 'GD':
      return 'Dorado'
      break
    case 'GR':
      return 'Verde'
      break
    case 'GY':
    case 'GRY':
      return 'Gris'
      break
    case 'GL':
      return 'Gris Perla'
      break
    case 'NL':
      return 'Marrón'
      break
    case 'NY':
    case 'NV':
      return 'Azul Oscuro'
      break
    case 'LB':
      return 'Azul flojo'
      break
    case 'PK':
      return 'Rosa'
      break
    case 'PU':
      return 'Violeta'
      break
    case 'OR':
      return 'Naranja'
      break
    case 'RED':
    case 'RD':
      return 'Rojo'
      break
    case 'SILVER':
    case 'SL':
    case 'SV':
      return 'Plata'
      break
    case 'YE':
    case 'YL':
      return 'Amarillo'
      break
    case 'VI':
      return 'Violeta'
      break
    case 'WH':
      return 'Blanco'
      break
    default:
      break
  }
}

export const changeSize = (originSize: string) => {
  switch (originSize) {
    case '2 - 4':
    case '2':
      return '32-34'
      break
    case '5 - 8':
      return '37-39'
      break
    case '9 - 12':
      return '40-42'
      break
    case '4 - 6':
      return '35-37'
      break
    case '2730':
      return '27-30'
      break
    case '2734':
      return '27-34'
      break
    case '2932':
      return '29-32'
      break
    case '3336':
      return '33-36'
      break
    case '3538':
      return '35-38'
      break
    case '3740':
      return '37-40'
      break
    case '34':
      return '34'
      break
    case '35':
      return '35'
      break
    case '36':
      return '36'
      break
    case '36 - 38':
      return '36-38'
      break
    case '37':
    case '5':
      return '37'
      break
    case '38':
      return '38'
      break
    case '6':
      return '38-39'
      break
    case '39':
      return '39'
      break
    case '39 - 41':
      return '39-41'
      break
    case '40':
    case '7':
      return '40'
      break
    case '405':
      return '40.5'
      break
    case '41':
    case '8':
      return '41'
      break
    case '415':
      return '41.5'
      break
    case '42':
    case '9':
      return '42'
      break
    case '42 - 44':
      return '42-44'
      break
    case '425':
      return '42.5'
      break
    case '43':
    case '10':
      return '43'
      break
    case '435':
      return '43.5'
      break
    case '44':
    case '11':
      return '44'
      break
    case '445':
      return '44.5'
      break
    case '45':
    case '12':
      return '45'
      break
    case '45 - 47':
      return '45-47'
      break
    case '46':
    case '13':
      return '46'
      break
    case '47':
      return '47'
      break
    case '48':
      return '48'
      break
    case 'JR':
      return 'Junior'
      break
    case 'XXL':
      return 'DobleExtraLargo'
      break
    case 'XXXL':
      return 'TripleExtraLargo'
      break
    case 'XL':
      return 'ExtraLargo'
      break
    case 'L':
      return 'Largo'
      break
    case 'M':
      return 'Medium'
      break
    case 'S':
      return 'Small'
      break
    case 'XS':
      return 'ExtraSmall'
      break
    case 'XXS':
      return 'DobleExtraSmall'
      break
      case '72':
        return '72mm'
        break
      case '80':
        return '80mm'
        break
      case '76':
        return '76mm'
        break
      case '100':
        return '100mm'
        break
      case '110':
        return '110mm'
        break
      case '125':
        return '125mm'
        break
    case 'undefined':
      return ""
      break;
    default:
      break
  }
}

export const columnsSeba = [
  {
    name: 'ID',
    selector: row => row.id,
    sortable: true
  },
  {
    name: 'Ref. Origin',
    selector: row => row.refmere,
    sortable: true
  },
  {
    name: 'reference',
    selector: row => row.reference,
    sortable: true
  },
  {
    name: 'ean18',
    selector: row => row.ean,
    sortable: true
  },
  {
    name: 'Nom',
    selector: row => row.nom,
    sortable: true
  },
  {
    name: 'Description',
    selector: row => row.description,
    sortable: true
  },
  {
    name: 'Color',
    selector: row => row.color,
    sortable: true
  },
  {
    name: 'Size',
    selector: row => row.size,
    sortable: true
  },
  {
    name: 'Price',
    selector: row => row.prix,
    sortable: true
  },
  {
    name: 'PVP',
    selector: row => row.pvp,
    sortable: true
  },
  {
    name: 'Stock',
    selector: row => row.stock,
    sortable: true
  },
  {
    name: 'Active',
    selector: row => row.active,
    sortable: true
  }
]

export const columnsRollerblade = [
  {
    name: 'Art. Codigo',
    selector: row => row.ArtCodigo,
    sortable: true,
    width: '110px'
  },
  {
    name: 'Art. Nombre',
    selector: row => row.ArtNombre,
    sortable: true,
    maxWidth: '300px'
  },
  {
    name: 'Color Base',
    selector: row => row.ColorNombre,
    sortable: true,
    maxWidth: '130px'
  },
  {
    name: 'Descripcion larga',
    selector: row => row.Descripcionlarga,
    sortable: true,
    maxWidth: '200px'
  },
  {
    name: 'EAN',
    selector: row => row.EAN,
    sortable: true,
    maxWidth: '130px'
  },
  {
    name: 'Foto',
    selector: row => row.Foto,
    sortable: true,
    maxWidth: '130px'
  },
  {
    name: 'PVPR',
    selector: row => row.PVPR,
    sortable: true,
    maxWidth: '100px'
  },
  {
    name: 'SKU',
    selector: row => row.SKU,
    sortable: true,
    maxWidth: '130px'
  },
  {
    name: 'Talla',
    selector: row => row.Talla,
    sortable: true,
    maxWidth: '100px'
  },
  {
    name: 'Stock',
    selector: row => row.Udsxpack,
    sortable: true,
    maxWidth: '50px'
  },
  {
    name: 'Active',
    selector: row => row.active,
    sortable: true,
    maxWidth: '50px'
  }
]

export const columnsRlbDiary = [
  {
    name: 'ID',
    selector: row => row.id,
    sortable: true,
    width: '80px'
  },
  {
    name: 'Activo',
    selector: row => row.activo,
    sortable: true,
    width: '80px'
  },
  {
    name: 'PVP',
    selector: row => row.PVP,
    sortable: true,
    width: '100px'
  },
  {
    name: 'Código Producto',
    selector: row => row.CodProducto,
    sortable: true,
    width: '150px'
  },
  {
    name: 'Marca',
    selector: row => row.Marca,
    sortable: true,
    width: '130px'
  },
  ,
  {
    name: 'Descripción',
    selector: row => row.Descripcion,
    sortable: true,
    width: '400px'
  },
  {
    name: 'Stock',
    selector: row => row.Stock,
    sortable: true,
    width: '60px'
  }
]

export const columnsPower = [
  {
    name: 'Art. Id',
    selector: row => row.ArtikelId,
    sortable: true
  },
  {
    name: 'Art. Num',
    selector: row => row.Artikelnr,
    sortable: true
  },
  {
    name: 'EAN13',
    selector: row => row.EAN,
    sortable: true
  },
  {
    name: 'Nombre',
    selector: row => row.Artikelbezeichnung,
    sortable: true
  },
  {
    name: 'EAN',
    selector: row => row.EAN,
    sortable: true
  },
  {
    name: 'Description',
    selector: row => row.description,
    sortable: true
  },
  {
    name: 'Talla',
    selector: row => row.MM1,
    sortable: true
  },
  {
    name: 'Color',
    selector: row => row.MM2,
    sortable: true
  },
  {
    name: 'Stock',
    selector: row => row.Bestand,
    sortable: true
  },
  {
    name: 'PVP',
    selector: row => row.pvp,
    sortable: true
  },
  {
    name: 'Active',
    selector: row => row.active,
    sortable: true
  }
]
