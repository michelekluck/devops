function test(name, condition) {
    if (condition) {
        console.log("PASSOU: " + name);
    } else {
        console.log("FALHOU: " + name);
        process.exit(1);
    }
}

function isAnswerValid(value, rightAnswer) {
    const standardize = (text) =>
        text
            .toLowerCase()
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

    const v = standardize(value);
    const r = standardize(rightAnswer);

    return v.includes(r) || r.includes(v);
}

function updateScore(score, type) {
    return {
        acertos: type === "acerto" ? score.acertos + 1 : score.acertos,
        erros: type === "erro" ? score.erros + 1 : score.erros,
        naoSabe: type === "naoSabe" ? score.naoSabe + 1 : score.naoSabe
    };
}

function blockReply(input, button, buttonTwo) {
    input.disabled = true;
    button.disabled = true;
    buttonTwo.disabled = true;
}

function getFeedback(type) {
    const messages = {
        acerto: { text: "Correto!", color: "green" },
        erro: { text: "Errado!", color: "red" },
    };

    return messages[type];
}


test(
    "Resposta exata",
    isAnswerValid("Estava bisbilhotando", "Estava bisbilhotando")
);

test(
    "Resposta parcial",
    isAnswerValid("bisbilhotando", "Estava bisbilhotando")
);

test(
    "Ignora maiúscula",
    isAnswerValid("ESTAVA BISBILHOTANDO", "Estava bisbilhotando")
);

test(
    "Ignora espaço",
    isAnswerValid("  estava bisbilhotando  ", "Estava bisbilhotando")
);

test(
    "Resposta errada",
    !isAnswerValid("comendo", "Estava bisbilhotando")
);


const baseScore = { acertos: 0, erros: 0, naoSabe: 0 };

test(
    "Incrementa acertos",
    updateScore(baseScore, "acerto").acertos === 1
);

test(
    "Incrementa erros",
    updateScore(baseScore, "erro").erros === 1
);

test(
    "Incrementa naoSabe",
    updateScore(baseScore, "naoSabe").naoSabe === 1
);

const inputMock = { disabled: false };
const btnSendMock = { disabled: false };
const btnIDKMock = { disabled: false };

blockReply(inputMock, btnSendMock, btnIDKMock);

test(
    "Bloqueia input",
    inputMock.disabled === true
);

test(
    "Bloqueia botao enviar",
    btnSendMock.disabled === true
);

test(
    "Bloqueia botao nao sei",
    btnIDKMock.disabled === true
);

test(
    "Feedback acerto",
    getFeedback("acerto").text === "Correto!" &&
    getFeedback("acerto").color === "green"
);

test(
    "Feedback erro",
    getFeedback("erro").text === "Errado!" &&
    getFeedback("erro").color === "red"
);

console.log("\n✔ TODOS OS TESTES PASSARAM")