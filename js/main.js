document.addEventListener('DOMContentLoaded', function () {
    // Inicializar el mapa centrado en las coordenadas de la primera diapositiva
    var map = L.map('map').setView([4.638878, -74.085126], 13);

    // Agregar capa base de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);

    // Integrar servicios WMS de GeoServer
    var wmsLayer1 = L.tileLayer.wms('https://geoserver.scrd.gov.co/geoserver/Investigacion_Cultured_Maps/wms', {
        layers: 'Investigacion_Cultured_Maps:Localidad_Storymap_RolMujer',
        format: 'image/png',
        transparent: true
    }).addTo(map);

    var wmsLayer2 = L.tileLayer.wms('https://geoserver.scrd.gov.co/geoserver/Investigacion_Cultured_Maps/wms', {
        layers: 'Investigacion_Cultured_Maps:DistritosCreativos',
        format: 'image/png',
        transparent: true
    }).addTo(map);

    var wmsLayer3 = L.tileLayer.wms('https://geoserver.scrd.gov.co/geoserver/Espacios_culturales_Cultured_Maps/wms', {
        layers: 'Espacios_culturales_Cultured_Maps:Auditorios',
        format: 'image/png',
        transparent: true
    });

    var wmsLayer4 = L.tileLayer.wms('https://geoserver.scrd.gov.co/geoserver/Espacios_culturales_Cultured_Maps/wms', {
        layers: 'Espacios_culturales_Cultured_Maps:Galerias',
        format: 'image/png',
        transparent: true
    });

    var wmsLayer5 = L.tileLayer.wms('https://geoserver.scrd.gov.co/geoserver/Espacios_culturales_Cultured_Maps/wms', {
        layers: 'Espacios_culturales_Cultured_Maps:Bibliotecas_Comunitarias',
        format: 'image/png',
        transparent: true
    });

    var wmsLayer6 = L.tileLayer.wms('https://geoserver.scrd.gov.co/geoserver/Espacios_culturales_Cultured_Maps/wms', {
        layers: 'Espacios_culturales_Cultured_Maps:Museos',
        format: 'image/png',
        transparent: true
    });

    var wmsLayer7 = L.tileLayer.wms('https://geoserver.scrd.gov.co/geoserver/Espacios_culturales_Cultured_Maps/wms', {
        layers: 'Espacios_culturales_Cultured_Maps:CentrosCulturalesyArtisticos',
        format: 'image/png',
        transparent: true
    });

    var wmsLayer8 = L.tileLayer.wms('https://geoserver.scrd.gov.co/geoserver/Espacios_culturales_Cultured_Maps/wms', {
        layers: 'Espacios_culturales_Cultured_Maps:ParaderosparaLibrosparaParques_PPP',
        format: 'image/png',
        transparent: true
    });

    var wmsLayer9 = L.tileLayer.wms('https://geoserver.scrd.gov.co/geoserver/Espacios_culturales_Cultured_Maps/wms', {
        layers: 'Espacios_culturales_Cultured_Maps:Teatros',
        format: 'image/png',
        transparent: true
    });

    // Agrupar todas las capas WMS para consultarlas en el clic
    var allWmsLayers = [
        wmsLayer2, wmsLayer3, wmsLayer4, wmsLayer5,
        wmsLayer6, wmsLayer7, wmsLayer8, wmsLayer9
    ];

    // Evento de clic para mostrar atributos desde las capas WMS activas
    map.on('click', function (e) {
        var latlng = e.latlng;
        var bbox = map.getBounds().toBBoxString();
        var size = map.getSize();

        allWmsLayers.forEach(function (layer) {
            if (!map.hasLayer(layer)) return;

            var layerUrl = layer._url;
            var layerName = layer.wmsParams.layers;

            var url = layerUrl + L.Util.getParamString({
                request: 'GetFeatureInfo',
                service: 'WMS',
                srs: 'EPSG:4326',
                styles: '',
                version: '1.1.1',
                format: 'image/png',
                transparent: true,
                bbox: bbox,
                height: size.y,
                width: size.x,
                layers: layerName,
                query_layers: layerName,
                info_format: 'application/json',
                x: Math.floor(e.containerPoint.x),
                y: Math.floor(e.containerPoint.y)
            });

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.features && data.features.length > 0) {
                        var props = data.features[0].properties;
                        var content = Object.entries(props)
                            .map(([key, value]) => `<b>${key}</b>: ${value}`)
                            .join('<br>');

                        L.popup()
                            .setLatLng(latlng)
                            .setContent(content)
                            .openOn(map);
                    }
                })
                .catch(err => console.error('Error en GetFeatureInfo:', err));
        });
    });

    // Controlar la visibilidad de las capas según el nivel de zoom
    map.on('zoomend', function () {
        var zoomLevel = map.getZoom();

        // Condiciones por capa
        [
            [wmsLayer3, zoomLevel >= 14 && zoomLevel <= 20],
            [wmsLayer4, zoomLevel >= 14 && zoomLevel <= 20],
            [wmsLayer5, zoomLevel >= 14 && zoomLevel <= 20],
            [wmsLayer6, zoomLevel >= 14 && zoomLevel <= 20],
            [wmsLayer7, zoomLevel >= 14 && zoomLevel <= 20],
            [wmsLayer8, zoomLevel >= 14 && zoomLevel <= 20],
            [wmsLayer9, zoomLevel >= 14 && zoomLevel <= 20]
        ].forEach(([layer, condition]) => {
            if (condition && !map.hasLayer(layer)) {
                map.addLayer(layer);
            } else if (!condition && map.hasLayer(layer)) {
                map.removeLayer(layer);
            }
        });
    });

    // Función para cambiar la vista del mapa
    function changeMapView(lat, lng, zoom) {
        map.setView([lat, lng], zoom);
    }

    // Manejar las diapositivas
    var slides = document.querySelectorAll('.slide');

    // Crear el índice
    var indexContainer = document.getElementById('index');
    slides.forEach(function (slide, index) {
        if (index > 0) {
            var button = document.createElement('button');
            button.textContent = 'Diapositiva ' + index;
            button.className = 'index-button';
            button.addEventListener('click', function () {
                var lat = parseFloat(slide.getAttribute('data-lat'));
                var lng = parseFloat(slide.getAttribute('data-lng'));
                var zoom = parseInt(slide.getAttribute('data-zoom'));
                changeMapView(lat, lng, zoom);
                slide.scrollIntoView({ behavior: 'smooth' });
            });
            indexContainer.appendChild(button);
        }
    });

    // Manejar el clic en cada diapositiva
    slides.forEach(function (slide) {
        slide.addEventListener('click', function () {
            var lat = parseFloat(slide.getAttribute('data-lat'));
            var lng = parseFloat(slide.getAttribute('data-lng'));
            var zoom = parseInt(slide.getAttribute('data-zoom'));
            changeMapView(lat, lng, zoom);
        });
    });

    // Manejar el scroll para cambiar la vista del mapa
    var content = document.getElementById('content');
    content.addEventListener('scroll', function () {
        slides.forEach(function (slide) {
            var slideRect = slide.getBoundingClientRect();
            var contentRect = content.getBoundingClientRect();
            if (slideRect.top >= contentRect.top && slideRect.bottom <= contentRect.bottom) {
                var lat = parseFloat(slide.getAttribute('data-lat'));
                var lng = parseFloat(slide.getAttribute('data-lng'));
                var zoom = parseInt(slide.getAttribute('data-zoom'));
                changeMapView(lat, lng, zoom);
            }
        });
    });

    // Manejar el botón para volver al índice
    var backToIndexButton = document.getElementById('backToIndexButton');
    backToIndexButton.addEventListener('click', function () {
        var indexSlide = slides[0];
        var lat = parseFloat(indexSlide.getAttribute('data-lat'));
        var lng = parseFloat(indexSlide.getAttribute('data-lng'));
        var zoom = parseInt(indexSlide.getAttribute('data-zoom'));
        changeMapView(lat, lng, zoom);
        indexSlide.scrollIntoView({ behavior: 'smooth' });
    });
});
