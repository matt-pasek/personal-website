import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';
export const alt = 'Mateusz Pasek — Designer & Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  const interBold = readFileSync(join(process.cwd(), 'public/fonts/Inter-Bold.woff'));

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#08021a',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Inter',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 55% 70% at 82% 50%, rgba(105,50,220,0.28) 0%, transparent 65%), radial-gradient(ellipse 35% 35% at 10% 90%, rgba(140,80,255,0.1) 0%, transparent 60%)',
            display: 'flex',
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: 72,
            top: 0,
            bottom: 0,
            width: 480,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: 12,
              letterSpacing: '0.2em',
              color: 'rgba(200,150,255,0.5)',
              textTransform: 'uppercase',
              marginBottom: 24,
              display: 'flex',
            }}
          >
            Mateusz Pasek
          </div>
          <div
            style={{
              fontSize: 82,
              fontWeight: 700,
              lineHeight: 0.93,
              letterSpacing: '-0.03em',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span style={{ display: 'flex', color: '#fff' }}>Designer</span>
            <span
              style={{
                display: 'flex',
                background: 'linear-gradient(to bottom right, #C896FF, #936EDC)',
                backgroundClip: 'text',
                color: 'transparent',
                paddingBottom: 8,
              }}
            >
              by eye,
            </span>
            <span style={{ display: 'flex', color: '#fff' }}>dev by</span>
            <span
              style={{
                display: 'flex',
                background: 'linear-gradient(to bottom right, #C896FF, #936EDC)',
                backgroundClip: 'text',
                color: 'transparent',
                paddingBottom: 8,
              }}
            >
              hand.
            </span>
          </div>
          <div
            style={{ width: 44, height: 1, background: 'rgba(200,150,255,0.25)', margin: '22px 0', display: 'flex' }}
          />
          <div style={{ fontSize: 17, color: 'rgba(255,255,255,0.38)', lineHeight: 1.65, display: 'flex' }}>
            Designer & developer at the intersection of aesthetics and engineering.
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 50,
            width: 620,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              position: 'absolute',
              width: 380,
              borderRadius: 18,
              background: 'rgba(14,5,32,0.9)',
              border: '1px solid rgba(200,150,255,0.1)',
              padding: '24px 28px',
              transform: 'rotate(7deg) translate(60px, -20px)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
              {['Frontend', 'UI Design', 'Design System'].map((t) => (
                <div
                  key={t}
                  style={{
                    border: '1px solid rgba(200,150,255,0.2)',
                    borderRadius: 999,
                    padding: '3px 10px',
                    fontSize: 10,
                    letterSpacing: '0.08em',
                    color: 'rgba(200,150,255,0.5)',
                    display: 'flex',
                  }}
                >
                  {t}
                </div>
              ))}
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.65)',
                letterSpacing: '-0.02em',
                display: 'flex',
                marginBottom: 8,
              }}
            >
              JAIN 2.0
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              width: 380,
              borderRadius: 18,
              background: 'rgba(11,4,26,0.95)',
              border: '1px solid rgba(200,150,255,0.15)',
              padding: '24px 28px',
              transform: 'rotate(-4deg) translate(-30px, 40px)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'rgba(200,150,255,0.45)',
                  display: 'flex',
                }}
              />
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: '0.16em',
                  color: 'rgba(200,150,255,0.45)',
                  textTransform: 'uppercase',
                  display: 'flex',
                }}
              >
                About
              </div>
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.8)',
                letterSpacing: '-0.02em',
                lineHeight: 1.3,
                display: 'flex',
              }}
            >
              I care about the details most people skip.
            </div>
            <div
              style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 10, lineHeight: 1.6, display: 'flex' }}
            >
              The 20ms animation that changes everything, the hierarchy that guides without announcing itself.
            </div>
            <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#C896FF', display: 'flex' }} />
              <div style={{ fontSize: 12, color: 'rgba(200,150,255,0.6)', display: 'flex' }}>
                Open to the right opportunities
              </div>
            </div>
          </div>

          <div
            style={{
              position: 'absolute',
              width: 340,
              borderRadius: 18,
              background: 'rgba(10,3,24,1)',
              border: '1px solid rgba(200,150,255,0.25)',
              padding: '20px 24px',
              transform: 'rotate(1deg) translate(20px, -60px)',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 0 80px rgba(140,80,255,0.14)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 16 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#C896FF', display: 'flex' }} />
              <div
                style={{
                  fontSize: 9,
                  letterSpacing: '0.18em',
                  color: 'rgba(200,150,255,0.85)',
                  textTransform: 'uppercase',
                  display: 'flex',
                }}
              >
                Now Playing
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, rgba(140,80,255,0.45), rgba(60,30,150,0.55))',
                  border: '1px solid rgba(200,150,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  flexShrink: 0,
                }}
              ></div>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                <div
                  style={{ fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em', display: 'flex' }}
                >
                  Sometimes
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 3, display: 'flex' }}>
                  Blue Imagined
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 26, flexShrink: 0 }}>
                {[50, 90, 35, 75, 55].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      width: 3,
                      height: `${h}%`,
                      background: 'linear-gradient(to top, #8C50FF, #C896FF)',
                      borderRadius: 2,
                      display: 'flex',
                    }}
                  />
                ))}
              </div>
            </div>
            <div
              style={{
                marginTop: 14,
                fontSize: 10,
                color: 'rgba(200,150,255,0.3)',
                letterSpacing: '0.08em',
                display: 'flex',
              }}
            >
              via Last.fm · live data
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: 'linear-gradient(to right, transparent, rgba(200,150,255,0.2), transparent)',
            display: 'flex',
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Inter', data: interBold, weight: 700 }],
    },
  );
}
