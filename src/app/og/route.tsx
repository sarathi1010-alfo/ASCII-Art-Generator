import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title');
    const type = searchParams.get('type');

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0a0a0a',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            fontFamily: 'sans-serif',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#000000dd',
              padding: '60px',
              borderRadius: '20px',
              border: '2px solid #333',
            }}
          >
            <div style={{ color: '#aaa', fontSize: 30, marginBottom: 20 }}>
              {type ? type.toUpperCase() : 'ASCII ART GENERATOR'}
            </div>
            <div
              style={{
                fontSize: 60,
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
                maxWidth: 900,
              }}
            >
              {title || 'ASCII Art Generator'}
            </div>
            <div style={{ color: '#00ff00', fontSize: 24, marginTop: 40, fontFamily: 'monospace' }}>
              asciiforge.alfo.online
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 'public, immutable, no-transform, max-age=31536000',
        },
      }
    );
  } catch (e: unknown) {
    console.log(e instanceof Error ? e.message : 'Unknown error');
    return new Response('Failed to generate the image', {
      status: 500,
    });
  }
}
