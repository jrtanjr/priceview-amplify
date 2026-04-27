export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!BACKEND_URL) {
      return Response.json(
        { error: "BACKEND_URL not set" },
        { status: 500 }
      );
    }

    const body = await req.json();

    const res = await fetch(`${BACKEND_URL}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    console.log("BACKEND RESPONSE:", text);

    try {
      const data = JSON.parse(text);
      return Response.json(data, { status: res.status });
    } catch {
      return Response.json({ error: text }, { status: res.status });
    }

  } catch (err) {
    console.error('SIGNUP PROXY ERROR:', err);
    return Response.json({ error: 'Signup failed' }, { status: 500 });
  }
}