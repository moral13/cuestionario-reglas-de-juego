document.addEventListener('DOMContentLoaded', function () {
    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    // Cargar las preguntas desde el archivo JSON
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            questions = data;
            displayQuestion();
        });

    // Mostrar la pregunta actual
    function displayQuestion() {
        const quizContainer = document.getElementById('quiz-container');
        quizContainer.innerHTML = '';

        const question = questions[currentQuestionIndex];
        const questionElement = document.createElement('div');
        questionElement.classList.add('question');
        questionElement.innerText = question.question;
        quizContainer.appendChild(questionElement);

        const optionsElement = document.createElement('ul');
        optionsElement.classList.add('options');
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('li');
            optionElement.innerHTML = `<input type="radio" name="option" value="${index}"> ${option}`;
            optionsElement.appendChild(optionElement);
        });

        quizContainer.appendChild(optionsElement);
    }

    // Manejar el envío de respuestas
    document.getElementById('submit-button').addEventListener('click', function () {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            const answer = parseInt(selectedOption.value);
            if (answer === questions[currentQuestionIndex].answer) {
                score++;
            }
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                displayQuestion();
            } else {
                showResult();
            }
        } else {
            alert('Por favor, selecciona una respuesta.');
        }
    });

    // Mostrar los resultados
    function showResult() {
        const resultContainer = document.getElementById('result');
        resultContainer.innerText = `Tu puntaje es: ${score} de ${questions.length}`;
    }
});
