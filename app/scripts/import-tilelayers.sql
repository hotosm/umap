INSERT INTO umap_tilelayer (id, name, url_template, "minZoom", "maxZoom", attribution, rank, tms)
VALUES
    (2, 'OpenStreetMap',
     'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
     0, 19,
     '&copy; [[http://www.openstreetmap.org/copyright|OpenStreetMap]] contributors',
     1, false) ON CONFLICT (id) DO NOTHING;

INSERT INTO umap_tilelayer (id, name, url_template, "minZoom", "maxZoom", attribution, rank, tms)
VALUES
    (3, 'OAM (Kontur)',
     'https://apps.kontur.io/raster-tiler/oam/mosaic/{z}/{x}/{y}.png',
     3, 24,
     '&copy; © OpenAerialMap © Kontur',
     2, false) ON CONFLICT (id) DO NOTHING;

INSERT INTO umap_tilelayer (id, name, url_template, "minZoom", "maxZoom", attribution, rank, tms)
VALUES
    (4, 'Humanitarian',
     'https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png https://b.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
     0, 19,
     '&copy; [[http://www.openstreetmap.org/copyright|OpenStreetMap]] contributors',
     3, false) ON CONFLICT (id) DO NOTHING;

INSERT INTO umap_tilelayer (id, name, url_template, "minZoom", "maxZoom", attribution, rank, tms)
VALUES
    (5, 'ESRI',
     'https://services.arcgisonline.com/ArcGis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png',
     0, 19,
     'Powered by Esri',
     4, false) ON CONFLICT (id) DO NOTHING;

INSERT INTO umap_tilelayer (id, name, url_template, "minZoom", "maxZoom", attribution, rank, tms)
VALUES
    (6, 'OpenTopo',
     'https://c.tile.opentopomap.org/{z}/{x}/{y}.png',
     0, 24,
     'Powered by Open Topo',
     5, false) ON CONFLICT (id) DO NOTHING;