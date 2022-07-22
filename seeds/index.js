const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //no borrar autor principal 
            author: '62d471a5ef973a94c692ef18',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, dolorum vitae? Veniam, consequuntur ad ullam alias tempore odio sunt perspiciatis error quis molestiae deserunt necessitatibus ex, dignissimos inventore repellat laudantium.',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [{
                url: 'https://res.cloudinary.com/dnc65sxon/image/upload/v1658172962/YelpCamp/tlkqrisrdb7rvgtyz93x.jpg',
                filename: 'YelpCamp/tlkqrisrdb7rvgtyz93x',
            },
            {
                url: 'https://res.cloudinary.com/dnc65sxon/image/upload/v1658172962/YelpCamp/gzpbjqxp6m0geivrpzvx.jpg',
                filename: 'YelpCamp/gzpbjqxp6m0geivrpzvx',
            }
            ]
        })
        await camp.save()
    }
}
seedDb().then(() => {
    mongoose.connection.close()
})

