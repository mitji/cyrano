let btnMyQuotes = document.querySelector('#btn-my-quotes');
let btnFavQuotes = document.querySelector('#btn-fav-quotes');
let MyQuotesDiv = document.querySelector('.profile__my-quotes');
let MyFavQuotesDiv = document.querySelector('.profile__fav-quotes');
const deleteForms = document.querySelectorAll('.delete-userQ-form');

btnMyQuotes.addEventListener('click', () => {
  MyQuotesDiv.style.display = 'block';
  MyFavQuotesDiv.style.display = 'none';
  btnMyQuotes.classList.remove("not-selected");
  btnMyQuotes.classList.add("selected");
  btnFavQuotes.classList.remove("selected");
  btnFavQuotes.classList.add("not-selected");
});
btnFavQuotes.addEventListener('click', () => {
  MyQuotesDiv.style.display = 'none';
  MyFavQuotesDiv.style.display = 'block';
  btnFavQuotes.classList.remove("not-selected");
  btnFavQuotes.classList.add("selected");
  btnMyQuotes.classList.remove("selected");
  btnMyQuotes.classList.add("not-selected");
});

deleteForms.forEach((form) => {
    form.addEventListener('click', (e) =>{

        // prevent the form reloading the page
    
       // e.preventDefault();
  // Get the id of the character from the input field

  const buttondelid = form.querySelector('input').value;
  //const id = form.querySelector('input').value;
  console.log("delete button pressed :",buttondelid);
  // Make a PATCH request
  
  axios
  .post(`/profile/delete/${buttondelid}`)
 
  .then((response) => {
    console.log('character deleted', response);
    //updateForm.reset();

    // Hide the form `PATCH - Update a character`
    //updateSection.style.display = 'none';
    // Show the form `GET - Character by id`
    //getIdSection.style.display = 'block';
  })
  .catch(err => console.log(err));
    });
})