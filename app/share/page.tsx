'use client'

import { useState, useEffect } from 'react'

export default function SharePage() {
  const [name, setName] = useState('')
  const [origin, setOrigin] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setOrigin(window.location.origin)
  }, [])

  const trimmed = name.trim()
  const link = trimmed
    ? `${origin}/?name=${encodeURIComponent(trimmed)}`
    : origin

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Fallback: select-all on the input
    }
  }

  const openPreview = () => {
    window.open(link, '_blank', 'noopener')
  }

  const share = async () => {
    const text = trimmed
      ? `Dear ${trimmed}, you're warmly invited to Robert & Matti's wedding.`
      : `You're warmly invited to Robert & Matti's wedding.`
    const data: ShareData = {
      title: "Robert & Matti — Wedding Invitation",
      text,
      url: link,
    }
    try {
      if (navigator.share) {
        await navigator.share(data)
      } else {
        await navigator.clipboard.writeText(`${text} ${link}`)
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
      }
    } catch {
      // user cancelled or share unsupported
    }
  }

  const greetingName = trimmed || 'Friend'

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Robert &amp; Matti</h1>
        <div style={styles.subtitle}>Share an invitation</div>
      </div>

      <div style={styles.card}>
        <label style={styles.label} htmlFor="guest-name">Guest&apos;s name</label>
        <input
          id="guest-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Aunt Mary, John & Family"
          autoFocus
          style={styles.input}
        />
        <div style={styles.hint}>
          Type the way you&apos;d address them. Leave blank for a generic link.
        </div>

        <div style={styles.divider} />

        <div style={styles.previewLabel}>Preview</div>
        <div style={styles.preview}>
          <div style={styles.previewGreeting}>Dear {greetingName},</div>
          <div style={styles.previewBody}>
            With joyful hearts, we invite you<br />
            to witness the vows that will bind us forever.
          </div>
        </div>

        <div style={styles.divider} />

        <div style={styles.previewLabel}>Their link</div>
        <input
          readOnly
          value={link}
          onFocus={(e) => e.currentTarget.select()}
          style={styles.linkInput}
        />

        <div style={styles.actions}>
          <button onClick={copyLink} style={styles.primaryBtn}>
            {copied ? 'Copied ✓' : 'Copy link'}
          </button>
          <button onClick={openPreview} style={styles.ghostBtn}>
            Open preview
          </button>
          <button onClick={share} style={styles.shareBtn}>
            Share
          </button>
        </div>
      </div>

      <div style={styles.footnote}>
        Each link greets the guest by the name you typed. Send a unique link per guest or family.
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#ebe4e8',
    padding: '40px 16px 60px',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    color: '#2d2630',
  },
  header: {
    maxWidth: 520,
    margin: '0 auto 24px',
    textAlign: 'center',
  },
  title: {
    fontFamily: 'Georgia, serif',
    fontSize: 28,
    margin: 0,
    letterSpacing: '.04em',
  },
  subtitle: {
    fontSize: 11,
    letterSpacing: '.28em',
    textTransform: 'uppercase',
    color: '#8a8089',
    marginTop: 6,
  },
  card: {
    maxWidth: 520,
    margin: '0 auto',
    background: '#fff',
    border: '1px solid #ddd3db',
    padding: '28px 26px 24px',
  },
  label: {
    display: 'block',
    fontSize: 11,
    letterSpacing: '.22em',
    textTransform: 'uppercase',
    color: '#8a8089',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    padding: '13px 14px',
    border: '1px solid #ddd3db',
    fontSize: 16,
    outline: 'none',
    fontFamily: 'system-ui, sans-serif',
    color: '#2d2630',
    background: '#faf8f9',
    borderRadius: 0,
    boxSizing: 'border-box',
  },
  hint: {
    fontSize: 12,
    color: '#8a8089',
    marginTop: 8,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    background: '#f0e8ed',
    margin: '22px 0',
  },
  previewLabel: {
    fontSize: 10,
    letterSpacing: '.28em',
    textTransform: 'uppercase',
    color: '#8a8089',
    marginBottom: 12,
  },
  preview: {
    background: '#faf6f9',
    border: '1px dashed #e0d4dc',
    padding: '24px 20px',
    textAlign: 'center',
  },
  previewGreeting: {
    fontFamily: 'Georgia, serif',
    fontStyle: 'italic',
    fontSize: 18,
    color: '#2c1c22',
    marginBottom: 10,
  },
  previewBody: {
    fontFamily: 'Georgia, serif',
    fontSize: 14,
    color: 'rgba(44,28,34,.78)',
    lineHeight: 1.55,
  },
  linkInput: {
    width: '100%',
    padding: '11px 12px',
    border: '1px solid #ddd3db',
    fontSize: 13,
    fontFamily: 'ui-monospace, SF Mono, Menlo, monospace',
    outline: 'none',
    color: '#5a4a52',
    background: '#faf8f9',
    borderRadius: 0,
    boxSizing: 'border-box',
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  primaryBtn: {
    flex: '1 1 140px',
    padding: '13px 16px',
    background: '#7a5f6d',
    color: '#fff',
    border: 'none',
    fontSize: 12,
    letterSpacing: '.22em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    fontFamily: 'system-ui, sans-serif',
  },
  ghostBtn: {
    flex: '1 1 140px',
    padding: '13px 16px',
    background: 'transparent',
    color: '#7a5f6d',
    border: '1px solid #7a5f6d',
    fontSize: 12,
    letterSpacing: '.22em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    fontFamily: 'system-ui, sans-serif',
  },
  shareBtn: {
    flex: '1 1 100%',
    padding: '13px 16px',
    background: '#2d2630',
    color: '#fff',
    border: 'none',
    fontSize: 12,
    letterSpacing: '.22em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    fontFamily: 'system-ui, sans-serif',
  },
  footnote: {
    maxWidth: 520,
    margin: '20px auto 0',
    textAlign: 'center',
    fontSize: 12,
    color: '#8a8089',
    fontStyle: 'italic',
    lineHeight: 1.5,
  },
}
