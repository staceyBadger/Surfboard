let myMap;

const init = () => {
    myMap = new ymaps.Map("map", {
        center: [55.750556, 37.605586],
        zoom: 14,
        controls: []
    });

    const coords = [
        [55.751576, 37.603566]
    ];

    const myCollection = new ymaps.GeoObjectCollection({}, {
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: "./img/map_tag.svg",
        iconImageSize: [46, 57],
        iconImageOffset: [-35, -52]
    });

    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
    });

    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');
}

ymaps.ready(init);