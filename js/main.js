document.addEventListener('DOMContentLoaded', function() {
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


    // Controlar la visibilidad de las capas según el nivel de zoom
    map.on('zoomend', function() {
        var zoomLevel = map.getZoom();

        // Configurar la visibilidad de la capa de "Auditorios"
        if (zoomLevel >= 14 && zoomLevel <= 20) {
            if (!map.hasLayer(wmsLayer3)) {
                map.addLayer(wmsLayer3);
            }
        } else {
            if (map.hasLayer(wmsLayer3)) {
                map.removeLayer(wmsLayer3);
            }
        }

        // Configurar la visibilidad de la capa de "Galerias"
        if (zoomLevel >= 14 && zoomLevel <= 20) {
            if (!map.hasLayer(wmsLayer4)) {
                map.addLayer(wmsLayer4);
            }
        } else {
            if (map.hasLayer(wmsLayer4)) {
                map.removeLayer(wmsLayer4);
            }
        }

        // Configurar la visibilidad de la capa de "Bibliotecas_Comunitarias"
            if (zoomLevel >= 14 && zoomLevel <= 20) {
                if (!map.hasLayer(wmsLayer5)) {
                    map.addLayer(wmsLayer5);
                }
            } else {
                if (map.hasLayer(wmsLayer5)) {
                    map.removeLayer(wmsLayer5);
                }
            }

        // Configurar la visibilidad de la capa de "Museos"
            if (zoomLevel >= 14 && zoomLevel <= 20) {
                if (!map.hasLayer(wmsLayer6)) {
                    map.addLayer(wmsLayer6);
                }
            } else {
                if (map.hasLayer(wmsLayer6)) {
                    map.removeLayer(wmsLayer6);
                }
            }

        // Configurar la visibilidad de la capa de "CentrosCulturalesyArtisticos"
            if (zoomLevel >= 14 && zoomLevel <= 20) {
                if (!map.hasLayer(wmsLayer7)) {
                    map.addLayer(wmsLayer7);
                }
            } else {
                if (map.hasLayer(wmsLayer7)) {
                    map.removeLayer(wmsLayer7);
                }
            }

        // Configurar la visibilidad de la capa de "ParaderosparaLibrosparaParques_PPP"
            if (zoomLevel >= 14 && zoomLevel <= 20) {
                if (!map.hasLayer(wmsLayer8)) {
                    map.addLayer(wmsLayer8);
                }
            } else {
                if (map.hasLayer(wmsLayer8)) {
                    map.removeLayer(wmsLayer8);
                }
            }

// Configurar la visibilidad de la capa de "Teatros"
            if (zoomLevel >= 14 && zoomLevel <= 20) {
                if (!map.hasLayer(wmsLayer9)) {
                    map.addLayer(wmsLayer9);
                }
            } else {
                if (map.hasLayer(wmsLayer9)) {
                    map.removeLayer(wmsLayer9);
                }
            }
        
    });


    // Función para cambiar la vista del mapa
    function changeMapView(lat, lng, zoom) {
        map.setView([lat, lng], zoom);
    }

    // Manejar las diapositivas
    var slides = document.querySelectorAll('.slide');

    // Crear el índice
    var indexContainer = document.getElementById('index');
    slides.forEach(function(slide, index) {
        if (index > 0) { // Evitar agregar un botón para la diapositiva del índice
            var button = document.createElement('button');
            button.textContent = 'Diapositiva ' + index;
            button.className = 'index-button';
            button.addEventListener('click', function() {
                var lat = parseFloat(slide.getAttribute('data-lat'));
                var lng = parseFloat(slide.getAttribute('data-lng'));
                var zoom = parseInt(slide.getAttribute('data-zoom'));
                changeMapView(lat, lng, zoom);
                slide.scrollIntoView({behavior: 'smooth'});
            });
            indexContainer.appendChild(button);
        }
    });

    // Manejar el clic en cada diapositiva
    slides.forEach(function(slide) {
        slide.addEventListener('click', function() {
            var lat = parseFloat(slide.getAttribute('data-lat'));
            var lng = parseFloat(slide.getAttribute('data-lng'));
            var zoom = parseInt(slide.getAttribute('data-zoom'));
            changeMapView(lat, lng, zoom);
        });
    });

    // Manejar el scroll para cambiar la vista del mapa
    var content = document.getElementById('content');
    content.addEventListener('scroll', function() {
        slides.forEach(function(slide) {
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
    backToIndexButton.addEventListener('click', function() {
        var indexSlide = slides[0]; // Diapositiva del índice
        var lat = parseFloat(indexSlide.getAttribute('data-lat'));
        var lng = parseFloat(indexSlide.getAttribute('data-lng'));
        var zoom = parseInt(indexSlide.getAttribute('data-zoom'));
        changeMapView(lat, lng, zoom);
        indexSlide.scrollIntoView({behavior: 'smooth'});
    });
});