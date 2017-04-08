const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const data = [
    {
        name: "Algonquin Provincial Park", 
        image: "https://lh5.googleusercontent.com/proxy/VAHhrUzU9uNNwCPjdFAfMzqNpq5fNNI1WAjUiK7RFVt-It0MBi_EwQFwcqBjE-4tJMVcU7vvNrqDwFHe6C9whLvkDqOA8PHEzJe6IkCvx5UH_g8tbFRRgGYA_WVWaJtmkEwwcPukQ6_AW5Y=w1064-h400-n-no",
        description: "Algonquin Provincial Park is in southeastern Ontario, Canada. Its forests, rivers and numerous lakes, including the large Lake of Two Rivers, are home to moose, bears and common loons. The park’s many trails include the Whiskey Rapids Trail, along the Oxtongue River, and the Barron Canyon Trail, with views from the north rim. The Algonquin Logging Museum features a re-created camp and a steam-powered amphibious tug."
    },
    {
        name: "Tobermory", 
        image: "https://lh3.googleusercontent.com/proxy/qLDSaeVdk7fpY59_c6EifaVDbsVOWrqC91zTDj8Ru4aymjXGDNI17TVP1NKbGWy59B0BQoIJfZC4V8YO-cEATXCfsUTMzxXlHcSGniq9W7CFdY6RHxZ2qQwl9YEr9pNipihdaogbt53LhMk=w1064-h400-n-no",
        description: "Tobermory is a harbour village on the Bruce Peninsula in the province of Ontario. Just southeast, Bruce Peninsula National Park is known for the Bruce Trail footpath on the craggy Niagara Escarpment, and the Grotto, a wave-carved cave in Georgian Bay. The village lies next to Fathom Five National Marine Park, which is home to the Flowerpot Island sea stacks, 19th-century lighthouses and multiple shipwreck dive sites."
    },
    {
        name: "Bruce Peninsula National Park", 
        image: "https://lh3.googleusercontent.com/proxy/DRS7vfLb9F_Q_xSTG_iU6KHj0eiDTDFfEWDP0AnQnALCtn0JA-I3_WHGnmXYJSl9XKLgjabGdiNMi0HZHPmM3i7ePUTc8gGNBXEnP0XWxI98yyz2x4c8qZzivTvsZB79YfusLlE-5hHyDkY=w1064-h400-n-no",
        description: "Bruce Peninsula National Park is a national park on the Bruce Peninsula in Ontario, Canada. Located on a part of the Niagara Escarpment, the park comprises 156 square kilometres and is one of the largest protected areas in southern Ontario, forming the core of UNESCO's Niagara Escarpment World Biosphere Reserve. The park offers opportunities for many outdoor activities, including hiking, camping, and bird watching. The park has trails ranging in difficulty from easy to expert, and connects to the Bruce Trail. Bruce Peninsula National Park also offers visitors vistas to view either the sunrise or sunset, the rocks of the Niagara Escarpment, and the wildlife, which includes black bear, many species of birds, wild orchids, massassauga rattlesnake, and much more."
    }
];

function seedDB() {
    // remove all campgrounds
    Campground.remove({}, (err) => {
        if(err) {
            console.log(err);
        } 
        console.log("removed campgrounds!");
        // add campgrounds
        data.forEach((seed) => {
            Campground.create(seed, (err, campground) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log("added a campground");
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, (err, comment) => {
                            if(err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created a new comment");
                            }
                        });
                }
            });
        });
    });
}

module.exports = seedDB;