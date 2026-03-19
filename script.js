const seeAnswer = document.getElementById('button-answer');
const cardText = document.querySelector('.text-card');

seeAnswer.onclick = function () {
    cardText.textContent = 'Estava bisbilhotando';
}