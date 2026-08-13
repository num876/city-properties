export interface Property {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  slug: string;
  featuredImage?: { node: { sourceUrl: string; altText: string } };
  price?: string;
  bedrooms?: number;
  bathrooms?: number;
  type?: string;
}

export const DEMO_PROPERTIES: Property[] = [
  {
    id: 'demo-1',
    title: 'Luxury Apartment, Summertown',
    excerpt: '<p>A stunning two-bedroom apartment in the heart of Summertown with modern open-plan living and a private balcony.</p>',
    content: '<p>A stunning two-bedroom apartment in the heart of Summertown with modern open-plan living and a private balcony. This exceptional property benefits from underfloor heating, secure underground parking, and a concierge service. The high-spec kitchen includes integrated Miele appliances.</p>',
    slug: 'luxury-apartment-summertown',
    featuredImage: { node: { sourceUrl: '/images/demo_luxury_apt.jpg', altText: 'Summertown Apartment' } },
    price: '£1,850 pcm', bedrooms: 2, bathrooms: 2, type: 'Apartment',
  },
  {
    id: 'demo-2',
    title: 'Victorian Townhouse, Jericho',
    excerpt: '<p>Beautifully restored three-bedroom Victorian townhouse in sought-after Jericho with original features throughout.</p>',
    content: '<p>Beautifully restored three-bedroom Victorian townhouse in sought-after Jericho with original features throughout. Located on a quiet residential street, it offers easy access to Port Meadow and local cafes. Features include sash windows, exposed floorboards, and a quaint courtyard garden.</p>',
    slug: 'victorian-townhouse-jericho',
    featuredImage: { node: { sourceUrl: '/images/demo_victorian_townhouse.jpg', altText: 'Jericho Townhouse' } },
    price: '£2,200 pcm', bedrooms: 3, bathrooms: 2, type: 'House',
  },
  {
    id: 'demo-3',
    title: 'Modern Studio, Cowley Road',
    excerpt: '<p>Sleek and contemporary studio flat with high-spec finishes and excellent transport links to the city centre.</p>',
    content: '<p>Sleek and contemporary studio flat with high-spec finishes and excellent transport links to the city centre. Ideal for young professionals or postgraduates. Bills are included in the rent, and the building features secure bike storage and a communal roof terrace.</p>',
    slug: 'modern-studio-cowley',
    featuredImage: { node: { sourceUrl: '/images/demo_modern_studio.jpg', altText: 'Cowley Studio' } },
    price: '£950 pcm', bedrooms: 1, bathrooms: 1, type: 'Studio',
  },
  {
    id: 'demo-4',
    title: 'Penthouse Suite, City Centre',
    excerpt: '<p>Exceptional top-floor penthouse with panoramic views over Oxford\'s dreaming spires. Concierge service included.</p>',
    content: '<p>Exceptional top-floor penthouse with panoramic views over Oxford\'s dreaming spires. The vast open-plan living space features floor-to-ceiling windows and sliding doors leading to a wrap-around terrace. Includes two secure parking spaces and 24/7 concierge service.</p>',
    slug: 'penthouse-city-centre',
    featuredImage: { node: { sourceUrl: '/images/demo_penthouse.jpg', altText: 'Oxford Penthouse' } },
    price: '£3,500 pcm', bedrooms: 3, bathrooms: 3, type: 'Penthouse',
  },
  {
    id: 'demo-5',
    title: 'Cottage, Old Marston',
    excerpt: '<p>Charming two-bedroom period cottage with a private garden, exposed beams, and a wood-burning fireplace.</p>',
    content: '<p>Charming two-bedroom period cottage with a private garden, exposed beams, and a wood-burning fireplace. Situated in the peaceful village of Old Marston, yet within cycling distance to the JR Hospital and city centre. Pet friendly upon negotiation.</p>',
    slug: 'cottage-old-marston',
    featuredImage: { node: { sourceUrl: '/images/demo_cottage.jpg', altText: 'Old Marston Cottage' } },
    price: '£1,400 pcm', bedrooms: 2, bathrooms: 1, type: 'Cottage',
  },
  {
    id: 'demo-6',
    title: 'Riverside Flat, Osney',
    excerpt: '<p>Bright one-bedroom riverside flat with stunning water views, a modern kitchen, and off-street parking.</p>',
    content: '<p>Bright one-bedroom riverside flat with stunning water views, a modern kitchen, and off-street parking. Enjoy your morning coffee on the private balcony overlooking the Thames. A short walk to Oxford railway station and the city centre.</p>',
    slug: 'riverside-flat-osney',
    featuredImage: { node: { sourceUrl: '/images/demo_riverside_flat.jpg', altText: 'Osney Flat' } },
    price: '£1,300 pcm', bedrooms: 1, bathrooms: 1, type: 'Flat',
  },
  {
    id: 'demo-7',
    title: 'Executive Home, Headington',
    excerpt: '<p>Spacious four-bedroom detached executive home in Headington with a landscaped garden and double garage.</p>',
    content: '<p>Spacious four-bedroom detached executive home in Headington with a landscaped garden and double garage. Perfect for a family or visiting academics. Easy access to Headington hospitals and London transport links.</p>',
    slug: 'executive-home-headington',
    featuredImage: { node: { sourceUrl: '/images/demo_exec_home.jpg', altText: 'Headington Home' } },
    price: '£3,200 pcm', bedrooms: 4, bathrooms: 3, type: 'House',
  },
  {
    id: 'demo-8',
    title: 'Garden Flat, Botley',
    excerpt: '<p>Light-filled two-bedroom ground floor flat with direct access to a large private garden and on-site parking.</p>',
    content: '<p>Light-filled two-bedroom ground floor flat with direct access to a large private garden and on-site parking. Recently renovated to a high standard. Excellent access to the A34 and local Botley amenities.</p>',
    slug: 'garden-flat-botley',
    featuredImage: { node: { sourceUrl: '/images/demo_garden_flat.jpg', altText: 'Botley Garden Flat' } },
    price: '£1,150 pcm', bedrooms: 2, bathrooms: 1, type: 'Flat',
  },
  {
    id: 'demo-9',
    title: 'Student House, East Oxford',
    excerpt: '<p>Well-maintained five-bedroom HMO in popular East Oxford, close to Brookes and the city centre, available September.</p>',
    content: '<p>Well-maintained five-bedroom HMO in popular East Oxford, close to Brookes and the city centre, available September. Fully furnished, includes a large communal living area and two bathrooms.</p>',
    slug: 'student-house-east-oxford',
    featuredImage: { node: { sourceUrl: '/images/demo_student_hmo.jpg', altText: 'East Oxford Student House' } },
    price: '£550 pppm', bedrooms: 5, bathrooms: 2, type: 'HMO',
  },
];

