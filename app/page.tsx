'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const WEDDING = new Date('2026-05-30T13:00:00')

// ---------- Scroll Reveal ----------
function useReveal<T extends HTMLElement = HTMLDivElement>(opts?: { threshold?: number; once?: boolean }) {
  const ref = useRef<T | null>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') { setShown(true); return }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true)
            if (opts?.once !== false) io.unobserve(e.target)
          } else if (opts?.once === false) {
            setShown(false)
          }
        })
      },
      { threshold: opts?.threshold ?? 0.18, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [opts?.threshold, opts?.once])
  return { ref, shown }
}

interface RevealProps {
  children: React.ReactNode
  variant?: 'up' | 'up-sm' | 'up-lg' | 'fade' | 'zoom'
  delay?: 100 | 200 | 300 | 400 | 500 | 600 | 700
  as?: 'div' | 'section' | 'span'
  className?: string
  style?: React.CSSProperties
}
function Reveal({ children, variant = 'up', delay, as = 'div', className = '', style }: RevealProps) {
  const { ref, shown } = useReveal<HTMLDivElement>()
  const variantCls = variant === 'up' ? '' : ` ${variant}`
  const cls = `reveal${variantCls}${shown ? ' in' : ''}${className ? ' ' + className : ''}`
  const Tag = as as 'div'
  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={cls} style={style} data-delay={delay}>
      {children}
    </Tag>
  )
}

// ---------- Icons ----------
const I = {
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20s-7-4.5-9.3-9.1C1 7.5 3 4 6.5 4 8.7 4 10.5 5.3 12 7c1.5-1.7 3.3-3 5.5-3C21 4 23 7.5 21.3 10.9 19 15.5 12 20 12 20z"/>
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
    </svg>
  ),
  rings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="14" r="5"/><circle cx="16" cy="10" r="4"/>
    </svg>
  ),
  glass: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3h10l-1 7a4 4 0 0 1-8 0L7 3z"/><path d="M12 14v6"/><path d="M8 20h8"/>
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7l2-3h4l2 3"/><circle cx="12" cy="13.5" r="3.5"/>
    </svg>
  ),
  envelope: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 7l9 7 9-7"/>
    </svg>
  ),
  gift: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="9" width="18" height="11" rx="1"/><path d="M3 13h18"/><path d="M12 9v11"/>
      <path d="M12 9c-2 0-4-1-4-3s2-2 3-1 1 4 1 4zM12 9c2 0 4-1 4-3s-2-2-3-1-1 4-1 4z"/>
    </svg>
  ),
}

// ---------- Motifs ----------
const SW = 1.1

