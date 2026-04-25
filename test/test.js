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
    isAnswerValid("Estava bisbilhotando", "Estava bisbilhotando")
);

teste(
    "Resposta parcial",
    isAnswerValid("bisbilhotando", "Estava bisbilhotando")
);

teste(
    "Ignora maiúscula",
    isAnswerValid("ESTAVA BISBILHOTANDO", "Estava bisbilhotando")
);

teste(
    "Ignora espaço",
    isAnswerValid("  estava bisbilhotando  ", "Estava bisbilhotando")
);

teste(
    "Resposta errada",
    !isAnswerValid("comendo", "Estava bisbilhotando")
);