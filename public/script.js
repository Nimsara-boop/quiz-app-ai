// public/script.js

document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  const quizContainer = document.getElementById('quiz');

  startBtn.addEventListener('click', () => {
    quizContainer.style.display = 'block'; // Show quiz section
    loadQuestions(); // Load and render questions
  });
});

async function loadQuestions() {
  const response = await fetch('/questions');
  const questions = await response.json();
  console.log('🧠 Questions:', questions);

  const quizContainer = document.getElementById('quiz');
  quizContainer.innerHTML = '';

  questions.forEach((q, index) => {
    const questionEl = document.createElement('div');
    questionEl.innerHTML = `<h3>${index + 1}. ${q.question}</h3>`;

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
