import express from 'express';
import mysql2 from 'mysql2/promise';

const app = express();
const port = 3000;

app.use(express.json());

const pool = mysql2.createPool({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'users_db',
    port:'3306',
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

app.listen(port, () => {
    console.log(`servidor hospedado na porta ${port}`)
});