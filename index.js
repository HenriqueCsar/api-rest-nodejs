const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


var Escola = {
    turmas: [
        {
            id: 1,
            aluno: "Henrique",
            ano: 2022,
            curso: "Sistema de informação"
        },
        {
            id: 2,
            aluno: "Lucas",
            ano: 2022,
            curso: "Ciências da Computação"
        },
        {
            id: 3,
            aluno: "João",
            ano: 2022,
            curso: "Fisioterapia"
        }
    ]
}

app.get("/turmas",(req, res) => {
    res.statusCode = 200;
    res.json(Escola.turmas);
});

app.get("/turma/:id",(req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        
        var id = parseInt(req.params.id);

        var turma = Escola.turmas.find(g => g.id == id);

        if(turma != undefined){
            res.statusCode = 200;
            res.json(turma);
        }else{
            res.sendStatus(404);
        }
    }
});

app.post("/turma",(req, res) => { 
    var {id, aluno, ano, curso} = req.body;
    Escola.turmas.push({
        id,
        aluno,
        ano,
        curso
    });
    res.sendStatus(200);
})

app.delete("/turma/:id",(req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        var id = parseInt(req.params.id);
        var index = Escola.turmas.findIndex(g => g.id == id);

        if(index == -1){
            res.sendStatus(404);
        }else{
            Escola.turmas.splice(index,1);
            res.sendStatus(200);
        }
    }
});

app.put("/turma/:id",(req, res) => {

    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }else{
        
        var id = parseInt(req.params.id);

        var turma = Escola.turmas.find(g => g.id == id);

        if(turma != undefined){

            var {aluno, ano, curso} = req.body;

            
            if(aluno != undefined){
                turma.aluno = aluno;
            }

            if(ano != undefined){
                turma.ano = ano;
            }

            if(curso != undefined){
                turma.curso = curso;
            }
            
            res.sendStatus(200);

        }else{
            res.sendStatus(404);
        }
    }

});

app.listen(8080,() => {
    console.log("RESP API SISTEMA ESCOLAR RODANDO...");
});