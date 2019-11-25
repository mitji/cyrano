// select forms
const likeForms = document.querySelectorAll('.like-form');
const favForms = document.querySelectorAll('.fav-form');

// select buttons

// const likeBtn = document.getElementById('#like-btn');
// const likesText = document.getElementById('#likes-text');


// POST create new like

likeForms.forEach((form) => {

  form.addEventListener('click', (e) =>{

    // prevent the form reloading the page

    e.preventDefault();

    const id = form.querySelector('input').value;
    let numLikesSpan = form.querySelector('.likes-text');
    let numLikes = parseInt(numLikesSpan.innerHTML);   
     
    
    axios
      .get(`/home/like?_id=${id}`)
      .then((response) => {
        numLikes += 1;
        numLikesSpan.innerHTML = numLikes;
        console.log('QUOTE LIKED');
      })
      .catch( (err) => console.log(err));

  });
})

// POST create new like

favForms.forEach((form) => {

  form.addEventListener('click', (e) =>{

    // prevent the form reloading the page

    e.preventDefault();

    const favId = form.querySelector('input').value; 
    axios
      .get(`/home/fav?_id=${favId}`)
      .then((response) => {
       
        console.log('QUOTE TO FAV');
      })
      .catch( (err) => console.log(err));

  });
})