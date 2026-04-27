export async function GET(req: Request) {
  try {
    const token = req.headers.get('authorization');

    const { searchParams } = new URL(req.url);
    const symbol = searchParams.get('symbol');

    const res = await fetch(
      `${process.env.BACKEND_URL}/watchlist/check?symbol=${symbol}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: token }),
        },
      }
    );

    const data = await res.json();
    return Response.json(data, { status: res.status });

  } catch (err) {
    console.error('WATCHLIST CHECK ERROR:', err);
    return Response.json({ error: 'Check failed' }, { status: 500 });
  }
}