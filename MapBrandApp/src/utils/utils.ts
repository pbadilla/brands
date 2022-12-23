import { changeColor, changeSize, columnsSeba, headingsSeba } from './constants';
import groupBy from 'lodash.groupby';
import _, { constant } from 'lodash';

export function findDiff(str1:string, str2:string) {
  const groupListProducts: string | any[] = [];
  let diff = "";
  if(str1) {
    str2.split('').forEach(function(val, i) {
      if (val != str1.charAt(i)) diff += val;
    });
    while(diff.charAt(0) === '-')
    {
      diff = diff.substring(1);
    }
    return diff;
  } else {
    return;
  }
}

export function extractColor(reference:string) {
  const colorTemp = reference.split('-');
  if(colorTemp.length === 3) {
    const first = colorTemp[colorTemp.length - 3]
    const middle = colorTemp[colorTemp.length - 2]
    const last = colorTemp[colorTemp.length - 1]

    if (first === 'BK' || first === 'BL' || first === 'WH' || first === 'R' || first === 'RED' || first === 'GY' || 
      first === 'BLK' || first === 'GW' || first === 'YE' || first === 'BK' || first === 'BLK' || first === 'PK' ||
      first === 'BL' || first === 'GR' || first === 'RD' || first === 'WH' || first === 'VI' || first === 'SL' || 
      first === 'NA' || first === 'PU' || first === 'OR' || first === 'CO' || first === 'YL' ||
      first === 'DA') {
        return changeColor(first);  
    } else if(middle === 'BK' || middle === 'BL' || middle === 'WH' || middle === 'R' || middle === 'RED' || 
      middle === 'BLK' || middle === 'GW' || middle === 'YE' || middle === 'BK' || middle === 'BLK' || middle === 'PK' ||
      middle === 'BL' || middle === 'GR' || middle === 'RD' || middle === 'WH' || middle === 'VI' || middle === 'GY' || 
      middle === 'NA' || middle === 'PU' || middle === 'OR' || middle === 'CO' || middle === 'SL' || middle === 'YL' ||
      middle === 'DA') {
        return changeColor(middle);
    } else if(last === 'BK' || last === 'BL' || last === 'WH' || last === 'R' || last === 'RED' || 
      last === 'BLK' || last === 'GW' || last === 'YE' || last === 'BK' || last === 'BLK' || last === 'PK' ||
      last === 'BL' || last === 'GR' || last === 'RD' || last === 'WH' || last === 'VI' || last === 'GY' || 
      last === 'NA' || last === 'PU' || last === 'OR' || last === 'CO' || last === 'SL' || last === 'YL' ||
      last === 'DA') {
        return changeColor(last);
    }
  } else if(colorTemp.length === 2) {
    const first = colorTemp[colorTemp.length - 2]
    const last = colorTemp[colorTemp.length - 1]
      if (first === 'BK' || first === 'BL' || first === 'WH' || first === 'R' || first === 'RED' || 
      first === 'BLK' || first === 'GW' || first === 'YE' || first === 'BK' || first === 'BLK' || first === 'PK' ||
      first === 'BL' || first === 'GR' || first === 'RD' || first === 'WH' || first === 'VI' ||  first === 'GY' || 
      first === 'NA' || first === 'PU' || first === 'OR' || first === 'CO' || first === 'SL' || first === 'YL' ||
      first === 'DA') {
        return changeColor(first);  
    } else if(last === 'BK' || last === 'BL' || last === 'WH' || last === 'R' || last === 'RED' || 
      last === 'BLK' || last === 'GW' || last === 'YE' || last === 'BK' || last === 'BLK' || last === 'PK' ||
      last === 'BL' || last === 'GR' || last === 'RD' || last === 'WH' || last === 'VI' || last === 'GY' ||
      last === 'NA' || last === 'PU' || last === 'OR' || last === 'CO' || last === 'SL' || last === 'YL' ||
      last === 'DA') {
        return changeColor(last);
    }
  } else if(colorTemp.length === 1) {
    const unique = colorTemp[colorTemp.length - 1]
      if (unique === 'BK' || unique === 'BL' || unique === 'WH' || unique === 'R' || unique === 'RED' || 
      unique === 'BLK' || unique === 'GW' || unique === 'YE' || unique === 'BK' || unique === 'BLK' || unique === 'PK' ||
      unique === 'BL' || unique === 'GR' || unique === 'RD' || unique === 'WH' || unique === 'VI' || unique === 'GY' ||
      unique === 'NA' || unique === 'PU' || unique === 'OR' || unique === 'CO' || unique === 'SL' || unique === 'YL' ||
      unique === 'DA') {
        return changeColor(unique);  
    }
  }
}

