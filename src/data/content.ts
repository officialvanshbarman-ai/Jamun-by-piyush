export const products = [
  {
    slug: 'original',
    name: 'Jamun Original',
    price: 999,
    unit: '6 exceptional fruits',
    note: 'The original. Dramatically reconsidered.',
    detail:
      'Six seasonal jamuns. Selected for their character, arranged with unreasonable care. Nature did the hard part.',
    edition: '01',
    image: '/images/products/original.webp',
  },
  {
    slug: 'signature',
    name: 'Jamun Signature',
    price: 4999,
    unit: '6 fruits · signature presentation',
    note: 'A little fruit. A considerable statement.',
    detail:
      'Our signature selection, individually nestled in a presentation box that has attended more design meetings than it should.',
    edition: '02',
    image: '/images/products/signature.webp',
  },
  {
    slug: 'reserve',
    name: 'Jamun Reserve',
    price: 9999,
    unit: '6 fruits · imagined limited edition',
    note: 'For those who have everything. Except this.',
    detail:
      'An imaginary private reserve. Deeply considered fruit meets dark stone and the quiet confidence of unnecessary exclusivity.',
    edition: '03',
    image: '/images/products/reserve.webp',
  },
  {
    slug: 'pro-max',
    name: 'Jamun Pro Max',
    price: 19999,
    unit: 'Executive presentation box',
    note: 'Maximum presence. Same fundamental fruit.',
    detail:
      'The executive presentation. A larger case, a longer unboxing, and an entirely fictional leap forward in fruit ownership.',
    edition: '04',
    image: '/images/products/pro-max.webp',
  },
  {
    slug: 'infinity',
    name: 'Jamun Infinity',
    price: 0,
    unit: 'Price Upon Imagination',
    note: 'Beyond the limits of the fruit bowl.',
    detail:
      'Our most ambitious concept has no price. Or production schedule. An exploration of what happens when imagination exceeds packaging.',
    edition: '05',
    image: '/images/products/infinity.webp',
  },
];
export const navigation = [
  ['Our Story', '/our-story'],
  ['Collection', '/collection'],
  ['Innovation', '/innovation'],
  ['Leadership', '/leadership'],
  ['Investors', '/investors'],
  ['Contact', '/contact'],
];
export const money = (n: number) => '₹' + n.toLocaleString('en-IN');
