const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const PORT = 3300;
app.use(cors());
app.use(express.json());

//ROUTES

//Criar publicacao

app.post("/publicacao", async (req, res) => {
  try {
    const { descricao } = req.body;
    const novaPublicacao = await pool.query(
      "INSERT INTO publicacoes (descricao) VALUES($1) RETURNING * ",
      [descricao]
    );
    res.json(novaPublicacao.rows[0]);

    console.log(req.body);
  } catch (err) {
    console.error(err.message);
  }
});

//pegar todas as publicacoes

app.get("/publicacoes", async(req,res) => {
  try {
    const pegarTodos = await pool.query("select * from publicacoes")
    res.json(pegarTodos.rows)
  } catch (err) {
    console.error(err.message);
    
  }
})

//pegar uma publicacao

app.get("/publicacoes/:id", async(req,res) => {
  try {
    const {id} = await req.params;
    const publicacao = await pool.query("SELECT * FROM publicacoes where publicacao_id = $1", [id])

    res.json(publicacao.rows[0])
  } catch (err) {
    console.error(err.message);
    
  }
})

//update publicacao
app.put("/publicacoes/:id", async(req,res) => {
  try {
    const {id} = await req.params;
    const { descricao } = req.body;
    const updatePublicacao = await pool.query("UPDATE publicacoes SET descricao = $1 WHERE publicacao_id = $2",
    [descricao, id]);

    res.json('Descrição atualizada')
  } catch (err) {

    console.error(err.message);
    
  }
})

//deletar publicacao

app.delete("/publicacoes/:id", async(req, res) => {
  try {
    const {id} = req.params;
    const deletePublicacao = await pool.query("DELETE FROM publicacoes WHERE publicacao_id = $1", [id]);
    res.json('Publicacao Deletada')
  } catch (err) {
    console.error(err.message)    
  }
})

app.listen(PORT, () => {
  console.log("🔥🔥Server has started on}", PORT);
});
