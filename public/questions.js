
/*document.addEventListener('DOMContentLoaded', ()=>{

    document.querySelectorAll("input[name='mode']").forEach(radio =>{
        radio.addEventListener('change', (event)=>{
                if (radio.value==='quiz'){
        document.getElementById("quiz_container").style.display="block";
    } else if (radio.value==='exam') {
        document.getElementById("exam_container").style.display="block";
    }

        })
    });


});*/

const mode = document.querySelectorAll("input[name='mode']");

document.addEventListener('DOMContentLoaded',()=>{

    mode.forEach(m =>{
        m.addEventListener('change', event=>{
            if (m.value ==='quiz'){
                document.getElementById('quiz_container').style.display='block';
                document.getElementById('exam_container').style.display='none';
            
                let questions;

                async function loadQuestions(){
                    const response = await fetch('/questions');
                    questions = await response.json();
                    console.log('🧠 Questions:', questions);
                }





                let currentQuestionIndex = 0;
                const quizQuestionSpace = document.getElementById('quiz_question');



                const nextButton = document.getElementById('nextQuestionBtn');


                loadQuestions().then(()=>{
                    
                   /* function setTimer((), =>{
                        
                    }*/
                )
                showQuestion(currentQuestionIndex);  // ✅ Now we’re sure questions are loaded

                nextButton.addEventListener('click', ()=>{
                    currentQuestionIndex++;
                    if (currentQuestionIndex>=questions.length){
                        nextButton.style.display = 'none';
                        quizQuestionSpace.innerHTML = "Your Score is: ";
                    }
                    else{
                        showQuestion(currentQuestionIndex);}
                })})

                function showQuestion(currentQuestionIndex){//fucntion to display 1 question at a time
                    //questionEl.innerHTML = `<h3>${q.question_number}. ${q.question}</h3>`;
                    quizQuestionSpace.innerHTML = `<h3>${questions[currentQuestionIndex].question_number}.${questions[currentQuestionIndex].question}</h3>`;
                    quizQuestionSpace.style.display = 'block';
                };
     
        
    }


            else{
                document.getElementById('exam_container').style.display='block';
                document.getElementById('quiz_container').style.display='none';
                
                async function loadQuestions(){
                    const response = await fetch('/questions');
                    const questions = await response.json();
                    console.log('🧠 Questions:', questions);

                }


                 let questions= [1,2,3,4,5];
                
                }
        
    })})});


