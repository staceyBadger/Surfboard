const mesureWidth = (item) => {
    let reqItemWidth  = 0;

    const screenWidth = $(window).width();
    const container = item.closest(".slider__list");
    const titlesBlocks = container.find(".slide-link");
    const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

    const textContainer = item.find(".slider-hover-wrap");
    const paddingLeft = parseInt(textContainer.css("padding-left"));
    const paddingRight = parseInt(textContainer.css("padding-right"));

    
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
        reqItemWidth = screenWidth - titlesWidth;
    } else {
        reqItemWidth = 500;
    }

    return {
        container: reqItemWidth,
        textContainer: reqItemWidth - paddingRight - paddingLeft
    }
    
}


const closeEveryItemInContainer = (container) => {
    const items = container.find(".slider__item");
    const content = container.find(".slider-hover-wrap");

    items.removeClass("active");
    content.width(0);
}


const sliderOpenItem = (item) => {
    const hiddenContent = item.find(".slider-hover-wrap");
    const reqWidth = mesureWidth(item);
    const textBlock = item.find(".slider-hover");
    
    item.addClass("active");
    hiddenContent.width(reqWidth.container);
    textBlock.width(reqWidth.textContainer);
}
$(".slide-link").on("click", e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const item = $this.closest(".slider__item");
    const itemOpened = item.hasClass("active");
    const container = $this.closest(".slider__list");

    if(itemOpened) {
        closeEveryItemInContainer(container);
    } else {
        closeEveryItemInContainer(container);
        sliderOpenItem(item);
    }
});

$(".slider__close__svg").on("click", e => {
    e.preventDefault();

    closeEveryItemInContainer($(".slider__list"));
})