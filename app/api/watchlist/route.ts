export const runtime = 'nodejs';

function getTokenFromCookie(req: Request) {
  const cookie = req.headers.get('cookie') || '';
  return cookie.match(/token=([^;]+)/)?.[1];
}

function getBackendUrl() {
  return process.env.NEXT_PUBLIC_BACKEND_URL;
}


// ================= GET =================
export async function GET(req: Request) {
  try {
    const BACKEND_URL = getBackendUrl();

    if (!BACKEND_URL) {
      return Response.json({ error: 'BACKEND_URL not set' }, { status: 500 });
    }

    // 🔥 get token from cookie
    const token = getTokenFromCookie(req);

    console.log("COOKIE TOKEN:", token);

    if (!token) {
      return Response.json({ error: 'No token provided' }, { status: 401 });
    }

    const res = await fetch(`${BACKEND_URL}/watchlist`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const text = await res.text();

    return new Response(text, {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('WATCHLIST GET ERROR:', err);
    return Response.json({ error: 'Failed to fetch watchlist' }, { status: 500 });
  }
}


// ================= POST =================
export async function POST(req: Request) {
  try {
    const BACKEND_URL = getBackendUrl();

    if (!BACKEND_URL) {
      return Response.json({ error: 'BACKEND_URL not set' }, { status: 500 });
    }

    const token = getTokenFromCookie(req);
    const body = await req.json();

    if (!token) {
      return Response.json({ error: 'No token provided' }, { status: 401 });
    }

    const res = await fetch(`${BACKEND_URL}/watchlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();

    try {
      const data = JSON.parse(text);
      return Response.json(data, { status: res.status });
    } catch {
      return Response.json({ error: text }, { status: res.status });
    }

  } catch (err) {
    console.error('WATCHLIST POST ERROR:', err);
    return Response.json({ error: 'Failed to add' }, { status: 500 });
  }
}


// ================= DELETE =================
export async function DELETE(req: Request) {
  try {
    const BACKEND_URL = getBackendUrl();

    if (!BACKEND_URL) {
      return Response.json({ error: 'BACKEND_URL not set' }, { status: 500 });
    }

    const token = getTokenFromCookie(req);
    const body = await req.json();

    if (!token) {
      return Response.json({ error: 'No token provided' }, { status: 401 });
    }

    const res = await fetch(`${BACKEND_URL}/watchlist`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();

    try {
      const data = JSON.parse(text);
      return Response.json(data, { status: res.status });
    } catch {
      return Response.json({ error: text }, { status: res.status });
    }

  } catch (err) {
    console.error('WATCHLIST DELETE ERROR:', err);
    return Response.json({ error: 'Failed to delete' }, { status: 500 });
  }
}