export function isAColor(color:string) {
  if (color === 'BK' || color === 'BL' || color === 'WH' || color === 'R' || color === 'RED' || color === 'GY' || 
  color === 'BLK' || color === 'GW' || color === 'YE' || color === 'BK' || color === 'BLK' || color === 'PK' ||
  color === 'BL' || color === 'GR' || color === 'RD' || color === 'WH' || color === 'VI' || color === 'SL' || 
  color === 'NA' || color === 'PU' || color === 'OR' || color === 'CO' || color === 'YL' || color === 'DA' ||
  color === 'NV' ) {
    return true;
  } else {
    return false;
  }
}

export function colors(color:string) {
  if(isAColor(color))  {
    return changeColor(color)
  } else {
    return null;
  }
}

export function sizesAndColors(item:string) {
  let identify:string | null | undefined = "";

  if (item === '10' || item === '12' || item === '15' || item === '150' || item === '17' || item === '170' || item === '18' || item === '180' || 
    item === '2' || item === '4' || item === '5' || item === '6' || item === '8' || item === '9' ||
    item === '210' || item === '220' || item === '230' || item === '2730' || item=== '2734' || 
    item === '3134' || item === '3740' || item === '3336' || item === '3538' || 
    item === '35' || item === '355' || item === '36' || item === '365' || 
    item === '37' || item === '375' || item === '38' || item === '385' || item === '39' || item === '395' ||  
    item === '40' ||  item === '405' ||item === '41' || item === '415' || item === '42' || item === '425' || 
    item === '43' || item === '435' || item === '44' || item === '445' || item === '45' ||
    item === '46' || item === '47' || item === '48' || 
    item === 'MER' || item === 'XS' || item === 'S' || item === 'M' || item === 'L' || item === 'XL' || item === 'XXL' || item === 'XXXL') {
      identify = changeSize(item); 
    } else {
      identify = colors(item)
    };
    return identify;
}

export function isASize(item:string) {
  if (item === '10' || item === '12' || item === '15' || item === '150' || item === '17' || item === '170' || item === '18' || item === '180' || 
    item === '2' || item === '4' || item === '5' || item === '6' || item === '8' || item === '9' ||
    item=== '29' || item=== '30' || item=== '31' || item=== '32' || item=== '33' ||
    item === '210' || item === '220' || item === '230' || item === '2730' || item=== '2734' || 
    item === '3134' || item === '3740' || item === '3336' || item === '3538' || 
    item === '34' || item === '35' || item === '355' || item === '36' || item === '365' || 
    item === '37' || item === '375' || item === '38' || item === '385' || item === '39' || item === '395' ||  
    item === '40' ||  item === '405' ||item === '41' || item === '415' || item === '42' || item === '425' || 
    item === '43' || item === '435' || item === '44' || item === '445' || item === '45' ||
    item === '46' || item === '47' || item === '48' || item === '76') {
      return true; 
  } else {
    return false;
  };
}

export function isASizeLetter(item:string) {
  if(item === 'MER' || item === 'XS' || item === 'S' || item === 'M' || item === 'L' || item === 'XL' || item === 'XXL' || item === 'XXXL') {
    return true; 
  } else {
    return false;
  };
}

export function isANormalLetter(item:string) {
  if(item === 'F' || item === 'XF' ) {
    return true;
  } else {
    return false;
  }
}