const Motifs: Record<string, () => React.ReactElement> = {
  rose: () => (
    <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
      <path d="M40 34c-5-2-9 2-9 6s4 7 9 7 9-3 9-7c0-3-2-6-5-6"/>
      <path d="M36 37c1-2 4-2 5 0"/>
      <path d="M38 40c1-1 3-1 4 0"/>
      <path d="M40 47c0 8-3 14-10 18"/>
      <path d="M40 52c-6-1-11-6-12-12 6-1 11 2 12 8"/>
      <path d="M40 58c4-2 9-1 12 3-3 4-8 5-12 3"/>
      <path d="M40 64c-3 3-8 4-12 2"/>
    </svg>
  ),
  sprig: () => (
    <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 66c8-22 24-38 52-52"/>
      <ellipse cx="22" cy="56" rx="5" ry="3" transform="rotate(-30 22 56)"/>
      <ellipse cx="30" cy="48" rx="5" ry="3" transform="rotate(-30 30 48)"/>
      <ellipse cx="38" cy="40" rx="5" ry="3" transform="rotate(-30 38 40)"/>
      <ellipse cx="46" cy="32" rx="5" ry="3" transform="rotate(-30 46 32)"/>
      <ellipse cx="54" cy="24" rx="5" ry="3" transform="rotate(-30 54 24)"/>
    </svg>
  ),
  ribbon: () => (
    <svg viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 30c-10-14-30-14-30-4 0 8 14 12 30 4z"/>
      <path d="M50 30c10-14 30-14 30-4 0 8-14 12-30 4z"/>
      <circle cx="50" cy="30" r="3"/>
      <path d="M47 32l-10 18M53 32l10 18"/>
      <path d="M37 50l4-4M63 50l-4-4"/>
    </svg>
  ),
  cake: () => (
    <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 70h40"/>
      <rect x="22" y="52" width="36" height="14" rx="1"/>
      <rect x="28" y="38" width="24" height="14" rx="1"/>
      <rect x="33" y="26" width="14" height="12" rx="1"/>
      <path d="M24 60h32M30 46h20M35 32h10"/>
      <path d="M40 26v-6"/>
      <path d="M40 20c-2-2 0-5 0-5s2 3 0 5z"/>
    </svg>
  ),
  candles: () => (
    <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 70h36"/>
      <path d="M30 70v-6h20v6"/>
      <path d="M40 64V34"/>
      <path d="M24 64V40"/>
      <path d="M56 64V40"/>
      <path d="M22 40h4M54 40h4"/>
      <path d="M38 34h4"/>
      <path d="M24 40c-1-3 0-6 0-6s1 3 0 6z"/>
      <path d="M40 34c-1-3 0-6 0-6s1 3 0 6z"/>
      <path d="M56 40c-1-3 0-6 0-6s1 3 0 6z"/>
    </svg>
  ),
  dining: () => (
    <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="40" cy="40" r="20"/>
      <circle cx="40" cy="40" r="14"/>
      <path d="M18 26v14c0 3 2 5 4 5v15"/>
      <path d="M18 26v8M22 26v8"/>
      <path d="M62 26c-3 0-5 4-5 10s2 10 5 10v14"/>
    </svg>
  ),
  lantern: () => (
    <svg viewBox="0 0 60 80" fill="none" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
      <path d="M30 8v6"/>
      <path d="M22 14h16"/>
      <path d="M24 14l-2 6h16l-2-6"/>
      <rect x="20" y="20" width="20" height="28" rx="1"/>
      <path d="M24 24v20M36 24v20M20 34h20"/>
      <path d="M22 48l-2 6h20l-2-6"/>
      <path d="M26 54v6h8v-6"/>
      <path d="M30 32c-1-3 0-6 0-6s1 3 0 6z"/>
    </svg>
  ),
  flutes: () => (
    <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
      <path d="M26 18l-4 22c-1 5 2 8 6 8s7-3 6-8l-4-22z"/>
      <path d="M54 18l-4 22c-1 5 2 8 6 8s7-3 6-8l-4-22z"/>
      <path d="M28 48v14M56 48v14"/>
      <path d="M22 62h12M50 62h12"/>
      <path d="M38 28l12-6M38 34l12 6" opacity=".6"/>
    </svg>
  ),
  spray: () => (
    <svg viewBox="0 0 160 60" fill="none" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 30c20-14 60-14 70 0 10-14 50-14 70 0"/>
      <circle cx="40" cy="22" r="4"/>
      <circle cx="80" cy="30" r="5"/>
      <circle cx="120" cy="22" r="4"/>
      <ellipse cx="25" cy="32" rx="4" ry="2" transform="rotate(-20 25 32)"/>
      <ellipse cx="55" cy="36" rx="4" ry="2" transform="rotate(20 55 36)"/>
      <ellipse cx="100" cy="36" rx="4" ry="2" transform="rotate(-20 100 36)"/>
      <ellipse cx="135" cy="32" rx="4" ry="2" transform="rotate(20 135 32)"/>
      <path d="M40 26v10M80 35v10M120 26v10"/>
    </svg>
  ),
  flourishLine: () => (
    <svg viewBox="0 0 120 22" fill="none" stroke="currentColor" strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 11h36"/>
      <path d="M80 11h36"/>
      <path d="M40 11c2-4 6-4 8 0s6 4 8 0"/>
      <path d="M64 11c2-4 6-4 8 0s6 4 8 0"/>
      <circle cx="60" cy="11" r="1.5"/>
    </svg>
  ),
}

