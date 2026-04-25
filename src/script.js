const buttonAnswer = document.getElementById("button-answer");
const buttonText = document.getElementById("button-text");
const cardText = document.getElementById("text-card");

const input = document.querySelector('input[name="answer"]');
const buttonSend = document.querySelector(".button-send")

const acertosText = document.getElementById("acertos");
let acertos = 0;

const pergunta = "Husmeada";
const resposta = "Estava bisbilhotando"

let mostrandoResposta = false;

// alterar pergunta/resposta
buttonAnswer.addEventListener("click", () => {
    if (!mostrandoResposta) {
        cardText.textContent = resposta;
        buttonText.textContent = "Ver pergunta"
    } else {
        cardText.textContent = pergunta;
        buttonText.textContent = "Ver resposta"
    }

    mostrandoResposta = !mostrandoResposta;
});

// validar resposta 
buttonSend.addEventListener("click", () => {
    const valor = input.value;

    if (valor.trim() === "") {
        alert("Digite uma resposta!");
        return;
    }

    if (isAnswerValid(valor, resposta)) {
        alert("acertou!")

        acertos++;
        acertosText.textContent = `Acertos: ${acertos}`

        input.disabled = true;
        buttonSend.disabled = true;
    } else {
        alert("errou!")
    }
})

function isAnswerValid(valor, respostaCorreta) {
    const normalizar = (texto) =>
        texto
            .toLowerCase()
            .trim()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")

    const v = normalizar(valor);
    const r = normalizar(respostaCorreta);

    return v.includes(r) || r.includes(v);
}
