const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');
const req = require('express/lib/request');

mongoose.connect('mongodb://localhost:27017/yelp-camp')
    .then(() => {
        console.log("Database connected");
    })
    .catch(error => {
        console.error("Connection error:", error);
    });

mongoose.connection.on('connected', () => console.log('connected'));

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i <400; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // USER ID
            author: '68b728978d7a2585481dd934',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere explicabo laudantium possimus sint veritatis perferendis repudiandae voluptatum quasi quo, esse, praesentium hic vitae nam doloremque. Quasi, dicta. Deleniti, consectetur tempore!',
            price,
            geometry: { 
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ] 
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dpfmu5i9p/image/upload/v1757177157/YelpCamp/qnogwyh2llyaqjtd41cd.jpg',
                    filename: 'YelpCamp/onvswwd4ecysfzpwvsmg',
                },
                {
                    url: 'https://res.cloudinary.com/dpfmu5i9p/image/upload/v1757077528/YelpCamp/uilziyybpjsohchhj07j.jpg',
                    filename: 'YelpCamp/uilziyybpjsohchhj07j',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})