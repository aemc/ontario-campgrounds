const reseedDatabase = false;

const express = require("express"),
          app = express(),
   bodyParser = require("body-parser"),
     mongoose = require("mongoose"),
     passport = require("passport"),
LocalStrategy = require("passport-local"),
         User = require("./models/user"),
        flash = require("connect-flash"),
methodOverride = require("method-override"),
       seedDB = require("./seeds");

const commentRoutes = require("./routes/comments"),
      campgroundRoutes = require("./routes/campgrounds"),
      indexRoutes = require("./routes/index");
    
mongoose.connect("mongodb://localhost/yelp_camp");
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public")); 
app.use(methodOverride("_method"));
app.use(flash());

if (reseedDatabase) { seedDB(); }

app.use(require("express-session") ({
    secret: "Once again Rusty wins award.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// adds currentUser to every template
app.use((req, res, next) => {
    res.locals.currentUser = req.user; 
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes); // appends "/campgrounds" infront of campground routes

app.listen(3000, () => {
    console.log("Server has started.");
}); 