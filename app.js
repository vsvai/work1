const express = require("express");
// var _ = require('lodash');
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));
// app.use(bodyParser.json())
mongoose.connect("mongodb://localhost:27017/EventDB",{useNewUrlParser:true,useUnifiedTopology:true});
const eventDataSchema = new mongoose.Schema({
    eventName   : String,
    username    : String,
    email       : String,
    contact     : Number
}); 
const Event = new mongoose.model("event",eventDataSchema);
app.get("/",(req,res)=>{
    // res.send("Hii man i am from server");
    res.render("home.ejs");
});
app.get("/addEvent",(req,res)=>{
    res.render("register.ejs");
});
app.post("/addEvent",(req,res)=>{
    console.log(req.body);
    var newUser = new Event({
        eventName   : "Demo Event",
        username    : req.body.username,
        email       : req.body.email,
        contact     : req.body.contact 
    });
    newUser.save();
    res.redirect("/");
});

// app.get("/music/:playlistName",function(req,res){
//     var playlistName = (req.params.playlistName).toLowerCase();
//     Playlist = new mongoose.model(playlistName,playlistSchema);
//     playlistName = _.capitalize(playlistName);
//     Playlistrecord.find({playlistName : playlistName},function(err,name){
//             if(!err){
//                 if(name==""){
//                     var newrecord = new Playlistrecord({
//                         playlistName : playlistName
//                     });
//                     newrecord.save();
//                 }
//             }else{
//                 res.send(err);
//             }
//     });
//     var playlistRecord;
//     Playlistrecord.find(function(err,obj){
//         if(!err){
//             playlistRecord = obj;
//         }else{
//             res.send(err);
//         }
//     });
//     Playlist.find(function(err,playlist){
//         if(!err){
//             res.render("music",{Playlist:playlist,playlistName:playlistName,Playlistrecord:playlistRecord});
//         }else{
//             res.send(err);
//         }
//     });
    
// });
// app.post('/music/:playlistName', songUpload, (req, res) => {
//     var playlistName = (req.params.playlistName).toLowerCase();
//     Playlist = new mongoose.model(playlistName,playlistSchema); 
//     var music = new Playlist({
//         file : req.files["myfile"][0],
//         image : req.files["image"][0]
//     });
//     music.save();
//     res.redirect("/music/"+playlistName);
// });

app.listen(8000,function(){
    console.log("Server Is Running");
});