export const STUDENT_PROPERTIES: Property[] = [
  {
    id: 'student-1',
    title: 'Chester Street, Cowley',
    excerpt: '<p>Ideal location for students who want to be close to university but also the city centre & Cowley Road. The property is spread over 2 storeys and has all double bedrooms, living room, kitchen w/dining area, bathroom, additional w/c, & separate shower and a large garden.</p>',
    content: '<p>Ideal location for students who want to be close to university but also the city centre & Cowley Road. The property is spread over 2 storeys and has all double bedrooms, living room, kitchen w/dining area, bathroom, additional w/c, & separate shower and a large garden.</p>',
    slug: 'chester-street-cowley',
    featuredImage: { node: { sourceUrl: '/images/demo_student_chester.jpg', altText: 'Chester Street, Cowley' } },
    price: '£2,800 pcm', bedrooms: 4, type: 'House',
  },
  {
    id: 'student-2',
    title: 'Ridgefield Road, Cowley',
    excerpt: '<p>Perfect location for students – the property is located within minutes of City Arms is within walking distance to City Centre & Oxford Brookes. The property consists of all double bedrooms, large open living / kitchen area, 2 bathrooms, garden w/ side entrance; & off street parking.</p>',
    content: '<p>Perfect location for students – the property is located within minutes of City Arms is within walking distance to City Centre & Oxford Brookes. The property consists of all double bedrooms, large open living / kitchen area, 2 bathrooms, garden w/ side entrance; & off street parking.</p>',
    slug: 'ridgefield-road-cowley',
    featuredImage: { node: { sourceUrl: '/images/demo_student_ridgefield.jpg', altText: 'Ridgefield Road, Cowley' } },
    price: '£2,800 pcm', bedrooms: 4, type: 'House',
  },
  {
    id: 'student-3',
    title: 'Southfield Road, Cowley',
    excerpt: '<p>Excellent location – the property is located just off the vibrant Cowley Road and is within walking distance to City Centre & Oxford Brookes. The property consists of all double bedrooms, large kitchen w/ dining area, bathroom, additional w/c, living rooms and garden w/ side entrance.</p>',
    content: '<p>Excellent location – the property is located just off the vibrant Cowley Road and is within walking distance to City Centre & Oxford Brookes. The property consists of all double bedrooms, large kitchen w/ dining area, bathroom, additional w/c, living rooms and garden w/ side entrance.</p>',
    slug: 'southfield-road-cowley',
    featuredImage: { node: { sourceUrl: '/images/demo_student_southfield.jpg', altText: 'Southfield Road, Cowley' } },
    price: '£3,000 pcm', bedrooms: 4, type: 'House',
  },
  {
    id: 'student-4',
    title: 'Hurst Street, Cowley',
    excerpt: '<p>A student’s dream, within walking distance to both main Universities and city centre and on the doorstep to the famous Cowley Road shops/ cafes/ restaurants. The property consists of all double bedrooms, kitchen, living room, bathroom, additional w/c & front and back garden.</p>',
    content: '<p>A student’s dream, within walking distance to both main Universities and city centre and on the doorstep to the famous Cowley Road shops/ cafes/ restaurants. The property consists of all double bedrooms, kitchen, living room, bathroom, additional w/c & front and back garden.</p>',
    slug: 'hurst-street-cowley',
    featuredImage: { node: { sourceUrl: '/images/demo_student_hurst.jpg', altText: 'Hurst Street, Cowley' } },
    price: '£2,700 pcm', bedrooms: 4, type: 'House',
  },
  {
    id: 'student-5',
    title: 'St Mary’s Road, Cowley',
    excerpt: '<p>Ideal location within walking distance to Universities and City Centre. The property has all double bedrooms, bathroom, shower room, additional w/c, kitchen w/ dining area, living room and garden.</p>',
    content: '<p>Ideal location within walking distance to Universities and City Centre. The property has all double bedrooms, bathroom, shower room, additional w/c, kitchen w/ dining area, living room and garden.</p>',
    slug: 'st-marys-road-cowley-5',
    featuredImage: { node: { sourceUrl: '/images/demo_student_hmo.jpg', altText: 'St Mary’s Road, Cowley' } },
    price: '£3,750 pcm', bedrooms: 5, type: 'House',
  },
  {
    id: 'student-6',
    title: 'Ridgefield Road, Cowley',
    excerpt: '<p>Perfect location for students within minutes of City Arms and walking distance to Universities and City Centre. The property has all double bedrooms, bathroom, shower room, kitchen w/ dining area, living room, large garden and off street parking for 2/3 cars.</p>',
    content: '<p>Perfect location for students within minutes of City Arms and walking distance to Universities and City Centre. The property has all double bedrooms, bathroom, shower room, kitchen w/ dining area, living room, large garden and off street parking for 2/3 cars.</p>',
    slug: 'ridgefield-road-cowley-5',
    featuredImage: { node: { sourceUrl: '/images/demo_student_ridgefield.jpg', altText: 'Ridgefield Road, Cowley' } },
    price: '£3,625 pcm', bedrooms: 5, type: 'House',
  },
  {
    id: 'student-7',
    title: 'Bartlemas Road, Cowley',
    excerpt: '<p>Excellent location, with 2 living rooms! The property is located just off the vibrant Cowley Road and is withing walking distance to City Centre & Oxford Brookes. The property consists of all double bedrooms, large kitchen w/ dining area, bathroom, shower room, additional w/c, 2 living rooms and garden.</p>',
    content: '<p>Excellent location, with 2 living rooms! The property is located just off the vibrant Cowley Road and is withing walking distance to City Centre & Oxford Brookes. The property consists of all double bedrooms, large kitchen w/ dining area, bathroom, shower room, additional w/c, 2 living rooms and garden.</p>',
    slug: 'bartlemas-road-cowley',
    featuredImage: { node: { sourceUrl: '/images/demo_student_southfield.jpg', altText: 'Bartlemas Road, Cowley' } },
    price: '£3,750 pcm', bedrooms: 5, type: 'House',
  },
  {
    id: 'student-8',
    title: 'The Slade, Headington',
    excerpt: '<p>Modern property with all double bedrooms and 3 bathrooms (2 of which are en-suites). The property is located with excellent links to City Centre and Universities. The property also consists of large open plan living room/kitchen, garden with side entrance and off street parking for 2/3 cars.</p>',
    content: '<p>Modern property with all double bedrooms and 3 bathrooms (2 of which are en-suites). The property is located with excellent links to City Centre and Universities. The property also consists of large open plan living room/kitchen, garden with side entrance and off street parking for 2/3 cars.</p>',
    slug: 'the-slade-headington',
    featuredImage: { node: { sourceUrl: '/images/demo_student_chester.jpg', altText: 'The Slade, Headington' } },
    price: '£3,500 pcm', bedrooms: 5, type: 'House',
  },
  {
    id: 'student-9',
    title: 'St Mary’s Road, Cowley',
    excerpt: '<p>Ideal location within walking distance to Universities and City Centre. The property has all double bedrooms, 3 bathrooms, large open living / kitchen space, garden and off street parking for at least 2 cars.</p>',
    content: '<p>Ideal location within walking distance to Universities and City Centre. The property has all double bedrooms, 3 bathrooms, large open living / kitchen space, garden and off street parking for at least 2 cars.</p>',
    slug: 'st-marys-road-cowley-6',
    featuredImage: { node: { sourceUrl: '/images/demo_student_hmo.jpg', altText: 'St Mary’s Road, Cowley' } },
    price: '£4,350 pcm', bedrooms: 6, type: 'House',
  },
  {
    id: 'student-10',
    title: 'Iffley Road, Cowley',
    excerpt: '<p>Perfect location by St Clements roundabout. Walking distance to Universities and City Centre. The property has all double bedrooms, 2 bathrooms, additional shower, additional w/c, 2 kitchens, living room and garden.</p>',
    content: '<p>Perfect location by St Clements roundabout. Walking distance to Universities and City Centre. The property has all double bedrooms, 2 bathrooms, additional shower, additional w/c, 2 kitchens, living room and garden.</p>',
    slug: 'iffley-road-cowley',
    featuredImage: { node: { sourceUrl: '/images/demo_student_hurst.jpg', altText: 'Iffley Road, Cowley' } },
    price: '£4,500 pcm', bedrooms: 6, type: 'House',
  },
];
