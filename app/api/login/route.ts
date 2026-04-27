export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(`${process.env.BACKEND_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return Response.json(data, { status: res.status });

  } catch (err) {
    console.error('LOGIN PROXY ERROR:', err);
    return Response.json({ error: 'Login failed' }, { status: 500 });
  }
}