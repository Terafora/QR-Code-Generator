import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer.prompt([
    {
        name: 'url',
        message: 'Enter the URL to generate QR code',
        type: 'input'
    }
]).then(answers => {
    const qrStream = qr.image(answers.url, { type: 'png' });
    const writeStream = fs.createWriteStream('qr.png');

    qrStream.pipe(writeStream)
        .on('error', (err) => {
            console.error('Error writing QR code to file:', err);
        });

}).catch(err => {
    console.log('An error occurred:', err);
});
