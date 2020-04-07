const request = require('request');
// const geoCode = function(address, callback) {
//     const url =
//         'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
//         address +
//         '.json?access_token=pk.eyJ1IjoicWFzaGkxNDMiLCJhIjoiY2s4aWUxM3d3MDU1ZTNscGZ0ZTV3MGdvciJ9.iv94_6XvXshQlCXw8YuGiQ';
//     request({ url: url }, (error, response) => {
//         if (error) {
//             callback('unable to connect to internet', undefined);
//         } else {
//             const data = JSON.parse(response.body);
//             callback('no error', {
//                 latitude: data.features[0].center[1],
//                 longitude: data.features[0].center[0],
//                 location: data.features[0].place_name
//             });
//         }
//     });
// };
// module.exports = geoCode;

const geoCode = function(address, callback) {
    const url =
        'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        address +
        '.json?access_token=pk.eyJ1IjoicWFzaGkxNDMiLCJhIjoiY2s4aWUxM3d3MDU1ZTNscGZ0ZTV3MGdvciJ9.iv94_6XvXshQlCXw8YuGiQ';
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
            });
        }
    });
};
module.exports = geoCode;