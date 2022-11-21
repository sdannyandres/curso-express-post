const ex = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const app = ex();

app.use(morgan('tiny', {
    skip: function (req, res) {
        return res.statusCode < 400}
    }))

app.use(ex.static("public",{
    index:"myIndex.html"
}))

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
}))

app.use(ex.json())
app.use(ex.urlencoded({extended:true}))

app.get("/welcome",function(req,res){
    res.send("Welcome to my server")
})



app.post("/uploadFicheros",async(req,res)=>{
     const f1 = req.files.file1
     await f1.mv('uploads/${f1.name}')
     res.send({body:req.body, fichero:{
        nombre : req.files.file1.name
     }})

})

app.post("/uploadFicherosMultiple", async (req, res) => {
    for (const [index,file] of req.files.ficheros.entries()) {
        await file.mv('uploads/${file.name}')
    }
    res.send("ficheros subidos")
}
)
    
        
app.listen(3344)