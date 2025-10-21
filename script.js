function generateRandomNumbers(noQuiz) {
    noList = [];

    while (noList.length < noQuiz) {
        randomNumber = Math.ceil(Math.random() * (questions.length - 1))
        if (!noList.includes(randomNumber)) {
            noList.push(randomNumber)
        }
    }
    return noList
}

function fetchQuestions() {
    list = generateRandomNumbers(10)
    quizArray = []
    for (let i = 0; i < list.length; i++) {
        quiz = questions[list[i]]
        quizArray.push(quiz)
    }

    return quizArray
}

let current = -1

function nextQuiz() {
    return current += 1
}

const quizzes = fetchQuestions()
const quizLength = quizzes.length

function currentQuestion(currentIndex) {
    quiz = quizzes[currentIndex]
    return quiz
}

function displayQuiz(quiz, currentIndex) {
   let quizHTML = ` 
        <p class="question"> ${currentIndex + 1}. 
            ${quiz.question}
        </p>
        <button class="answer">
            ${quiz.answers[0]}
        </button>
        <button class="answer">
            ${quiz.answers[1]}
        </button>
        <button class="answer">
            ${quiz.answers[2]}
        </button>
        <button class="answer">
            ${quiz.answers[3]}
        </button>
`
    document.querySelector('.js-question-container').innerHTML = quizHTML
}

function gameOn(currentIndex, quizzes) {
    while (current <= quizzes.length) {
        console.log(quizzes.length)
        console.log(currentIndex)
    }
}

function playGame(quizzes) {
    if (typeof(quizInterval) != "undefined") {
        clearInterval(quizInterval)
    }
    currentIndex = nextQuiz()
    quiz = currentQuestion(currentIndex)
    displayQuiz(quiz, currentIndex)
    const answers = document.querySelectorAll('.answer')
    answers.forEach((answer) => {
    answer.addEventListener('click', () => {
        console.log(quiz.correct_answer)
        if (answer.innerText === quiz.correct_answer) {
            score = document.querySelector('.score-value').innerText
            new_score = +score + 1
            console.log(new_score)
            document.querySelector('.score-value').innerText = new_score
            console.log(document.querySelector('.score-value').innerText)
            answer.style.backgroundColor = 'green';
            answer.style.transition = 'all 0.5s ease-in-out';
        } else {
            answer.style.backgroundColor = 'red';
            answer.style.transition = 'all 0.5s ease-in-out';
            for (let i = 0; i < answers.length; i++) {
                if (answers[i].innerText === quiz.correct_answer) {
                    answers[i].style.backgroundColor = 'green';
                }
            }
        }

        if ((currentIndex + 1) === quizLength) {
            console.log(quizLength)
            console.log(currentIndex)
            quizInterval = setInterval(() => {
                gameOver()
            }, 1000);
        } else if (currentIndex < quizLength) {
            console.log(quizzes)
            console.log(quizLength)
            console.log(currentIndex)
            quizInterval = setInterval(() => {
                playGame(quizzes)
            }, 1000);
        }         
    })
})
}

function gameOver() {
    if (typeof(quizInterval) != "undefined") {
        clearInterval(quizInterval)
    }
    const topPetroEngComments = [
        "Flawless calculation—reservoir genius detected.",
        "Drilled straight through that one. Clean hit!",
        "Pressure’s high, but so’s your IQ.",
        "You’ve got the flow—steady and smooth.",
        "Perfect equilibrium—just like a balanced well.",
        "Your accuracy’s tighter than casing tolerances.",
        "This is why engineers don’t guess—they model.",
        "You handled that like a seasoned field operator.",
        "A+ on precision, reservoir whisperer.",
        "Your data fits better than a PVT curve.",
        "Running on pure intellect—no artificial lift needed.",
        "You cracked that problem like a pressure valve.",
        "Optimization mode: ON. Keep the streak alive.",
        "You’re producing brilliance at peak rate.",
        "Simulation perfect. Next case ready?"
    ]

    const aboveAveragePetroEngComments = [
        "You’re just a few psi away from perfection.",
        "Almost stable flow—tune your parameters and retry.",
        "Solid analysis—refine the pressure drop next time.",
        "You’ve got the fundamentals down. Time to optimize.",
        "Great estimate—tighten your model calibration.",
        "Good permeability, but porosity could improve!",
        "So close—just needs another iteration.",
        "You’re logging progress like a true engineer.",
        "Strong formation, minor data loss—try again.",
        "Solid potential energy—convert it to accuracy.",
        "You’ve mapped the reservoir; now master the flow.",
        "Almost reached steady state—push once more.",
        "You’re producing results—minimize uncertainty next run.",
        "Your theory’s solid, just a bit of fine-tuning needed.",
        "Next attempt could be your discovery well."
    ];

    const belowAveragePetroEngComments = [
        "Looks like a dry well—time to drill deeper!",
        "That answer hit a fault line—try another direction.",
        "Pressure dropped too soon—pump it up again!",
        "Don’t shut in yet; the reservoir’s got more to give.",
        "Even the best fields start with exploration—keep going.",
        "You’re still in the seismic phase—refine your data!",
        "Bit stuck in the mud? Adjust your weight on bit and retry.",
        "Every failed test builds a stronger model—run it again.",
        "It’s just noise in the data—filter and retry.",
        "Missed target depth—but you’re drilling in the right zone.",
        "Don’t abandon the well yet; potential’s still high.",
        "The equation didn’t balance—time for a recalibration.",
        "No flow yet—open your mind’s choke valve.",
        "Keep iterating—real engineers never hit TD on the first run.",
        "That’s not a failure, it’s just formation testing."
    ];


    
    score = document.querySelector('.score-value').innerText
    if (+score > 9) {
        commentIndex = Math.ceil(Math.random() * (topPetroEngComments.length - 1))
        comment = topPetroEngComments[commentIndex]
    } else if (+score > 5) {
        commentIndex = Math.ceil(Math.random() * (aboveAveragePetroEngComments.length - 1))
        comment = aboveAveragePetroEngComments[commentIndex]
    } else {
        commentIndex = Math.ceil(Math.random() * (belowAveragePetroEngComments.length - 1))
        comment = belowAveragePetroEngComments[commentIndex]
    }
    let finalHTML = `
        <p class="question">You are at ${score * 10}%
            <br>          
            ${comment}
        </p>
        <a href="index.html">
            <button class="answer">
                Another Round
            </button>
        </a>
    `
    document.querySelector('.js-question-container').innerHTML = finalHTML

    // document.querySelector('.answer').addEventListener('click', () => {
    //     location.reload()
    // })
}

playGame(quizzes)