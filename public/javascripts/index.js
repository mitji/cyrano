const arrowBack = document.querySelector('#back-arrow');
arrowBack.addEventListener('click', () => {
  window.history.back();
})

const cancelBtn = document.querySelector('#cancel-btn');
cancelBtn.addEventListener('click', () => {
  window.history.back();
})