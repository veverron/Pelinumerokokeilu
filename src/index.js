export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/pelaajat" && request.method === "GET") {
      const result = await env.DB
        .prepare("SELECT id, nimi, pelinumero FROM pelaajat ORDER BY id DESC")
        .all();

      return Response.json(result.results);
    }

    if (url.pathname === "/api/pelaajat" && request.method === "POST") {
      try {
        const body = await request.json();
        const nimi = String(body.nimi || "").trim();
        const pelinumero = Number(body.pelinumero);

        if (!nimi || !Number.isInteger(pelinumero)) {
          return Response.json(
            { error: "Anna nimi ja kokonaislukuna pelinumero." },
            { status: 400 }
          );
        }

        await env.DB
          .prepare("INSERT INTO pelaajat (nimi, pelinumero) VALUES (?, ?)")
          .bind(nimi, pelinumero)
          .run();

        return Response.json({ ok: true });
      } catch {
        return Response.json(
          { error: "Tallennus epäonnistui." },
          { status: 500 }
        );
      }
    }

    if (url.pathname === "/" || url.pathname === "/index.html") {
      return env.ASSETS.fetch(request);
    }

    return new Response("Not found", { status: 404 });
  }
};
