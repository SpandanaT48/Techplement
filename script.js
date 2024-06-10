let quizzes = [];
let currentQuiz = null;

function createQuiz() {
    const topic = document.getElementById('quiz-topic').value;
    if (topic) {
        currentQuiz = { topic, questions: [] };
        quizzes.push(currentQuiz);
        document.getElementById('quiz-title').innerText = topic;
        document.getElementById('create-quiz').style.display = 'none';
        document.getElementById('add-question').style.display = 'block';
        document.getElementById('take-quiz').style.display = 'none';
    }
}

function addOption() {
    const optionsContainer = document.getElementById('options-container');
    const optionCount = optionsContainer.getElementsByClassName('option').length;
    const newOption = document.createElement('input');
    newOption.type = 'text';
    newOption.className = 'option';
    newOption.placeholder = `Enter option ${optionCount + 1}`;
    optionsContainer.appendChild(newOption);
}

function addQuestion() {
    const questionText = document.getElementById('question-text').value;
    const options = Array.from(document.getElementsByClassName('option')).map(option => option.value);
    const correctAnswerIndex = parseInt(prompt('Enter the index of the correct answer (starting from 1):'), 10) - 1;

    if (questionText && options.length > 1 && !isNaN(correctAnswerIndex) && correctAnswerIndex < options.length) {
        const question = { questionText, options, correctAnswerIndex };
        currentQuiz.questions.push(question);
        document.getElementById('question-text').value = '';
        Array.from(document.getElementsByClassName('option')).forEach(option => option.remove());
        addOption();
        addOption();
        alert('Question added successfully.');
    } else {
        alert('Please provide valid question details.');
    }
}

function finalizeQuiz() {
    document.getElementById('add-question').style.display = 'none';
    document.getElementById('take-quiz').style.display = 'block';
    listQuizzes();
}

function listQuizzes() {
    const quizList = document.getElementById('quiz-list');
    quizList.innerHTML = '';
    quizzes.forEach((quiz, index) => {
        const quizItem = document.createElement('button');
        quizItem.innerText = quiz.topic;
        quizItem.onclick = () => startQuiz(index);
        quizList.appendChild(quizItem);
    });
}

function startQuiz(index) {
    currentQuiz = quizzes[index];
    const quizArea = document.getElementById('quiz-area');
    const quizContent = document.getElementById('quiz-content');
    document.getElementById('quiz-area-title').innerText = currentQuiz.topic;
    quizContent.innerHTML = '';
    currentQuiz.questions.forEach((question, questionIndex) => {
        const questionDiv = document.createElement('div');
        const questionText = document.createElement('p');
        questionText.innerText = question.questionText;
        questionDiv.appendChild(questionText);
        question.options.forEach((option, optionIndex) => {
            const optionLabel = document.createElement('label');
            const optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.name = `question-${questionIndex}`;
            optionInput.value = optionIndex;
            optionLabel.appendChild(optionInput);
            optionLabel.appendChild(document.createTextNode(option));
            questionDiv.appendChild(optionLabel);
        });
        quizContent.appendChild(questionDiv);
    });
    quizArea.style.display = 'block';
    document.getElementById('create-quiz').style.display = 'none';
    document.getElementById('add-question').style.display = 'none';
    document.getElementById('take-quiz').style.display = 'none';
}

function submitQuiz() {
    let score = 0;
    currentQuiz.questions.forEach((question, questionIndex) => {
        const selectedOption = document.querySelector(`input[name="question-${questionIndex}"]:checked`);
        if (selectedOption && parseInt(selectedOption.value, 10) === question.correctAnswerIndex) {
            score++;
        }
    });
    document.getElementById('result').innerText = `You scored ${score} out of ${currentQuiz.questions.length}.`;
    document.getElementById('quiz-area').style.display = 'none';
    document.getElementById('result-area').style.display = 'block';
}

function restart() {
    document.getElementById('result-area').style.display = 'none';
    document.getElementById('create-quiz').style.display = 'block';
    document.getElementById('take-quiz').style.display = 'block';
    listQuizzes();
}

document.addEventListener('DOMContentLoaded', () => {
    listQuizzes();
});
