import "reflect-metadata"
import "dotenv"
import cors from "cors"
import {AppDataSource} from "./database/datasource"
import express from "express"
// Cria a nossa aplicação Express
const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
// Avisa o Express que vamos receber e enviar dados no formato JSON
app.use(express.json())
app.get("/", (req, res)=>{
    res.send("API Utilizadores da Unialfa está a funcionar!")
})

AppDataSource.initialize()
.then(()=>{
    console.log("Banco de Dados SQlite conectado com sucesso")



app.listen(Number(PORT), () => {
    console.log('Iniciou o servidor na porta:' +
        PORT
    )
})
})
.catch((erro)=>{
    console.log("Erro ao conectar ao banco de Dados",erro)
})
// Importe o repositório e o schema no topo do ficheiro
import { Utilizador } from "./models/utilizador";
import { UtilizadorSchema } from "./schemas/UtilizadorSchema";

// Rota para cadastrar utilizador
app.post("/usuarios", async (req, res) => {
    try {
        // 1. O Zod revista os dados (O Segurança)
       const validacao = UtilizadorSchema.safeParse(req.body);

if (!validacao.success) {
    // 1. Enviamos o erro com o status 400
    // O flatten().fieldErrors agrupa os erros pelo nome do campo (ex: email, senha)
    res.status(400).json({ 
        erros: validacao.error.flatten().fieldErrors 
    });
    
    // 2. Paramos a execução da função na linha de baixo, sozinho
    return; 
}

        // 2. Extrai os dados já validados e limpos
        const { nome, email, senha, idade } = validacao.data;

        // 3. O TypeORM prepara-se para falar com a tabela (O Estoquista)
        const repositorio = AppDataSource.getRepository(Utilizador);

        // REGRA DO TRABALHO: "E-mail não pode ser duplicado"
        const emailJaExiste = await repositorio.findOneBy({ email: email });
        if (emailJaExiste) {
            return res.status(400).json({ erro: "Este e-mail já está cadastrado." });
        }

        // 4. Cria e guarda no SQLite
        const novoUtilizador = repositorio.create({
            nome,
            email,
            senha,
            idade
        });

        await repositorio.save(novoUtilizador);

        // 5. Devolve a resposta de sucesso
        return res.status(201).json({
            mensagem: "Utilizador cadastrado com sucesso!",
            utilizador: novoUtilizador
        });

    } catch (erro) {
        console.log(erro);
        return res.status(500).json({ erro: "Erro interno no servidor." });
    }
});
