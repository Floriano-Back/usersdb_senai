import 'dotenv/config';
import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const port = process.env.SERVER_PORT;

app.use(express.json());

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections:true,
    connectionLimit: 10,
    queueLimit: 0
});

app.get("/users", async (req,res) => {
    try{
        const [rows] = await pool.query("SELECT * FROM users");
   
        res.json({result: rows});

    }catch(error){
        console.error("erro ao buscar os usuarios:", error);
        res.status(500).json({error: "Erro ao buscar os usuarios"})
    }
   
});

app.post("/users", async (req,res) =>{
    try{
        const {nome, sexo} = req.body;        
        const [result] = await pool.query("INSERT INTO users (nome, sexo) VALUES (?, ?);", [nome, sexo]);        
        res.status(201).json({status: "Usuario cadastro com sucesso"});

    }catch(error){
        console.error("erro no cadastro do usuario:", error);
        res.status(500).json({erro: "Não foi possivel cadastrar esse usuario"});
    }
});

app.delete("/users/:id", async (req,res) =>{
    try{
        const {id} = req.params;
        const [result] = await pool.query("DELETE FROM users WHERE id = ?;",[id]);
        res.status(200).json({msg: "Usuario deletado com sucesso"});

    }catch(error){
        console.error("Erro ao deletar um usuario:", error);
        res.status(500).json({erro: "Não foi possivel deletar o usuario."});
}});

app.patch("/users/:id", async (req,res) =>{
    try{
        const {id} = req.params;
        const {nome,sexo} = req.body;
        const [result] = await pool.query("UPDATE users SET (nome, sexo) WHERE id = ?", [id,nome,sexo]);

    }catch(error){
        console.error("Erro ao atualizar um usuario:", error);
        res.status(500).json({erro: "Não foi possivel atualizar o usuario."});
}});

app.listen(port, () => {
    console.log(`servidor hospedado na porta ${port}`)
});