document.addEventListener("DOMContentLoaded", () => {
    const questions = [
        {
            question: "Якого кольору бургер?",
            answers: [
                { title: "Стандарт", url: "./image/burger.png" },
                { title: "Чорний", url: "./image/burgerBlack.png" }
            ],
            type: "radio"
        },
        {
            question: "З якого м'яса котлета?",
            answers: [
                { title: "Курка", url: "./image/chickenMeat.png" },
                { title: "Яловичина", url: "./image/beefMeat.png" },
                { title: "Свинина", url: "./image/porkMeat.png" }
            ],
            type: "radio"
        },
        {
            question: "Додаткові інгредієнти?",
            answers: [
                { title: "Помідор", url: "./image/tomato.png" },
                { title: "Огірок", url: "./image/cucumber.png" },
                { title: "Салат", url: "./image/salad.png" },
                { title: "Цибуля", url: "./image/onion.png" }
            ],
            type: "checkbox"
        },
        {
            question: "Додати соус?",
            answers: [
                { title: "Часниковий", url: "./image/sauce1.png" },
                { title: "Томатний", url: "./image/sauce2.png" },
                { title: "Гірчичний", url: "./image/sauce3.png" }
            ],
            type: "radio"
        }
    ];

    let numberQuestion = 0;
    const finalAnswers = [];
    
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const nextButton = document.querySelector('#next');
    const prevButton = document.querySelector('#prev');
    const sendButton = document.querySelector('#send');
    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');

    btnOpenModal.addEventListener('click', () => {
        modalBlock.style.display = 'block';
        renderQuestions(numberQuestion);
    });

    closeModal.addEventListener('click', () => {
        modalBlock.style.display = 'none';
    });

    const renderAnswers = (index) => {
        formAnswers.innerHTML = '';
        questions[index].answers.forEach((answer) => {
            const answerItem = document.createElement('div');
            answerItem.classList.add('answers-item', 'd-flex', 'flex-column');
            answerItem.innerHTML = `
                <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none">
                <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                    <img class="answerImg" src="${answer.url}" alt="${answer.title}">
                    <span>${answer.title}</span>
                </label>
            `;
            formAnswers.appendChild(answerItem);
        });
    };

    const renderQuestions = (indexQuestion) => {
        questionTitle.textContent = questions[indexQuestion].question;
        renderAnswers(indexQuestion);

        switch (true) {
            case (numberQuestion === 0):
                prevButton.classList.add("d-none");
                nextButton.classList.remove("d-none");
                sendButton.classList.add("d-none");
                break;
            case (numberQuestion === questions.length - 1):
                nextButton.classList.add("d-none");
                prevButton.classList.remove("d-none");
                sendButton.classList.remove("d-none");
                formAnswers.innerHTML = `
                    <div class="form-group">
                        <label for="numberPhone">Введите ваш номер телефона</label>
                        <input type="phone" class="form-control" id="numberPhone">
                    </div>
                `;
                break;
            default:
                prevButton.classList.remove("d-none");
                nextButton.classList.remove("d-none");
                sendButton.classList.add("d-none");
        }
    };

    const checkAnswer = () => {
        const obj = {};
        const inputs = [...formAnswers.elements].filter(input => input.checked || input.type === 'phone');
        
        inputs.forEach((input, index) => {
            obj[`${index}_${questions[numberQuestion].question}`] = input.value;
        });
        finalAnswers.push(obj);
    };

    nextButton.addEventListener('click', () => {
        checkAnswer();
        if (numberQuestion < questions.length - 1) {
            numberQuestion++;
            renderQuestions(numberQuestion);
        }
    });

    prevButton.addEventListener('click', () => {
        if (numberQuestion > 0) {
            numberQuestion--;
            renderQuestions(numberQuestion);
        }
    });

    sendButton.addEventListener('click', () => {
        checkAnswer();
        formAnswers.textContent = "Спасибо за пройденный тест!";
        
        setTimeout(() => {
            modalBlock.style.display = 'none';
        }, 2000);
        
        console.log(finalAnswers);
    });

    renderQuestions(numberQuestion);
});
