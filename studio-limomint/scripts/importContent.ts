import {createHash} from 'node:crypto'
import {createReadStream, existsSync, readFileSync} from 'node:fs'
import {mkdir, rename, unlink, writeFile} from 'node:fs/promises'
import {basename, extname, resolve, sep} from 'node:path'
import {getCliClient} from 'sanity/cli'
import {
  business,
  faqs,
  fleet,
  services,
  serviceCards,
  staticPageDefaults,
  testimonials,
} from '../../frontend/lib/data'

type Plan = {
  id: string
  type: string
  document: Record<string, unknown>
  keyFields: Record<string, unknown>
  sortOrder?: number
}

type Manifest = {
  version: 1
  state: 'pending' | 'complete' | 'rolledBack'
  docIds: string[]
  assetIds: string[]
  updatedAt: string
}

const studioDirectory = process.cwd()
const projectDirectory = resolve(studioDirectory, '..')
const scriptDirectory = resolve(studioDirectory, 'scripts')
const manifestPath = resolve(scriptDirectory, '.limomint-import-manifest.json')

function deterministicId(prefix: string, text: string) {
  const slug = text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return `${prefix}-${slug || 'item'}`
}

function localImage(path: string, alt: string) {
  return {_type: 'image', _localPath: path, alt}
}

function makePlans(): Plan[] {
  const plans: Plan[] = []
  const add = (
    id: string,
    type: string,
    document: Record<string, unknown>,
    keyFields: Record<string, unknown>,
    sortOrder?: number,
  ) => plans.push({id, type, document: {_id: id, _type: type, ...document}, keyFields, sortOrder})

  const structuredAddress = {
    streetAddress: '350 Victoria St',
    city: 'Toronto',
    region: 'ON',
    postalCode: 'M5B 2K3',
    country: 'CA',
  }
  add('siteSettings', 'siteSettings', {
    businessName: business.name,
    phone: business.phone,
    phoneHref: business.phoneHref,
    email: business.email,
    address: business.address,
    ...structuredAddress,
  }, {
    businessName: business.name,
    phone: business.phone,
    email: business.email,
    address: business.address,
    ...structuredAddress,
  })

  const homePage = {
    headline: 'Arrive well.',
    headlineAccent: 'Travel with ease.',
    description: 'A dedicated driver for airport transfers, city appointments, and the occasions that deserve a little more care.',
    heroImage: localImage('/hero/limomint-hero.png', 'A chauffeur vehicle outside a hotel at evening'),
    primaryCtaLabel: 'Arrange a ride',
  }
  add('homePage', 'homePage', homePage, {
    headline: homePage.headline,
    headlineAccent: homePage.headlineAccent,
    description: homePage.description,
    heroImage: '/hero/limomint-hero.png',
    heroImageAlt: 'A chauffeur vehicle outside a hotel at evening',
    primaryCtaLabel: homePage.primaryCtaLabel,
  })

  fleet.forEach((vehicle, index) => {
    const sortOrder = index + 1
    const document = {
      name: vehicle.name,
      tagline: vehicle.tagline,
      pricePerHour: vehicle.pricePerHour,
      seats: vehicle.seats,
      bags: vehicle.bags,
      transmission: vehicle.transmission,
      icon: vehicle.icon,
      features: vehicle.features,
      sortOrder,
      images: vehicle.images.map((image, imageIndex) => localImage(
        image,
        vehicle.imageAlts?.[imageIndex] || `${vehicle.name} shown as a LimoMint chauffeur vehicle`,
      )),
    }
    add(`vehicle-${vehicle.id}`, 'vehicle', document, {
      name: vehicle.name,
      tagline: vehicle.tagline,
      pricePerHour: vehicle.pricePerHour,
      seats: vehicle.seats,
      bags: vehicle.bags,
      transmission: vehicle.transmission,
      icon: vehicle.icon,
      features: vehicle.features,
      images: vehicle.images.map((path, imageIndex) => ({
        path,
        alt: vehicle.imageAlts?.[imageIndex] || `${vehicle.name} shown as a LimoMint chauffeur vehicle`,
      })),
    }, sortOrder)
  })

  services.forEach((service, index) => {
    const sortOrder = index + 1
    add(deterministicId('service', service.title), 'service', {
      title: service.title,
      icon: service.icon,
      description: service.description,
      points: service.points,
      sortOrder,
    }, {
      title: service.title,
      icon: service.icon,
      description: service.description || '',
      points: service.points,
    }, sortOrder)
  })

  plans.push(...makeServicePageCardPlans())

  faqs.forEach((faq, index) => {
    const sortOrder = index + 1
    add(`faq-${String(sortOrder).padStart(2, '0')}`, 'faq', {
      question: faq.q,
      answer: faq.a,
      sortOrder,
    }, {question: faq.q, answer: faq.a}, sortOrder)
  })

  testimonials.forEach((testimonial, index) => {
    const sortOrder = index + 1
    add(`testimonial-${String(sortOrder).padStart(2, '0')}`, 'testimonial', {
      quote: testimonial.quote,
      name: testimonial.name,
      sortOrder,
    }, {name: testimonial.name, quote: testimonial.quote}, sortOrder)
  })

  for (const [id, page] of Object.entries(staticPageDefaults)) {
    add(id, 'staticPage', {heading: page.heading, intro: page.intro}, {
      heading: page.heading,
      intro: page.intro,
    })
  }

  return plans
}

