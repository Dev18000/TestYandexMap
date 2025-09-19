
window.map = {
    start: function (address) {
        ymaps.ready(init);

        function init() {
            var myMap = new ymaps.Map("map", {
                center: [55.76, 37.64],
                zoom: 10
            });

            myMap.container.fitToViewport();

            ymaps.geocode(address).then(function (res) {
                var firstGeoObject = res.geoObjects.get(0);
                var bounds = firstGeoObject.properties.get('boundedBy');

                myMap.geoObjects.add(firstGeoObject);
                myMap.setBounds(bounds, {
                    checkZoomRange: true,
                    useMapMargin: true
                });

                requestAnimationFrame(function () {
                    myMap.container.fitToViewport();
                });
            });

            window.addEventListener("resize", function () {
                myMap.container.fitToViewport();
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