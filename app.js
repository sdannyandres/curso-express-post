const ex = require("express");
const morgan = require("morgan");
const fs = require("fs")
const fileUpload = require("express-fileupload");
const app = ex();
const { Pool } = require('pg');

const pool = new Pool({
    localhost: "localhost",
    port: 5499,
    user: "postgres",
    password: "123456"
})

const logOutputErrores = fs.createWriteStream("uploads/logsErrores.txt", {
    flags: "a"
})
const logOutputBuenos = fs.createWriteStream("uploads/logsBuenos.txt", {
    flags: "a"
})
app.use(morgan('combined', {
    skip: (req, res) => res.statusCode < 400,
    stream: logOutputErrores
}))

app.use(morgan('tiny', {
    skip: (req, res) => res.statusCode < 400,
    stream: logOutputErrores
}))



app.use(ex.static("public", {
    index: "myIndex.html"
}))

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }
}))

app.use(ex.json())
app.use(ex.urlencoded({ extended: true }))

app.get("/welcome", function (req, res) {
    res.send("Welcome to my server")
})



app.post("/uploadFicheros", async (req, res) => {
    const f1 = req.files.file1
    await f1.mv('uploads/${f1.name}')
    res.send({
        body: req.body, fichero: {
            nombre: req.files.file1.name
        }
    })

})

app.post("/uploadFicherosMultiple", async (req, res) => {
    for (const [index, file] of req.files.ficheros.entries()) {
        await file.mv('uploads/${file.name}')
    }
    res.send("ficheros subidos")
}
)
//-- para acceder a todos los clientes--//
app.get("/bdd/customers", async (req, res) => {
    try {
        const respuesta = await pool.query("select * from customers");
        res.send(respuesta.rows)
    } catch (error) {
        res.status(500).send(error)

    }

})
//-- para acceder al cliente por su identificacion o nombre en la base de datos--//
app.get("/bdd/customers/:id", async (req, res) => {
    try {
        const respuesta = await pool.query("select * from customers where customer_id = $1", [req.params.id])
        res.send(respuesta.rows)
    } catch (error) {
        res.status(500).send(error)
    }
})
//--para acceder a las ordenes de un cliente en la base de datos--//
app.get("/bdd/orders/:cliente/:id", async (req, res) => {
    try {
        const respuesta = await pool.query("select * from orders where customer_id = $1, and order_id =$2"
        [req.params.cliente, req.params.id])
      if (respuesta.rows.length == 0) {  
        res.status(404).send({descripcion:"no existe la factura cliente"})
    } else {
    res.send (respuesta.row[0]) 
    }
    }   catch (error) {
        res.status(500).send(error)
    }
})


app.listen(3344)