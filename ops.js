const sections = $("section");
const display = $(".maincontent");

sections.first().addClass("active");

const performTransition = sectionEq => {
    const position = sectionEq * -100;

    display.css({
        transform: `translateY(${position}%)`
    });
}

const scrollViewport = direction => {
    const activeSection = sections.filter(".active");

    if (direction === "next") {

    }

    if (direction === "prev") {
        
    }
}

$(window).on("wheel", e => {
    const deltaY = e.originalEvent.deltaY;

    if (deltaY > 0) {
        performTransition(2);
        //next
    }

    if (deltaY < 0) {
        //prev
    }
    
});