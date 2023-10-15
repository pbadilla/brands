const fs = require('fs');
var XMLHttRequest2 = require("xmlhttprequest").XMLHttRequest;

const esperar = tiempo => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ok');
    }, tiempo);
  })
}

async function UrlExists(url) {
  var http = new XMLHttRequest2();
  http.open('HEAD', url, false);
  http.send();
  if (http.status != 404)
      return true;
  else
      return false;
}

function read() {
  let data = '';
  let sebaImages = []
  let tempSebaImages = []
  let images = []

  const readStream = fs.createReadStream('assets/json/seba_products.json');
  readStream.on('error', (error) => console.log(error.message));
  readStream.on('data', (chunk) => data += chunk);
  readStream.on('end', () => {
    tempSebaImages = JSON.parse(data);
    tempSebaImages.map(async item => {
      const urlImage = item.image;
      // Promise
      console.log("> ", await UrlExists(urlImage))
    });
  });
};

read();
