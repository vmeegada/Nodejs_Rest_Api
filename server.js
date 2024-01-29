let express=require("express");
let app =express();
let db=require("./db");
//midleware
app.use(express.json());
//app.use(express.urlencoded())
app.listen (3000,()=>{
    console.log(`server start at 3000`); 
})


// app.get("/",(req,res)=>{
//    res.sendFile(__dirname+"/h1.html");
// })

// app.get("/college",(req,res)=>{
//     res.send(`<ol>
//     <li>list1</li>
//     <li>list 2</li>
//     <li> list 3</li>
//     </ol>`);
//  })
//  app.get("/hello",(req,res)=>{
//     res.send("Hello to my world");
//  })
 
app.get("/mobiles",(req,res)=>{
   db.getMobiles()
   .then((rowdata)=>{
      res.send(rowdata)
   })
   .catch(()=>{res.send("error")})
   })


app.post("/mobiles",(req,res)=>{ 
   db.addMobiles(req.body.name,req.body.price,req.body.ram,req.body.storage)
   //by using req.body if u want to get res we use middleware -->body-->app.use(express.json())
   //for urls-->app.use(express.urlencoded({extended:true}))
   .then(()=>{
      res.send(req.body)
   })
   .catch(()=>{res.send("error")})
})


app.put("/mobiles",(req,res)=>{
    db.updateMobiles(req.body.id,req.body.name,req.body.price,req.body.ram,req.body.storage)
   .then(()=>{
      res.send(req.body)
   })
   .catch(()=>{res.send("error")})})


app.delete("/mobiles",(req,res)=>{ 
   db.deleteMobiles(req.body.id)
   .then(()=>{
      res.status(200).send("sucessfully deleted")
   })
   .catch((err)=>{res.send(err)})})