function makeServicePageCardPlans(): Plan[] {
  return serviceCards.map((card, index) => {
    const sortOrder = index + 1
    const id = `servicecard-${String(sortOrder).padStart(2, '0')}`
    return {
      id,
      type: 'servicePageCard',
      document: {
        _id: id,
        _type: 'servicePageCard',
        title: card.title,
        description: card.text,
        icon: card.icon,
        sortOrder,
      },
      keyFields: {title: card.title, description: card.text, icon: card.icon},
      sortOrder,
    }
  })
}

function planSummary(plan: Plan) {
  return {
    id: plan.id,
    type: plan.type,
    keyFields: plan.keyFields,
    ...(plan.sortOrder === undefined ? {} : {sortOrder: plan.sortOrder}),
  }
}

function readManifest(): Manifest | null {
  if (!existsSync(manifestPath)) return null
  return JSON.parse(readFileSync(manifestPath, 'utf8')) as Manifest
}

async function writeManifest(manifest: Manifest) {
  await mkdir(scriptDirectory, {recursive: true})
  const temporaryPath = `${manifestPath}.tmp`
  await writeFile(temporaryPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')
  await rename(temporaryPath, manifestPath)
}

function localImageAbsolutePath(localPath: string) {
  const publicDirectory = resolve(projectDirectory, 'frontend', 'public')
  const relativePath = localPath.replace(/^[/\\]+/, '')
  const absolutePath = resolve(publicDirectory, relativePath)
  if (absolutePath !== publicDirectory && !absolutePath.startsWith(`${publicDirectory}${sep}`)) {
    throw new Error(`Image path must stay inside frontend/public: ${localPath}`)
  }
  return absolutePath
}

async function uploadOrReuseImage(client: ReturnType<typeof getCliClient>, localPath: string, assetIds: Set<string>, assetCache: Map<string, string>) {
  const cached = assetCache.get(localPath)
  if (cached) return cached

  const absolutePath = localImageAbsolutePath(localPath)
  if (!existsSync(absolutePath)) throw new Error(`Image file not found: ${absolutePath}`)
  const imageBytes = new Uint8Array(readFileSync(absolutePath))
  const sha1hash = createHash('sha1').update(imageBytes).digest('hex')
  const existingAssetId = await client.fetch<string | null>(
    '*[_type == "sanity.imageAsset" && sha1hash == $sha1hash][0]._id',
    {sha1hash},
  )
  let assetId = existingAssetId
  if (!assetId) {
    const extension = extname(absolutePath).toLowerCase()
    const contentType = extension === '.png' ? 'image/png' : extension === '.webp' ? 'image/webp' : 'image/jpeg'
    const asset = await client.assets.upload('image', createReadStream(absolutePath), {
      filename: basename(absolutePath),
      contentType,
    })
    assetId = asset._id
    assetIds.add(assetId)
  }
  assetCache.set(localPath, assetId)
  return assetId
}

async function hydrate(value: unknown, client: ReturnType<typeof getCliClient>, assetIds: Set<string>, assetCache: Map<string, string>): Promise<unknown> {
  if (Array.isArray(value)) {
    return Promise.all(value.map((item) => hydrate(item, client, assetIds, assetCache)))
  }
  if (!value || typeof value !== 'object') return value

  const record = value as Record<string, unknown>
  if (typeof record._localPath === 'string') {
    const assetId = await uploadOrReuseImage(client, record._localPath, assetIds, assetCache)
    const { _localPath: _removed, ...image } = record
    return {...image, asset: {_type: 'reference', _ref: assetId}}
  }

  const hydrated: Record<string, unknown> = {}
  for (const [key, child] of Object.entries(record)) {
    hydrated[key] = await hydrate(child, client, assetIds, assetCache)
  }
  return hydrated
}

async function dryRun(plans: Plan[]) {
  const address = plans.find((plan) => plan.id === 'siteSettings')?.keyFields
  console.log(JSON.stringify({
    mode: 'DRY RUN — no Sanity requests, uploads, or writes were made',
    structuredAddress: address,
    documentCount: plans.length,
    documents: plans.map(planSummary),
    excluded: ['locationPage', 'redirect', 'seoSettings'],
  }, null, 2))
}

async function runImport(plans: Plan[]) {
  const client = getCliClient({apiVersion: '2026-10-14'})
  const previousManifest = readManifest()
  const previouslyOwnedIds = new Set(previousManifest?.docIds || [])
  const planIds = plans.map(({id}) => id)
  const existingIds = new Set<string>(await client.fetch<Array<{_id: string}>>(
    '*[_id in $ids]{_id}',
    {ids: planIds},
  ).then((documents) => documents.map(({_id}) => _id)))
  const eligiblePlans = plans.filter((plan) => !existingIds.has(plan.id) || previouslyOwnedIds.has(plan.id))
  const skippedIds = plans.filter((plan) => existingIds.has(plan.id) && !previouslyOwnedIds.has(plan.id)).map(({id}) => id)
  const assetIds = new Set(previousManifest?.assetIds || [])
  const manifest: Manifest = {
    version: 1,
    state: 'pending',
    docIds: eligiblePlans.map(({id}) => id),
    assetIds: [...assetIds],
    updatedAt: new Date().toISOString(),
  }
  await writeManifest(manifest)

  const assetCache = new Map<string, string>()
  const documents = await Promise.all(eligiblePlans.map(async ({document}) => (
    await hydrate(document, client, assetIds, assetCache)
  )))
  manifest.assetIds = [...assetIds]
  await writeManifest(manifest)

  if (documents.length) {
    let transaction = client.transaction()
    for (const document of documents) transaction = transaction.createOrReplace(document as Record<string, unknown> as never)
    await transaction.commit()
  }

  manifest.state = 'complete'
  manifest.updatedAt = new Date().toISOString()
  await writeManifest(manifest)
  console.log(JSON.stringify({
    result: 'Import complete',
    writtenCount: eligiblePlans.length,
    skippedExistingIds: skippedIds,
    manifestPath,
    note: 'The document transaction publishes all imported content documents together.',
  }, null, 2))
}

async function runServicePageCardImport(plans: Plan[]) {
  const client = getCliClient({apiVersion: '2026-10-14'})
  const previousManifest = readManifest()
  let transaction = client.transaction()
  for (const {document} of plans) {
    transaction = transaction.createOrReplace(document as Record<string, unknown> as never)
  }
  await transaction.commit()

  const ids = [...new Set([...(previousManifest?.docIds || []), ...plans.map(({id}) => id)])]
  await writeManifest({
    version: 1,
    state: 'complete',
    docIds: ids,
    assetIds: previousManifest?.assetIds || [],
    updatedAt: new Date().toISOString(),
  })
  console.log(JSON.stringify({
    result: 'Services page cards imported',
    writtenCount: plans.length,
    writtenIds: plans.map(({id}) => id),
    manifestPath,
    note: 'Only the eight servicePageCard document IDs were written.',
  }, null, 2))
}

async function rollback() {
  const manifest = readManifest()
  if (!manifest) {
    console.log('No import manifest exists; no documents were deleted.')
    return
  }

  const client = getCliClient({apiVersion: '2026-10-14'})
  const existingIds = new Set<string>(await client.fetch<Array<{_id: string}>>(
    '*[_id in $ids]{_id}',
    {ids: manifest.docIds},
  ).then((documents) => documents.map(({_id}) => _id)))
  const idsToDelete = manifest.docIds.filter((id) => existingIds.has(id))

  if (idsToDelete.length) {
    let transaction = client.transaction()
    for (const id of idsToDelete) transaction = transaction.delete(id)
    await transaction.commit()
  }

  const retainedAssets: string[] = []
  const deletedAssets: string[] = []
  for (const assetId of manifest.assetIds) {
    const referenceCount = await client.fetch<number>('count(*[references($assetId)])', {assetId})
    if (referenceCount > 0) {
      retainedAssets.push(assetId)
    } else {
      await client.delete(assetId)
      deletedAssets.push(assetId)
    }
  }

  if (retainedAssets.length) {
    await writeManifest({
      ...manifest,
      state: 'rolledBack',
      docIds: [],
      assetIds: retainedAssets,
      updatedAt: new Date().toISOString(),
    })
  } else {
    await unlink(manifestPath)
  }

  console.log(JSON.stringify({
    result: 'Rollback complete',
    deletedDocumentIds: idsToDelete,
    deletedUnreferencedAssetIds: deletedAssets,
    retainedAssetIds: retainedAssets,
    manifestPath: retainedAssets.length ? manifestPath : null,
  }, null, 2))
}

async function main() {
  const args = process.argv.slice(2)
  const isDryRun = args.includes('--dry-run')
  const isRollback = args.includes('--rollback')
  const servicePageCardsOnly = args.includes('--service-page-cards-only')
  if (isDryRun && isRollback) throw new Error('Use either --dry-run or --rollback, not both.')
  if (isRollback && servicePageCardsOnly) throw new Error('Do not combine --rollback with --service-page-cards-only.')

  const plans = servicePageCardsOnly ? makeServicePageCardPlans() : makePlans()
  if (isDryRun) return dryRun(plans)
  if (isRollback) return rollback()
  if (servicePageCardsOnly) return runServicePageCardImport(plans)
  return runImport(plans)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
