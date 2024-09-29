const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
const { send } = require("process");

app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static (path.join(__dirname,"public")));

let posts = [
    {
        id: uuidv4(),
        username: "techenthusiast",
        content: "The future of AI is here! As businesses embrace artificial intelligence, we see improvements in efficiency and innovation. From smart assistants to predictive analytics, AI is transforming the way we work and live. Embrace the change!"

    },
    {
        id: uuidv4(),
        username: "foodlover123",
        content: "Just returned from Italy, and the food was incredible! From homemade pasta to authentic pizza, each meal was a delight. I even took a cooking class in Tuscany—what an experience! Can't wait to recreate these dishes at home."
    },
    {
        id: uuidv4(),
        username: "travelbug",
        content: "Southeast Asia is full of hidden gems! My recent adventure took me to stunning beaches and vibrant local markets. Each destination offered unique experiences and breathtaking views. If you love travel, this region is a must-visit!"
    }
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{ posts });
})

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
})
app.get("/posts/:id",(req,res)=>{
  let { id } = req.params;
  let post = posts.find((p)=> id === p.id);
  res.render("show.ejs",{ post });
})
app.patch("/posts/:id",(req,res)=>{
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id === p.id);
    post.content = newContent;
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    let { id } = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs",{ post });
})
app.delete("/posts/:id",(req,res)=>{
    let { id } = req.params;
     posts = posts.filter((p)=> id !== p.id);
     res.redirect("/posts");
})

app.listen(port,()=>{
    console.log("listing to the port 8080");    
})