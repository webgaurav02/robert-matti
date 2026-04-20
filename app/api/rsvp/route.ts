import { NextRequest, NextResponse } from 'next/server'
import clientPromise, { WEDDING_ID, ADMIN_PASSWORD } from '@/lib/mongodb'

export async function POST(req: NextRequest) {
  try {
    const { name, phone } = await req.json()

    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db('bigday')

    await db.collection('rsvps').insertOne({
      weddingId: WEDDING_ID,
      name: name.trim(),
      phone: phone.trim(),
      submittedAt: new Date(),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('RSVP POST error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const password = req.headers.get('x-admin-password')
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const client = await clientPromise
    const db = client.db('bigday')

    const rsvps = await db.collection('rsvps')
      .find({ weddingId: WEDDING_ID })
      .sort({ submittedAt: -1 })
      .toArray()

    return NextResponse.json({ rsvps })
  } catch (err) {
    console.error('RSVP GET error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
