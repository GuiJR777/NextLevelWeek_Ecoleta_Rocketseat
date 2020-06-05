//importar dependencias sql3
const sqlite3= require("sqlite3").verbose()

//criar o objeto que ira operar o banco de dados
const db= new sqlite3.Database("./src/database/database.db")

module.exports= db


//utilizar o banco de dados nas operações

/* db.serialize(()=>{
    //criar uma tabela com comandos sql
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            adress TEXT,
            adress2 TEXT,
            state TEXT,
            city TEXT,
            itens TEXT
        );
    `)

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
        "https://odivisor.com.br/libs/thumb.php?src=/cms/files/noticias/6602/papelai.jpg&w=600&h=400",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Residuos Eletrônicos, Lâmpada"
    ]
    
    function afterInsertData(err){
        if(err){
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
    }

   db.run(querry, values, afterInsertData)
   

    // deletar um dado
    db.run(`DELETE FROM places WHERE id= ?`, [4], function(err){
        if(err){
            return console.log(err)
        }
        
        console.log("Registro deletado com sucesso!")
    })

    //consultar dados
    // db.all("SELECT name FROM places", function(err, rows){
    //     if(err){
    //         return console.log(err)
    //     }

    //     console.log("Aqui estão seus registros: ")
    //     console.log(rows)})

}) */