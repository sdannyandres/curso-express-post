const ex = require('express');

const app = ex();

app.use(ex.json())
app.use(ex.urlencoded({extended:true}))

app.get("/", function (req, res) {
    res.send("Hello World!")

})


app.post("/echoPost", (req, res) => {
    res.send({dody:req.body})

})
app.post("/echoPostJson", (req, res) => {
    res.send({dodyJson:req.body})

})
app.post("/echoPostExtended", (req, res) => {
    res.send({dodyJson:req.body})

})
app.post("/addUser", (req, res) => {
    res.status(200).send("He añadido un usuario")
    })

app.listen(3344)