


const btnStart = document.querySelector('.start'),
      blockInfo = document.querySelector('.block'),
      Answer = document.querySelectorAll('.block__answer'),
      Header = document.querySelector('.block__question'),
      SubBtn = document.querySelector('.toanswer'),
      label = document.querySelectorAll('.label'),
      input = document.querySelectorAll('.answer'),
      WrapperQuastion = document.querySelector('.wrapper__quastion'),
      WrapperAnswer = document.querySelector('.block__answers'),
      btn = document.querySelector('.toanswer'),
      mainBtn = document.querySelector('.start'),
      container = document.querySelector('.container')
      Quastion = [
          {
              quastion: "Lorem ipsum dolor sit amet consectetur adipisicing elit.  atque sequi vitae sunt quisquam?",
              answer: ["нн", "пп", "вв", "йй"],
              total: 4,
          },
          {
            quastion: "Lorem ipsum dolor sit amet consectetur adipisicing elit.  atque sequi vitae sunt quisquam?",
            answer: ["123", "11341351", "12341341234", "0000000"],
            total: 1,
        },
        {
            quastion: "Lorem ipsum dolor sit amet consectetur adipisicing elit.  atque sequi vitae sunt quisquam?",
            answer: ["Nikita", "Artem", "Alex", "Ivan"],
            total: 3,
        },
        {
            quastion: "Lorem ipsum dolor sit amet consectetur adipisicing elit.  atque sequi vitae sunt quisquam?",
            answer: ["requem", "jojo", "p0p0p0", "1000-7?"],
            total: 2,
        },
      ];


let quastionIndex = 0,
    Score = 0;


    start(); 
    clearPage();
    showQuastion();

function start () {
    mainBtn.addEventListener('click', () => {
        mainBtn.style.cssText = `display: none`
        container.style.cssText = `display: block`
             
    })

}

    
    

function clearPage () {
    WrapperAnswer.innerHTML = '';
    WrapperQuastion.innerHTML = '';
}

function showQuastion() {

    const headerTemplate = `<h2 class="block__question">%title%</h2>`;
    const title = headerTemplate.replace('%title%', Quastion[quastionIndex]['quastion'])

    WrapperQuastion.innerHTML = title;

    let answerNumber = 1;

    for (answerText of Quastion[quastionIndex]['answer']) {

        const quastionTemplate = (
             `<label class="label">
            <input type="radio" value=%number% class="answer" name="answer">
            <span class="block__answer">%answer%</span>
             </label>` 
        )

        const answerHTML = quastionTemplate
                        .replace('%answer%', answerText)
                        .replace('%number%', answerNumber);
        
        WrapperAnswer.innerHTML += answerHTML;

        answerNumber++;

    }


    WrapperAnswer.addEventListener('click', function(event) {
        console.log(event.target);
        const target = event.target;
        if(target && target.classList.contains('.block__answer'.slice(1))) {
            Answer.forEach((item, i) => {
                if (target == item) {
                    deleteStyle();
                    function addStyle() {
                        Answer[i].classList.add('active');
                    }
                    addStyle(i);
                }
            });
        }
    });
    
    function deleteStyle() {
        Answer.forEach(item => {
            item.classList.remove('active');
        });
    }

}


btn.onclick = checkAnswer;

function checkAnswer () {

    const checkedRadio = WrapperAnswer.querySelector('input:checked');


    if (!checkedRadio) {
        btn.blur();
        return
    }

    const userAnswer = parseInt(checkedRadio.value)

    // console.log(userAnswer, Quastion[quastionIndex]['total'])

    if (userAnswer === Quastion[quastionIndex]['total']) {
        Score++;
    }

    if (quastionIndex !== Quastion.length - 1) {
        quastionIndex++;
        clearPage();
        showQuastion();
    } else {
        clearPage();
        showResults();
    }

}

function showResults () {
    console.log('ijkwsovm')
    console.log(Score)

    const resultsTemplate = `
        <h2 class="title">%title%</h2>
        <h3 class="message">%message%</h3>
        <p class="result">%result%</p>
    `;

    let title, message;

    if (Score === Quastion.length) {
        title = 'Лучший епт!';
        message = 'Вы ответели верно на все вопросы! леее'
    } else if ((Score * 100) / Quastion.length >= 50) {
        title = 'Неплохо леееееее'
        message = 'Вы дали более половины правельных ответов!'
    } else {
        title = 'жии еесс ну подвел, в next раз будь по внимательнее!!'
        message = 'Пока менее половины правельных ответов'
    }

    let result = `${Score} из ${Quastion.length}`;

    const finalMessage = resultsTemplate
                        .replace('%title%', title)
                        .replace('%message%', message)
                        .replace('%result%', result)
                        
    WrapperQuastion.innerHTML = finalMessage;
       
    WrapperAnswer.style.cssText = 'display: none'
    btn.blur();
    btn.innerText = 'Try again' 
    btn.addEventListener('click', () => {
        history.go();
    })

}


















