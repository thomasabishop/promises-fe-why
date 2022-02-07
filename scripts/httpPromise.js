const https = require('https');

module.exports = function (params) {
  return new Promise((resolve, reject) => {
    let req = https.request(params, (response) => {
      // Reject on network error
      if (response.statusCode < 200 || response.statusCode >= 300) {
        return reject(new Error('statusCode=' + response.statusCode));
      }
      // Aggregate response data
      let body = [];
      response.on('data', (chunk) => {
        body.push(chunk);
      });
      // resolve on end
      response.on('end', () => {
        try {
          body = JSON.parse(Buffer.concat(body).toString());
        } catch (e) {
          reject(e);
        }
        resolve(body);
      });
    });
    // Reject on request error
    req.on('error', (err) => {
      reject(err);
    });
    req.end();
  });
};
