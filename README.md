DRI Schema:

```sql
create table dri_rows (
    dataset VARCHAR(255),
    origin VARCHAR(255),
    claim VARCHAR(255),
    pdp_year VARCHAR(255),
    commodity_code VARCHAR(255),
    commodity_name VARCHAR(255),
    pest_code VARCHAR(255),
    rpt_pest_name VARCHAR(255),
    ai_type VARCHAR(255),
    risk_group VARCHAR(255),
    banned_oc BOOL,
    foc VARCHAR(255),
    total_samples INT,
    total_foods INT,
    pct_pos FLOAT8,
    mean_positives FLOAT8,
    number_positives INT,
    usda_ss_kid FLOAT8,
    chronic_rfd_pad FLOAT8,
    crfc_kid FLOAT8,
    dri_mean_kid FLOAT8,
    fs_dir_kid FLOAT8,
    per_agg_fsdri FLOAT8,
    chronic_sf FLOAT8,
    chronic_fqpa_sf FLOAT8,
    chronic_noael FLOAT8
)
```

-- Table: public.dri_rows

-- DROP TABLE public.dri_rows;

CREATE TABLE IF NOT EXISTS public.dri_rows
(
    dataset integer,
    origin text COLLATE pg_catalog."default",
    claim text COLLATE pg_catalog."default",
    pdp_year text COLLATE pg_catalog."default",
    commodity_code text COLLATE pg_catalog."default",
    commodity_name text COLLATE pg_catalog."default",
    pest_code text COLLATE pg_catalog."default",
    rpt_pest_name text COLLATE pg_catalog."default",
    ai_type text COLLATE pg_catalog."default",
    risk_group text COLLATE pg_catalog."default",
    banned_oc text COLLATE pg_catalog."default",
    foc text COLLATE pg_catalog."default",
    total_samples smallint,
    total_foods smallint,
    pct_pos numeric,
    mean_positives numeric,
    number_positives smallint,
    usda_ss_kid numeric,
    chronic_rfd_pad numeric,
    crfc_kid numeric,
    dri_mean_kid numeric,
    fs_dir_kid numeric,
    per_agg_fsdri numeric,
    chronic_sf smallint,
    chronic_fqpa_sf smallint,
    chronic_noael numeric
)

TABLESPACE pg_default;

ALTER TABLE public.dri_rows
    OWNER to postgres;