// ---------- Helpers ----------
interface MotifProps {
  kind: string
  top?: number | string
  bottom?: number | string
  left?: number | string
  right?: number | string
  size?: number
  rotate?: number
  opacity?: number
  tone?: 'pale' | ''
}

function Motif({ kind, top, bottom, left, right, size = 70, rotate = 0, opacity, tone }: MotifProps) {
  const style: React.CSSProperties = { top, bottom, left, right, width: size, height: size, transform: `rotate(${rotate}deg)`, opacity }
  return (
    <div className={`motif${tone === 'pale' ? ' motif--pale' : ''}`} style={style} aria-hidden="true">
      {Motifs[kind]?.()}
    </div>
  )
}

function Flourish() {
  return <div className="flourish" aria-hidden="true">{Motifs.flourishLine()}</div>
}

function Placeholder({ label, tone = 'warm' }: { label: string; tone?: 'warm' | 'cool' }) {
  const bg = tone === 'cool'
    ? 'repeating-linear-gradient(135deg, rgba(166,163,173,.22) 0 10px, rgba(166,163,173,.06) 10px 20px)'
    : 'repeating-linear-gradient(135deg, rgba(167,138,150,.22) 0 10px, rgba(167,138,150,.06) 10px 20px)'
  return (
    <div className="placeholder" style={{ background: bg }}>
      <span className="tag">{label}</span>
    </div>
  )
}

function Ornament() {
  return (
    <div className="ornament" aria-hidden="true">
      <span className="line" />
      <span className="dot" />
      <span className="diamond" style={{ background: 'currentColor' }} />
      <span className="dot" />
      <span className="line" />
    </div>
  )
}

// ---------- Hero (full screen) ----------
function Hero() {
  return (
    <section className="hero">
      <div className="hero-img">
        <Image src="/images/hero.jpeg" alt="Robert & Matti" fill sizes="(max-width: 640px) 100vw, 420px" style={{ objectFit: 'cover', objectPosition: 'center top' }} priority />
        <div className="hero-crest">
          <div className="eyebrow">Together with their families</div>
          <div className="mono" style={{ marginTop: 5 }}>30 · 05 · 2026</div>
        </div>
        <div className="hero-overlay">
          <div className="hero-bottom">
            <div className="mono" style={{ fontSize: 10, letterSpacing: '.3em', opacity: .8 }}>YOU'RE INVITED TO THE WEDDING OF</div>
            <div className="hero-names">Robert<span className="hero-amp">&amp;</span>Matti</div>
            <div className="hero-date-strip">
              <span>Saturday</span>
              <span className="hero-date-rule" />
              <span>30 May 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------- Header ----------
function Header() {
  return (
    <section className="header-sect">
      <Motif kind="sprig" top={18} left={14} size={74} rotate={-10} />
      <Motif kind="sprig" top={22} right={16} size={74} rotate={190} tone="pale" />
      <Reveal variant="fade"><Ornament /></Reveal>

      <Reveal variant="up" delay={100}>
        <blockquote className="quote" style={{marginTop: 60, marginBottom: 60}}>
          &ldquo;That their hearts may be encouraged, being knit together in love&rdquo;
          <cite>Colossians 2:2</cite>
        </blockquote>
      </Reveal>

      <Reveal variant="fade" delay={200}>
        <div style={{ marginTop: 22, marginBottom: 10 }}><Flourish /></div>
      </Reveal>

      <Reveal variant="up-sm" delay={100}>
        <p className="invite-text" style={{marginTop: 60, marginBottom: 20}}>
          With great joy, we cordially invite you to grace us with your presence
          to celebrate the union of two hearts.
        </p>
      </Reveal>

      <Reveal variant="zoom" delay={200}>
        <h1 className="couple" style={{ marginTop: 28 }}>Robert<span className="amp">&amp;</span>Matti</h1>
      </Reveal>

      <Reveal variant="up-sm" delay={300}>
        <div className="full-names" style={{ marginTop: 10 }}>
          <div className="full-name">Robert Kharmuti</div>
          <div className="full-name">L Matti Bakor Nonglait</div>
        </div>
      </Reveal>

      <Reveal variant="up-sm" delay={400}>
        <div className="parents" style={{ marginTop: 24 }}>
          <div className="parent-line">
            Son of <span className="late">(Late)</span> Mr. H. Jyrwa &amp; <span className="late">(Late)</span> Mrs. Bida Kharmuti
          </div>
          <div className="parent-line">
            Daughter of Mr. Langdonbor B Chyne &amp; Mrs. Bervilet Nonglait
          </div>
        </div>
      </Reveal>

      <Motif kind="rose" bottom={-14} left={-10} size={90} rotate={-20} tone="pale" />
      <Motif kind="rose" bottom={-14} right={-10} size={90} rotate={200} />
    </section>
  )
}

// ---------- Countdown ----------
function useCountdown(target: Date) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60 * 1000)
    return () => clearInterval(t)
  }, [])
  const diff = Math.max(0, target.getTime() - now.getTime())
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
  }
}

