BEGIN;

CREATE TEMP TABLE tmp_table ON COMMIT DROP AS (
    SELECT * FROM umap_tilelayer
  )
WITH NO DATA;

COPY tmp_table FROM '/app/scripts/import-tilelayers.csv' DELIMITER ',' CSV;

INSERT INTO umap_tilelayer
SELECT *
FROM tmp_table
ON CONFLICT DO NOTHING;

COMMIT;
