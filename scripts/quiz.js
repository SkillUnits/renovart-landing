const questions = [
    { text: "What type of property needs renovation?", answers: ["Apartment", "House", "Commercial property"], input: "Other" },
    { text: "Approximate property size", answers: ["Up to 50 m²", "50–100 m²", "100-200 м²", "More than 200 m²"] },
    { text: "What type of work is required?", answers: ["Full renovation (turnkey)", "Major renovation", "Cosmetic renovation"], input: "Other" },
    { text: "What is the budget for renovation?", answers: ["<10,000€", "10,000-25,000", "25,000-50,000", "50,000-100,000", ">100,000€"] },
    { text: "Where is the property located?", answers: [], input: "City/district" },
    { text: "When do you want to start the renovation?", answers: ["As soon as possible", "Within a month", "In 2–3 months"], input: "Other" },
    { text: "Your contact details", answers: [], inputs: ["Name", "Phone number"] }
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
            alert("Please complete the required fields: Name and Phone Number.");
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
        console.log("Data sent successfully!");
    })
    .catch(error => {
        console.error("Error sending data:", error);
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