function Countdown() {
  const { days, hours, minutes } = useCountdown(WEDDING)
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    <section>
      <Motif kind="candles" top={20} left={8} size={70} rotate={-8} tone="pale" />
      <Motif kind="lantern" top={24} right={10} size={66} rotate={6} />
      <Reveal variant="zoom"><span className="icon" aria-hidden="true">{I.clock}</span></Reveal>
      <Reveal variant="up-sm" delay={100}><h2 className="section-title">The Countdown</h2></Reveal>
      <Reveal variant="up-sm" delay={200}>
        <p className="lede">Every tick brings us closer to the moment we say <em>I do</em>. Save 30 May and celebrate with us.</p>
      </Reveal>
      <div className="count-grid" role="timer" aria-label="Time until wedding">
        <Reveal variant="up" delay={300}><div className="count-cell"><div className="count-num">{pad(days)}</div><div className="count-lbl">Days</div></div></Reveal>
        <Reveal variant="up" delay={400}><div className="count-cell"><div className="count-num">{pad(hours)}</div><div className="count-lbl">Hours</div></div></Reveal>
        <Reveal variant="up" delay={500}><div className="count-cell"><div className="count-num">{pad(minutes)}</div><div className="count-lbl">Minutes</div></div></Reveal>
      </div>
    </section>
  )
}

// ---------- Itinerary ----------
function MapPlaceholder({ tag }: { tag: string }) {
  return (
    <div className="map-box" aria-label={`Map placeholder: ${tag}`}>
      <div className="map-grid" />
      <div className="map-road" style={{ top: '30%', left: 0, right: 0, height: 6 }} />
      <div className="map-road" style={{ top: 0, bottom: 0, left: '58%', width: 6 }} />
      <div className="map-road" style={{ top: '70%', left: 0, right: 0, height: 3, opacity: .6 }} />
      <div className="map-pin" aria-hidden="true" />
      <div className="map-tag">{tag}</div>
    </div>
  )
}

function ItineraryBlock({ icon, title, time, address }: {
  icon: React.ReactNode
  title: string
  time: string
  address: string
}) {
  return (
    <div className="itin-block">
      <span className="icon" aria-hidden="true">{icon}</span>
      <h3 className="block-title">{title}</h3>
      <div className="info-line">{time}</div>
      <div className="info-line" style={{ color: 'var(--ink-mute)', fontSize: 14 }}>{address}</div>
    </div>
  )
}

