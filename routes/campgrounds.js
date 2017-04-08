const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");

// index - show all campgrounds
router.get("/", (req, res) => {
    // get all campgrounds from db
	Campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    });
});

// create route
router.post("/", middleware.isLoggedIn, (req, res) => {
    // get data from form and add to campgrounds array
	const name = req.body.name;
	const image = req.body.image;
	const desc = req.body.description;
	const author = {
	    id: req.user._id,
	    username: req.user.username
	};
	const newCampground = {name: name, image: image, description: desc, author: author};
	// create a new campground and save to db
	Campground.create(newCampground, (err, newlyCreated) => {
	    if (err) {
	        console.log(err);
	    } else {
	        // redirect back to campgrounds page
	        res.redirect("/campgrounds");
	    }
	});
});

// new route
router.get("/new", middleware.isLoggedIn, (req, res) => {
	res.render("campgrounds/new");
});

// show route
router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if (err) {
            console.log(err);
        } else {
            //console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// edit campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

// update campground route
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    // redirect to the show page
});

// destroy campground route
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;