const fs = require('fs')

module.exports = async (req, error) => {
    const requestURL = req.protocol + '://' + req.get('host') + req.originalUrl;
    const requestBody = JSON.stringify(req.body);
    const date = new Date().toISOString();
    fs.appendFileSync(
        'errorLog.log',
        'REQUEST DATE : ' +
        date +
        '\n' +
        'API URL : ' +
        requestURL +
        '\n' +
        'API PARAMETER : ' +
        requestBody +
        '\n' +
        'Error : ' +
        error +
        '\n\n'
    );
}