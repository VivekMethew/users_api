var QRCode = require('qrcode')

module.exports = {
    qrcode_gn: (data) => {
        return new Promise((resolve, reject) => {
            var opts = {
                errorCorrectionLevel: 'H',
                type: 'image/jpeg',
                quality: 0.3,
                margin: 6,
                color: {
                    dark: "#1e272e",
                    light: "#ffffff"
                }
            }
            QRCode.toDataURL(JSON.stringify(data), opts, function(err, url) {
                if (err) {
                    reject(err)
                }
                resolve(url)
            })
        })
    }
}