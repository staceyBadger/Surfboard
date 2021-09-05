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

  
  
  closelink.forEach(function (entry) {
  entry.addEventListener("click", function (event){
    event.preventDefault();
    tabletsmenu.style.display = 'none';
  });
});



const findBlockByAlias = alias => {
  return $(".reviews-item").filter((ndx, item) => {
    return $(item).attr("data-linked-with") === alias;
  });
};


$(".interactive-avatar__link").click((e) => {
  e.preventDefault()
  

  const $this = $(e.currentTarget);
  const target = $this.attr("data-open");
  const itemToShow = findBlockByAlias(target);
  const curItem = $this.closest(".reviews__switcher-item");

  itemToShow.addClass("active").siblings().removeClass("active")
  curItem.addClass("active").siblings().removeClass("active")
});
  


const openItem = (item) => {
 
  const container = item.closest(".team__item");
  
  const contentBlock = container.find(".team__content");
  const textBlock = contentBlock.find(".team__content-block");
  const reqHeight = textBlock.height();

  container.addClass("active");
  
  contentBlock.height(reqHeight);
}

const closeEveryItem = container => {
  const items = container.find('.team__content');
  const itemContainer = container.find(".team__item");
  

  itemContainer.removeClass("active");
  
  
  items.height(0);
}


$('.team__title').click(e => {
  const $this = $(e.currentTarget);
  const container = $this.closest('.team');
  const elemContainer = $this.closest(".team__item");

  if (elemContainer.hasClass("active")) {
    closeEveryItem(container);
  } else {
    closeEveryItem(container);
    openItem($this);
  }

  
})


  $('.team__title').on('click', e => {

    const $this = $(e.currentTarget);
    const elemContainer = $this.closest(".team__title");


    if(elemContainer.hasClass('active')) {
      elemContainer.removeClass('active');
    } else {
      $('.team__title').removeClass('active');
      elemContainer.addClass('active');
      
    }
  });


  const slider = $('.products-list').bxSlider({
    pager: false,
    controls: false
  });
$('.shop__prevpage').click(e => {
  e.preventDefault();
  slider.goToPrevSlide();
})


$('.shop__nextpage').click(e => {
  e.preventDefault();
  slider.goToNextSlide();
})



const validateFields = (form, fieldsArray) => {

  fieldsArray.forEach((field) => {
    field.removeClass("input-error");
    if(field.val().trim() === "") {
      field.addClass("input-error");
    }
  });

  const errorFields = form.find(".input-error");

  return errorFields.length === 0;
}

$('.form').submit((e) => {
  e.preventDefault();

  const form = $(e.currentTarget);
  const name = form.find("[name='name']");
  const phone = form.find("[name='phone']");
  const comment = form.find("[name='comment']");
  const to = form.find("[name='to']");

  const modal = $("#modal");
  const content = modal.find(".modal__content");
  
  modal.removeClass("error-modal");

  const isValid = validateFields(form, [name, phone, comment, to]);

  

  if (isValid) {
   const request = $.ajax({
      url: "https://webdev-api.loftschool.com/sendmail",
      method: "post",
      data: {
        name: name.val(),
        phone: phone.val(),
        comment: comment.val(),
        to: to.val()
      },
      
     
    });

    request.done((data) => {
      content.text(data.message);
    });

    request.fail((data) => {
      const message = data.responseJSON.message;
        content.text(message);
        modal.addClass("error-modal");

        
    })

    request.always(() => {
      
      $.fancybox.open({
        src: "#modal", 
        type: "inline"
      });
    })
  }
});
$(".app-submit-btn").click(e => {
  e.preventDefault();

 $.fancybox.close()
  
});