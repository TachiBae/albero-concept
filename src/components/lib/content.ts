// Every string the homepage renders is looked up here from src/content/*.json.
// Lookups throw at build time when the source text is missing, so copy can't
// drift away from albero.ph unnoticed.
import homeJson from '../../content/home.json';
import siteJson from '../../content/site.json';
import cereJson from '../../content/cere-collection.json';
import secondHausJson from '../../content/2ndhaus-collection.json';
import engoldJson from '../../content/engold.json';
import insilenceJson from '../../content/insilence-collection.json';
import amustJson from '../../content/amust-collection.json';
import originJson from '../../content/origin-collection.json';
import closeJson from '../../content/close-collection.json';
import yugenJson from '../../content/yugencollection.json';
import hyggeJson from '../../content/hygge-collection.json';
import customJson from '../../content/custom-furniture.json';
import ourStoryJson from '../../content/our-story.json';
import visitJson from '../../content/message-1.json';
import storeHomeJson from '../../content/home-2nd-haus.json';

interface TextItem {
  tag: string;
  text: string;
}

interface Block {
  type: string;
  items?: TextItem[];
  text?: string;
  href?: string;
}

interface Page {
  slug: string;
  title: string;
  meta_description?: string | null;
  sections: { blocks: Block[] }[];
}

interface NavItem {
  text: string;
  href: string;
  children?: NavItem[];
}

export interface Link {
  text: string;
  href: string;
}

const page = (json: unknown) => json as Page;

export const pages = {
  home: page(homeJson),
  cere: page(cereJson),
  secondHaus: page(secondHausJson),
  engold: page(engoldJson),
  insilence: page(insilenceJson),
  amust: page(amustJson),
  origin: page(originJson),
  close: page(closeJson),
  yugen: page(yugenJson),
  hygge: page(hyggeJson),
  custom: page(customJson),
  ourStory: page(ourStoryJson),
  visit: page(visitJson),
  storeHome: page(storeHomeJson),
};

const site = siteJson as { nav: NavItem[]; footer_text: string[]; social_links: string[] };

function textItems(p: Page): TextItem[] {
  return p.sections.flatMap((s) => s.blocks.flatMap((b) => (b.type === 'text' ? (b.items ?? []) : [])));
}

/** Full text of the first item on `p` that starts with `start`. */
export function quote(p: Page, start: string): string {
  const hit = textItems(p).find((i) => i.text.startsWith(start));
  if (!hit) throw new Error(`[content] "${start}…" not found in ${p.slug}.json`);
  return hit.text;
}

/** First heading on `p` whose text matches `pattern`, or null. */
export function heading(p: Page, pattern: RegExp): string | null {
  return textItems(p).find((i) => /^h\d$/.test(i.tag) && pattern.test(i.text))?.text ?? null;
}

export function firstSentence(text: string): string {
  return text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text;
}

/** Drops the trailing colon the source uses on labels ("ALBERO HQ:"). */
export function stripColon(text: string): string {
  return text.replace(/\s*:\s*$/, '');
}

/** albero.ph links point at the live site; map them onto this concept's routes. */
export function localHref(href: string): string {
  return href.replace(/^https?:\/\/(www\.)?albero\.ph/i, '') || '/';
}

export function button(p: Page, label: string): Link {
  const hit = p.sections.flatMap((s) => s.blocks).find((b) => b.type === 'button' && b.text === label);
  if (!hit?.href) throw new Error(`[content] button "${label}" not found in ${p.slug}.json`);
  return { text: label, href: localHref(hit.href) };
}

function navNode(label: string): NavItem {
  const hit = site.nav.find((n) => n.text === label);
  if (!hit) throw new Error(`[content] nav "${label}" not found in site.json`);
  return hit;
}

function navChildren(label: string): Link[] {
  return (navNode(label).children ?? []).map((c) => ({ text: c.text.replace(/\s+/g, ' '), href: c.href }));
}

function footerText(start: string): string {
  const hit = site.footer_text.find((t) => t.startsWith(start));
  if (!hit) throw new Error(`[content] footer text "${start}" not found in site.json`);
  return hit;
}

// ---------------------------------------------------------------------------
// Navigation. Top-level labels follow the brief for this concept
// ("Shop" and "Homes" stand in for albero.ph's "Store" and "At Home").
// Child labels and routes come from site.json.

export const wordmark = pages.home.title; // "ALBERO"

