const ex = require("express");
const fileUpload = require("express-fileupload");
const app = ex();
app.use(ex.static("public",{
    index:"myIndex.html"
}))

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
}))

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