export function makeReference(reference:string, refmere:string) {
  const sizesTemp = reference.split('-');
  let referenceBase:string | undefined = "";

  if(sizesTemp.length === 6) {
    const firstChar = sizesTemp[sizesTemp.length - 6];
    const secondChar = sizesTemp[sizesTemp.length - 5];
    const thirdChar = sizesTemp[sizesTemp.length - 4];
    const fourthChar = sizesTemp[sizesTemp.length - 3];
    const fifthChar = sizesTemp[sizesTemp.length - 2];
    const lastChar = sizesTemp[sizesTemp.length - 1]

    if(isASizeLetter(lastChar) && (isAColor(fifthChar))) {
      referenceBase = (`${firstChar}-${secondChar}-${thirdChar}-${fourthChar}-${fifthChar}`);
    } else if(lastChar === '2012') {
      referenceBase = (`${firstChar}-${secondChar}-${thirdChar}`);
    }
  } else if(sizesTemp.length === 5) {
    const firstChar = sizesTemp[sizesTemp.length - 5];
    const secondChar = sizesTemp[sizesTemp.length - 4];
    const thirdChar = sizesTemp[sizesTemp.length - 3];
    const fourthChar = sizesTemp[sizesTemp.length - 2];
    const lastChar = sizesTemp[sizesTemp.length - 1];

    if (isASize(lastChar) && isASize(fourthChar)) {
      referenceBase = (`${firstChar}-${secondChar}-${thirdChar}`);
    } else if ((isASize(lastChar) && isASize(fourthChar) && isASize(thirdChar))) {
      referenceBase = (`${firstChar}-${secondChar}`);
    } else if (isASizeLetter(lastChar) && (isAColor(fourthChar))) {
      referenceBase = (`${firstChar}-${secondChar}-${thirdChar}-${fourthChar}`);
    } else if (isASize(lastChar) && (isAColor(fourthChar))) {
      referenceBase = (`${firstChar}-${secondChar}-${thirdChar}-${fourthChar}`);
    } else if (isASizeLetter(lastChar) && (!isAColor(fourthChar))) {
      referenceBase = (`${firstChar}-${secondChar}-${thirdChar}-${fourthChar}`);
    } else if(isAColor(lastChar)) {
      referenceBase = (`${firstChar}-${secondChar}-${thirdChar}-${fourthChar}`);
    } else if(isANormalLetter(lastChar)) {
      referenceBase = (`${firstChar}-${secondChar}-${thirdChar}-${fourthChar}-${lastChar}`);
    }
  } else if(sizesTemp.length === 4) {
    const firstChar = sizesTemp[sizesTemp.length - 4];
    const secondChar = sizesTemp[sizesTemp.length - 3];
    const thirdChar = sizesTemp[sizesTemp.length - 2];
    const lastChar = sizesTemp[sizesTemp.length - 1];

    if (isASize(lastChar) && (isAColor(thirdChar))) {
      referenceBase = (`${firstChar}-${secondChar}-${thirdChar}`);
    } else if(isASizeLetter(lastChar) && (isAColor(thirdChar))) {
      referenceBase = (`${firstChar}-${secondChar}-${thirdChar}`);
    } else {
      referenceBase = reference;
    }
  } else if(sizesTemp.length === 3) {
    const firstChar = sizesTemp[sizesTemp.length - 3];
    const secondChar = sizesTemp[sizesTemp.length - 2];
    const lastChar = sizesTemp[sizesTemp.length - 1];
   
    if (isASize(lastChar) || isASizeLetter(lastChar)) {
      referenceBase = (`${firstChar}-${secondChar}`);
    } else {
      referenceBase = reference;
    }
  }else {
    return reference;
  }

  return referenceBase;
}