function Itinerary() {
  return (
    <section>
      <Motif kind="spray" top={12} left={-20} size={180} rotate={0} tone="pale" />
      <Motif kind="ribbon" top={30} right={10} size={70} rotate={-10} />
      <Motif kind="dining" bottom={240} left={8} size={62} rotate={-6} tone="pale" />
      <Motif kind="flutes" bottom={60} right={8} size={66} rotate={8} />
      <Reveal variant="up-sm"><h2 className="section-title">Order of the Day</h2></Reveal>
      <Reveal variant="up-sm" delay={100}>
        <p className="lede">A solemnisation, followed by an evening reception — a day of joy, faith, and celebration.</p>
      </Reveal>
      <Reveal variant="up" delay={200}>
        <ItineraryBlock
          icon={I.rings}
          title="Solemnisation"
          time="1:00 PM · Saturday, 30 May 2026"
          address="Solemnisation Ceremony"
        />
      </Reveal>
      <Reveal variant="up" delay={300}>
        <ItineraryBlock
          icon={I.glass}
          title="Reception"
          time="6:00 PM onwards · Dinner & Celebration"
          address="Evening Reception"
        />
      </Reveal>
      <div style={{marginTop: 80}}></div>
      <Reveal variant="zoom" delay={200}><MapPlaceholder tag="THE RATSON PAVILLION" /></Reveal>
      <Reveal variant="fade" delay={400}>
        <div className="cta-row"><a className="btn" href="https://maps.app.goo.gl/cwUFF9V2SKM7p4Mu9" target="_blank" rel="noopener noreferrer">Open in Maps</a></div>
      </Reveal>
    </section>
  )
}

// ---------- Gallery ----------
const GALLERY_ITEMS: { src?: string; label: string }[] = [
  { src: '/images/1.jpeg', label: 'Photo 1' },
  { src: '/images/2.jpeg', label: 'Photo 2' },
  { src: '/images/3.jpeg', label: 'Photo 3' },
  { src: '/images/4.jpeg', label: 'Photo 4' },
]

function Gallery() {
  const [idx, setIdx] = useState(0)
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const child = el.children[0] as HTMLElement | null
    if (!child) return
    const w = child.getBoundingClientRect().width + 12
    setIdx(Math.round(el.scrollLeft / w))
  }
  return (
    <section className="gallery-sect">
      <Motif kind="sprig" top={24} left={10} size={64} rotate={-20} tone="pale" />
      <Motif kind="sprig" top={28} right={12} size={64} rotate={200} />
      <div className="gallery-head">
        <Reveal variant="zoom"><span className="icon" aria-hidden="true">{I.camera}</span></Reveal>
        <Reveal variant="up-sm" delay={100}><h2 className="section-title">Our Story, in Frames</h2></Reveal>
        <Reveal variant="up-sm" delay={200}>
          <p className="lede">A handful of the moments that brought us here. Swipe through our little archive.</p>
        </Reveal>
      </div>
      <Reveal variant="fade" delay={300}>
        <div className="gallery-scroll" onScroll={onScroll}>
          {GALLERY_ITEMS.map((item, i) => (
            <div className="gallery-item" key={i}>
              {item.src
                ? <Image src={item.src} alt={item.label} fill sizes="(max-width: 640px) 62vw, 240px" style={{ objectFit: 'cover' }} />
                : <Placeholder label={item.label} tone={i % 2 ? 'cool' : 'warm'} />}
            </div>
          ))}
        </div>
      </Reveal>
      <div className="gallery-dots" aria-hidden="true">
        {GALLERY_ITEMS.map((_, i) => <span key={i} className={`dot${i === idx ? ' on' : ''}`} />)}
      </div>
    </section>
  )
}

