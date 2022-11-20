const ex = require('express');

const app = ex();

app.use(ex.json())
app.use(ex.urlencoded({extended:true}))

app.get("/", function (req, res) {
    res.send("Hello World!")

})


app.post("/echoPost", (req, res) => {
    res.send({body:req.body})

})
app.post("/echoPostJson", (req, res) => {
    res.send({bodyJson:req.body})

})
app.post("/echoPostExtended", (req, res) => {
    res.send({bodyJson:req.body})

})
app.post("/echoPostJson", (req, res) =>{
    res.send({bodyJson:req.body, qs:req.query})
})

app.post("/echoParamsPost/:cliente/facturas/:factura", (req, res) =>{
    res.send({
        body:req.body, 
        query:req.query,
        params:req.params
    })
})

app.get("/echoParamsGet/:cliente/facturas/:factura", (req, res) =>{
    res.send({
        body:req.body, 
        query:req.query,
        params:req.params
    })
})


app.post("/addUser", (req, res) => {
    res.status(200).send("He añadido un usuario")
    })

app.listen(3344)