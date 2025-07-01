//Switching browser page to script.js when clicked on the Start Quiz button
document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');

  startBtn.addEventListener('click', () => {
    window.location.href = 'index.html';}); })