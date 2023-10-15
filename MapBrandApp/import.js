const ftp = require("basic-ftp")
let csvToJson = require('convert-csv-to-json');
const fs = require('fs');
const axios = require('axios')

rollerblade()
seba()

async function rollerblade() {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: "ftp.bmsportech.com",
            user: "cliente_rollergrind360", // defaults to "anonymous"
            password: "aue9kpr@DPV.hgp7ufz",
            secure: true,
            secureOptions: {"rejectUnauthorized":false},
        })
        client.trackProgress(info => {
            console.log("File > ", info.name)
            console.log("Type > ", info.type)
            console.log("Transferred: ", info.bytes)
        })

        // console.log(await client.list())
        await client.downloadTo("assets/csv/rb.csv", "stocks.csv")

        let fileInputName = 'assets/csv/rb.csv'; 
        let fileOutputName = 'assets/json/rb_products.json';

        csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);

    }
    catch(err) {
        console.log(err)
    }
    client.close()
}

async function seba() {
    const username = "csvuniverskate";
    const password = "UdQ4SKATE7PytND";
    const url = "http://csvshops.universkate.com/UniverskateStock.csv";

    let fileInputName = 'assets/csv/seba.csv'; 
    let fileOutputName = 'assets/json/seba_products.json';

    axios.get(url, {
        auth: {
            username: username,
            password: password
        }
    })
    .then(res=> {
        fs.appendFileSync(fileInputName, res.data);
        fs.stat(fileInputName, (error, stats) => {
            if (error) {
              console.log(error);
            }
            else {
              console.log("Path is file:", stats.isFile());
              csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);
            }
          })
          
    })
    .catch(err=> console.log(err))
};


