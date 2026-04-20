'use client'

import { useState } from 'react'

interface RSVPEntry {
  _id: string
  name: string
  phone: string
  submittedAt: string
}

export default function RSVPAdmin() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [rsvps, setRsvps] = useState<RSVPEntry[]>([])
  const [unlocked, setUnlocked] = useState(false)

  const fetchRSVPs = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/rsvp', {
        headers: { 'x-admin-password': password },
      })
      if (res.status === 401) { setError('Incorrect password.'); return }
      if (!res.ok) { setError('Server error. Try again.'); return }
      const data = await res.json()
      setRsvps(data.rsvps)
      setUnlocked(true)
    } catch {
      setError('Could not connect. Try again.')
    } finally {
      setLoading(false)
    }
  }


  if (!unlocked) {
    return (
      <div style={styles.page}>
        <div style={styles.lockCard}>
          <div style={styles.lockTitle}>Robert &amp; Matti</div>
          <div style={styles.lockSub}>RSVP Admin · 30 May 2026</div>
          <form onSubmit={fetchRSVPs} style={styles.lockForm}>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={styles.lockInput}
              autoFocus
            />
            <button type="submit" style={styles.lockBtn} disabled={loading}>
              {loading ? 'Checking…' : 'View RSVPs'}
            </button>
            {error && <div style={styles.lockError}>{error}</div>}
          </form>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Robert &amp; Matti — RSVPs</h1>
          <div style={styles.subtitle}>30 May 2026 · The Ratson Pavillion</div>
        </div>
        <button style={styles.logoutBtn} onClick={() => { setUnlocked(false); setPassword('') }}>
          Lock
        </button>
      </div>

      <div style={styles.stats}>
        <Stat label="Total replies" value={rsvps.length} />
      </div>

      {rsvps.length === 0 ? (
        <div style={styles.empty}>No RSVPs received yet.</div>
      ) : (
        <div style={styles.table}>
          <div style={styles.tableHead}>
            <span style={{ flex: 2 }}>Name</span>
            <span style={{ flex: 2 }}>Phone</span>
            <span style={{ flex: 1, textAlign: 'right' }}>Date</span>
          </div>
          {rsvps.map((r, i) => (
            <div key={r._id} style={{ ...styles.tableRow, background: i % 2 ? '#faf8f9' : '#fff' }}>
              <span style={{ flex: 2, fontWeight: 500 }}>{r.name}</span>
              <span style={{ flex: 2, color: '#555', fontSize: 13 }}>{r.phone}</span>
              <span style={{ flex: 1, textAlign: 'right', color: '#999', fontSize: 12 }}>
                {new Date(r.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Stat({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <div style={styles.statCard}>
      <div style={{ ...styles.statNum, color: color ?? '#2d2630' }}>{value}</div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#f4f0f2',
    fontFamily: 'system-ui, sans-serif',
    color: '#2d2630',
    padding: '32px 16px',
  },
  lockCard: {
    maxWidth: 360,
    margin: '80px auto 0',
    background: '#fff',
    border: '1px solid #ddd3db',
    padding: '40px 32px',
    textAlign: 'center',
    boxShadow: '0 8px 24px -12px rgba(60,40,55,.2)',
  },
  lockTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: 28,
    letterSpacing: '.04em',
    marginBottom: 6,
  },
  lockSub: {
    fontSize: 11,
    letterSpacing: '.28em',
    textTransform: 'uppercase',
    color: '#8a8089',
    marginBottom: 28,
  },
  lockForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  lockInput: {
    padding: '12px 14px',
    border: '1px solid #ddd3db',
    fontSize: 16,
    outline: 'none',
    fontFamily: 'system-ui, sans-serif',
    color: '#2d2630',
    background: '#faf8f9',
    borderRadius: 0,
  },
  lockBtn: {
    padding: '13px',
    background: '#7a5f6d',
    color: '#fff',
    border: 'none',
    fontSize: 12,
    letterSpacing: '.24em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    fontFamily: 'system-ui, sans-serif',
  },
  lockError: {
    color: '#8a5a5a',
    fontSize: 13,
  },
  header: {
    maxWidth: 760,
    margin: '0 auto 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: 'Georgia, serif',
    fontSize: 24,
    margin: 0,
    letterSpacing: '.02em',
  },
  subtitle: {
    fontSize: 11,
    letterSpacing: '.22em',
    textTransform: 'uppercase',
    color: '#8a8089',
    marginTop: 4,
  },
  logoutBtn: {
    padding: '8px 16px',
    background: 'transparent',
    border: '1px solid #ddd3db',
    cursor: 'pointer',
    fontSize: 11,
    letterSpacing: '.2em',
    textTransform: 'uppercase',
    color: '#8a8089',
    fontFamily: 'system-ui, sans-serif',
  },
  stats: {
    maxWidth: 760,
    margin: '0 auto 24px',
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap' as const,
  },
  statCard: {
    flex: '1 1 100px',
    background: '#fff',
    border: '1px solid #ddd3db',
    padding: '16px 20px',
    textAlign: 'center',
  },
  statNum: {
    fontSize: 32,
    fontFamily: 'Georgia, serif',
    lineHeight: 1,
  },
  statLabel: {
    fontSize: 10,
    letterSpacing: '.22em',
    textTransform: 'uppercase',
    color: '#8a8089',
    marginTop: 6,
  },
  table: {
    maxWidth: 760,
    margin: '0 auto',
    background: '#fff',
    border: '1px solid #ddd3db',
    overflow: 'hidden',
  },
  tableHead: {
    display: 'flex',
    padding: '10px 20px',
    background: '#ebe4e8',
    fontSize: 10,
    letterSpacing: '.22em',
    textTransform: 'uppercase',
    color: '#8a8089',
    borderBottom: '1px solid #ddd3db',
  },
  tableRow: {
    display: 'flex',
    padding: '14px 20px',
    borderBottom: '1px solid #f0e8ed',
    fontSize: 14,
    alignItems: 'center',
  },
  empty: {
    maxWidth: 760,
    margin: '0 auto',
    textAlign: 'center',
    color: '#8a8089',
    padding: '60px 0',
    fontSize: 14,
    letterSpacing: '.1em',
  },
}
