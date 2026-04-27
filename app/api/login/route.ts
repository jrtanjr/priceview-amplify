export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const BACKEND_URL = process.env.BACKEND_URL; // ✅ move inside

    if (!BACKEND_URL) {
      return Response.json(
        { error: "BACKEND_URL not set" },
        { status: 500 }
      );
    }

    const body = await req.json();

    const res = await fetch(`${BACKEND_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const text = await res.text();

    return new Response(text, {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    return Response.json({ error: 'Login failed' }, { status: 500 });
  }
}