const aboutChildren = navChildren('About');
export const bookVisit: Link = aboutChildren.find((c) => c.text === 'Book Your Visit')!;
export const inquire: Link = aboutChildren.find((c) => c.text === 'Inquire')!;
export const ourStory: Link = aboutChildren.find((c) => c.text === 'Our Story')!;
export const customLink: Link = { text: navNode('Custom').text, href: navNode('Custom').href };

export const collectionLinks = navChildren('Collections');
export const shopLinks = navChildren('Store');
export const homesLinks = navChildren('At Home');

export const primaryNav: Link[] = [
  { text: 'Collections', href: '/#collections' },
  { text: 'Shop', href: navNode('Store').href },
  { text: 'Custom', href: customLink.href },
  { text: 'Homes', href: homesLinks[0].href }, // /lifestyle redirects to /with-fp on the source
  { text: 'About', href: ourStory.href }, // /about redirects to /our-story on the source
];

// ---------------------------------------------------------------------------
// Contact

export const contact = {
  hqLabel: stripColon(quote(pages.visit, 'ALBERO HQ')),
  address: quote(pages.visit, '2-1 Magalang Avenue'),
  email: quote(pages.visit, 'contact@albero.ph'),
  phone: quote(pages.visit, '+63'),
  hoursLabel: footerText('Hours'),
  footerEmail: footerText('alberoph@gmail.com'),
  footerLine: footerText('contact@albero.ph |'),
  copyright: footerText('©'),
};

export const social: Link[] = (['facebook', 'instagram', 'youtube'] as const).map((name) => {
  const href = site.social_links.find((l) => l.includes(`${name}.com`));
  if (!href) throw new Error(`[content] ${name} link not found in site.json`);
  return { text: footerText(name), href };
});

// ---------------------------------------------------------------------------
// Collections index: names from the nav, labels from each page's own headings.

interface Collection {
  name: string;
  href: string;
  meta: string | null;
  image: string;
  alt: string;
}

const yearLabel = (p: Page) => heading(p, /^\d{4} Collection$/);

const covers: Record<string, { page: Page; meta?: string | null; image: string; alt: string }> = {
  '/cere-collection': {
    page: pages.cere,
    // Not ABR_2282: that's the hero's room from another angle (critique: Cere repeated before the index).
    image: '/images/cere-collection/Clo-Sofa-2.jpg',
    alt: 'Clo Sofa: tan upholstered sofa on black lacquer side panels, with brown and cream cushions',
  },
  '/2ndhaus-collection': {
    page: pages.secondHaus,
    image: '/images/2ndhaus-collection/2NDHAUS-75325-EDIT.jpg',
    alt: 'Round dark wood dining table on an arched base between two cream armchairs, in front of a curtained window',
  },
  '/engold': {
    page: pages.engold,
    meta: heading(pages.engold, /^Albero x En Gold$/),
    image: '/images/engold/IMG_0050_5.jpg',
    alt: 'Stone table and small vessels in low, warm light',
  },
  '/insilence-collection': {
    page: pages.insilence,
    image: '/images/insilence-collection/CALBEROPIFS25INSILENCE-4382-EDIT.jpg',
    alt: 'Two people seated at a round table with a marble top',
  },
  '/amust-collection': {
    page: pages.amust,
    image: '/images/amust-collection/AMUST_24-8736.jpg',
    alt: 'Long dining table with upholstered chairs beneath a floating staircase',
  },
  '/origin-collection': {
    page: pages.origin,
    image: '/images/origin-collection/ORIGIN-52-6138-EDIT.jpg',
    alt: 'A stacked burl wood side table, a pale wood sideboard and an upholstered chair outdoors beneath a timber gable frame hung with flowers',
  },
  '/close-collection': {
    page: pages.close,
    image: '/images/close-collection/image-asset.jpeg',
    alt: 'Two people relaxing in a bedroom with an upholstered bed, floor cushions and a tall shelf',
  },
  '/yugencollection': {
    page: pages.yugen,
    image: '/images/our-story/Albero---Y-gen-Collection.jpg',
    alt: 'A person seated on a low sofa beside a round glass coffee table, with a circular window screen behind',
  },
  '/hygge-collection': {
    page: pages.hygge,
    image: '/images/hygge-collection/ALBERO_PIFS2020-6444.jpg',
    alt: 'Fluted round side table holding a vase of dried flowers, a hand reaching toward it',
  },
};

export const collections: Collection[] = collectionLinks.map(({ text, href }) => {
  const cover = covers[href];
  if (!cover) throw new Error(`[content] no cover configured for ${href}`);
  return {
    name: text,
    href,
    meta: cover.meta !== undefined ? cover.meta : yearLabel(cover.page),
    image: cover.image,
    alt: cover.alt,
  };
});
