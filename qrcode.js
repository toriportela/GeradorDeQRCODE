const fs = require('fs');
const qr = require('qrcode');
const path = require('path');

// lê os links
fs.readFile('links.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const lines = data.trim().split('\n');

    lines.forEach((line, index) => {
        const [link, fileName] = line.split(' - ');

        const folderName = 'QRCODES';

        // verifica se a pasta já existe se não, a cria
        if (!fs.existsSync(folderName)) {
            fs.mkdirSync(folderName);
        }

        const filePath = path.join(folderName, `${fileName.trim()}.png`);

        // especifica a largura, altura e margem do QR code
        qr.toFile(filePath, link.trim(), {
            width: 400,
            height: 400,
            margin: 1
        }, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`QR code gerado para o link: ${link} e salvo como: ${filePath}`);
        });
    });
});
