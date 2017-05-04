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
    },
    {
        name: "Killbear Provincial Park", 
        image: "https://lh5.googleusercontent.com/proxy/PBr2-J-cctW9O_Qc2WzqxjkquKHJXuRd-OpNb1bdEY4PRe_Zy9QguFEzDTbHoLCZWdD3bVXCBM3essG8u39nH0y-ghQWRyUCiezUATCfTYliZ6cqeSXNSiDOUsFDaNaURAD-1zRs4ZENRWc=w1064-h400-n-no",
        description: "Killbear Provincial Park is a provincial park located on Georgian Bay in the Parry Sound District of Ontario, near the town of Nobel. Killbear combines sandy beaches typical of the Great Lakes with the rock ridges and pines of the Canadian Shield."
    },
    {
        name: "Georgian Bay", 
        image: "https://lh4.googleusercontent.com/proxy/gXysfsYrRuwQz9DSzirF4hjpxR2k6sXa5AL6gETmOT7XpkRFUMeGJaXSisBZrzei5NgUQvaonRVpfNQin_18lJfNvRIhBV-ha_Z2NDZxBL4kOaVdUGuJUSZkkh60YH3Bz-gyAX1AwKBnUxA=w1064-h400-n-no",
        description: "Georgian Bay is the northeastern arm of Lake Huron, in Ontario. It’s characterized by rugged bedrock and white pine forests to the north and sandy southern beaches. Bruce Peninsula National Park on its western side includes part of the Bruce Trail along the Niagara Escarpment. Fathom Five National Marine Park is known for preserved shipwrecks, 19th-century lighthouses and Flowerpot Island’s sea-stack rock formations."
    },
    {
        name: "Sleeping Giant Provincial Park", 
        image: "https://lh4.googleusercontent.com/proxy/tYbW70rDQ4NvwgLm_3nYaOi4u7NVblil_A-7zX8wuUdZ9DbT0ikV7VdK_-ST713TsrRZGjpnBiDX8U8c8icZgX1FwqCFKl3oZn_ltUmkUlWMqJRzuJvqWLWhwrFshSidgiLkf3uKWILVMr4=w1064-h400-n-no",
        description: "Sleeping Giant Provincial Park, established in 1944 as Sibley Provincial Park and renamed in 1988, is a 244-square-kilometre park located on the Sibley Peninsula in Northwestern Ontario, east of Thunder Bay. The nearest communities are Pass Lake, located at the northern entrance to the park, and Dorion, located 35 kilometres NW, both in the township of Shuniah. The seasonal community of Silver Islet is located on the southern tip of the peninsula. The primary feature of the park is the Sleeping Giant, which is most visible from the city of Thunder Bay. The park occupies most of the lower portion of the peninsula excluding the area around the seasonal community of Silver Islet, and a portion of Thunder Cape which is designated as the Thunder Cape Bird Observatory. The eastern portion of the park is lowlands, while the western half is terrain composed of cliffs, valleys, and the mesa–cuestas which make up the Sleeping Giant formation. At its eastern edge, it will touch the future Lake Superior National Marine Conservation Area."
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