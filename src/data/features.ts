import { PricingPlan } from '../types.ts';

export const CORE_FEATURES = [
  {
    title: 'Express 6-Hour Ingestion',
    description: 'We connect your music directly to leading distribution channels in our partner network, delivering your release to live stores in under 6 hours.',
    icon: 'Clock',
    stat: '< 6 hrs',
    statLabel: 'Live Delivery'
  },
  {
    title: 'Official Label Imprint',
    description: 'Released under our registered label imprint. Your YouTube music metadata will display "Provided to YouTube by Gospel Vision Media" with official Content ID protection.',
    icon: 'ShieldCheck',
    stat: 'Official',
    statLabel: 'Label Branding'
  },
  {
    title: '26+ Global & Regional Platforms',
    description: 'We place your tracks on Spotify, Apple Music, YouTube Music, Amazon, JioSaavn, Wynk, TikTok, Instagram Reels, and regional Christian/Gospel outlets.',
    icon: 'Globe',
    stat: '26+',
    statLabel: 'Stores Reached'
  },
  {
    title: 'Direct WhatsApp Support',
    description: 'Personal assistance for every release. Chat or call directly with our team for immediate ingestion updates and release coordination.',
    icon: 'MessageCircle',
    stat: 'Direct',
    statLabel: 'WhatsApp Desk'
  },
  {
    title: 'Free ISRC & Barcodes',
    description: 'Every single and album comes with standard ISRC tracking codes and digital UPC barcodes generated on your behalf.',
    icon: 'Zap',
    stat: 'Included',
    statLabel: 'ISRC & UPC'
  },
  {
    title: 'Lyrics & Social Sync',
    description: 'We submit your synchronized lyrics to Instagram Audio, Spotify, and Apple Music for maximum viral reach on Reels and Stories.',
    icon: 'Music',
    stat: 'Synchronized',
    statLabel: 'Lyrics Delivery'
  }
];

export const TIMELINE_STEPS = [
  {
    step: '01',
    title: 'Submit Audio & Details',
    time: 'Step 1',
    desc: 'Provide your master audio, artwork, artist credits, and chosen royalty tier.'
  },
  {
    step: '02',
    title: 'Agency Audit & Label Ingest',
    time: 'Step 2',
    desc: 'Our agency formats the metadata, assigns ISRC/UPC codes, and queues under the Gospel Vision Media label.'
  },
  {
    step: '03',
    title: 'Express DSP Delivery',
    time: 'Step 3',
    desc: 'Direct ingestion into Spotify, Apple Music, YouTube Music, and 26+ partner DSPs within 6 hours.'
  },
  {
    step: '04',
    title: 'Live Worldwide & Royalty Reports',
    time: 'Step 4',
    desc: 'Your music goes live globally with official label credits and royalty payouts distributed according to your plan.'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'express-single',
    title: 'Express Single',
    tagline: 'Affordable single release via our agency under Gospel Vision Media label.',
    price: '₹1,500',
    currency: 'INR',
    period: 'one-time',
    deliveryTime: 'Live within 6 Hours',
    features: [
      '1 Single Track Distribution',
      '50% Artist Royalty Share',
      'Released under Gospel Vision Media Label',
      'Live on Spotify, Apple Music, YouTube & 26+ DSPs',
      'YouTube "Provided by Gospel Vision Media" Imprint',
      'Free ISRC & UPC Codes',
      'Direct WhatsApp Release Coordination'
    ]
  },
  {
    id: 'express-album',
    title: 'Express Album',
    tagline: 'Complete 15-track album or EP release with higher royalty payout.',
    price: '₹15,000',
    currency: 'INR',
    period: 'one-time (up to 15 tracks)',
    popular: true,
    deliveryTime: 'Live within 6 Hours',
    features: [
      'Full Album (Up to 15 Tracks)',
      '80% Artist Royalty Share',
      'Guaranteed 6-Hour Express Upload',
      'Released under Gospel Vision Media Label',
      'Official Artist Channel (OAC) setup assistance',
      'Synchronized Lyrics for Instagram & Spotify',
      'Free ISRC for every track + Album UPC',
      'Priority WhatsApp Agency Support'
    ]
  },
  {
    id: 'vip-artist',
    title: 'VIP Artist / Ministry',
    tagline: 'Premium tier for ministries and artists keeping 100% of all royalties.',
    price: '₹4,000',
    currency: 'INR',
    period: 'per single (or ₹25,000 / 15-song album)',
    deliveryTime: 'VIP 6-Hour Expedited',
    features: [
      '100% Artist Royalties Kept',
      '₹4,000 per Single Track',
      '₹25,000 per Full Album (up to 15 songs)',
      '100% Payout Directly to Your Bank Account',
      'Official YouTube Imprint & Content ID',
      'All 26+ Streaming Platforms & Social Libraries',
      'VIP Direct Hotline (+91 9384756618)',
      'Dedicated Release Manager & Priority Review'
    ]
  }
];
