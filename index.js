

const fs = require('fs').promises;
const https = require('https');


let url = "https://jsonplaceholder.typicode.com/users/";

https.get(url,(res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            let json = JSON.parse(body);

            async function openFile() {
            try {
                const csvHeaders = 'Name,Username,Email,ZipCode'
                await fs.writeFile('User_records.csv', csvHeaders);
            } catch (error) {
                console.error(`Got an error trying to write to a file: ${error.message}`);
            }
            }

            async function addUserData(name, username, email, zipcode) {
            try {
                const csvLine = `\n${name},${username},${email},${zipcode}`
                await fs.writeFile('User_records.csv', csvLine, { flag: 'a' });
            } catch (error) {
                console.error(`Got an error trying to write to a file: ${error.message}`);
            }
            }

            (async function () {
            await openFile();
            json.forEach(async element => {                
                await addUserData(element.name, element.username, element.email, element.address.zipcode);
            });
            })();
        }catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});