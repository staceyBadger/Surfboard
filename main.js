      const openbutton = document.querySelector('#hamburger');
      const tabletsmenu = document.querySelector('#menu');
      const closebutton = document.querySelector('#menu');
    
      openbutton.addEventListener('click', function() {
         tabletsmenu.style.display = 'flex';
     })
     
     closebutton.addEventListener('click', function() {
      tabletsmenu.style.display = 'none';
  })