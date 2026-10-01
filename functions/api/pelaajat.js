export async function onRequestGet({ env }) {
  const result = await env.DB
    .prepare('SELECT nimi, pelinumero FROM pelaajat ORDER BY id DESC')
    .all();

  return Response.json(result.results);
}

export async function onRequestPost({ request, env }) {
  const data = await request.json();

  const nimi = String(data.nimi ?? '').trim();
  const pelinumero = Number(data.pelinumero);

  if (!nimi || !Number.isInteger(pelinumero)) {
    return Response.json(
      { error: 'Virheelliset tiedot.' },
      { status: 400 }
    );
  }

  await env.DB
    .prepare('INSERT INTO pelaajat (nimi, pelinumero) VALUES (?, ?)')
    .bind(nimi, pelinumero)
    .run();

  return Response.json({ ok: true });
}
