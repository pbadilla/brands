const findFirstDiff = (str1, str2) => str2[[...str1].findIndex((el, index) => el !== str2[index])]

export const calculateRange = (data, rowsPerPage) => {
  const range = []
  const num = Math.ceil(data.length / rowsPerPage)
  const i = 1
  for (let i = 1; i <= num; i++) {
    range.push(i)
  }
  return range
}

export const sliceData = (data, page, rowsPerPage) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage)
}


const transformKey = (key: string) => {
  let tempKey = "";
  tempKey = key.split('.').join("").replace(/\s/g,'');
  return tempKey;
}

const normalizeHeaders = (productsOnBrut: any[]) => {
  const productList = []
  productsOnBrut.map((item, index) => { 
  let productTemp = ""
  for (const [key, value] of Object.entries(item)) {
    const tempItem = `${transformKey(key)}: ${value}`;
    console.log('%ctempItem', 'color: #007acc;', tempItem);
    productTemp +=tempItem;
  }
  });

}


function extractSizes(paramArray: []) {
  const sizes = [];

  paramArray.map(item => {
    sizes.push (item.talla)
  })

  console.log('%cRollerbladeDiary.tsx line:115 sizes', 'color: #007acc;', sizes);
  return sizes;
}