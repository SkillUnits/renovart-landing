const questions = [
    { text: "¿Qué tipo de instalación hay que reparar?", answers: ["Piso", "Casa", "Local comercial"], input: "Su opción" },
    { text: "Superficie del terreno (aprox.):", answers: ["Hasta 50 m²", "50–100 m²", "100-200 м²", "Más de 200 m²"] },
    { text: "¿Qué tipo de trabajo se necesita?", answers: ["Renovación completa (llave en mano)", "Reparaciones importantes", "Reparación cosmética"], input: "Otros (especifique)" },
    { text: "¿En qué etapa se encuentra el objeto?", answers: ["Acabado en bruto", "En proceso de reforma", "Listo, necesita renovación"] },
    { text: "¿Dónde se encuentra el objeto?", answers: [], input: "Ciudad/zona" },
    { text: "¿Cuándo quiere comenzar la reforma?", answers: ["En un futuro cercano", "Dentro de un mes", "En 2-3 meses"], input: "Otro" },
    { text: "Sus datos de contacto:", answers: [], inputs: ["Nombre", "Número de teléfono"] }
];
let currentQuestion = 0;


function updateProgress() {
    const percent = currentQuestion * 15;
    document.getElementById("progress-percent").textContent = `${percent}%`;
    document.getElementById("progress-bar").value = percent;
}

function loadQuestion() {
    const questionData = questions[currentQuestion];
    document.getElementById("question-count").textContent = `Pregunta ${currentQuestion + 1} de 7`;
    document.getElementById("question-text").textContent = questionData.text;
    updateProgress();
    
    const answersContainer = document.getElementById("answers-container");
    answersContainer.innerHTML = "";
    questionData.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => selectAnswer(answer);
        answersContainer.appendChild(button);
    });
    
    const inputContainer = document.getElementById("input-container");
    inputContainer.innerHTML = "";
    if (questionData.input) {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = questionData.input;
        inputContainer.appendChild(input);
    } else if (questionData.inputs) {
        questionData.inputs.forEach(placeholder => {
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = placeholder;
            inputContainer.appendChild(input);
        });
    }

    document.getElementById("back-btn").style.display = currentQuestion > 0 ? "inline-block" : "none";
    document.getElementById("confidentiality").style.display = currentQuestion === questions.length - 1 ? "flex" : "none";
    document.getElementById("answers-container").style.marginTop = currentQuestion === questions.length - 1 ? "8px" : "20px";
}

function selectAnswer(answer) {
    console.log(`Selected answer: ${answer}`);
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

document.getElementById("next-btn").addEventListener("click", nextQuestion);
document.getElementById("back-btn").addEventListener("click", prevQuestion);

loadQuestion();