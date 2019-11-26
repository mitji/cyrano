// go to previous page
const arrowBack = document.querySelector('#back-arrow');
arrowBack.addEventListener('click', () => {
  window.history.back();
})

// preview quote
const previewBtn = document.querySelector('.btn-preview');
const previewDiv = document.querySelector('.add-quote-preview');
const closePreviewBtn = document.querySelector('.close-preview');

previewBtn.addEventListener('click', () => {
  if(document.querySelector("textarea").value != '') {
    previewDiv.classList.remove("add-quote-preview");
    previewDiv.classList.add('quote-card');
    closePreviewBtn.style.display = 'block';
    previewDiv.innerHTML = document.querySelector("textarea").value;
  }
});

// close preview
closePreviewBtn.addEventListener('click', () => {
  previewDiv.classList.remove('quote-card');
  previewDiv.classList.add("add-quote-preview");
  closePreviewBtn.style.display = 'none';
})



