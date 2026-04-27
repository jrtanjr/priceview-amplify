export const runtime = 'nodejs';

const BACKEND_URL = process.env.BACKEND_URL || '';

export async function POST(req: Request) {
  try {
    if (!BACKEND_URL) {
      console.log("ENV DEBUG:", process.env); // 👈 ADD THIS
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

    const text = await res.text(); // 🔥 raw response

    return new Response(text, {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('LOGIN PROXY ERROR:', err);
    return Response.json({ error: 'Login failed' }, { status: 500 });
  }
}