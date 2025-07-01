// public/script.js

document.addEventListener('DOMContentLoaded', () => {
  const quizContainer = document.getElementById('quiz');
  const examName = document.getElementById('examName');
  const contentType = document.getElementById('contentType');
  const subjectSelect = document.getElementById('subjectSelect');
  const l_subjectSelect = document.querySelector('label[for="subjectSelect"]');
  const grade = document.getElementById('gradeSelect');
  const l_grade = document.querySelector('label[for="grade"]');
  const goBtn = document.getElementById('goBtn'); 

  const primarysubjects=["Mathematics", "Science", "English", "Tamil", "Sinhala", "Buddhism", "Hinduism", "Christianity"]
  const secondarysubjects=['Mathematics', 'Science', 'History', 'English', 'Health and PT', 'Tamil Language', 'Sinhala Language', 'ICT', 'Geography', 'Buddhism', 'Hinduism', 'Christianity', 'Islam', 'Art', 'Dancing', 'Music'];
  const highersubjects=['Physics', 'Chemistry', 'Biology', 'Combined Mathematics', 'ICT', 'General English', 'General Knowledge'];

  const subjectOptions={
    al: ['Physics', 'Chemistry', 'Biology', 'Combined Mathematics', 'ICT'],
    ol: ['Mathematics', 'Science', 'History', 'English', 'Health and PT', 'Tamil Language', 'Sinhala Language', 'ICT', 'Geography'],  
    scholarshipExam: ['Mathematics', 'Environmental Science', 'Sinhala Language', 'English Language', 'Tamil Language'],
    grade1: primarysubjects,
    grade2: primarysubjects,
    grade3: primarysubjects,
    grade4: primarysubjects,
    grade5: primarysubjects,
    grade6: secondarysubjects,
    grade7: secondarysubjects, 
    grade8: secondarysubjects,
    grade9: secondarysubjects,
    grade10: secondarysubjects,
    grade11: secondarysubjects,
    grade12: highersubjects,
    grade13: highersubjects,
    };

  examName.addEventListener('change', () => {
    const selectedExam = examName.value;
    subjectSelect.innerHTML =''; //Clear old options

    if (subjectOptions[selectedExam]){
      subjectOptions[selectedExam].forEach(subject =>{
        const option = document.createElement('option');
        option.value = subject.toLowerCase().replace(/\s+/g, '_');
        option.textContent = subject;
        subjectSelect.appendChild(option);

      });

      l_subjectSelect.style.display = 'block';
      subjectSelect.style.display= 'block';
      goBtn.style.display = 'inline-block';

    } 
    
    else if (selectedExam ==="term_test"){
      l_grade.style.display = 'block';
      grade.style.display = 'inline-block';

      if (grade.value === 'grade1' || grade.value === 'grade2' || grade.value === 'grade3' || grade.value === 'grade4' || grade.value === 'grade5') {
        subjectSelect.innerHTML= ' '; //clear previous options
        primarysubjects.forEach (subject => {
          const option =document.createElement('option');
          option.value= subject.toLowerCase().replace(/\s+/g, '_');
          option.textContent=subject;
          subjectSelect.appendChild(option);
        })

      l_subjectSelect.style.display = 'block';
      subjectSelect.style.display= 'block';
      goBtn.style.display = 'inline-block';
        };
      
    }
    
    else{
      l_subjectSelect.style.display = 'none'
      subjectSelect.style.display =  'none';
      goBtn.style.display = 'none';
      l_grade.style.display = 'none';
      grade.style.display = 'none';
    }

  });


  const b_2023physicsQ = document.getElementById('btn_start_2023');
  b_2023physicsQ.addEventListener('click',() =>{
    quizContainer.style.display = 'block'; // Show quiz section
    loadQuestions(); // Load and render questions
    b_2023physicsQ.textcontent="Restart Quiz";
  });
});

async function loadQuestions() {
  const response = await fetch('/questions');
  const questions = await response.json();
  console.log('🧠 Questions:', questions);

  const quizContainer = document.getElementById('quiz');
  document.getElementById('questionText').innerHTML = '';
  document.getElementById('optionsContainer').innerHTML = '';


  questions.forEach((q, index) => {
    const questionEl = document.createElement('div');
    questionEl.innerHTML = `<h3>${q.question_number}. ${q.question}</h3>`;

    // Render each of the 5 options
    for (let i = 1; i <= 5; i++) {
      const optionText = q[`option_${i}`];

      const btn = document.createElement('button');
      btn.textContent = optionText;

      btn.onclick = () => {
        if (i === q.correct_answer) {
          alert('✅ Correct!');
        } else {
          const correctOption = q[`option_${q.correct_answer}`];
          alert(`❌ Wrong. Correct answer is: ${correctOption}`);
        }
      };

      questionEl.appendChild(btn);
    }

    quizContainer.appendChild(questionEl);
  });
}
