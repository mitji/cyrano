// select forms
const likeForms = document.querySelectorAll('.like-form');
const favForms = document.querySelectorAll('.fav-form');

// POST create new like

likeForms.forEach((form) => {

  form.addEventListener('click', (e) =>{

    // prevent the form reloading the page

    e.preventDefault();

    const id = form.querySelector('input').value;
    let numLikesSpan = form.querySelector('.likes-text');
    let likeBtn = form.querySelector('#like-btn');
    //let dislikeBtn = form.querySelector('#dislike-btn');
    let numLikes = parseInt(numLikesSpan.innerHTML);   
     
    axios
      .get(`/home/like?_id=${id}`)
      .then((response) => {
        console.log('response', response.data.statusText);
        const {statusText} = response.data;
        
        if(statusText==='like') {
          numLikes += 1;
          numLikesSpan.innerHTML = numLikes;
          likeBtn.innerHTML = '<img src="/images/dislike.png" alt="">'
          console.log('QUOTE LIKED');
        } else if (statusText === 'dislike') {
          numLikes -= 1;
          numLikesSpan.innerHTML = numLikes;
          likeBtn.innerHTML = '<img src="/images/like.png" alt="">'
          console.log('QUOTE DISLIKED');
        }
        
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
        console.log(response.data.statusText);
      })
      .catch( (err) => console.log(err));

  });
});


// handle header selector
// const lastSel = document.getElementById('first-selector');
// const topSel = document.querySelector('second-selector');
// const randomSel = document.querySelector('third-selector');
const currentURL = window.location.href;
console.log(currentURL);

// console.log(homeTitle.innerHTML);
// switch(homeTitle.innerHTML) {
//   case 'All quotes':
//     topSel.classList.remove('home-selected');
//     randomSel.classList.remove('home-selected');
//     lastSel.classList.add('home-selected');
//     break;
//   case 'Top 15 quotes':
//     lastSel.classList.remove('home-selected');
//     randomSel.classList.remove('home-selected');
//     topSel.classList.add('home-selected');
//     break;
//   case 'Random quotes':
//     topSel.classList.remove('home-selected');
//     lastSel.classList.remove('home-selected');
//     randomSel.classList.add('home-selected');
//     break;
// }