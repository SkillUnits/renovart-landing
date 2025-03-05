const questions = [
    { text: "¿Qué tipo de instalación hay que reparar?", answers: ["Piso", "Casa", "Local comercial"], input: "Su opción" },
    { text: "Superficie del terreno (aprox.)", answers: ["Hasta 50 m²", "50–100 m²", "100-200 м²", "Más de 200 m²"] },
    { text: "¿Qué tipo de trabajo se necesita?", answers: ["Renovación completa (llave en mano)", "Reparaciones importantes", "Reparación cosmética"], input: "Otros (especifique)" },
    { text: "¿Cuál es el presupuesto para la renovación?", answers: ["<10,000€", "10,000-25,000", "25,000-50,000", "50,000-100,000", ">100,000€"] },
    { text: "¿Dónde se encuentra el objeto?", answers: [], input: "Ciudad/zona" },
    { text: "¿Cuándo quiere comenzar la reforma?", answers: ["En un futuro cercano", "Dentro de un mes", "En 2-3 meses"], input: "Otro" },
    { text: "Sus datos de contacto", answers: [], inputs: ["Nombre", "Número de teléfono"] }
];
let currentQuestion = 0;
const userAnswers = [];


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
        questionData.inputs.forEach((placeholder, index) => {
            const input = document.createElement("input");
            input.type = "text";
            input.placeholder = placeholder;

            // Робимо останні два інпута обов'язковими
            if (currentQuestion === questions.length - 1) {
                input.required = true;
            }

            inputContainer.appendChild(input);
        });
    }

    document.getElementById("back-btn").style.display = currentQuestion > 0 ? "inline-block" : "none";
    document.getElementById("confidentiality").style.display = currentQuestion === questions.length - 1 ? "flex" : "none";
    document.getElementById("answers-container").style.marginTop = currentQuestion === questions.length - 1 ? "8px" : "20px";

    const nextBtn = document.getElementById("next-btn");
    if (currentQuestion === questions.length - 1) {
        nextBtn.type = "submit"; 
    } else {
        nextBtn.type = "button"; 
    }
}

function nextQuestion() {
    const inputContainer = document.getElementById("input-container");
    const inputs = inputContainer.querySelectorAll("input");

    let inputValues = Array.from(inputs).map(input => input.value.trim());

    // Якщо це останнє питання, перевіряємо обов'язкові поля
    if (currentQuestion === questions.length - 1) {
        if (inputValues.some(value => value === "")) {
            alert("Por favor, complete los campos obligatorios: Nombre y Número de teléfono.");
            return;
        }
    }

    const answersContainer = document.getElementById("answers-container");
    const selectedButton = answersContainer.querySelector("button.selected");

    const hasAnswer = selectedButton || inputValues.some(value => value !== "");

    if (!hasAnswer) {
        // alert("Por favor, seleccione una opción o complete el campo obligatorio antes de continuar.");
        return;
    }

    if (inputValues.length > 0) {
        userAnswers[currentQuestion] = {
            question: questions[currentQuestion].text,
            answer: inputValues.join(", ")
        };
    } else if (selectedButton) {
        userAnswers[currentQuestion] = {
            question: questions[currentQuestion].text,
            answer: selectedButton.textContent
        };
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        sendFormData();
        document.getElementById("progress-percent").textContent = `100%`;
        document.getElementById("progress-bar").value = 100;
        document.getElementById("question-container").style.display = "none";
        document.getElementById("navigation").style.display = "none";
        document.getElementById("successful").style.display = "block";
    }
}

function selectAnswer(answer) {
    userAnswers[currentQuestion] = { question: questions[currentQuestion].text, answer };

    document.querySelectorAll("#answers-container button").forEach(btn => btn.classList.remove("selected"));

    event.target.classList.add("selected");

    console.log(userAnswers);
    nextQuestion();
}


function sendFormData() {
    fetch("../php/send-mail.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userAnswers)
    })
        .then(response => response.text())
        .then(data => {
            console.log("¡Datos enviados con éxito!");
        })
        .catch(error => {
            console.error("Error al enviar los datos:", error);
        });
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