      const openbutton = document.querySelector('#hamburger');
      const tabletsmenu = document.querySelector('#menu');
      const closebutton = document.querySelector('#menu');
      const closelink = document.querySelectorAll('.menu-tablets__link');
    
      openbutton.addEventListener('click', function() {
         tabletsmenu.style.display = 'flex';
     });
     
     closebutton.addEventListener('click', function() {
      tabletsmenu.style.display = 'none';
  });

  /*closelink.addEventListener('click', function(event) {
    event.preventDefault();
    tabletsmenu.style.display = 'none';
  });*/

  
  closelink.forEach(function (entry) {
  entry.addEventListener("click", function (event){
    event.preventDefault();
    tabletsmenu.style.display = 'none';
  });
});
  