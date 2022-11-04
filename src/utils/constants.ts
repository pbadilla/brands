export const headingsSeba = [
  'Id',
  'EAN13',
  'Reference',
  'Prix',
  'PVP',
  'Stock',
  'Nom',
  'Description',
  'Color',
  'Sizes',
  'Active'
]

export const headersTable = [
  'Ref. Origin',
  'Reference',
  'EAN13',
  'Name',
  'Description',
  'Color',
  'Sizes',
  'PVD',
  'PVP',
  'Stock',
  'Active'
]

const headers = [
  'Ref. Origin',
  'Reference',
  'EAN13',
  'Name',
  'Description',
  'Color',
  'Sizes',
  'PVD',
  'PVP',
  'Stock',
  'Active'
]

const dataItems = [
  'refmere',
  'reference',
  'ean',
  'nom',
  'description',
  'color',
  'size',
  'prix',
  'pvp',
  'stock',
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
    case '4':
      return '35-37'
      break
    case '2730':
      return '27-30'
      break
    case '2734':
      return '27-34'
      break
    case '3336':
      return '33-36'
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
    case '3538':
      return '35-38'
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
    default:
      break
  }
}

export const columnsSeba = [
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
