export const portfolioItems = [
  {
    id: 'river-oaks-outdoor-kitchen',
    title: 'River Oaks Luxury Outdoor Kitchen',
    subtitle: 'A masterpiece of culinary design and natural stone craftsmanship.',
    challenge: `The homeowner desired a seamless transition from their indoor living space to a fully functional, high-end outdoor kitchen capable of hosting large summer gatherings.`,
    solution: `We constructed a custom L-shaped cooking island using stacked Texas limestone, featuring a built-in grill, smoker, and refrigeration unit. The structure was topped with a single slab of premium leathered granite.`,
    imageAfter: 'masonry-kitchen-after',
    imageBefore: 'masonry-kitchen-before',
    benefits: [
      'Entertaining Oasis: Creates a breathtaking focal point for hosting family and friends.',
      'Premium Durability: Weather-resistant Texas limestone withstands the harshest Gulf Coast summers.',
      'Increased Property/Resale Value: High-end outdoor kitchens offer one of the highest ROI for home additions.',
      'Custom Integration: Flawlessly built around specific high-end appliances ranging from pizza ovens to kegerators.',
    ],
  },
  {
    id: 'katy-commercial-block-wall',
    title: 'Katy Commercial Retaining Wall',
    subtitle: 'Engineered structural integrity with an aesthetic finish.',
    challenge: 'A new commercial development required a massive 200-foot retaining wall to hold back soil elevation changes, but the client did not want a plain concrete eyesore.',
    solution: 'Engineered a reinforced cinder block (CMU) core for maximum structural stability, completely faced with split-face architectural block and finished with a custom limestone cap.',
    imageAfter: 'masonry-commercial-after',
    imageBefore: 'masonry-commercial-before',
    benefits: [
      'Structural Mastery: Built to strictly adhere to Texas commercial structural engineering codes.',
      'Aesthetic Upgrade: The split-face architectural finish transforms a utility wall into a design feature.',
      'Zero Maintenance: Solid masonry construction requires virtually zero ongoing maintenance.',
      'Erosion Control: Permanently solves soil erosion and water runoff issues for the property.',
    ],
  },
  {
    id: 'woodlands-custom-fire-pit',
    title: 'The Woodlands Custom Fire Pit Lounge',
    subtitle: 'Year-round outdoor living centered around a custom stone hearth.',
    challenge: 'The client had a large, unused concrete patio and wanted to create a cozy, defined gathering space for cool Texas evenings.',
    solution: 'Designed and built a circular, wood-burning fire pit using tumbled flagstone, surrounded by a matching semi-circle stone seating wall that comfortably accommodates 10+ guests.',
    imageAfter: 'masonry-firepit-after',
    imageBefore: 'masonry-firepit-before',
    benefits: [
      'Year-Round Enjoyment: Extends the usability of the backyard into the cooler fall and winter months.',
      'Natural Aesthetic: The tumbled flagstone perfectly complements the wooded surroundings of the property.',
      'Built-in Seating: The custom seating wall eliminates the need for bulky patio furniture.',
      'Safe & Contained: Professionally built hearths keep fires safely contained within high-heat refractory brick.',
    ],
  },
  {
    id: 'sugar-land-paver-driveway',
    title: 'Sugar Land Luxury Paver Driveway',
    subtitle: 'Elevating curb appeal with interlocking stone pavers.',
    challenge: 'The existing poured concrete driveway was heavily cracked, uneven, and detracting significantly from the value of a newly renovated luxury home.',
    solution: 'Excavated the old concrete, established a heavily compacted aggregate base, and installed a sweeping multi-color interlocking paver driveway with a contrasting soldier course border.',
    imageAfter: 'masonry-paver-after',
    imageBefore: 'masonry-paver-before',
    benefits: [
      'Unmatched Curb Appeal: Creates a stunning geometric visual that instantly elevates the entire property front.',
      'Crack Resistance: Interlocking pavers flex with the shifting Texas soil, preventing the cracking common in poured concrete.',
      'Modular Design: If a section is ever stained, individual pavers can be replaced seamlessly without demolition.',
      'Immediate Usage: Unlike concrete which requires curing time, pavers are ready to drive on the moment installation is complete.',
    ],
  },
  {
    id: 'memorial-pool-coping',
    title: 'Memorial Custom Stone Pool Coping',
    subtitle: 'Elevating outdoor luxury with premium custom-cut stone coping.',
    challenge: 'The homeowners desired a luxurious upgrade for their pool deck, seeking a natural stone border that provided both slip-resistance and aesthetic elegance.',
    solution: 'Installed custom-cut and bullnosed Travertine coping around the entire pool perimeter, seamlessly matching the existing patio architecture.',
    imageAfter: 'masonry-restoration-after',
    imageBefore: 'masonry-restoration-before',
    benefits: [
      'Enhanced Safety: Natural, porous stone provides a naturally slip-resistant surface around water.',
      'Thermal Comfort: Premium Travertine stays exceptionally cool to the touch even in the harsh Texas summer sun.',
      'Seamless Integration: Custom cuts expertly navigate the complex curves of freeform pool designs.',
      'Long-Term Durability: Highly resistant to pool chemicals and weathering.',
    ],
  },
  {
    id: 'cypress-stone-veneer',
    title: 'Cypress Exterior Stone Veneer Update',
    subtitle: 'Modernizing a dated facade with natural dry-stack stone.',
    challenge: 'Homeowner wanted to modernize the front elevation of their 1990s home, transitioning from dated siding to a premium, heavy-stone look.',
    solution: 'Removed the existing siding on the lower half of the home and installed a premium natural dry-stack ledge stone veneer, completely transforming the architectural style.',
    imageAfter: 'masonry-veneer-after',
    imageBefore: 'masonry-veneer-before',
    benefits: [
      'Total Transformation: Completely updates the architectural style of the home in a matter of days.',
      'Added Insulation: Stone veneer adds a layer of thermal mass, improving the energy efficiency of the walls.',
      'Lasting Elegance: Natural stone never goes out of style and requires zero painting or upkeep.',
      'High ROI: Exterior stone accents are consistently ranked as one of the top investments for home value.',
    ],
  },
];

// Helper to get previous/next project IDs
export const getProjectNavigation = (currentId: string) => {
  const currentIndex = portfolioItems.findIndex(item => item.id === currentId);
  const previousProject = currentIndex > 0 ? portfolioItems[currentIndex - 1] : null;
  const nextProject = currentIndex < portfolioItems.length - 1 ? portfolioItems[currentIndex + 1] : null;
  return { previousProject, nextProject };
};
