import https from 'https'
import fs from 'fs'

const URLS = [
    { filename: "shakespeare", path: "https://poetrydb.org/author,linecount/Shakespeare;14/lines" },
    { filename: "dickinson", path: "https://poetrydb.org/author/Dickinson/lines" },
    { filename: "tennyson", path: "https://poetrydb.org/author/Tennyson/lines" },
    { filename: "keats", path: "https://poetrydb.org/author/Keats/lines" },
    { filename: "bronte", path: "https://poetrydb.org/author/Bronte/lines" },
]

let promisify = (url) => {
    return new Promise((resolve, reject) => {
        let body = "";
        https.get(url, res => {
            res.on("data", chunk => { body += chunk })
            res.on("end", () => {
                resolve(body);
            })
        })
    });
}


for (let url of URLS) {
    console.log(`Saving to ${url.filename}.json`)
    const response = await promisify(url.path);
    await fs.writeFile(`poetrydb/${url.filename}.json`, response, () => {});
}

await fs.writeFile("poetrydb/updated.txt", new Date().toLocaleString(), () => {});
console.log("Poetry DB updated")