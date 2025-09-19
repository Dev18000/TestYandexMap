window.map = window.map || {};
window.map._instance = null;
window.map._ro = null;
window.map._onResize = null;

window.map.start = function (address) {
    ymaps.ready(function init() {
        const el = document.getElementById("map");
        if (!el) return;

        if (!window.map._instance) {
            window.map._instance = new ymaps.Map("map", {
                center: [55.76, 37.64],
                zoom: 10,
                controls: ["zoomControl", "typeSelector", "searchControl"]
            });

            window.map._ro = new ResizeObserver(() => {
                window.map._instance?.container.fitToViewport();
            });
            window.map._ro.observe(el);

            window.map._onResize = () =>
                window.map._instance?.container.fitToViewport();
            window.addEventListener("resize", window.map._onResize);
        }

        const myMap = window.map._instance;

        myMap.container.fitToViewport();

        if (address && address.trim()) {
            ymaps.geocode(address).then(function (res) {
                const firstGeoObject = res.geoObjects.get(0);
                if (!firstGeoObject) return;

                const bounds = firstGeoObject.properties.get("boundedBy");
                myMap.geoObjects.removeAll();
                myMap.geoObjects.add(firstGeoObject);

                requestAnimationFrame(function () {
                    myMap.container.fitToViewport();
                    myMap.setBounds(bounds, {
                        checkZoomRange: true,
                        useMapMargin: true,
                        zoomMargin: 32
                    });
                });
            });
        }
    });
};

window.map.dispose = function () {
    if (window.map._ro) {
        window.map._ro.disconnect();
        window.map._ro = null;
    }
    if (window.map._onResize) {
        window.removeEventListener("resize", window.map._onResize);
        window.map._onResize = null;
    }
    if (window.map._instance) {
        window.map._instance.destroy();
        window.map._instance = null;
    }
};