export function extractCSizes(reference:string) {
    const sizesTemp = reference.split('-');

  if(sizesTemp.length === 3) {
    const first = sizesTemp[sizesTemp.length - 3]
    const middle = sizesTemp[sizesTemp.length - 2]
    const last = sizesTemp[sizesTemp.length - 1]

    if  (first === 'XS' || first === 'S' || first === 'M' || first === 'L' || first === 'XL' || first === 'XXL' || first === 'XXXL' ||
        first === '2730' || first === '3134' || first === '3740' || first === '3336' ||
        first === '36' || first === '37' || first === '38' || first === '39' || first === '40' || first === '41' ||
        first === '355' || first === '365' || first === '375' || first === '385' || first === '395' || first === '405' ||
        first === '415' || first === '425' || first === '435' || first === '445' ||
        first === '42' || first === '43' || first === '44' || first === '45' || first === '46' || first === '47' || first === '48' ||
        first === '202' || first === 'MER' ||
        first === '17' || first === '170' || first === '18' || first === '180') {
          // console.log('%c changeSize(first)', 'color: #007acc;', changeSize(first));
        return changeSize(first);  
    } else if(middle === 'XS' || middle === 'S' || middle === 'M' || middle === 'L' || middle === 'XL' || middle === 'XXL' || middle === 'XXXL' ||
      middle === '2730' || middle === '3134' || middle === '3740' || middle === '3336' ||
      middle === '36' || middle === '37' || middle === '38' || middle === '39' || middle === '40' || middle === '41' ||
      middle === '355' || middle === '365' || middle === '375' || middle === '385' || middle === '395' || middle === '405' ||
      middle === '415' || middle === '425' || middle === '435' || middle === '445' ||
      middle === '42' || middle === '43' || middle === '44' || middle === '45' || middle === '46' || middle === '47' || middle === '48' ||
      middle === '202' || middle === 'MER' ||
      middle === '17' || middle === '170' || middle === '18' || middle === '180') {
        // console.log('%c middle', 'color: #007acc;', changeSize(middle));
        return changeSize(middle);
    } else if(last === 'XS' || last === 'S' || last === 'M' || last === 'L' || last === 'XL' || last === 'XXL' || last === 'XXXL' ||
      last === '2730' || last === '3134' || last === '3740' || last === '3336' || 
      last === '355' || last === '365' || last === '375' || last === '385' || last === '395' || last === '405' ||
      last === '415' || last === '425' || last === '435' || last === '445' || last === '202' || last === 'MER' || last === '180' || last === '170') 
    {
        return changeSize(last);
    } else if(last === '36' || last === '37' || last === '38' || last === '39' || last === '40' || last === '41' ||
      last === '42' || last === '43' || last === '44' || last === '45' || last === '46' || last === '47' || last === '48' ||
      last === '17'  || last === '18') {
        // console.log('%c last', 'color: #007acc;', changeSize(last));
        const talla = changeSize(last)?.toString();
        // console.log('%c', 'color: #007acc;', talla);
        return talla;
    } else if( last === '4' || last === '6' || last === '8' || last === '12' && middle === '2' || middle === '4' || middle === '9' || middle === '5') {
      return changeSize(`${middle} - ${last}`);
    } else if(last === 'undefined' || middle === 'undefined' || first === 'undefined') {
      // console.log('%c UNICA', 'color: #007acc;');
      return changeSize('UNICA');
    }
  } else if(sizesTemp.length === 2) {
    const first = sizesTemp[sizesTemp.length - 2]
    const last = sizesTemp[sizesTemp.length - 1]
    if (first === 'XS' || first === 'S' || first === 'M' || first === 'L' || first === 'XL' || first === 'XXL' || first === 'XXXL' ||
        first === '2730' || first === '3134' || first === '3740' || first === '3336' ||
        first === '36' || first === '37' || first === '38' || first === '39' || first === '40' || first === '41' ||
        first === '355' || first === '365' || first === '375' || first === '385' || first === '395' || first === '405' ||
        first === '415' || first === '425' || first === '435' || first === '445' ||
        first === '42' || first === '43' || first === '44' || first === '45' || first === '46' || first === '47' || first === '48' ||
        first === '202' || first === 'MER' || first === '4' || first === '6' || first === '12' ||
        first === '17' || first === '170' || first === '18' || first === '180') {
        return changeSize(first); 
    } else if(last === 'XS' || last === 'S' || last === 'M' || last === 'L' || last === 'XL' || last === 'XXL' || last === 'XXXL' ||
      last === '2730' || last === '3134' || last === '3740' || last === '3336' ||
      last === '36' || last === '37' || last === '38' || last === '39' || last === '40' || last === '41' ||
      last === '355' || last === '365' || last === '375' || last === '385' || last === '395' || last === '405' ||
      last === '415' || last === '425' || last === '435' || last === '445' ||
      last === '42' || last === '43' || last === '44' || last === '45' || last === '46' || last === '47' || last === '48' ||
      last === '202' || last === 'MER' || last === '4' || last === '6' || last === '12' ||
      last === '17' || last === '170' || last === '18' || last === '180') {
      return changeSize(last);
    } else if(last === 'undefined' || first === 'undefined') {
      return changeSize('UNICA');
    }
  } else if(sizesTemp.length === 1) {
    const unique = sizesTemp[sizesTemp.length - 1]
    if(unique === 'XS' || unique === 'S' || unique === 'M' || unique === 'L' || unique === 'XL' || unique === 'XXL' || unique === 'XXXL' ||
      unique === '2730' || unique === '3134' || unique === '3740' || unique === '3336' || unique === '2734' || 
      unique === '34' || unique === '35' || unique === '3538' || unique === '2932' ||
      unique === '36' || unique === '37' || unique === '38' || unique === '39' || unique === '40' || unique === '41' ||
      unique === '355' || unique === '365' || unique === '375' || unique === '385' || unique === '395' || unique === '405' ||
      unique === '415' || unique === '425' || unique === '435' || unique === '445' ||
      unique === '42' || unique === '43' || unique === '44' || unique === '45' || unique === '46' || unique === '47' || unique === '48' ||
      unique === '72' || unique === '76' || unique === '80' || unique === '100' || unique === '110' || unique === '125' || 
      unique === '202' || unique === 'MER' || unique === '4' || unique === '6' || unique === '12' ||
      unique === '17' || unique === '170' || unique === '18' || unique === '180') {
        return changeSize(unique);  
    } else if(unique === '' || !unique) {
      return changeSize('UNICA');
    } else {
      return changeSize('UNICA');
    }
  } else if(sizesTemp.length === 4) {
    const first = sizesTemp[sizesTemp.length - 4]
    const last = sizesTemp[sizesTemp.length - 1]
    if (first === 'XS' || first === 'S' || first === 'M' || first === 'L' || first === 'XL' || first === 'XXL' || first === 'XXXL' ||
      first === '2730' || first === '3134' || first === '3740' || first === '3336' ||
      first === '36' || first === '37' || first === '38' || first === '39' || first === '40' || first === '41' ||
      first === '355' || first === '365' || first === '375' || first === '385' || first === '395' || first === '405' ||
      first === '415' || first === '425' || first === '435' || first === '445' ||
      first === '42' || first === '43' || first === '44' || first === '45' || first === '46' || first === '47' || first === '48' ||
      first === '202' || first === 'MER' || first === '4' || first === '6' || first === '12' ||
      first === '17' || first === '170' || first === '18' || first === '180') {
        return changeSize(first); 
    } else if(last === 'XS' || last === 'S' || last === 'M' || last === 'L' || last === 'XL' || last === 'XXL' || last === 'XXXL' ||
      last === '2730' || last === '3134' || last === '3740' || last === '3336' ||
      last === '36' || last === '37' || last === '    // debugger;38' || last === '39' || last === '40' || last === '41' ||
      last === '355' || last === '365' || last === '375' || last === '385' || last === '395' || last === '405' ||
      last === '415' || last === '425' || last === '435' || last === '445' ||
      last === '42' || last === '43' || last === '44' || last === '45' || last === '46' || last === '47' || last === '48' ||
      last === '202' || last === 'MER' || last === '4' || last === '6' || last === '12' ||
      last === '17' || last === '170' || last === '18' || last === '180') {
        return changeSize(last);
    } else if(last === 'undefined' || first === 'undefined') {
      return changeSize('UNICA');
    }
  }
}

