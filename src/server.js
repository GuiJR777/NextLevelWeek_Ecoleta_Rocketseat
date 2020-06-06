const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db")

//configurar pasta publica
server.use(express.static("public"))

//habilitar o uso do req body(recupera o formulario)
server.use(express.urlencoded({ extended: true }))

//usando o template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar os caminhos (req= requisição, res= resposta)

server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {

    return res.render("create-point.html")
})



server.post("/savepoint", (req, res) => {

    //inserir dados no banco de dados
    //inserir dados
    const querry = `
     INSERT INTO places (
         image, 
         name,
         adress,
         adress2,
         state,
         city,
         itens
     ) VALUES ( ?,?,?,?,?,?,? );
 `

    const values = [
        req.body.image,
        req.body.name,
        req.body.adress,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.Itens
    ]

    function afterInsertData(err) {
        if (err) {

            return res.send("Erro no cadastro!")
        }


        return res.render("create-point.html", { saved: true })
    }

    db.run(querry, values, afterInsertData)


})





server.get("/search", (req, res) => {

    const search = req.query.search

    if (search == "") {
        //pesquisa vazia
        return res.render("search-results.html", { total: 0 })
    }

    //pegar dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        const total = rows.length
        //mostrar html com dados do BD
        return res.render("search-results.html", { places: rows, total: total })
    })

})

server.get("/searchAll", (req, res) => {
    db.all(`SELECT * FROM places`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        const total = rows.length
        //mostrar html com dados do BD
        return res.render("search-results.html", { places: rows, total: total })
    })

})



server.listen(3000)