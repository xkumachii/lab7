const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public")); //folder for images, css, js

const request = require("request");

const _ = require("underscore");




//routes
app.get("/", async function(req, res){
    
    let searchData = ["otters", "fairy", "food", "internet"];
    
    let parsedData = await getImgs(searchData[Math.floor(Math.random() * searchData.length)], "horizontal");
    
    // console.log("parsed data:" + parsedData);
    
    res.render("index", {"image": parsedData.hits[Math.floor(Math.random() * parsedData.hits.length)].largeImageURL});
    
}); // root and route can be a homophone depending on where you lived

app.get("/results", async function(req, res){
    

    let keyword = req.query.keyword; // gets value that user types 
    
    let orientation = req.query.orientation; // gets value that user types 
    
    // console.log(orientation);
    
    let parsedData = await getImgs(keyword, orientation);
    
    let shuffledPics = _.shuffle(parsedData.hits);
    
    res.render("results", {"images": shuffledPics});
    
});


// return items from jason
function getImgs(s, o) {
    
    return new Promise(function(resolve, reject){
        let parsedData = "";
        
        request("https://pixabay.com/api/?key=13797842-30194f345aadde7f2e5ce2c85&q=" + s + "&orientation=" + o, 
                function(error, response, body) {
    
            if (!error && response.statusCode == 200) {
                parsedData = JSON.parse(body);
                
                resolve(parsedData);
                
            } else {
                reject(error);
                console.log(response.statusCode);
                console.log(error);
            }
        });
    });
}

//starting server
app.listen(process.env.PORT, process.env.IP, function(){
    
    console.log("Express server is running...");
});