// ---------- RSVP ----------
function RSVP() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [touched, setTouched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState('')

  const valid = name.trim().length > 1 && phone.trim().length > 4

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!valid || loading) return

    setLoading(true)
    setApiError('')
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim() }),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
    } catch {
      setApiError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <section>
        <span className="icon" aria-hidden="true">{I.envelope}</span>
        <h2 className="section-title">RSVP</h2>
        <div className="thank-you">
          <div className="display">Thank you, {name.split(' ')[0]}.</div>
          <p>We've received your reply and couldn't be happier.<br />We can't wait to celebrate with you.</p>
        </div>
        <div className="rsvp-note">Kindly respond by 16 May 2026</div>
      </section>
    )
  }

  return (
    <section>
      <Motif kind="rose" top={16} left={8} size={78} rotate={-15} />
      <Motif kind="rose" top={22} right={6} size={78} rotate={200} tone="pale" />
      <Motif kind="ribbon" bottom={16} left={-10} size={100} rotate={10} tone="pale" />
      <Reveal variant="zoom"><span className="icon" aria-hidden="true">{I.envelope}</span></Reveal>
      <Reveal variant="up-sm" delay={100}><h2 className="section-title">Confirm Attendance</h2></Reveal>
      <Reveal variant="up-sm" delay={200}>
        <p className="lede">
          Your presence means the world to us. Please let us know if you'll be joining by{' '}
          <strong style={{ color: 'var(--ink)' }}>16 May 2026</strong>.
        </p>
      </Reveal>
      <form className="form" onSubmit={submit} noValidate>
        <div className="field">
          <label htmlFor="rsvp-name">Full Name</label>
          <input
            id="rsvp-name"
            className="input"
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={touched && name.trim().length <= 1}
            disabled={loading}
          />
        </div>
        <div className="field">
          <label htmlFor="rsvp-phone">Phone Number</label>
          <input
            id="rsvp-phone"
            className="input"
            type="tel"
            placeholder="Your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={touched && phone.trim().length <= 4}
            disabled={loading}
          />
        </div>
        <button type="submit" className="btn full" style={{ marginTop: 8, opacity: loading ? .7 : 1 }} disabled={loading}>
          {loading
            ? <><span className="btn-spinner" aria-hidden="true" /> Sending…</>
            : 'Send Reply'}
        </button>
        {touched && !valid && !loading && (
          <div className="rsvp-note" style={{ color: 'var(--rose-deep)' }}>Please enter your name and phone number.</div>
        )}
        {apiError && (
          <div className="rsvp-note" style={{ color: 'var(--rose-deep)' }}>{apiError}</div>
        )}
      </form>
    </section>
  )
}

// ---------- Gifts ----------
function Gifts() {
  return (
    <section className="gifts">
      <Motif kind="cake" top={24} left={12} size={72} rotate={-6} />
      <Motif kind="flutes" top={28} right={10} size={66} rotate={8} tone="pale" />
      <Reveal variant="zoom"><span className="icon" aria-hidden="true">{I.gift}</span></Reveal>
      <Reveal variant="up-sm" delay={100}><h2 className="section-title">A Note on Gifts</h2></Reveal>
      <Reveal variant="up-sm" delay={200}>
        <p className="lede">
          The presence of our friends and family is the greatest gift of all.
          However, should you wish to bless us, we would be most grateful.
        </p>
      </Reveal>
      <Reveal variant="fade" delay={300}>
        <div className="gift-note">— with love &amp; gratitude</div>
      </Reveal>
    </section>
  )
}

