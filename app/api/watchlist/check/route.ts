export const runtime = 'nodejs';

export async function GET(req: Request) {
  try {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

    if (!BACKEND_URL) {
      return Response.json({ error: 'BACKEND_URL not set' }, { status: 500 });
    }

    const cookie = req.headers.get('cookie') || '';
    const token = cookie.match(/token=([^;]+)/)?.[1];

    const { searchParams } = new URL(req.url);
    const symbol = searchParams.get('symbol');

    const res = await fetch(
      `${BACKEND_URL}/watchlist/check?symbol=${symbol}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    const text = await res.text();

    try {
      const data = JSON.parse(text);
      return Response.json(data, { status: res.status });
    } catch {
      return Response.json({ error: text }, { status: res.status });
    }

  } catch (err) {
    console.error('WATCHLIST CHECK ERROR:', err);
    return Response.json({ error: 'Check failed' }, { status: 500 });
  }
}