export function extractCategories(reference:string) {
  const referenceCategories = reference.split('-').shift();

  if (referenceCategories) {
    switch(referenceCategories) {
      case 'ABR':
      case 'ABRFR':
      case 'AGR':
      case 'ALN':
      case 'AXL':
      case 'BUK':
      case 'CUF':
      case 'FR':
      case 'FRABR':
      case 'FRAXL':
      case 'FRBUK':
      case 'FRCUF':
      case 'FRDST':
      case 'FRLAC':
      case 'FRLAD':
      case 'FRLIN':
      case 'FRPWST':
      case 'FRSCRW':
      case 'FRSTRP':
      case 'FRWC':
      case 'HDS':
      case 'HYWL':
      case 'INS':
      case 'ITWL':
      case 'LIN':
      case 'LUSTRP':
      case 'SABR':
      case 'SCRW':
      case 'SH':
      case 'SPA':
      case 'SSPL':
      case 'WHR':     
        return 'recambios';
      
      case 'CKIT':     
        return 'pack de protecciones';

      case 'BRK':
        return 'frenos';
      
      case 'FOLIN':
      case 'THAC':
        return 'botines'

      case 'FRCKIT':
        return 'kits';

      case 'FRBG':
      case 'FRBRG':
      case 'SON':
        return 'rodamientos';

      case 'FRWL':
      case 'GY':
      case 'GYWL':
      case 'LUWL':
      case 'MPCWL':
      case 'NCWL':
      case 'SWL':
        return 'ruedas';

      case 'CON':
      case 'CONDD':
      case 'FRCON':
        return 'conos';

      case 'FRFM':
      case 'OYFM':
      case 'SFM':
      case 'SIC':
        return 'guías';

      case 'PRO':
        return 'protecciones';

      case 'FRLYC':
      case 'FRSO':
      case 'FRWB':
      case 'FRWBFRWC':
      case 'FRWR':      
      case 'LUWB':
      case 'SB':
      case 'SSSB':
      case 'STS':
      case 'TSM':
      case 'TSW':
        return 'ropa';

      case 'SBG':
        return 'mochilas';

      case '22FRSKB':
        return 'bota';

      case 'FRSK':
      case 'FRSKB':
      case 'SSK':
      case 'THSK':
      case '21SSK':
      case '22SSK':
        return 'patines';

      default:
        return '';
    }
  } else {
    return  '';
  }
}

