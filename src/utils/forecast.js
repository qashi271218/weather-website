const request = require('request');
// const forecast = (address, callback) => {
//     const url =
//         'http://api.openweathermap.org/data/2.5/weather?q=' +
//         address +
//         ',india&units=metric&APPID=9e45653694cbc67b68fcb1941c58a832';
//     request({ url: url }, (error, response) => {
//         if (error) {
//             callback('not connected to internet', 'not available');
//         } else {
//             const data = JSON.parse(response.body);
//             callback('no error', {
//                 temperature: `temperature in ${data.name} is ${data.main.temp} degree celcius with humidity ${data.main.humidity} with probability of ${data.weather[0].main}`
//             });
//         }
//     });
// };
// module.exports = forecast;
const forecast = (address, callback) => {
    const url =
        'http://api.openweathermap.org/data/2.5/weather?q=' +
        address +
        ',india&units=metric&APPID=9e45653694cbc67b68fcb1941c58a832';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else {
            // const data = JSON.parse(body);
            callback('no error',
                `temperature in ${body.name} is ${body.main.temp} degree celcius with humidity ${body.main.humidity} with probability of ${body.weather[0].main}`,
            );
        }
    });
};
module.exports = forecast;