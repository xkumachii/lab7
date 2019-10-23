const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public")); //folder for images, css, js

const request = require("request");



//routes
app.get("/", async function(req, res){
    
    let parsedData = await getImgs("otters");
    
    console.log("parsed data:" + parsedData);
    
    res.render("index", {"image": parsedData.hits[0].largeImageURL});
    
}); // root and route can be a homophone depending on where you lived

app.get("/results", async function(req, res){
    
    // console.dir(req);
    
    let keyword = req.query.keyword; // gets value that user types 
    
    let parsedData = await getImgs(keyword);
    
    
    
    res.render("results", {"images": parsedData});
    
}); // results


// return items from jason
function getImgs(s) {
    
    return new Promise(function(resolve, reject){
        let parsedData = "";
        
        request("https://pixabay.com/api/?key=13797842-30194f345aadde7f2e5ce2c85&q=" + s, 
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
