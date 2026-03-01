/**
 * Seed Script for Payload CMS
 * 
 * Run this after creating your first admin user:
 *   npm run seed
 * 
 * This will populate all content from the existing hardcoded pages.
 * Safe to run multiple times - it checks if data already exists.
 */

import { getPayload } from 'payload';
import config from '../src/payload.config';

const seed = async () => {
  console.log('🌱 Starting seed...\n');

  const payload = await getPayload({ config });

  // ============================================
  // SERVICES
  // ============================================
  const existingServices = await payload.find({ collection: 'services', limit: 1 });

  if (existingServices.docs.length === 0) {
    console.log('📦 Seeding services...');

    const services = [
      {
        title: 'Outdoor Kitchens',
        slug: 'outdoor-kitchens',
        category: 'Premium Build',
        description: "Custom-designed outdoor kitchen structures built from premium stone, brick, and concrete. Built to endure Texas summers.",
        features: [
          { feature: 'Custom Stone & Brick Work' },
          { feature: 'Grill & Appliance Integration' },
          { feature: 'Countertop & Finish Selection' },
        ],
        icon: 'lightning',
        highlight: true,
        order: 1,
      },
      {
        title: 'Custom Pavers',
        slug: 'custom-pavers',
        category: 'Hardscaping',
        description: "Driveways, patios, and walkways installed with precision-laid pavers. Built to last generations without cracking or shifting.",
        features: [
          { feature: 'Concrete & Natural Stone Pavers' },
          { feature: 'Pattern Design & Layout' },
          { feature: 'Sealing & Long-Term Protection' },
        ],
        icon: 'building',
        highlight: false,
        order: 2,
      },
      {
        title: 'Chimneys & Fire Pits',
        slug: 'chimneys-fire-pits',
        category: 'Fire Features',
        description: "From rustic fire pits to full masonry chimneys. Our craftsmen build structures that age beautifully and burn safely.",
        features: [
          { feature: 'Chimney Repair & Rebuild' },
          { feature: 'Custom Fire Pit Design' },
          { feature: 'Fireplace Stone Surrounds' },
        ],
        icon: 'clipboard',
        highlight: false,
        order: 3,
      },
      {
        title: 'Brick & Block Work',
        slug: 'brick-block-work',
        category: 'Structural',
        description: "Structural masonry for residential and commercial properties. Expert tuck-pointing, repair, and new construction.",
        features: [
          { feature: 'Foundation & Retaining Walls' },
          { feature: 'Tuck-Pointing & Repair' },
          { feature: 'Commercial Structural Block' },
        ],
        icon: 'phone',
        highlight: false,
        order: 4,
      },
    ];

    for (const service of services) {
      await payload.create({ collection: 'services', data: service });
    }
    console.log(`   ✅ Created ${services.length} services\n`);
  } else {
    console.log('⏭️  Services already exist, skipping...\n');
  }

  // ============================================
  // PROJECTS
  // ============================================
  const existingProjects = await payload.find({ collection: 'projects', limit: 1 });

  if (existingProjects.docs.length === 0) {
    console.log('📦 Seeding projects...');

    const projects = [
      {
        title: 'Highland Homes: Premium Outdoor Kitchen',
        slug: 'highland-homes-outdoor-kitchen',
        client: 'Private Residence',
        location: 'Highland Park, Dallas',
        description: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', text: 'Full outdoor kitchen build with custom granite countertops, built-in grill station, and a stacked stone surround. Completed in 3 weeks to deadline for a summer housewarming.' }] }] } },
        imageStyle: 'stone-outdoor-kitchen',
        tags: [{ tag: 'Outdoor Kitchen' }, { tag: 'Stone Work' }, { tag: 'Custom' }],
        stats: [{ label: 'Build Time', value: '3 Weeks' }, { label: 'Sq Ft', value: '420' }, { label: 'Materials', value: 'Granite + Limestone' }],
      },
      {
        title: 'Westlake Driveway: Travertine Paver Redesign',
        slug: 'westlake-travertine-pavers',
        client: 'Private Residence',
        location: 'Westlake, TX',
        description: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', text: 'Replaced cracking concrete driveway with precision-laid travertine pavers. Includes sealed edge borders and a matching patio expansion.' }] }] } },
        imageStyle: 'paver-driveway',
        tags: [{ tag: 'Pavers' }, { tag: 'Driveway' }, { tag: 'Travertine' }],
        stats: [{ label: 'Sq Ft', value: '1,800' }, { label: 'Lifespan', value: '50+ Yrs' }, { label: 'Seal Warranty', value: '10 Yrs' }],
      },
      {
        title: 'Lakeway Custom Fire Pit & Chimney',
        slug: 'lakeway-fire-pit-chimney',
        client: 'Private Estate',
        location: 'Lakeway, TX',
        description: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', text: 'Custom-built flagstone fire pit with a matching outdoor fireplace and chimney. All built from the same locally-quarried Texas limestone for a cohesive, natural aesthetic.' }] }] } },
        imageStyle: 'fire-pit-stone',
        tags: [{ tag: 'Fire Pit' }, { tag: 'Chimney' }, { tag: 'Limestone' }],
        stats: [{ label: 'Stone Type', value: 'Texas Limestone' }, { label: 'BTU Rating', value: 'Certified' }, { label: 'Year', value: '2025' }],
      },
      {
        title: 'Commercial Brick Repair: Downtown Austin',
        slug: 'downtown-austin-brick-repair',
        client: 'Commercial Property',
        location: 'Downtown Austin, TX',
        description: { root: { type: 'root', children: [{ type: 'paragraph', children: [{ type: 'text', text: 'Full facade tuck-pointing and historic brick repair on a 1940s commercial building. Matched the original mortar color and texture to preserve historical integrity.' }] }] } },
        imageStyle: 'brick-commercial',
        tags: [{ tag: 'Commercial' }, { tag: 'Brick Repair' }, { tag: 'Historic' }],
        stats: [{ label: 'Response', value: '48 Hours' }, { label: 'Brick Matched', value: '100%' }, { label: 'Warranty', value: '5 Yrs' }],
      },
    ];

    for (const project of projects) {
      await payload.create({ collection: 'projects', data: project });
    }
    console.log(`   ✅ Created ${projects.length} projects\n`);
  } else {
    console.log('⏭️  Projects already exist, skipping...\n');
  }

  // ============================================
  // SITE SETTINGS
  // ============================================
  console.log('📦 Updating site settings...');

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      companyName: 'Texas Prestige Masonry',
      phone: '(512) 555-0000',
      email: 'hello@texasprestigemasonry.com',
      licenseNumber: 'TX LIC #12345',
      insuranceAmount: '$2M Policy',
      bbbRating: 'A+',
      missionStatement: 'To build lasting legacy through premium masonry craftsmanship—elevating Texas properties with stonework built to endure generations.',
      stats: [
        { value: '45+', label: 'Years Combined Experience' },
        { value: '1,200+', label: 'Projects Completed' },
        { value: '100%', label: 'Texas Coverage' },
        { value: '5★', label: 'Google Rating' },
      ],
      values: [
        { title: 'Craftsmanship', description: 'Every project is built like it will last 100 years. Because it will.' },
        { title: 'Transparency', description: 'Upfront pricing. No hidden fees. What we quote is what you pay.' },
        { title: 'Legacy', description: 'We build structures that become the backdrop of family memories for generations.' },
      ],
      brandVoice: `You are "The Texas Masonry Authority"—a trusted expert who speaks to homeowners, contractors, and builders with wisdom earned from 45+ years of combined masonry experience.

VOICE:
• Confident and knowledgeable, like a master mason explaining craft to a discerning client
• Heritage-driven: reference materials, techniques, and Texas climate challenges specifically
• Respectful of the reader's investment—this is their home, their legacy
• Direct and premium—never budget-focused, always quality-focused

PSYCHOLOGY PRINCIPLES TO USE:
• Authority: Cite specifics (e.g., "Type S mortar" not "strong mortar")
• Social Proof: Reference "homeowners we've worked with across Texas"
• Reciprocity: Offer genuine value (material comparisons, maintenance tips) before any ask
• Legacy: Remind readers their investment will outlast them

PRIMARY AUDIENCE: Homeowners seeking premium outdoor living upgrades
SECONDARY AUDIENCE: Contractors and builders seeking subcontract masonry partners`,
      brandTone: `• Premium but approachable—think Architectural Digest meets Texas tradition
• Helpful first, promotional second
• Calm authority—never desperate or salesy
• Occasional warmth and regional pride is encouraged`,
      brandAvoid: `NEVER USE:
• "Best in class", "world-class", "cutting-edge" (vague superlatives)
• "Synergy", "leverage", "paradigm" (corporate jargon)
• Exclamation points!!! (too salesy)
• "Don't wait!", "Act now!", "Limited time!" (pressure tactics)
• Emojis 🚫
• "We're passionate about..." (cliché)
• Guarantees we can't back up specifically`,
    },
  });
  console.log('   ✅ Site settings updated\n');

  console.log('🎉 Seed complete!\n');
  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
