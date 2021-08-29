      const openbutton = document.querySelector('#hamburger');
      const tabletsmenu = document.querySelector('#menu');
      const closebutton = document.querySelector('#menu');
    
      openbutton.addEventListener('click', function() {
         tabletsmenu.style.display = 'flex';
     })
     
     closebutton.addEventListener('click', function() {
      tabletsmenu.style.display = 'none';
  })

  /*const options = document.querySelector('#shop-options');
  const toggle = document.querySelector('#shop__link');

  toggle.addEventListener('click', function(event) {
    event.preventDefault();
    if (options.style.display == 'none') {
        options.style.display = 'block';
    } else {
        options.style.display = 'none';
    }
    
})*/