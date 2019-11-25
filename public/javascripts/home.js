// select forms
const likeForms = document.querySelectorAll('.like-form');
//const favForm = document.querySelector('#fav-form');

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