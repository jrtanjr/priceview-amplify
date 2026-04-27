export async function POST(req: Request) {
  try {
    if (!process.env.BACKEND_URL) {
      return Response.json(
        { error: "BACKEND_URL not set" },
        { status: 500 }
      );
    }

    console.log("BACKEND_URL:", process.env.BACKEND_URL);

    const body = await req.json();
    console.log("REQUEST BODY:", body); // 🔥 important

    const res = await fetch(`${process.env.BACKEND_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const text = await res.text(); // 🔥 raw response
    console.log("BACKEND RAW RESPONSE:", text); // 🔥 important

    return new Response(text, {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('LOGIN PROXY ERROR:', err);
    return Response.json({ error: 'Login failed' }, { status: 500 });
  }
}