export function deleteSizes(name:string) {
  if (name.includes('34-37')) {
    const nameWithoutSize = name.replace(' 34-37', '');
    return nameWithoutSize;
  } else if(name.includes('38-42')) {
    const nameWithoutSize = name.replace(' 38-42', '');
    return nameWithoutSize;
  } else if(name.includes('43-47')) {
    const nameWithoutSize = name.replace(' 43-47', '');
    return nameWithoutSize;
  } else if(name.includes('27-30')) {
    const nameWithoutSize = name.replace(' 27-30', '');
    return nameWithoutSize;
  } else if(name.includes('36-40')) {
    const nameWithoutSize = name.replace(' 36-40', '');
    return nameWithoutSize;
  } else if(name.includes('41-42')) {
    const nameWithoutSize = name.replace(' 41-42', '');
    return nameWithoutSize;
  } else if(name.includes('44-47')) {
    const nameWithoutSize = name.replace(' 44-47', '');
    return nameWithoutSize;
  } else if(name.includes('43-47')) {
    const nameWithoutSize = name.replace(' 43-47', '');
    return nameWithoutSize;
  } else if(name.includes('34')) {
    const nameWithoutSize = name.replace(' 34', '');
    return nameWithoutSize;
  } else if(name.includes('35')) {
    const nameWithoutSize = name.replace(' 35', '');
    return nameWithoutSize;
  } else if(name.includes('36')) {
    const nameWithoutSize = name.replace(' 36', '');
    return nameWithoutSize;
  } else if(name.includes('37')) {
    const nameWithoutSize = name.replace(' 37', '');
    return nameWithoutSize;
  } else if(name.includes('38')) {
    const nameWithoutSize = name.replace(' 38', '');
    return nameWithoutSize;
  } else if(name.includes('39')) {
    const nameWithoutSize = name.replace(' 39', '');
    return nameWithoutSize;
  } else if(name.includes('40')) {
    const nameWithoutSize = name.replace(' 40', '');
    return nameWithoutSize;
  } else if(name.includes('41')) {
    const nameWithoutSize = name.replace(' 41', '');
    return nameWithoutSize;
  } else if(name.includes('42')) {
    const nameWithoutSize = name.replace(' 42', '');
    return nameWithoutSize;
  } else if(name.includes('43')) {
    const nameWithoutSize = name.replace(' 43', '');
    return nameWithoutSize;
  } else if(name.includes('44')) {
    const nameWithoutSize = name.replace(' 44', '');
    return nameWithoutSize;
  } else {
    return name;
  }
}

