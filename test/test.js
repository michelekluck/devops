function isAnswerValid(valor, respostaCorreta) {
    const normalizar = (texto) =>
        texto
            .toLowerCase()
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

    const v = normalizar(valor);
    const r = normalizar(respostaCorreta);

    return v.includes(r) || r.includes(v);
}

function teste(nome, condicao) {
    if (condicao) {
        console.log("PASSOU: " + nome);
    } else {
        console.log("FALHOU: " + nome);
        process.exit(1);
    }
}

teste(
    "Resposta exata",
    respostaEhValida("Estava bisbilhotando", "Estava bisbilhotando")
);

teste(
    "Resposta parcial",
    respostaEhValida("bisbilhotando", "Estava bisbilhotando")
);

teste(
    "Ignora maiúscula",
    respostaEhValida("ESTAVA BISBILHOTANDO", "Estava bisbilhotando")
);

teste(
    "Ignora espaço",
    respostaEhValida("  estava bisbilhotando  ", "Estava bisbilhotando")
);

teste(
    "Resposta errada",
    !respostaEhValida("comendo", "Estava bisbilhotando")
);