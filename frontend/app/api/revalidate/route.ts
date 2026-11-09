import {revalidatePath, revalidateTag} from 'next/cache'
import {isValidSignature, SIGNATURE_HEADER_NAME} from '@sanity/webhook'
import type {NextRequest} from 'next/server'

type SanityWebhookBody = {
  _id?: string
  _type?: string
  operation?: string
}

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) {
    return Response.json({message: 'Revalidation is not configured.'}, {status: 503})
  }

  try {
    const rawBody = await request.text()
    const signature = request.headers.get(SIGNATURE_HEADER_NAME)
    if (!signature || !(await isValidSignature(rawBody, signature, secret.trim()))) {
      return Response.json({message: 'Invalid Sanity webhook signature.'}, {status: 401})
    }

    await new Promise((resolve) => setTimeout(resolve, 3000))
    const body = rawBody.trim() ? JSON.parse(rawBody) as SanityWebhookBody : null
    if (!body) return Response.json({message: 'Invalid Sanity webhook body.'}, {status: 400})

    revalidateTag('sanity-content')
    // Every page uses the shared root layout, so invalidating it refreshes
    // metadata and the rendered route tree across all page types.
    revalidatePath('/', 'layout')

    return Response.json({revalidated: true, documentType: body._type || null}, {status: 200})
  } catch {
    console.error('Sanity revalidation webhook failed.')
    return Response.json({message: 'Could not process the Sanity webhook.'}, {status: 400})
  }
}