export function sizesAndColorOfProducts (allReferences: []) {
    const allColors: (string | undefined)[] = [];
    const allSizes: (string | undefined)[] = [];
    const products: (string | undefined)[] = [];
    const productsList: (string | undefined)[] = [];
    const productsToExport: (string | undefined)[] = [];
   
    allReferences.map((item, index) => {
      if(item.refmere) {
        const compareString = findDiff(item.refmere, item.reference);
        allColors.push(extractColor(compareString as string));
        allSizes.push(extractCSizes(compareString as string)); 

        products.push ({
          id: index,
          active: 1,
          nombre: deleteSizes(item?.nom),
          categories: extractCategories(item.refmere),
          pvpr: parseFloat(item?.prix * 1.8).toFixed(2),
          referencia: makeReference(item?.reference.toString(), item?.refmere.toString()),
          marca: item?.marque,
          ean13: JSON.stringify(item?.ean),
          quantity: parseInt(item?.stock),
          description: deleteSizes(item?.nom),
          imagen: item?.image,
          metaTitle: deleteSizes(item?.nom),
          metaKeywords: extractCategories(item.refmere),
          metaDescription: deleteSizes(item?.nom)
        })
      }
    });
    const grouped = _.mapValues(_.groupBy(products, 'referencia')); 
    for (const [key, value] of Object.entries(grouped)) {
      productsList.push(value[0])
    }

    allReferences.map((item, index:number) => {
      if(item?.refmere) {
        const compareString = findDiff(item.refmere, item.reference);
        
        productsToExport.push ({
          id: index,
          referencia: makeReference(item?.reference.toString(), item?.refmere.toString()),
          attributes: extractCSizes(compareString as string) ? `Talla:select:0` : '',
          values: extractCSizes(compareString as string)  ? `${extractCSizes(compareString as string)}:0` : '',         
          ean13: item?.ean,
          quantity: parseInt(item?.stock)
        })
      }
    });

    // console.log('%c > products', 'color: #007acc;', products)
    // console.log('%c > productsToExport', 'color: #007acc;', productsToExport);

    return {allColors, allSizes, grouped, products, productsList, productsToExport};
}

function toFixed(num, fixed) {
  var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
  return num.toString().match(re)[0];
}

function transformDecimals(numToCompare:string, numToTransform:number) {
  switch(numToCompare.length) {
    case 5:
      return numToTransform*0.001;
      break;
    case 4:
      return numToTransform*0.01;
      break;
    case 3:
    case 2:
      return numToTransform*0.1;
      break;
    default:
      break;
  }
}

const joinSizes = (arraySizes: string[], arrayStock: string[]) => {
  const temp: Array<string> = [];
  arraySizes.map((item,index)=> {
    temp.push(`${item}:${arrayStock[index]}`)
  })
  return temp;
}

const joinAttributes = (arraySizes: string[]) => {
  const temp: Array<string> = [];
  arraySizes.map((item,index)=> {
    temp.push(`Talla:select:0`)
  })
  return temp;
}

// const transformToSizes = listSizes.map( (item, index) => {
//   return({
//     codigo: item.codigo,
//     attribute: joinAttributes(item.sizes).join(','),
//     value: joinSizes(item.sizes, item.stock).join(',')
//     // quantity: item.quantity
//   })
// });
