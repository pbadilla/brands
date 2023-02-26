const ftp = require("basic-ftp")
let csvToJson = require('convert-csv-to-json');

example()

async function example() {
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
