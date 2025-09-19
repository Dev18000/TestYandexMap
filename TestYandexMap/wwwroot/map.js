
window.map = {
    start: function (address) {
        ymaps.ready(init);

        function init() {
            var myMap = new ymaps.Map("map", {
                center: [55.76, 37.64],
                zoom: 10,
                
            });

            ymaps.geocode(address).then(function (res) {
                var firstGeoObject = res.geoObjects.get(0);
                var coords = firstGeoObject.geometry.getCoordinates();
                var bounds = firstGeoObject.properties.get('boundedBy');

                myMap.geoObjects.add(firstGeoObject);
                myMap.setBounds(bounds, {
                    checkZoomRange: true
                });
            });
        }
    }
}
window.map.dispose = function () {
    if (window.map._instance) {
        window.map._instance.destroy();
        window.map._instance = null;
    }
};