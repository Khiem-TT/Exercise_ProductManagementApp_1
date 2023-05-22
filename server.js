let http = require('http');
let fs = require('fs');

let server = http.createServer((req, res) => {
    let dataFile = '';
    let html = '';
    fs.readFile('./products.json', 'utf-8', (err, data) => {
        dataFile = JSON.parse(data);
        dataFile.forEach((value, index) => {
            html += '<tr>';
            html += `<td>${index + 1}</td>`;
            html += `<td>${value.name}</td>`;
            html += `<td>${value.price}</td>`;
            html += `<td><button style="background-color: red">Delete</button></td>`;
            html += `<td><button style="background-color: blue">Update</button></td>`;
            html += '</tr>';
        });
    });
    fs.readFile('./listproducts.html', 'utf-8', (err, data) => {
        res.writeHead(200, {'Content-Type': 'text/html'});
        data = data.replace('{list-products}', html);
        res.write(data);
        res.end();
    });
});

server.listen(8000, () => {
    console.log('http://localhost:8000');
});