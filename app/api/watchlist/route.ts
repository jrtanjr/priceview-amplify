export async function GET(req: Request) {
  try {
    const token = req.headers.get('authorization');

    if (!token) {
      return Response.json({ error: 'No token provided' }, { status: 401 });
    }

    const res = await fetch(`${process.env.BACKEND_URL}/watchlist`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token, // 🔥 IMPORTANT
      },
    });

    const text = await res.text(); // debug raw response

    try {
      const data = JSON.parse(text);
      return Response.json(data, { status: res.status });
    } catch {
      return Response.json({ error: text }, { status: res.status });
    }

  } catch (err) {
    console.error('WATCHLIST GET ERROR:', err);
    return Response.json({ error: 'Failed to fetch watchlist' }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    const token = req.headers.get('authorization');
    const body = await req.json();

    const res = await fetch(`${process.env.BACKEND_URL}/watchlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: token }),
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return Response.json(data, { status: res.status });

  } catch (err) {
    console.error('WATCHLIST POST ERROR:', err);
    return Response.json({ error: 'Failed to add' }, { status: 500 });
  }
}


export async function DELETE(req: Request) {
  try {
    const token = req.headers.get('authorization');
    const body = await req.json();

    const res = await fetch(`${process.env.BACKEND_URL}/watchlist`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: token }),
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return Response.json(data, { status: res.status });

  } catch (err) {
    console.error('WATCHLIST DELETE ERROR:', err);
    return Response.json({ error: 'Failed to delete' }, { status: 500 });
  }
}