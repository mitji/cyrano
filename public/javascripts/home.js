// handle header selector
// const homeTitle = document.querySelector('h1');
// const lastSel = document.querySelector('first-selector');
// const topSel = document.querySelector('second-selector');
// const randomSel = document.querySelector('third-selector');
console.log('innn');

console.log(homeTitle.innerHTML);
switch(homeTitle.innerHTML) {
  case 'All quotes':
    topSel.classList.remove('home-selected');
    randomSel.classList.remove('home-selected');
    lastSel.classList.add('home-selected');
    break;
  case 'Top 15 quotes':
    lastSel.classList.remove('home-selected');
    randomSel.classList.remove('home-selected');
    topSel.classList.add('home-selected');
    break;
  case 'Random quotes':
    topSel.classList.remove('home-selected');
    lastSel.classList.remove('home-selected');
    randomSel.classList.add('home-selected');
    break;
}

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
});