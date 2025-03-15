// Questions, answers, and fun facts
const questions = [
    {
        question: "Who founded Apple Inc.?",
        options: ["Steve Jobs", "Steve Wozniak", "Tim Cook", "Bill Gates"],
        correct: [0, 1],
        fact: "Steve Jobs, Steve Wozniak, and Ronald Wayne were the three co-founders of the Apple Computers company in 1976. It eventually was shortaned to what we all know today, Apple Inc. and the company has revolutionized personal technology with the iPhone, iPad, MacBook, Apple Watch, and more."
    },
    {
        question: "What year was the first iPhone released?",
        options: ["2005", "2007", "2009", "2010"],
        correct: [1],
        fact: "The first iPhone was released on June 29, 2007, and revolutionized the smartphone industry."
    },
    {
        question: "What is VoiceOver in Apple devices?",
        options: ["A text-to-speech tool for the visually impaired", "A voice recording app", "A sound enhancer for the hearing impaired", "An app for speech-to-text conversion"],
        correct: [0],
        fact: "VoiceOver is a built-in screen reader for blind and low-vision users on Apple devices, first introduced in 2005."
    },
    {
        question: "Which accessibility feature allows users to control an iPhone using their eyes?",
        options: ["Voice Control", "Switch Control", "AssistiveTouch", "Eye Tracking"],
        correct: [3],
        fact: "Eye Tracking allows users to control their iPhone using only their eyes, helping those with limited mobility."
    },
    {
        question: "Who first pioneered Audio Descriptions (AD) for the blind?",
        options: ["Ray Kurzweil", "Helen Keller", "Dr. Margaret Pfanstiehl", "Louis Braille"],
        correct: [2],
        fact: "The concept of Audio Descriptions (AD) was pioneered by Dr. Margaret Pfanstiehl and her husband Chet Avery in the 1970s. Dr. Pfanstiehl, who was blind, founded The Washington Ear, a nonprofit organization that provided reading services for blind individuals. Today, many of the well-know movie services such as Netflix, Disney+ and Apple TV provide Audio Descriptions on their movies for the blind to fully enjoy them."
    },
    {
        question: "For who is the Mono Audio setting on smart devices for?",
        options: ["Gamers who need clearer audio", "People who are deaf in one ear", "Musicians who need stereo separation", "People who enjoy extremely loud music"],
        correct: [1],
        fact: "Mono Audio is designed for people who are deaf or hard of hearing in one ear. It ensures that both left and right audio channels play the same sound, so they don’t miss any part of music, dialogue, or other audio content. While this feature exists for those deaf in one ear, anyone who prefers equal audio is recommended to utilize the mono audio feature as well."
    },
    {
        question: "What year did Made for iPhone (MFi) Hearing Aids introduced?",
        options: ["2007", "2011", "2013", "2016"],
        correct: [2],
        fact: "Modern smart hearing aids can connect to iPhones, iPads, and other Bluetooth devices, allowing users to stream calls and music directly into their hearing aids for clearer audio quality. Smart hearing aids' settings such as the volume can even be adjust through apps!"
    },
    {
        question: "Who primarily benefits from Flash Notifications (or LED Flash Notifications) on smartphones?",
        options: ["Photographers who need a flashlight", "People who want more attention", "People who want brighter screens", "People who are deaf or hard of hearing"],
        correct: [3],
        fact: "Flash Notifications (or LED Flash Notifications) were originally designed for deaf and the hard-of-hearing users so they could see visual alerts for calls, messages, and notifications; however, many people use this feature as a silent alert in loud environments or when they prefer a non-audible or to get their attention because they don't notice sound alerts."
    },
    {
        question: "Which company developed the first screen reader for the blind and visually impaired community to be able to access technology?",
        options: ["Apple", "Microsoft", "IBM", "Kurzweil"],
        correct: [3],
        fact: "Kurzweil created the first screen reader, a breakthrough in assistive technology for blind people in the 1970s."
    }
];
let currentQuestionIndex = 0;
let score = 0; // Tracks the number of correct answers
// Display the current question
function displayQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById("question").textContent = question.question;
    const options = document.getElementById("options");
    // Clear previous options
    options.innerHTML = "";
    // Create new options
    question.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.textContent = option;
        li.setAttribute("onclick", `checkAnswer(${index})`);
        options.appendChild(li);
    });
    // Hide fun fact
    document.getElementById("fun-fact").classList.add("hidden");
}
// Check the answer and show the fun fact
function checkAnswer(selectedIndex) {
    const correctAnswers = questions[currentQuestionIndex].correct; // Array of correct answers
    const fact = questions[currentQuestionIndex].fact;
    document.getElementById("options").style.display = "none";
    if (correctAnswers.includes(selectedIndex)) {
        document.getElementById("fun-fact").classList.remove("hidden");
        document.getElementById("fact").textContent = `Correct! ${fact}`;
        score++; // Increase score if the answer is correct
    } else {
        document.getElementById("fun-fact").classList.remove("hidden");
        document.getElementById("fact").textContent = `Oops! The correct answers are: ${correctAnswers.map(index => questions[currentQuestionIndex].options[index]).join(" and ")}. ${fact}`;
    }
}
// Move to the next question
function nextQuestion() {
    currentQuestionIndex++;
    document.getElementById("options").style.display = "block";
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        document.getElementById("quiz-container").innerHTML = `
            <p>Quiz complete! You got <strong>${score} out of ${questions.length}</strong> correct.</p>
            <br>
            <button onclick='resetGame()'>Play Again</button>
            <br>
            <button onclick='goBack()'>Go Back</button>
        `;
    }
}
// Resets game
function resetGame() {
    // Reset variables
    currentQuestionIndex = 0;
    score = 0;
    // Reload the first question
    document.getElementById("quiz-container").innerHTML = `
        <h2 id="question"></h2>
        <ul id="options"></ul>
        <div id="fun-fact" class="hidden">
            <p id="fact"></p>
            <button onclick="nextQuestion()">Next</button>
        </div>
    `;
    displayQuestion();
}
// Takes user to previous page
function goBack() {
    window.history.back();
}
// Start the quiz
displayQuestion();