// ---------- Footer ----------
function Footer() {
  return (
    <footer className="footer" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="motif" style={{ top: 20, left: -20, width: 140, height: 50, opacity: .3 }} aria-hidden="true">{Motifs.spray()}</div>
      <div className="motif motif--pale" style={{ top: 30, right: -20, width: 140, height: 50, opacity: .25, transform: 'scaleX(-1)' }} aria-hidden="true">{Motifs.spray()}</div>
      <Reveal variant="fade"><Ornament /></Reveal>
      <Reveal variant="up-sm" delay={100}>
        <div style={{textAlign: "center"}} className="closing">See you on the thirtieth of May.</div>
      </Reveal>
      <Reveal variant="zoom" delay={200}>
        <h1 style={{textAlign: "center"}} className="couple">Robert<span className="amp">&amp;</span>Matti</h1>
      </Reveal>
      <Reveal variant="up-sm" delay={300}>
        <div style={{textAlign: "center"}} className="fine">30 · 05 · 2026 · The Ratson Pavillion</div>
      </Reveal>
      <Reveal variant="fade" delay={400}>
        <div style={{ marginTop: 22 }}><Flourish /></div>
      </Reveal>
      <Motif kind="rose" bottom={-10} left={-6} size={80} rotate={-20} tone="pale" />
      <Motif kind="rose" bottom={-10} right={-6} size={80} rotate={200} />
    </footer>
  )
}

// ---------- Cover ----------
const PETALS = Array.from({ length: 12 }, (_, i) => ({
  left: `${8 + (i * 7.3) % 84}%`,
  size: 6 + (i % 3) * 4,
  delay: `${(i * 0.65) % 4.8}s`,
  duration: `${7 + (i * 1.1) % 8}s`,
  cls: i % 3 === 1 ? 'p2' : i % 3 === 2 ? 'p3' : '',
}))

function Cover({ opening, onOpen }: { opening: boolean; onOpen: () => void }) {
  return (
    <div className={`cover${opening ? ' is-opening' : ''}`} onClick={onOpen}>
      <span className="cover-orb o1" aria-hidden="true" />
      <span className="cover-orb o2" aria-hidden="true" />
      <span className="cover-orb o3" aria-hidden="true" />
      <div className="petals">
        {PETALS.map((p, i) => (
          <div
            key={i}
            className={`petal ${p.cls}`}
            style={{
              left: p.left,
              top: '-20px',
              width: p.size,
              height: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>
      <div className="card">
        <div className="card-corner tl">{Motifs.sprig()}</div>
        <div className="card-corner tr">{Motifs.rose()}</div>
        <div className="card-corner bl">{Motifs.rose()}</div>
        <div className="card-corner br">{Motifs.sprig()}</div>

        <div className="cover-monogram">
          <div className="initials">R · M</div>
          <div className="seal">RM</div>
          <div className="est">est. MMXXVI</div>
        </div>

        <div>
          <div className="cover-eyebrow">You&apos;re cordially invited</div>
          <div className="cover-names">
            <span className="line a">Robert</span>
            <span className="line amp">&amp;</span>
            <span className="line b">Matti</span>
          </div>
          <div className="cover-date">
            <span className="rule" />
            30 May 2026
            <span className="rule" />
          </div>
          <div className="cover-venue">at The Ratson Pavillion</div>
        </div>

        <div className="cover-flourish">{Motifs.flourishLine()}</div>

        <div className="cover-cta">
          <button
            className="pill"
            onClick={(e) => { e.stopPropagation(); onOpen() }}
          >
            Open Invitation
          </button>
          <span className="hint">tap anywhere to open</span>
        </div>
      </div>
    </div>
  )
}

// ---------- Page ----------
export default function Page() {
  const [coverOpening, setCoverOpening] = useState(false)
  const [coverRemoved, setCoverRemoved] = useState(false)

  useEffect(() => {
    if (coverRemoved) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [coverRemoved])

  const openInvite = () => {
    if (coverOpening) return
    setCoverOpening(true)
    setTimeout(() => setCoverRemoved(true), 1300)
  }

  return (
    <div className="stage">
      <div className="invite">
        {!coverRemoved && <Cover opening={coverOpening} onOpen={openInvite} />}
        <Hero />
        <Header />
        <Countdown />
        <Itinerary />
        <Gallery />
        <RSVP />
        <Gifts />
        <Footer />
      </div>
    </div>
  )
}
