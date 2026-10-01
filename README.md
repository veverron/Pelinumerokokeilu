# Pelinumerokokeilu

Pieni Cloudflare Pages + D1 -testi.

## Tiedostot

- `index.html` – käyttöliittymä
- `functions/api/pelaajat.js` – API, joka lukee ja tallentaa tietokantaan
- `schema.sql` – D1-tietokannan taulun luonti
- `wrangler.toml` – Cloudflare D1 -binding

## Tietokanta

Tietokantaan tulee yksi taulu:

`pelaajat`

- `id`
- `nimi`
- `pelinumero`

`database_id` vaihdetaan myöhemmin Cloudflaren luoman D1-tietokannan ID:ksi.
