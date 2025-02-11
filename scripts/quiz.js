const questions = [
    { text: "What type of property needs renovation?", answers: ["Apartment", "House", "Commercial property"], input: "Other" },
    { text: "Approximate property size:", answers: ["Up to 50 m²", "50–100 m²", "100-200 м²", "More than 200 m²"] },
    { text: "What type of work is required?", answers: ["Full renovation (turnkey)", "Major renovation", "Cosmetic renovation"], input: "Other" },
    { text: "What is the current stage of the property?", answers: ["Rough finishing", "Renovation in progress", "Completed, needs an update"] },
    { text: "Where is the property located?", answers: [], input: "City/district" },
    { text: "When do you want to start the renovation?", answers: ["As soon as possible", "Within a month", "In 2–3 months"], input: "Other" },
    { text: "Your contact details:", answers: [], inputs: ["Name", "Phone number"] }
];
let currentQuestion = 0;


function updateProgress() {
    const percent = currentQuestion * 15;
    document.getElementById("progress-percent").textContent = `${percent}%`;
    document.getElementById("progress-bar").value = percent;
}

function loadQuestion() {
    const questionData = questions[currentQuestion];
    document.getElementById("question-count").textContent = `Question ${currentQuestion + 1} of 7`;
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