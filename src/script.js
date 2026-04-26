const buttonAnswer = document.getElementById("button-answer");
const buttonText = document.getElementById("button-text");
const cardText = document.getElementById("text-card");
const buttonIDK = document.getElementById("button-idk");

const input = document.querySelector("input[name=\"answer\"]");
const buttonSend = document.getElementById("button-send");

const feedbackMsg = document.getElementById("feedback-message");

const acertosText = document.getElementById("acertos");
const errosText = document.getElementById("erros");
const naoSabeText = document.getElementById("nao-sabe");

let score = {
    acertos: 0,
    erros: 0,
    naoSabe: 0
};

const pergunta = "Husmeada";
const resposta = "Estava bisbilhotando";

let mostrandoResposta = false;

// alterar pergunta/resposta
buttonAnswer.addEventListener("click", () => {
    if (!mostrandoResposta) {
        cardText.textContent = resposta;
        buttonText.textContent = "Ver pergunta";
    } else {
        cardText.textContent = pergunta;
        buttonText.textContent = "Ver resposta";
    }

    mostrandoResposta = !mostrandoResposta;
});

// nao sei
buttonIDK.addEventListener("click", () => {
    score = updateScore(score, "naoSabe")
    naoSabeText.textContent = `Nao sabe: ${score.naoSabe}`;
    blockReply(input, buttonSend, buttonIDK)
    naoSabeText.style.color = "black";
})

// validar resposta 
buttonSend.addEventListener("click", () => {
    const valor = input.value;

    if (valor.trim() === "") {
        alert("Digite uma resposta!");
        return;
    }

    if (isAnswerValid(valor, resposta)) {
        score = updateScore(score, "acerto");
        acertosText.textContent = `Acertos: ${score.acertos}`;
        acertosText.style.color = "black";

        const feedback = getFeedback("acerto");

        feedbackMsg.textContent = feedback.text;
        feedbackMsg.style.color = feedback.color;

        blockReply(input, buttonSend, buttonIDK)
    } else {
        score = updateScore(score, "erro");
        errosText.textContent = `Erros: ${score.erros}`;
        errosText.style.color = "black";

        const feedback = getFeedback("erro");

        feedbackMsg.textContent = feedback.text;
        feedbackMsg.style.color = feedback.color;

        blockReply(input, buttonSend, buttonIDK)
    }
});

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

function updateScore(score, type) {
    return {
        acertos: type === "acerto" ? score.acertos + 1 : score.acertos,
        erros: type === "erro" ? score.erros + 1 : score.erros,
        naoSabe: type === "naoSabe" ? score.naoSabe + 1 : score.naoSabe
    };
}

function blockReply(input, buttonSend, buttonIDK) {
    input.disabled = true;
    buttonSend.disabled = true;
    buttonIDK.disabled = true;
}

function getFeedback(type) {
    const messages = {
        acerto: { text: "Correto!", color: "green" },
        erro: { text: "Errado!", color: "red" },
    };

    return messages[type];
}
