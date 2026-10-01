import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNiches } from '../context/NicheContext';
import { useBookmarks } from '../context/BookmarkContext';
import IosStatusBar from './IosStatusBar';
import { 
  Play, Pause, SkipBack, SkipForward, Search, Bell, 
  ExternalLink, Star, Bookmark, BookmarkCheck, Compass, Settings, X, Sliders, 
  Globe, LogOut, ChevronLeft, Lock, RefreshCw, Radio, Sparkles, Loader2, Check
} from 'lucide-react';

export const LIVE_NEWS_DATABASE = {
  en: [
    // ================= 1. AI & TECH (4+ stories) =================
    {
      id: 'ai-tech-1',
      nicheId: 'ai-tech',
      category: 'AI & TECH',
      categoryBg: 'bg-[#231b38]',
      categoryText: 'text-[#a78bfa]',
      title: 'Anthropic ships Claude 4.5 with 2M-token memory and native tools.',
      snippet: "Anthropic's new memory layer lets Claude hold entire codebases in mind while it works.",
      source: 'THE VERGE',
      sourceUrl: 'https://theverge.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },
    {
      id: 'ai-tech-2',
      nicheId: 'ai-tech',
      category: 'AI & TECH',
      categoryBg: 'bg-[#231b38]',
      categoryText: 'text-[#a78bfa]',
      title: 'OpenAI unveils lightweight on-device neural model for edge computing.',
      snippet: 'New architecture enables sub-100ms reasoning on consumer hardware without sending private data to cloud servers.',
      source: 'TECHCRUNCH',
      sourceUrl: 'https://techcrunch.com',
      listenTime: '2 MIN LISTEN',
      durationMinutes: '2 MIN',
    },
    {
      id: 'ai-tech-3',
      nicheId: 'ai-tech',
      category: 'AI & TECH',
      categoryBg: 'bg-[#231b38]',
      categoryText: 'text-[#a78bfa]',
      title: 'Google DeepMind demonstrates real-time robotic surgery navigation.',
      snippet: 'Neural spatial tracking achieves sub-millimeter precision in complex minimally invasive laparoscopic procedures.',
      source: 'WIRED',
      sourceUrl: 'https://wired.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },
    {
      id: 'ai-tech-4',
      nicheId: 'ai-tech',
      category: 'AI & TECH',
      categoryBg: 'bg-[#231b38]',
      categoryText: 'text-[#a78bfa]',
      title: 'NVIDIA accelerates Blackwell Ultra GPUs with liquid cooling architecture.',
      snippet: 'Data centers report 4x training efficiency and 40% reduction in power consumption for trillion-parameter LLMs.',
      source: 'REUTERS',
      sourceUrl: 'https://reuters.com',
      listenTime: '4 MIN LISTEN',
      durationMinutes: '4 MIN',
    },

    // ================= 2. FINANCIAL MARKETS (4+ stories) =================
    {
      id: 'markets-1',
      nicheId: 'financial-markets',
      category: 'GLOBAL',
      categoryBg: 'bg-[#102d2d]',
      categoryText: 'text-[#2dd4bf]',
      title: 'Fed minutes hint at a September policy shift.',
      snippet: 'Officials flagged growing confidence that inflation is cooling toward target.',
      source: 'BLOOMBERG',
      sourceUrl: 'https://bloomberg.com',
      listenTime: '2 MIN LISTEN',
      durationMinutes: '2 MIN',
    },
    {
      id: 'markets-2',
      nicheId: 'financial-markets',
      category: 'MARKETS',
      categoryBg: 'bg-[#102d2d]',
      categoryText: 'text-[#2dd4bf]',
      title: 'Sensex rallies past landmark milestone on $1.8B foreign portfolio inflow.',
      snippet: 'Heavy institutional buying in banking, IT, and green energy equities pushes domestic indices to fresh lifetime highs.',
      source: 'ECONOMIC TIMES',
      sourceUrl: 'https://economictimes.indiatimes.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },
    {
      id: 'markets-3',
      nicheId: 'financial-markets',
      category: 'MARKETS',
      categoryBg: 'bg-[#102d2d]',
      categoryText: 'text-[#2dd4bf]',
      title: 'RBI holds benchmark repo rates steady while boosting liquidity buffers.',
      snippet: 'Monetary policy committee maintains calibrated withdrawal stance as economic growth forecasts revised upward to 7.2%.',
      source: 'MINT',
      sourceUrl: 'https://livemint.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },
    {
      id: 'markets-4',
      nicheId: 'financial-markets',
      category: 'GLOBAL',
      categoryBg: 'bg-[#102d2d]',
      categoryText: 'text-[#2dd4bf]',
      title: 'European bond yields decline as inflation drops below 2% threshold.',
      snippet: 'ECB policymakers signal potential consecutive rate cuts to stimulate Eurozone industrial manufacturing.',
      source: 'FINANCIAL TIMES',
      sourceUrl: 'https://ft.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },

    // ================= 3. INDIAN BUSINESS (4+ stories) =================
    {
      id: 'indian-business-1',
      nicheId: 'indian-business',
      category: 'INDIAN BUSINESS',
      categoryBg: 'bg-[#291e14]',
      categoryText: 'text-[#fb923c]',
      title: 'Tata Electronics expands $14B semiconductor fab in Dholera, Gujarat.',
      snippet: 'Production timeline moved up as domestic component ecosystem secures long-term international supply contracts.',
      source: 'ECONOMIC TIMES',
      sourceUrl: 'https://economictimes.indiatimes.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },
    {
      id: 'indian-business-2',
      nicheId: 'indian-business',
      category: 'INDIAN BUSINESS',
      categoryBg: 'bg-[#291e14]',
      categoryText: 'text-[#fb923c]',
      title: 'Reliance Retail launches automated multi-tier supply chain hubs in 50 cities.',
      snippet: 'Autonomous sorting robotics and predictive cold storage reduce delivery bottlenecks for consumer goods across tier-2 belts.',
      source: 'BUSINESS STANDARD',
      sourceUrl: 'https://business-standard.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },
    {
      id: 'indian-business-3',
      nicheId: 'indian-business',
      category: 'INDIAN BUSINESS',
      categoryBg: 'bg-[#291e14]',
      categoryText: 'text-[#fb923c]',
      title: 'Adani Green secures $750M syndicated loan for Khavda hybrid park.',
      snippet: 'Consortium of global institutional banks finances 30GW clean energy development in world’s largest single-location renewable facility.',
      source: 'REUTERS',
      sourceUrl: 'https://reuters.com',
      listenTime: '2 MIN LISTEN',
      durationMinutes: '2 MIN',
    },
    {
      id: 'indian-business-4',
      nicheId: 'indian-business',
      category: 'INDIAN BUSINESS',
      categoryBg: 'bg-[#291e14]',
      categoryText: 'text-[#fb923c]',
      title: 'L&T wins mega infrastructure contract for western dedicated freight corridor.',
      snippet: 'High-speed electrified freight tracks expected to double container transit speeds between ports and hinterland logistics parks.',
      source: 'MINT',
      sourceUrl: 'https://livemint.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },

    // ================= 4. STARTUPS (4+ stories) =================
    {
      id: 'startups-1',
      nicheId: 'startups',
      category: 'STARTUPS',
      categoryBg: 'bg-[#132c23]',
      categoryText: 'text-[#34d399]',
      title: 'Adani Energy raises $1.2B in follow-on offering.',
      snippet: 'The green energy arm priced its share sale at a modest discount.',
      source: 'ECONOMIC TIMES',
      sourceUrl: 'https://economictimes.indiatimes.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },
    {
      id: 'startups-2',
      nicheId: 'startups',
      category: 'STARTUPS',
      categoryBg: 'bg-[#132c23]',
      categoryText: 'text-[#34d399]',
      title: 'Quick-commerce leaders expand 10-minute delivery to 40 tier-2 cities.',
      snippet: 'Micro-warehouse density and route-optimization AI spur 140% annual order growth outside metropolitan capitals.',
      source: 'TECHCRUNCH',
      sourceUrl: 'https://techcrunch.com',
      listenTime: '2 MIN LISTEN',
      durationMinutes: '2 MIN',
    },
    {
      id: 'startups-3',
      nicheId: 'startups',
      category: 'STARTUPS',
      categoryBg: 'bg-[#132c23]',
      categoryText: 'text-[#34d399]',
      title: 'Bengaluru generative AI startup secures $80M Series B for enterprise reasoning.',
      snippet: 'Domain-specific language models for legal, financial, and compliance workflows deployed across Fortune 500 clients.',
      source: 'INC42',
      sourceUrl: 'https://inc42.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },
    {
      id: 'startups-4',
      nicheId: 'startups',
      category: 'STARTUPS',
      categoryBg: 'bg-[#132c23]',
      categoryText: 'text-[#34d399]',
      title: 'Fintech unicorn receives payment aggregator license to expand MSME credit.',
      snippet: 'Cash-flow backed lending algorithm reduces underwriting time to under 60 seconds for small merchant storefronts.',
      source: 'YOURSTORY',
      sourceUrl: 'https://yourstory.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },

    // ================= 5. GLOBAL POLITICS (4+ stories) =================
    {
      id: 'global-politics-1',
      nicheId: 'global-politics',
      category: 'POLITICS',
      categoryBg: 'bg-[#1f1d36]',
      categoryText: 'text-[#818cf8]',
      title: 'Global trade ministers convene in Geneva for digital commerce framework.',
      snippet: 'New cross-border standards focus on AI sovereignty, encrypted payments, and zero tariffs on software goods.',
      source: 'REUTERS',
      sourceUrl: 'https://reuters.com',
      listenTime: '4 MIN LISTEN',
      durationMinutes: '4 MIN',
    },
    {
      id: 'global-politics-2',
      nicheId: 'global-politics',
      category: 'POLITICS',
      categoryBg: 'bg-[#1f1d36]',
      categoryText: 'text-[#818cf8]',
      title: 'UN General Assembly drafts landmark multilateral AI ethical treaty.',
      snippet: 'Over 120 member states agree on foundational safety verification protocols for autonomous military and surveillance algorithms.',
      source: 'BBC NEWS',
      sourceUrl: 'https://bbc.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },
    {
      id: 'global-politics-3',
      nicheId: 'global-politics',
      category: 'POLITICS',
      categoryBg: 'bg-[#1f1d36]',
      categoryText: 'text-[#818cf8]',
      title: 'G20 finance deputies finalize unified cross-border tax transparency rules.',
      snippet: 'Harmonized corporate digital revenue reporting aims to reduce tax arbitrage across multinational tech conglomerates.',
      source: 'FINANCIAL TIMES',
      sourceUrl: 'https://ft.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },
    {
      id: 'global-politics-4',
      nicheId: 'global-politics',
      category: 'POLITICS',
      categoryBg: 'bg-[#1f1d36]',
      categoryText: 'text-[#818cf8]',
      title: 'India and UK bilateral comprehensive trade treaty enters final signature stage.',
      snippet: 'Pact lowers import tariffs on high-tech engineering goods and grants reciprocal working visas for service professionals.',
      source: 'THE HINDU',
      sourceUrl: 'https://thehindu.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },

    // ================= 6. SCIENCE (4+ stories) =================
    {
      id: 'science-1',
      nicheId: 'science',
      category: 'SCIENCE',
      categoryBg: 'bg-[#1e1b4b]',
      categoryText: 'text-[#93c5fd]',
      title: 'ISRO unveils roadmap for next-generation Bharatiya Space Station modules.',
      snippet: 'Modular environmental life support systems receive technical approval for scheduled 2028 deployment.',
      source: 'REUTERS',
      sourceUrl: 'https://reuters.com',
      listenTime: '2 MIN LISTEN',
      durationMinutes: '2 MIN',
    },
    {
      id: 'science-2',
      nicheId: 'science',
      category: 'SCIENCE',
      categoryBg: 'bg-[#1e1b4b]',
      categoryText: 'text-[#93c5fd]',
      title: 'James Webb Telescope spots primordial galaxy cluster from dawn of universe.',
      snippet: 'Spectroscopic data confirms giant stellar clusters formed just 300 million years after the Big Bang.',
      source: 'NATURE',
      sourceUrl: 'https://nature.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },
    {
      id: 'science-3',
      nicheId: 'science',
      category: 'SCIENCE',
      categoryBg: 'bg-[#1e1b4b]',
      categoryText: 'text-[#93c5fd]',
      title: 'Quantum computing team achieves 99.9% error-corrected logical qubit fidelity.',
      snippet: 'Topological surface codes suppress phase decoherence, bringing fault-tolerant quantum chemistry simulation within reach.',
      source: 'MIT TECH REVIEW',
      sourceUrl: 'https://technologyreview.com',
      listenTime: '4 MIN LISTEN',
      durationMinutes: '4 MIN',
    },
    {
      id: 'science-4',
      nicheId: 'science',
      category: 'SCIENCE',
      categoryBg: 'bg-[#1e1b4b]',
      categoryText: 'text-[#93c5fd]',
      title: 'Indian deep-ocean submersible Matsya 6000 completes shallow-water harbor trials.',
      snippet: 'Titanium-hull exploration vehicle certified for 6,000-meter abyssal trench mineral and hydrothermal vent surveys.',
      source: 'THE HINDU',
      sourceUrl: 'https://thehindu.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },

    // ================= 7. GEOPOLITICS (4+ stories) =================
    {
      id: 'geopolitics-1',
      nicheId: 'geopolitics',
      category: 'GEOPOLITICS',
      categoryBg: 'bg-[#2d1b28]',
      categoryText: 'text-[#f472b6]',
      title: 'IMEC corridor accelerates green maritime shipping routes.',
      snippet: 'Trilateral ports complete automated customs integration, cutting Mumbai-Europe shipping times by 40%.',
      source: 'FINANCIAL TIMES',
      sourceUrl: 'https://ft.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },
    {
      id: 'geopolitics-2',
      nicheId: 'geopolitics',
      category: 'GEOPOLITICS',
      categoryBg: 'bg-[#2d1b28]',
      categoryText: 'text-[#f472b6]',
      title: 'Quad maritime domain initiative expands satellite tracking in Indo-Pacific.',
      snippet: 'Shared radar constellation offers real-time illegal fishing surveillance and dark-vessel interception to regional coast guards.',
      source: 'REUTERS',
      sourceUrl: 'https://reuters.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },
    {
      id: 'geopolitics-3',
      nicheId: 'geopolitics',
      category: 'GEOPOLITICS',
      categoryBg: 'bg-[#2d1b28]',
      categoryText: 'text-[#f472b6]',
      title: 'BRICS summit establishes unified local currency settlement mechanism.',
      snippet: 'Interbank clearing system facilitates non-dollar bilateral trades in crude oil, fertilizers, and agricultural commodities.',
      source: 'BLOOMBERG',
      sourceUrl: 'https://bloomberg.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },
    {
      id: 'geopolitics-4',
      nicheId: 'geopolitics',
      category: 'GEOPOLITICS',
      categoryBg: 'bg-[#2d1b28]',
      categoryText: 'text-[#f472b6]',
      title: 'Northern Sea Route commercial cargo traffic reaches new historic peak.',
      snippet: 'Ice-class container fleets leverage shortened transit corridors between East Asia and Scandinavian logistics terminals.',
      source: 'WALL STREET JOURNAL',
      sourceUrl: 'https://wsj.com',
      listenTime: '4 MIN LISTEN',
      durationMinutes: '4 MIN',
    },

    // ================= 8. HEALTH & MEDICINE (4+ stories) =================
    {
      id: 'health-medicine-1',
      nicheId: 'health-medicine',
      category: 'HEALTH & MEDICINE',
      categoryBg: 'bg-[#1a2e26]',
      categoryText: 'text-[#4ade80]',
      title: 'mRNA clinical trial shows breakthrough in targeted autoimmune therapy.',
      snippet: 'Novel biological engineering halts tissue inflammation without compromising general immunity.',
      source: 'NATURE',
      sourceUrl: 'https://nature.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },
    {
      id: 'health-medicine-2',
      nicheId: 'health-medicine',
      category: 'HEALTH & MEDICINE',
      categoryBg: 'bg-[#1a2e26]',
      categoryText: 'text-[#4ade80]',
      title: 'AI-guided liquid biopsy detects stage-1 cancer markers with 96% accuracy.',
      snippet: 'Circulating tumor DNA sequencing algorithm identifies early malignant mutations through single standard blood draw.',
      source: 'THE LANCET',
      sourceUrl: 'https://thelancet.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },
    {
      id: 'health-medicine-3',
      nicheId: 'health-medicine',
      category: 'HEALTH & MEDICINE',
      categoryBg: 'bg-[#1a2e26]',
      categoryText: 'text-[#4ade80]',
      title: 'CRISPR base-editing therapy approved for severe sickle-cell disorders.',
      snippet: 'One-time stem cell gene repair restores healthy fetal hemoglobin production without unintended DNA double-strand breaks.',
      source: 'NEW SCIENTIST',
      sourceUrl: 'https://newscientist.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },
    {
      id: 'health-medicine-4',
      nicheId: 'health-medicine',
      category: 'HEALTH & MEDICINE',
      categoryBg: 'bg-[#1a2e26]',
      categoryText: 'text-[#4ade80]',
      title: 'ICMR commences phase-3 clinical evaluation for universal dengue vaccine candidate.',
      snippet: 'Four-strain recombinant vaccine elicits robust neutralizing antibody response across multiple demographic cohorts.',
      source: 'INDIAN EXPRESS',
      sourceUrl: 'https://indianexpress.com',
      listenTime: '2 MIN LISTEN',
      durationMinutes: '2 MIN',
    },

    // ================= 9. CLIMATE & ENERGY (4+ stories) =================
    {
      id: 'climate-energy-1',
      nicheId: 'climate-energy',
      category: 'CLIMATE & ENERGY',
      categoryBg: 'bg-[#142d1f]',
      categoryText: 'text-[#86efac]',
      title: 'India surpasses 200GW clean renewable energy milestone.',
      snippet: 'Record-speed expansion of hybrid solar and offshore wind drives nationwide clean transition.',
      source: 'THE HINDU',
      sourceUrl: 'https://thehindu.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },
    {
      id: 'climate-energy-2',
      nicheId: 'climate-energy',
      category: 'CLIMATE & ENERGY',
      categoryBg: 'bg-[#142d1f]',
      categoryText: 'text-[#86efac]',
      title: 'Sodium-ion grid battery enters commercial utility-scale deployment.',
      snippet: 'Abundant salt-based chemistry eliminates rare lithium dependencies with superior thermal stability in extreme climates.',
      source: 'BLOOMBERG GREEN',
      sourceUrl: 'https://bloomberg.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },
    {
      id: 'climate-energy-3',
      nicheId: 'climate-energy',
      category: 'CLIMATE & ENERGY',
      categoryBg: 'bg-[#142d1f]',
      categoryText: 'text-[#86efac]',
      title: 'National Green Hydrogen mission awards $2.4B production electrolyzer incentives.',
      snippet: 'Domestic chemical plants and green steel foundries sign 15-year purchase agreements for zero-carbon feedstock.',
      source: 'ECONOMIC TIMES',
      sourceUrl: 'https://economictimes.indiatimes.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },
    {
      id: 'climate-energy-4',
      nicheId: 'climate-energy',
      category: 'CLIMATE & ENERGY',
      categoryBg: 'bg-[#142d1f]',
      categoryText: 'text-[#86efac]',
      title: 'Floating offshore wind turbines demonstrate resilience through tropical storms.',
      snippet: 'Deepwater tension-leg platforms generate steady baseline electricity during high-wind coastal monsoons.',
      source: 'REUTERS',
      sourceUrl: 'https://reuters.com',
      listenTime: '2 MIN LISTEN',
      durationMinutes: '2 MIN',
    },

    // ================= 10. SPORTS (4+ stories) =================
    {
      id: 'sports-1',
      nicheId: 'sports',
      category: 'SPORTS',
      categoryBg: 'bg-[#281a18]',
      categoryText: 'text-[#f87171]',
      title: 'BCCI launches AI-powered biomechanics analytics center in Bengaluru.',
      snippet: 'Motion tracking and neural workload models integrated into elite squad preparation.',
      source: 'ESPN CRICINFO',
      sourceUrl: 'https://espncricinfo.com',
      listenTime: '2 MIN LISTEN',
      durationMinutes: '2 MIN',
    },
    {
      id: 'sports-2',
      nicheId: 'sports',
      category: 'SPORTS',
      categoryBg: 'bg-[#281a18]',
      categoryText: 'text-[#f87171]',
      title: 'Indian badminton contingent storms into World Super Series Championship finals.',
      snippet: 'Dominant straight-set victories in men’s and mixed doubles propel national seeds into Olympic medal contention.',
      source: 'HINDUSTAN TIMES',
      sourceUrl: 'https://hindustantimes.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },
    {
      id: 'sports-3',
      nicheId: 'sports',
      category: 'SPORTS',
      categoryBg: 'bg-[#281a18]',
      categoryText: 'text-[#f87171]',
      title: 'Formula 1 mandates 100% sustainable advanced synthetic e-fuels for 2026.',
      snippet: 'Turbo-hybrid power units achieve net-zero direct carbon output while sustaining 1,000+ horsepower racing output.',
      source: 'AUTOSPORT',
      sourceUrl: 'https://autosport.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },
    {
      id: 'sports-4',
      nicheId: 'sports',
      category: 'SPORTS',
      categoryBg: 'bg-[#281a18]',
      categoryText: 'text-[#f87171]',
      title: 'National High-Altitude Sports Institute opens in Ladakh for Olympic athletes.',
      snippet: 'Hypoxic training suites and biometric recovery pods prepare track, marathon, and combat athletes for world tournaments.',
      source: 'THE TRIBUNE',
      sourceUrl: 'https://tribuneindia.com',
      listenTime: '2 MIN LISTEN',
      durationMinutes: '2 MIN',
    },

    // ================= 11. CULTURE & ARTS (4+ stories) =================
    {
      id: 'culture-arts-1',
      nicheId: 'culture-arts',
      category: 'CULTURE',
      categoryBg: 'bg-[#2a1c35]',
      categoryText: 'text-[#c084fc]',
      title: 'National digital museum opens 4K archive of ancient Indian manuscripts.',
      snippet: 'Over 100,000 historical documents restored and published for international AI research.',
      source: 'BBC CULTURE',
      sourceUrl: 'https://bbc.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },
    {
      id: 'culture-arts-2',
      nicheId: 'culture-arts',
      category: 'CULTURE',
      categoryBg: 'bg-[#2a1c35]',
      categoryText: 'text-[#c084fc]',
      title: 'Jaipur Literature Festival hosts international symposium on vernacular storytelling.',
      snippet: 'Authors and linguists explore preservation of endangered tribal folklore using multimodal generative translation.',
      source: 'SCROLL.IN',
      sourceUrl: 'https://scroll.in',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },
    {
      id: 'culture-arts-3',
      nicheId: 'culture-arts',
      category: 'CULTURE',
      categoryBg: 'bg-[#2a1c35]',
      categoryText: 'text-[#c084fc]',
      title: 'UNESCO confers World Heritage status on Hoysala sacred temple ensembles.',
      snippet: 'Intricate soapstone architecture and 12th-century geometric stone reliefs recognized for exceptional universal value.',
      source: 'THE HINDU',
      sourceUrl: 'https://thehindu.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },
    {
      id: 'culture-arts-4',
      nicheId: 'culture-arts',
      category: 'CULTURE',
      categoryBg: 'bg-[#2a1c35]',
      categoryText: 'text-[#c084fc]',
      title: 'Indian independent film wins Grand Jury Prize at Venice International Film Festival.',
      snippet: 'Directorial debut celebrated for evocative rural cinematography and authentic regional dialect performances.',
      source: 'VARIETY',
      sourceUrl: 'https://variety.com',
      listenTime: '2 MIN LISTEN',
      durationMinutes: '2 MIN',
    },

    // ================= 12. LEGAL & POLICY (4+ stories) =================
    {
      id: 'legal-policy-1',
      nicheId: 'legal-policy',
      category: 'LEGAL & POLICY',
      categoryBg: 'bg-[#1e293b]',
      categoryText: 'text-[#94a3b8]',
      title: 'Supreme Court implements cryptographic timestamping for court records.',
      snippet: 'Digital evidence authentication standard set to expedite commercial dispute hearings.',
      source: 'LIVE LAW',
      sourceUrl: 'https://livelaw.in',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },
    {
      id: 'legal-policy-2',
      nicheId: 'legal-policy',
      category: 'LEGAL & POLICY',
      categoryBg: 'bg-[#1e293b]',
      categoryText: 'text-[#94a3b8]',
      title: 'Government notifies rules for Digital Personal Data Protection Act.',
      snippet: 'Strict consent architectures and fiduciary penalty frameworks mandate end-to-end data encryption for web platforms.',
      source: 'BAR & BENCH',
      sourceUrl: 'https://barandbench.com',
      listenTime: '4 MIN LISTEN',
      durationMinutes: '4 MIN',
    },
    {
      id: 'legal-policy-3',
      nicheId: 'legal-policy',
      category: 'LEGAL & POLICY',
      categoryBg: 'bg-[#1e293b]',
      categoryText: 'text-[#94a3b8]',
      title: 'Competition Commission releases antitrust guidelines on algorithmic collusion.',
      snippet: 'Regulatory watchdog creates technical audit unit to detect automated dynamic pricing cartels among digital aggregators.',
      source: 'ECONOMIC TIMES',
      sourceUrl: 'https://economictimes.indiatimes.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },
    {
      id: 'legal-policy-4',
      nicheId: 'legal-policy',
      category: 'LEGAL & POLICY',
      categoryBg: 'bg-[#1e293b]',
      categoryText: 'text-[#94a3b8]',
      title: 'Law Commission recommends dedicated digital fast-track courts across metropolitan hubs.',
      snippet: 'AI-assisted transcript generation and virtual hearings targeted at slashing commercial contract case pendency by 60%.',
      source: 'INDIAN EXPRESS',
      sourceUrl: 'https://indianexpress.com',
      listenTime: '3 MIN LISTEN',
      durationMinutes: '3 MIN',
    },
  ],
  hi: [
    // ================= 1. AI & TECH (4+ stories in Hindi) =================
    {
      id: 'ai-tech-1',
      nicheId: 'ai-tech',
      category: 'AI & TECH',
      categoryBg: 'bg-[#231b38]',
      categoryText: 'text-[#a78bfa]',
      title: 'एंथ्रोपिक ने 2M-टोकन मेमोरी और नेटिव टूल्स के साथ क्लॉड 4.5 लॉन्च किया।',
      snippet: 'क्लॉड 4.5 में एंटरप्राइज ऑटोमेशन, रीयल-टाइम कोडिंग और अभूतपूर्व मेमोरी क्षमता का समावेश किया गया है।',
      source: 'द वर्ज',
      sourceUrl: 'https://theverge.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },
    {
      id: 'ai-tech-2',
      nicheId: 'ai-tech',
      category: 'AI & TECH',
      categoryBg: 'bg-[#231b38]',
      categoryText: 'text-[#a78bfa]',
      title: 'ओपनएआई ने ऑन-डिवाइस कंप्यूटिंग के लिए नया लाइटवेट मॉडल पेश किया।',
      snippet: 'उपभोक्ता उपकरणों पर बिना क्लाउड सर्वर पर डेटा भेजे 100 मिलीसेकंड से कम समय में उत्तर देने की क्षमता।',
      source: 'टेकक्रंच',
      sourceUrl: 'https://techcrunch.com',
      listenTime: '2 मिनट',
      durationMinutes: '2 मिनट',
    },
    {
      id: 'ai-tech-3',
      nicheId: 'ai-tech',
      category: 'AI & TECH',
      categoryBg: 'bg-[#231b38]',
      categoryText: 'text-[#a78bfa]',
      title: 'गूगल डीपमाइंड ने रोबोटिक सर्जरी नेविगेशन सिस्टम का सफल प्रदर्शन किया।',
      snippet: 'जटिल लेप्रोस्कोपिक ऑपरेशन्स में सब-मिलीमीटर सटीकता के साथ सर्जन को रियल-टाइम मार्गदर्शन।',
      source: 'वायर्ड',
      sourceUrl: 'https://wired.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },
    {
      id: 'ai-tech-4',
      nicheId: 'ai-tech',
      category: 'AI & TECH',
      categoryBg: 'bg-[#231b38]',
      categoryText: 'text-[#a78bfa]',
      title: 'एनवीडिया ने लिक्विड कूलिंग आर्किटेक्चर के साथ ब्लैकवेल अल्ट्रा जीपीयू तेज किया।',
      snippet: 'डेटा केंद्रों में ट्रिलियन-पैरामीटर एआई मॉडल के प्रशिक्षण में बिजली की खपत में 40% की कमी।',
      source: 'रॉयटर्स',
      sourceUrl: 'https://reuters.com',
      listenTime: '4 मिनट',
      durationMinutes: '4 मिनट',
    },

    // ================= 2. MARKETS (4+ stories in Hindi) =================
    {
      id: 'markets-1',
      nicheId: 'financial-markets',
      category: 'GLOBAL',
      categoryBg: 'bg-[#102d2d]',
      categoryText: 'text-[#2dd4bf]',
      title: 'फेडरल रिजर्व की बैठक में सितंबर की नीति में बदलाव के संकेत मिले।',
      snippet: 'अधिकारियों ने मुद्रास्फीति के लक्ष्य की ओर लौटने पर बढ़ते विश्वास को रेखांकित किया।',
      source: 'ब्लूमबर्ग',
      sourceUrl: 'https://bloomberg.com',
      listenTime: '2 मिनट',
      durationMinutes: '2 मिनट',
    },
    {
      id: 'markets-2',
      nicheId: 'financial-markets',
      category: 'MARKETS',
      categoryBg: 'bg-[#102d2d]',
      categoryText: 'text-[#2dd4bf]',
      title: 'सेंसेक्स ने छुआ नया रिकॉर्ड स्तर; ₹15,000 करोड़ का विदेशी पूंजी निवेश आया।',
      snippet: 'बैंकिंग और आईटी शेयरों में जोरदार खरीदारी से भारतीय शेयर बाजारों में ऐतिहासिक उछाल।',
      source: 'इकोनॉमिक टाइम्स',
      sourceUrl: 'https://economictimes.indiatimes.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },
    {
      id: 'markets-3',
      nicheId: 'financial-markets',
      category: 'MARKETS',
      categoryBg: 'bg-[#102d2d]',
      categoryText: 'text-[#2dd4bf]',
      title: 'आरबीआई ने रेपो दरें स्थिर रखीं; आर्थिक विकास अनुमान 7.2% किया।',
      snippet: 'मौद्रिक नीति समिति ने मजबूत घरेलू मांग के बीच संतुलित नीति का रुख जारी रखा।',
      source: 'मिंट',
      sourceUrl: 'https://livemint.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },
    {
      id: 'markets-4',
      nicheId: 'financial-markets',
      category: 'GLOBAL',
      categoryBg: 'bg-[#102d2d]',
      categoryText: 'text-[#2dd4bf]',
      title: 'यूरोपीय बॉन्ड प्रतिफल में गिरावट; ब्याज दरों में और कटौती की संभावना।',
      snippet: 'यूरोपीय सेंट्रल बैंक विनिर्माण उद्योग को गति देने के लिए मौद्रिक नीति को सरल बनाने की तैयारी में।',
      source: 'फाइनेंशियल टाइम्स',
      sourceUrl: 'https://ft.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },

    // ================= 3. INDIAN BUSINESS (4+ stories in Hindi) =================
    {
      id: 'indian-business-1',
      nicheId: 'indian-business',
      category: 'INDIAN BUSINESS',
      categoryBg: 'bg-[#291e14]',
      categoryText: 'text-[#fb923c]',
      title: 'टाटा इलेक्ट्रॉनिक्स ने गुजरात के धोलेरा में $14 अरब के सेमीकंडक्टर फैब का विस्तार किया।',
      snippet: 'घरेलू ऑटोमोबाइल और इलेक्ट्रॉनिक्स कंपनियों के लिए चिप उत्पादन की समय-सीमा में तेजी लाई गई।',
      source: 'इकोनॉमिक टाइम्स',
      sourceUrl: 'https://economictimes.indiatimes.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },
    {
      id: 'indian-business-2',
      nicheId: 'indian-business',
      category: 'INDIAN BUSINESS',
      categoryBg: 'bg-[#291e14]',
      categoryText: 'text-[#fb923c]',
      title: 'रिलायंस रिटेल ने 50 शहरों में स्वचालित सप्लाई चेन हब का विस्तार किया।',
      snippet: 'रोबोटिक सॉर्टिंग और अत्याधुनिक कोल्ड स्टोरेज से टियर-2 शहरों में डिलीवरी तेज।',
      source: 'बिजनेस स्टैंडर्ड',
      sourceUrl: 'https://business-standard.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },
    {
      id: 'indian-business-3',
      nicheId: 'indian-business',
      category: 'INDIAN BUSINESS',
      categoryBg: 'bg-[#291e14]',
      categoryText: 'text-[#fb923c]',
      title: 'अदाणी ग्रीन ने खावड़ा हाइब्रिड पार्क के लिए $750M का अंतरराष्ट्रीय ऋण हासिल किया।',
      snippet: 'दुनिया के सबसे बड़े सौर और पवन ऊर्जा संयंत्र के निर्माण के लिए वैश्विक बैंकों से मिला निवेश।',
      source: 'रॉयटर्स',
      sourceUrl: 'https://reuters.com',
      listenTime: '2 मिनट',
      durationMinutes: '2 मिनट',
    },
    {
      id: 'indian-business-4',
      nicheId: 'indian-business',
      category: 'INDIAN BUSINESS',
      categoryBg: 'bg-[#291e14]',
      categoryText: 'text-[#fb923c]',
      title: 'एलएंडटी को वेस्टर्न डेडिकेटेड फ्रेट कॉरिडोर का बड़ा इंफ्रास्ट्रक्चर प्रोजेक्ट मिला।',
      snippet: 'बंदरगाहों और भीतरी लॉजिस्टिक्स पार्कों के बीच मालगाड़ियों की रफ्तार दोगुनी होगी।',
      source: 'मिंट',
      sourceUrl: 'https://livemint.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },

    // ================= 4. STARTUPS (4+ stories in Hindi) =================
    {
      id: 'startups-1',
      nicheId: 'startups',
      category: 'STARTUPS',
      categoryBg: 'bg-[#132c23]',
      categoryText: 'text-[#34d399]',
      title: 'अदाणी एनर्जी ने फॉलो-ऑन ऑफरिंग में $1.2B जुटाए।',
      snippet: 'ग्रीन एनर्जी विंग ने मामूली छूट पर अपनी शेयर बिक्री को सफलतापूर्वक पूरा किया।',
      source: 'इकोनॉमिक टाइम्स',
      sourceUrl: 'https://economictimes.indiatimes.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },
    {
      id: 'startups-2',
      nicheId: 'startups',
      category: 'STARTUPS',
      categoryBg: 'bg-[#132c23]',
      categoryText: 'text-[#34d399]',
      title: 'भारतीय क्विक-कॉमर्स कंपनियों ने 40 नए टियर-2 शहरों में 10 मिनट डिलीवरी शुरू की।',
      snippet: 'छोटे शहरों में ऑनलाइन डिलीवरी की मांग में 140% की बढ़ोतरी के बाद नए डार्क स्टोर्स का जाल बिछाया जा रहा है।',
      source: 'टेकक्रंच',
      sourceUrl: 'https://techcrunch.com',
      listenTime: '2 मिनट',
      durationMinutes: '2 मिनट',
    },
    {
      id: 'startups-3',
      nicheId: 'startups',
      category: 'STARTUPS',
      categoryBg: 'bg-[#132c23]',
      categoryText: 'text-[#34d399]',
      title: 'बेंगलुरु के जनरेटिव एआई स्टार्टअप को एंटरप्राइज मॉडल्स के लिए $80M की फंडिंग।',
      snippet: 'कानूनी, वित्तीय और अनुपालन प्रक्रियाओं के लिए स्वदेशी एआई समाधानों की वैश्विक मांग।',
      source: 'इंक42',
      sourceUrl: 'https://inc42.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },
    {
      id: 'startups-4',
      nicheId: 'startups',
      category: 'STARTUPS',
      categoryBg: 'bg-[#132c23]',
      categoryText: 'text-[#34d399]',
      title: 'फिनटेक यूनिकॉर्न को एमएसएमई ऋण विस्तार के लिए पेमेंट एग्रीगेटर लाइसेंस प्राप्त।',
      snippet: 'छोटे व्यापारियों के लिए 60 सेकंड में कैश-फ्लो आधारित डिजिटल लोन स्वीकृत।',
      source: 'योरस्टोरी',
      sourceUrl: 'https://yourstory.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },

    // ================= 5. GLOBAL POLITICS (4+ stories in Hindi) =================
    {
      id: 'global-politics-1',
      nicheId: 'global-politics',
      category: 'POLITICS',
      categoryBg: 'bg-[#1f1d36]',
      categoryText: 'text-[#818cf8]',
      title: 'जिनेवा में वैश्विक व्यापार मंत्रियों की बैठक; डिजिटल कॉमर्स मानकों पर सहमति।',
      snippet: 'एआई संप्रभुता और सुरक्षित क्रॉस-बॉर्डर डिजिटल लेनदेन के लिए नए अंतरराष्ट्रीय नियम तैयार किए जा रहे हैं।',
      source: 'रॉयटर्स',
      sourceUrl: 'https://reuters.com',
      listenTime: '4 मिनट',
      durationMinutes: '4 मिनट',
    },
    {
      id: 'global-politics-2',
      nicheId: 'global-politics',
      category: 'POLITICS',
      categoryBg: 'bg-[#1f1d36]',
      categoryText: 'text-[#818cf8]',
      title: 'संयुक्त राष्ट्र महासभा में एआई नैतिकता पर ऐतिहासिक अंतरराष्ट्रीय संधि का मसौदा।',
      snippet: '120 से अधिक देशों ने स्वायत्त प्रणालियों के लिए मूलभूत सुरक्षा मानकों पर हस्ताक्षर किए।',
      source: 'बीबीसी',
      sourceUrl: 'https://bbc.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },
    {
      id: 'global-politics-3',
      nicheId: 'global-politics',
      category: 'POLITICS',
      categoryBg: 'bg-[#1f1d36]',
      categoryText: 'text-[#818cf8]',
      title: 'जी-20 देशों ने वैश्विक डिजिटल टैक्स पारदर्शिता नियमों को अंतिम रूप दिया।',
      snippet: 'बहुराष्ट्रीय तकनीकी कंपनियों के डिजिटल राजस्व पर समान कर व्यवस्था की ओर कदम।',
      source: 'फाइनेंशियल टाइम्स',
      sourceUrl: 'https://ft.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },
    {
      id: 'global-politics-4',
      nicheId: 'global-politics',
      category: 'POLITICS',
      categoryBg: 'bg-[#1f1d36]',
      categoryText: 'text-[#818cf8]',
      title: 'भारत और ब्रिटेन के बीच मुक्त व्यापार समझौता अंतिम हस्ताक्षर के चरण में।',
      snippet: 'इंजीनियरिंग निर्यात और सेवा क्षेत्र के पेशेवरों के लिए नए अवसर खुलेंगे।',
      source: 'द हिंदू',
      sourceUrl: 'https://thehindu.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },

    // ================= 6. SCIENCE (4+ stories in Hindi) =================
    {
      id: 'science-1',
      nicheId: 'science',
      category: 'SCIENCE',
      categoryBg: 'bg-[#1e1b4b]',
      categoryText: 'text-[#93c5fd]',
      title: 'इसरो ने भारतीय अंतरिक्ष स्टेशन के अगले चरण के मॉड्यूल का रोडमैप जारी किया।',
      snippet: 'स्वदेशी लाइफ सपोर्ट सिस्टम और अत्याधुनिक मॉड्यूल के साथ भारतीय स्पेस स्टेशन की तैयारी तेज।',
      source: 'रॉयटर्स',
      sourceUrl: 'https://reuters.com',
      listenTime: '2 मिनट',
      durationMinutes: '2 मिनट',
    },
    {
      id: 'science-2',
      nicheId: 'science',
      category: 'SCIENCE',
      categoryBg: 'bg-[#1e1b4b]',
      categoryText: 'text-[#93c5fd]',
      title: 'जेम्स वेब टेलीस्कोप ने ब्रह्मांड के आरंभिक काल की विशाल आकाशगंगा खोजी।',
      snippet: 'बिग बैंग के मात्र 30 करोड़ वर्ष बाद बने तारों के विशाल समूह का पहला स्पष्ट स्पेक्ट्रा प्राप्त।',
      source: 'नेचर',
      sourceUrl: 'https://nature.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },
    {
      id: 'science-3',
      nicheId: 'science',
      category: 'SCIENCE',
      categoryBg: 'bg-[#1e1b4b]',
      categoryText: 'text-[#93c5fd]',
      title: 'क्वांटम कंप्यूटिंग में 99.9% एरर-करेक्शन सटीकता का नया कीर्तिमान स्थापित।',
      snippet: 'त्रुटिहीन क्वांटम सिमुलेशन से नई दवाओं और सामग्रियों की खोज में क्रांतिकारी प्रगति संभव।',
      source: 'एमआईटी टेक रिव्यू',
      sourceUrl: 'https://technologyreview.com',
      listenTime: '4 मिनट',
      durationMinutes: '4 मिनट',
    },
    {
      id: 'science-4',
      nicheId: 'science',
      category: 'SCIENCE',
      categoryBg: 'bg-[#1e1b4b]',
      categoryText: 'text-[#93c5fd]',
      title: 'भारत के गहरे समुद्र मिशन मत्स्य 6000 ने उथले जल परीक्षण सफलतापूर्वक पूरे किए।',
      snippet: '6,000 मीटर की गहराई पर दुर्लभ खनिजों और जीवों के अध्ययन के लिए भारत की पनडुब्बी तैयार।',
      source: 'द हिंदू',
      sourceUrl: 'https://thehindu.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },

    // ================= 7. GEOPOLITICS (4+ stories in Hindi) =================
    {
      id: 'geopolitics-1',
      nicheId: 'geopolitics',
      category: 'GEOPOLITICS',
      categoryBg: 'bg-[#2d1b28]',
      categoryText: 'text-[#f472b6]',
      title: 'भारत-मध्य पूर्व-यूरोप आर्थिक गलियारे में हरित समुद्री मार्गों का विस्तार।',
      snippet: 'मुंबई और यूरोपीय बंदरगाहों के बीच माल ढुलाई समय में 40% की कमी लाने के लिए डिजिटल कस्टम्स शुरू।',
      source: 'फाइनेंशियल टाइम्स',
      sourceUrl: 'https://ft.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },
    {
      id: 'geopolitics-2',
      nicheId: 'geopolitics',
      category: 'GEOPOLITICS',
      categoryBg: 'bg-[#2d1b28]',
      categoryText: 'text-[#f472b6]',
      title: 'क्वाड समुद्री पहल ने हिंद-प्रशांत क्षेत्र में उपग्रह निगरानी प्रणाली बढ़ाई।',
      snippet: 'अवैध मछली पकड़ने और गुप्त जहाजों की गतिविधियों पर रियल-टाइम निगरानी की साझा व्यवस्था।',
      source: 'रॉयटर्स',
      sourceUrl: 'https://reuters.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },
    {
      id: 'geopolitics-3',
      nicheId: 'geopolitics',
      category: 'GEOPOLITICS',
      categoryBg: 'bg-[#2d1b28]',
      categoryText: 'text-[#f472b6]',
      title: 'ब्रिक्स शिखर सम्मेलन में स्थानीय मुद्रा भुगतान प्रणाली पर व्यापक सहमति।',
      snippet: 'कच्चे तेल और उर्वरकों के द्विपक्षीय व्यापार के लिए डॉलर-मुक्त डिजिटल सेटलमेंट शुरू।',
      source: 'ब्लूमबर्ग',
      sourceUrl: 'https://bloomberg.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },
    {
      id: 'geopolitics-4',
      nicheId: 'geopolitics',
      category: 'GEOPOLITICS',
      categoryBg: 'bg-[#2d1b28]',
      categoryText: 'text-[#f472b6]',
      title: 'उत्तरी समुद्री मार्ग पर मालवाहक जहाजों के आवागमन में नया रिकॉर्ड।',
      snippet: 'एशिया और यूरोप के बीच छोटे समुद्री रास्तों का उपयोग करने वाले जहाजों की संख्या में वृद्धि।',
      source: 'वॉल स्ट्रीट जर्नल',
      sourceUrl: 'https://wsj.com',
      listenTime: '4 मिनट',
      durationMinutes: '4 मिनट',
    },

    // ================= 8. HEALTH & MEDICINE (4+ stories in Hindi) =================
    {
      id: 'health-medicine-1',
      nicheId: 'health-medicine',
      category: 'HEALTH & MEDICINE',
      categoryBg: 'bg-[#1a2e26]',
      categoryText: 'text-[#4ade80]',
      title: 'एमआरएनए थेरेपी के क्लिनिकल ट्रायल में ऑटोइम्यून बीमारियों के उपचार में बड़ी सफलता।',
      snippet: 'नई बायो-टारगेटेड तकनीक ने सामान्य प्रतिरक्षा तंत्र को सुरक्षित रखते हुए सूजन समाप्त की।',
      source: 'नेचर',
      sourceUrl: 'https://nature.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },
    {
      id: 'health-medicine-2',
      nicheId: 'health-medicine',
      category: 'HEALTH & MEDICINE',
      categoryBg: 'bg-[#1a2e26]',
      categoryText: 'text-[#4ade80]',
      title: 'एआई-निर्देशित लिक्विड बायोप्सी ने 96% सटीकता से प्रारंभिक चरण के कैंसर का पता लगाया।',
      snippet: 'साधारण रक्त परीक्षण के माध्यम से ट्यूमर डीएनए की समय रहते पहचान संभव।',
      source: 'द लैंसेट',
      sourceUrl: 'https://thelancet.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },
    {
      id: 'health-medicine-3',
      nicheId: 'health-medicine',
      category: 'HEALTH & MEDICINE',
      categoryBg: 'bg-[#1a2e26]',
      categoryText: 'text-[#4ade80]',
      title: 'सिकल-सेल विकारों के लिए क्रिस्पर जीन-एडिटिंग थेरेपी को मिली स्वीकृति।',
      snippet: 'एक बार के उपचार से स्वस्थ हीमोग्लोबिन का उत्पादन पुनः सक्रिय।',
      source: 'न्यू साइंटिस्ट',
      sourceUrl: 'https://newscientist.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },
    {
      id: 'health-medicine-4',
      nicheId: 'health-medicine',
      category: 'HEALTH & MEDICINE',
      categoryBg: 'bg-[#1a2e26]',
      categoryText: 'text-[#4ade80]',
      title: 'आईसीएमआर ने डेंगू के स्वदेशी टीके के चरण-3 क्लिनिकल परीक्षण शुरू किए।',
      snippet: 'चारों प्रकार के डेंगू वायरस के खिलाफ अत्यधिक प्रभावी एंटीबॉडी तैयार करने में सफल।',
      source: 'इंडियन एक्सप्रेस',
      sourceUrl: 'https://indianexpress.com',
      listenTime: '2 मिनट',
      durationMinutes: '2 मिनट',
    },

    // ================= 9. CLIMATE & ENERGY (4+ stories in Hindi) =================
    {
      id: 'climate-energy-1',
      nicheId: 'climate-energy',
      category: 'CLIMATE & ENERGY',
      categoryBg: 'bg-[#142d1f]',
      categoryText: 'text-[#86efac]',
      title: 'भारत ने तय समय से पहले 200 गीगावाट स्वच्छ नवीकरणीय ऊर्जा का लक्ष्य हासिल किया।',
      snippet: 'राजस्थान के सोलर पार्क्स और तमिलनाडु के पवन ऊर्जा प्रोजेक्ट्स के दम पर ऐतिहासिक उपलब्धि।',
      source: 'द हिंदू',
      sourceUrl: 'https://thehindu.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },
    {
      id: 'climate-energy-2',
      nicheId: 'climate-energy',
      category: 'CLIMATE & ENERGY',
      categoryBg: 'bg-[#142d1f]',
      categoryText: 'text-[#86efac]',
      title: 'सोडियम-आयन बैटरी ग्रिड स्टोरेज के लिए व्यावसायिक स्तर पर तैनात।',
      snippet: 'सस्ता नमक आधारित विकल्प लिथियम की निर्भरता घटाने और अधिक सुरक्षा देने में सक्षम।',
      source: 'ब्लूमबर्ग ग्रीन',
      sourceUrl: 'https://bloomberg.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },
    {
      id: 'climate-energy-3',
      nicheId: 'climate-energy',
      category: 'CLIMATE & ENERGY',
      categoryBg: 'bg-[#142d1f]',
      categoryText: 'text-[#86efac]',
      title: 'राष्ट्रीय ग्रीन हाइड्रोजन मिशन ने $2.4B के इलेक्ट्रोलाइजर प्रोत्साहन स्वीकृत किए।',
      snippet: 'रासायनिक और हरित इस्पात कारखानों ने शून्य-उत्सर्जन ईंधन के लिए दीर्घकालिक समझौते किए।',
      source: 'इकोनॉमिक टाइम्स',
      sourceUrl: 'https://economictimes.indiatimes.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },
    {
      id: 'climate-energy-4',
      nicheId: 'climate-energy',
      category: 'CLIMATE & ENERGY',
      categoryBg: 'bg-[#142d1f]',
      categoryText: 'text-[#86efac]',
      title: 'समुद्री तूफानों के बीच तैरती पवन टर्बाइनों ने बिजली उत्पादन का रिकॉर्ड बनाया।',
      snippet: 'गहरे समुद्र के प्लेटफॉर्म्स ने मानसूनी हवाओं में भी निर्बाध बिजली आपूर्ति की।',
      source: 'रॉयटर्स',
      sourceUrl: 'https://reuters.com',
      listenTime: '2 मिनट',
      durationMinutes: '2 मिनट',
    },

    // ================= 10. SPORTS (4+ stories in Hindi) =================
    {
      id: 'sports-1',
      nicheId: 'sports',
      category: 'SPORTS',
      categoryBg: 'bg-[#281a18]',
      categoryText: 'text-[#f87171]',
      title: 'बेंगलुरु में भारतीय क्रिकेट टीम के लिए अत्याधुनिक एआई एनालिटिक्स सेंटर शुरू।',
      snippet: 'खिलाड़ियों की फिटनेस और चोटों से बचाव के लिए मोशन-कैप्चर और बायोमेट्रिक तकनीक का उपयोग।',
      source: 'क्रिकइन्फो',
      sourceUrl: 'https://espncricinfo.com',
      listenTime: '2 मिनट',
      durationMinutes: '2 मिनट',
    },
    {
      id: 'sports-2',
      nicheId: 'sports',
      category: 'SPORTS',
      categoryBg: 'bg-[#281a18]',
      categoryText: 'text-[#f87171]',
      title: 'भारतीय बैडमिंटन खिलाड़ी विश्व सुपर सीरीज चैंपियनशिप के फाइनल में पहुंचे।',
      snippet: 'पुरुष और मिश्रित युगल में लगातार सेटों में जीत दर्ज कर ओलंपिक पदक की दावेदारी मजबूत।',
      source: 'हिंदुस्तान टाइम्स',
      sourceUrl: 'https://hindustantimes.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },
    {
      id: 'sports-3',
      nicheId: 'sports',
      category: 'SPORTS',
      categoryBg: 'bg-[#281a18]',
      categoryText: 'text-[#f87171]',
      title: 'फॉर्मूला 1 ने 2026 से 100% संधारणीय सिंथेटिक ई-ईंधन अनिवार्य किया।',
      snippet: 'रेसिंग कारों के शक्तिशाली टर्बो इंजन अब पर्यावरण को बिना नुकसान पहुंचाए दौड़ेंगे।',
      source: 'ऑटोस्पोर्ट',
      sourceUrl: 'https://autosport.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },
    {
      id: 'sports-4',
      nicheId: 'sports',
      category: 'SPORTS',
      categoryBg: 'bg-[#281a18]',
      categoryText: 'text-[#f87171]',
      title: 'लद्दाख में ओलंपिक एथलीटों के लिए राष्ट्रीय उच्च-ऊंचाई खेल संस्थान का उद्घाटन।',
      snippet: 'कठिन प्राकृतिक परिस्थितियों में एथलीटों के स्टैमिना और रिकवरी को बढ़ाने की विशेष सुविधा।',
      source: 'द ट्रिब्यून',
      sourceUrl: 'https://tribuneindia.com',
      listenTime: '2 मिनट',
      durationMinutes: '2 मिनट',
    },

    // ================= 11. CULTURE & ARTS (4+ stories in Hindi) =================
    {
      id: 'culture-arts-1',
      nicheId: 'culture-arts',
      category: 'CULTURE',
      categoryBg: 'bg-[#2a1c35]',
      categoryText: 'text-[#c084fc]',
      title: 'प्राचीन भारतीय पांडुलिपियों के डिजिटलाइजेशन के लिए 4K डिजिटल आर्काइव का लोकार्पण।',
      snippet: '1 लाख से अधिक दुर्लभ पांडुलिपियों का एआई अनुवाद और वैश्विक शोध के लिए संग्रह तैयार।',
      source: 'बीबीसी',
      sourceUrl: 'https://bbc.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },
    {
      id: 'culture-arts-2',
      nicheId: 'culture-arts',
      category: 'CULTURE',
      categoryBg: 'bg-[#2a1c35]',
      categoryText: 'text-[#c084fc]',
      title: 'जयपुर लिटरेचर फेस्टिवल में क्षेत्रीय लोक साहित्य के संरक्षण पर विचार-विमर्श।',
      snippet: 'एआई अनुवाद तकनीक के माध्यम से लुप्तप्राय आदिवासी बोलियों और कहानियों के दस्तावेजीकरण की योजना।',
      source: 'स्क्रोल.इन',
      sourceUrl: 'https://scroll.in',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },
    {
      id: 'culture-arts-3',
      nicheId: 'culture-arts',
      category: 'CULTURE',
      categoryBg: 'bg-[#2a1c35]',
      categoryText: 'text-[#c084fc]',
      title: 'यूनेस्को ने होयसला के पवित्र मंदिर समूहों को विश्व धरोहर स्थल घोषित किया।',
      snippet: '12वीं सदी की नक्काशीदार सोपस्टोन वास्तुकला को वैश्विक सांस्कृतिक धरोहर की मान्यता।',
      source: 'द हिंदू',
      sourceUrl: 'https://thehindu.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },
    {
      id: 'culture-arts-4',
      nicheId: 'culture-arts',
      category: 'CULTURE',
      categoryBg: 'bg-[#2a1c35]',
      categoryText: 'text-[#c084fc]',
      title: 'भारतीय स्वतंत्र फिल्म ने वेनिस अंतरराष्ट्रीय फिल्म समारोह में शीर्ष पुरस्कार जीता।',
      snippet: 'ग्रामीण जीवन के यथार्थवादी चित्रण और उत्कृष्ट क्षेत्रीय अभिनय के लिए अंतरराष्ट्रीय प्रशंसा।',
      source: 'वैरायटी',
      sourceUrl: 'https://variety.com',
      listenTime: '2 मिनट',
      durationMinutes: '2 मिनट',
    },

    // ================= 12. LEGAL & POLICY (4+ stories in Hindi) =================
    {
      id: 'legal-policy-1',
      nicheId: 'legal-policy',
      category: 'LEGAL & POLICY',
      categoryBg: 'bg-[#1e293b]',
      categoryText: 'text-[#94a3b8]',
      title: 'सुप्रीम कोर्ट ने अदालतों में डिजिटल साक्ष्यों के प्रमाणीकरण के नए मानक तय किए।',
      snippet: 'क्रिप्टोग्राफिक टाइमस्टैम्पिंग से वाणिज्यिक मुकदमों के शीघ्र निपटारे का रास्ता साफ हुआ।',
      source: 'लाइव लॉ',
      sourceUrl: 'https://livelaw.in',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },
    {
      id: 'legal-policy-2',
      nicheId: 'legal-policy',
      category: 'LEGAL & POLICY',
      categoryBg: 'bg-[#1e293b]',
      categoryText: 'text-[#94a3b8]',
      title: 'सरकार ने डिजिटल पर्सनल डेटा प्रोटेक्शन एक्ट के नियमों को अधिसूचित किया।',
      snippet: 'उपभोक्ताओं की सहमति और डेटा सुरक्षा के उल्लंघन पर भारी जुर्माने का कड़ा प्रावधान।',
      source: 'बार एंड बेंच',
      sourceUrl: 'https://barandbench.com',
      listenTime: '4 मिनट',
      durationMinutes: '4 मिनट',
    },
    {
      id: 'legal-policy-3',
      nicheId: 'legal-policy',
      category: 'LEGAL & POLICY',
      categoryBg: 'bg-[#1e293b]',
      categoryText: 'text-[#94a3b8]',
      title: 'भारतीय प्रतिस्पर्धा आयोग ने एल्गोरिद्मिक मूल्य निर्धारण पर दिशा-निर्देश जारी किए।',
      snippet: 'डिजिटल प्लेटफॉर्मों पर अनुचित मूल्य वृद्धि और साठगांठ रोकने के लिए तकनीकी जांच इकाई गठित।',
      source: 'इकोनॉमिक टाइम्स',
      sourceUrl: 'https://economictimes.indiatimes.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },
    {
      id: 'legal-policy-4',
      nicheId: 'legal-policy',
      category: 'LEGAL & POLICY',
      categoryBg: 'bg-[#1e293b]',
      categoryText: 'text-[#94a3b8]',
      title: 'विधि आयोग ने प्रमुख शहरों में समर्पित डिजिटल वाणिज्यिक अदालतें बनाने की सिफारिश की।',
      snippet: 'एआई-आधारित ट्रांसक्रिप्ट और वर्चुअल सुनवाई से वाणिज्यिक मामलों के त्वरित निपटान का लक्ष्य।',
      source: 'इंडियन एक्सप्रेस',
      sourceUrl: 'https://indianexpress.com',
      listenTime: '3 मिनट',
      durationMinutes: '3 मिनट',
    },
  ]
};

const SPEED_OPTIONS = ['1x', '1.25x', '1.5x', '2x'];

export default function FeedScreen({ onEditNiches }) {
  const { user, logout } = useAuth();
  const { language, selectLanguage } = useLanguage();
  const { selectedNiches, availableNiches, resetNichesOnboarding } = useNiches();
  const { bookmarks, isBookmarked, toggleBookmark, removeBookmark, isSyncing: isBookmarkSyncing } = useBookmarks();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  // UI State: 'stream' (Discover List) vs 'player' (Now Playing Screen)
  const [viewMode, setViewMode] = useState('stream'); 
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(0);
  const [currentAudioSeconds, setCurrentAudioSeconds] = useState(0);
  const [availableVoices, setAvailableVoices] = useState([]);

  // Live News from NewsData.io API state
  const [liveArticles, setLiveArticles] = useState([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLiveApi, setIsLiveApi] = useState(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState(null);

  // Modals & Panels
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showEditNichesModal, setShowEditNichesModal] = useState(false);
  const [showSavedModal, setShowSavedModal] = useState(false);
  const [tempSelectedNiches, setTempSelectedNiches] = useState([]);
  const [isSavingNiches, setIsSavingNiches] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchApiResults, setSearchApiResults] = useState([]);
  const [isSearchingApi, setIsSearchingApi] = useState(false);

  // Horizontal category tabs derived from user's active niches
  const categoriesList = [
    'All',
    ...selectedNiches.map(id => {
      const match = availableNiches.find(n => n.id === id);
      return match ? match.category : id;
    })
  ];

  const handleOpenEditNiches = () => {
    setTempSelectedNiches([...selectedNiches]);
    setShowSettingsModal(false);
    setShowEditNichesModal(true);
  };

  const toggleTempNiche = (nicheId) => {
    setTempSelectedNiches((prev) => {
      if (prev.includes(nicheId)) {
        if (prev.length <= 1) return prev; // keep at least 1
        return prev.filter((id) => id !== nicheId);
      } else {
        if (prev.length >= 7) return prev; // max 7
        return [...prev, nicheId];
      }
    });
  };

  const handleSaveNiches = async () => {
    setIsSavingNiches(true);
    try {
      await confirmNiches(tempSelectedNiches);
      setShowEditNichesModal(false);
      setSelectedCategory('All');
      setCurrentStoryIndex(0);
      setTimeout(() => {
        fetchLiveNews(true);
      }, 50);
    } catch (err) {
      console.error('Error saving niches:', err);
    } finally {
      setIsSavingNiches(false);
    }
  };

  // Fetch Live News from NewsData.io Backend API
  const fetchLiveNews = useCallback(async (isManual = false) => {
    if (isManual) {
      setIsRefreshing(true);
    } else {
      setIsLoadingNews(true);
    }

    try {
      let nicheParam = '';
      if (selectedCategory !== 'All') {
        const match = availableNiches.find(n => n.category.toLowerCase() === selectedCategory.toLowerCase());
        if (match) nicheParam = match.id;
      }

      const params = new URLSearchParams();
      params.append('language', language === 'hi' ? 'hi' : 'en');
      if (nicheParam) params.append('niche', nicheParam);
      if (isManual) params.append('refresh', 'true');

      const response = await fetch(`${BACKEND_URL}/api/news?${params.toString()}`);
      const data = await response.json();

      if (response.ok && data.success && Array.isArray(data.articles) && data.articles.length > 0) {
        setLiveArticles(data.articles);
        setIsLiveApi(true);
        setLastRefreshedAt(new Date());
      }
    } catch (err) {
      console.warn('Could not fetch live news API, using curated fallback:', err);
    } finally {
      setIsLoadingNews(false);
      setIsRefreshing(false);
    }
  }, [language, selectedCategory, availableNiches, BACKEND_URL]);

  // Fallback curated news if offline or initial
  const fallbackStories = language === 'hi' ? LIVE_NEWS_DATABASE.hi : LIVE_NEWS_DATABASE.en;
  const allStories = liveArticles.length > 0 ? liveArticles : fallbackStories;

  // Filter stories strictly based on user's selected niches if using fallback
  const userNicheStories = liveArticles.length > 0
    ? liveArticles
    : allStories.filter((story) => selectedNiches.length === 0 || selectedNiches.includes(story.nicheId));
  const displayStories = userNicheStories.length > 0 ? userNicheStories : allStories;

  // Fetch live news on mount & when category or language changes
  useEffect(() => {
    fetchLiveNews(false);
  }, [fetchLiveNews]);

  // Load and listen for system / browser voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        setAvailableVoices(voices);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Automatic voice selector matching the selected language
  const getAutoVoice = () => {
    if (!availableVoices || availableVoices.length === 0) return null;

    if (language === 'hi') {
      // 1. Direct Hindi speech voice match
      const hindiVoice = availableVoices.find(v => 
        v.lang.toLowerCase().includes('hi') || v.lang.toLowerCase().includes('hin')
      );
      if (hindiVoice) return hindiVoice;

      // 2. Indian region fallback
      const indianVoice = availableVoices.find(v => v.lang.toLowerCase().includes('in'));
      if (indianVoice) return indianVoice;

      return null;
    }

    // Default English: match high-clarity natural or standard English voices
    const englishVoices = availableVoices.filter(v => v.lang.toLowerCase().startsWith('en'));
    if (englishVoices.length === 0) return availableVoices[0] || null;

    const naturalMale = englishVoices.find(v => 
      (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Online')) &&
      (v.name.toLowerCase().includes('guy') || v.name.toLowerCase().includes('christopher') || v.name.toLowerCase().includes('eric') || v.name.toLowerCase().includes('ryan') || v.name.toLowerCase().includes('george') || v.name.toLowerCase().includes('male'))
    );
    if (naturalMale) return naturalMale;

    const googleMale = englishVoices.find(v => 
      v.name.toLowerCase().includes('google') && 
      (v.name.toLowerCase().includes('uk english male') || v.name.toLowerCase().includes('us english') || v.name.toLowerCase().includes('male'))
    );
    if (googleMale) return googleMale;

    const desktopMale = englishVoices.find(v => 
      v.name.toLowerCase().includes('david') || 
      v.name.toLowerCase().includes('mark') || 
      v.name.toLowerCase().includes('george') || 
      v.name.toLowerCase().includes('alex') || 
      v.name.toLowerCase().includes('daniel') || 
      v.name.toLowerCase().includes('oliver') ||
      v.name.toLowerCase().includes('tom') ||
      v.name.toLowerCase().includes('fred')
    );
    if (desktopMale) return desktopMale;

    return englishVoices[0] || availableVoices[0] || null;
  };

  const activeVoice = getAutoVoice();

  // Duration Calculator in Seconds
  const getStoryDurationSeconds = (story) => {
    if (!story) return 180;
    if (story.durationMinutes) {
      const mins = parseInt(story.durationMinutes, 10);
      if (!isNaN(mins) && mins > 0) return mins * 60;
    }
    if (story.listenTime) {
      const mins = parseInt(story.listenTime, 10);
      if (!isNaN(mins) && mins > 0) return mins * 60;
    }
    return 180;
  };

  // Formatter mm:ss
  const formatTime = (totalSeconds) => {
    if (isNaN(totalSeconds) || totalSeconds < 0) totalSeconds = 0;
    const mins = Math.floor(totalSeconds / 60);
    const secs = Math.floor(totalSeconds % 60);
    const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
    const formattedSecs = secs < 10 ? `0${secs}` : `${secs}`;
    return `${formattedMins}:${formattedSecs}`;
  };

  // Filtered stories for active category tab
  const filteredStories = displayStories.filter((story) => {
    if (selectedCategory === 'All') return true;
    const catLower = selectedCategory.toLowerCase();
    const nicheMatch = availableNiches.find(n => n.category.toLowerCase() === catLower);
    if (nicheMatch && story.nicheId === nicheMatch.id) return true;
    return story.category.toLowerCase().includes(catLower);
  });

  const currentStory = filteredStories[currentStoryIndex] || filteredStories[0] || displayStories[0];
  const totalStorySeconds = getStoryDurationSeconds(currentStory);
  const progressPercent = totalStorySeconds > 0 
    ? Math.min(100, Math.max(0, (currentAudioSeconds / totalStorySeconds) * 100))
    : 0;

  const elapsedTimeFormatted = formatTime(currentAudioSeconds);
  const remainingTimeFormatted = `-${formatTime(Math.max(0, totalStorySeconds - currentAudioSeconds))}`;

  // Total Digest Duration across stories
  const totalDigestSeconds = filteredStories.reduce((sum, s) => sum + getStoryDurationSeconds(s), 0);
  const totalDigestMinutesFormatted = formatTime(totalDigestSeconds);

  // Synchronized second timer tracking actual audio progress with playback rate
  useEffect(() => {
    let interval;
    if (isPlaying) {
      const speedMultiplier = speedIndex === 0 ? 1 : speedIndex === 1 ? 1.25 : speedIndex === 2 ? 1.5 : 2;
      interval = setInterval(() => {
        setCurrentAudioSeconds((prev) => {
          const next = prev + 1;
          if (next >= totalStorySeconds) {
            if (currentStoryIndex < filteredStories.length - 1) {
              setCurrentStoryIndex((p) => p + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return 0;
            }
          }
          return next;
        });
      }, 1000 / speedMultiplier);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalStorySeconds, speedIndex, currentStoryIndex, filteredStories.length]);

  // Reset audio seconds on story switch
  useEffect(() => {
    setCurrentAudioSeconds(0);
  }, [currentStoryIndex]);

  // Speech synthesis audio playback (Crystal Clear Natural Enunciation)
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isPlaying && currentStory) {
      window.speechSynthesis.cancel();

      // Clean punctuation formatting for crisp, understandable pauses
      const cleanTitle = currentStory.title.trim().replace(/\.$/, '');
      const cleanSnippet = currentStory.snippet.trim();
      const textToSpeak = `${cleanTitle}. ... ${cleanSnippet}`;

      const utterance = new SpeechSynthesisUtterance(textToSpeak);

      // Calibrated news anchor pacing for maximum clarity and comprehension
      const baseRate = language === 'hi' ? 0.95 : 0.90;
      const speedMultiplier = speedIndex === 0 ? 1 : speedIndex === 1 ? 1.25 : speedIndex === 2 ? 1.5 : 2;
      utterance.rate = baseRate * speedMultiplier;
      utterance.pitch = 0.98; // Balanced, natural baritone tone
      utterance.volume = 1.0;

      if (activeVoice) {
        utterance.voice = activeVoice;
        utterance.lang = activeVoice.lang || (language === 'hi' ? 'hi-IN' : 'en-US');
      } else {
        utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      }

      utterance.onend = () => {
        if (currentStoryIndex < filteredStories.length - 1) {
          setCurrentStoryIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis playback notice:', e);
      };

      const timer = setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 60);

      return () => {
        clearTimeout(timer);
        window.speechSynthesis.cancel();
      };
    } else {
      window.speechSynthesis.cancel();
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlaying, currentStoryIndex, language, speedIndex, currentStory, activeVoice]);

  // Seek on timeline click
  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
    setCurrentAudioSeconds(Math.floor(newProgress * totalStorySeconds));
  };

  // Open Player View & Start Narration
  const handleOpenNewsCard = (storyId) => {
    const idx = filteredStories.findIndex(s => s.id === storyId);
    if (idx !== -1) {
      setCurrentStoryIndex(idx);
    }
    setIsPlaying(true);
    setViewMode('player');
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    if (currentStoryIndex < filteredStories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
      setProgressPercent(0);
    } else {
      setCurrentStoryIndex(0);
      setProgressPercent(0);
    }
  };

  const handlePrevTrack = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      setProgressPercent(0);
    } else {
      setCurrentStoryIndex(filteredStories.length - 1);
      setProgressPercent(0);
    }
  };

  const cycleSpeed = () => {
    setSpeedIndex((prev) => (prev + 1) % SPEED_OPTIONS.length);
  };

  const toggleSaveStory = (story, e) => {
    if (e) e.stopPropagation();
    // story can be a story object OR just an id string (legacy call sites pass id)
    const storyObj = typeof story === 'string'
      ? filteredStories.find(s => s.id === story) || allStories.find(s => s.id === story) || { id: story }
      : story;
    toggleBookmark(storyObj);
  };

  const userName = user?.name ? user.name.split(' ')[0] : 'Aarav';

  // Dynamic Date string
  const dateHeader = (() => {
    const now = new Date();
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    return `${days[now.getDay()]} • ${now.getDate()} ${months[now.getMonth()]} • MORNING BRIEF`;
  })();

  return (
    <div className="h-screen w-full overflow-hidden bg-[#050507] text-white flex items-center justify-center select-none font-sans">
      
      {/* Background ambient lighting */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-25 sm:opacity-40 blur-[140px] transition-opacity"
        style={{
          background: 'radial-gradient(ellipse 650px 500px at 50% 35%, rgba(124, 58, 237, 0.25), rgba(52, 211, 153, 0.08), transparent 80%)'
        }}
      />

      {/* Main Container Phone Frame */}
      <div className="relative w-full max-w-[420px] h-[100dvh] sm:h-[860px] sm:max-h-[94vh] sm:rounded-[52px] bg-[#09090c] sm:border-[9px] sm:border-[#1a1a20] sm:shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06)] overflow-hidden flex flex-col justify-between z-10 text-left">
        
        {/* ================= 1. STATUS BAR & TOP BAR ================= */}
        <div className="w-full relative z-20 px-5 pt-3 sm:px-6 sm:pt-4 bg-[#09090c]">
          
          {/* iOS Dynamic Status Bar (Real-time Battery, Wi-Fi/Cellular, Clock) */}
          <IosStatusBar showIsland={true} />

          {/* Top App Header Row */}
          <div className="flex items-center justify-between mt-3 px-1">
            
            {/* Brand Logo: Soundwave + Nuzio AI + LIVE Indicator */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-[2.5px] h-4">
                <span className="w-[2.5px] h-2 bg-gradient-to-t from-[#6366f1] to-[#a855f7] rounded-full" />
                <span className="w-[2.5px] h-3.5 bg-gradient-to-t from-[#6366f1] to-[#a855f7] rounded-full" />
                <span className="w-[3px] h-4.5 bg-gradient-to-t from-[#818cf8] to-[#c084fc] rounded-full" />
                <span className="w-[2.5px] h-3 bg-gradient-to-t from-[#6366f1] to-[#a855f7] rounded-full" />
              </div>
              <div className="flex items-baseline font-sans">
                <span className="text-[15px] font-bold text-white tracking-tight">Nuzio</span>
              </div>

              {/* Real-time NewsData.io LIVE Indicator */}
              <div className="flex items-center space-x-1 px-2 py-0.5 rounded-full bg-[#0d2818]/90 border border-[#34d399]/40 text-[9.5px] font-mono font-bold text-[#34d399] tracking-wider shadow-[0_0_10px_rgba(52,211,153,0.15)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
                <span>LIVE</span>
              </div>
            </div>

            {/* Action Buttons: Refresh, Search & Bell */}
            <div className="flex items-center space-x-2">
              <button 
                type="button"
                onClick={() => fetchLiveNews(true)}
                disabled={isRefreshing}
                className="w-9 h-9 rounded-full bg-[#181820] hover:bg-[#20202a] active:scale-95 border border-white/[0.08] flex items-center justify-center transition-all cursor-pointer"
                title="Refresh live news"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-[#34d399] ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>

              <button 
                type="button"
                onClick={() => setShowSearchModal(true)}
                className="w-9 h-9 rounded-full bg-[#181820] hover:bg-[#20202a] active:scale-95 border border-white/[0.08] flex items-center justify-center transition-all cursor-pointer"
                title="Search live stories"
              >
                <Search className="w-4 h-4 text-[#38bdf8]" />
              </button>

              <button 
                type="button"
                onClick={() => setShowNotificationsModal(true)}
                className="w-9 h-9 rounded-full bg-[#181820] hover:bg-[#20202a] active:scale-95 border border-white/[0.08] flex items-center justify-center relative transition-all cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4 text-[#fbbf24]" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#8b5cf6] ring-2 ring-[#181820]" />
              </button>
            </div>
          </div>

          {/* ================= 2. HORIZONTAL CATEGORY PILLS ================= */}
          <div className="flex items-center space-x-2 mt-4 overflow-x-auto no-scrollbar pb-2.5 pt-1">
            {categoriesList.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentStoryIndex(0);
                  }}
                  className={`px-4 py-1.5 rounded-full text-[12.5px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#10b981] text-[#052e16] shadow-[0_0_12px_rgba(16,185,129,0.4)] font-bold'
                      : 'bg-[#16161c] text-[#8e8e93] hover:text-white border border-white/[0.06]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Subtle thin separator line */}
          <div className="w-full h-[1px] bg-white/[0.06]" />

        </div>

        {/* ================= 3. CONTENT AREA: STREAM vs AUDIO PLAYER ================= */}
        {viewMode === 'stream' ? (
          /* ================= DISCOVER CARDS STREAM (SCREENSHOT 1) ================= */
          <div className="flex-1 overflow-y-auto px-5 py-3 space-y-3.5 no-scrollbar">
            {/* Loading Skeleton */}
            {isLoadingNews && liveArticles.length === 0 ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-full bg-[#141418] border border-white/[0.06] rounded-[22px] p-4.5 animate-pulse">
                    <div className="flex space-x-2">
                      <div className="w-20 h-4 bg-white/10 rounded-md" />
                      <div className="w-24 h-4 bg-white/5 rounded-md" />
                    </div>
                    <div className="w-full h-5 bg-white/10 rounded-md mt-3" />
                    <div className="w-3/4 h-5 bg-white/10 rounded-md mt-1.5" />
                    <div className="w-full h-3.5 bg-white/5 rounded-md mt-3" />
                    <div className="flex justify-between items-center mt-4">
                      <div className="w-20 h-3 bg-white/5 rounded-md" />
                      <div className="w-9 h-9 rounded-full bg-white/10" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              filteredStories.map((story) => {
                const isThisPlaying = isPlaying && currentStory.id === story.id;
                const isSaved = isBookmarked(story.id);

                return (
                  <div 
                    key={story.id}
                    onClick={() => handleOpenNewsCard(story.id)}
                    className="w-full bg-[#141418] hover:bg-[#18181f] active:scale-[0.99] border border-white/[0.08] rounded-[22px] p-4.5 transition-all duration-200 shadow-[0_4px_20px_rgba(0,0,0,0.4)] relative text-left cursor-pointer group"
                  >
                    {/* Badges Row (Category Pill + Source Pill) */}
                    <div className="flex items-center space-x-2">
                      <span className={`px-2.5 py-0.5 rounded-lg text-[10.5px] font-mono font-bold uppercase tracking-wider ${story.categoryBg || 'bg-[#231b38]'} ${story.categoryText || 'text-[#a78bfa]'}`}>
                        {story.category}
                      </span>

                      <a
                        href={story.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-2.5 py-0.5 rounded-lg text-[10.5px] font-mono font-bold bg-[#132b21] text-[#34d399] hover:bg-[#1a382b] flex items-center space-x-1 cursor-pointer transition-colors"
                      >
                        <span>{story.source}</span>
                        <span className="text-[12px] leading-none">↗</span>
                      </a>
                    </div>

                    {/* News Title */}
                    <h3 className="text-[16px] sm:text-[17px] font-bold text-white leading-snug tracking-tight mt-2.5 group-hover:text-[#a78bfa] transition-colors">
                      {story.title}
                    </h3>

                    {/* News Snippet / Summary */}
                    <p className="text-[13px] text-[#9ca3af] leading-relaxed mt-1.5 line-clamp-2">
                      {story.snippet}
                    </p>

                    {/* Card Footer Row */}
                    <div className="flex items-center justify-between mt-3.5 pt-1">
                      <span className="text-[11px] font-mono font-semibold tracking-wider text-[#6b7280] uppercase">
                        {story.listenTime || '3 MIN LISTEN'}
                      </span>

                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenNewsCard(story.id);
                          }}
                          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-[0_2px_10px_rgba(52,211,153,0.3)] active:scale-95 ${
                            isThisPlaying 
                              ? 'bg-[#10b981] text-black animate-pulse' 
                              : 'bg-[#34d399] hover:bg-[#2ed093] text-black'
                          }`}
                          title="Listen to story"
                        >
                          {isThisPlaying ? (
                            <Pause className="w-4 h-4 fill-black text-black" />
                          ) : (
                            <Play className="w-4 h-4 fill-black text-black translate-x-0.5" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={(e) => toggleSaveStory(story, e)}
                          className={`w-9 h-9 rounded-full bg-[#202028] hover:bg-[#282834] flex items-center justify-center transition-colors cursor-pointer ${
                            isSaved ? 'text-amber-400' : 'text-[#6b7280] hover:text-white'
                          }`}
                          title={isSaved ? 'Bookmarked' : 'Bookmark story'}
                        >
                          <Star className={`w-4 h-4 ${isSaved ? 'fill-amber-400' : ''}`} />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })
            )}
          </div>
        ) : (
          /* ================= DETAILED AUDIO PLAYER VIEW (SCREENSHOT 2) ================= */
          <div className="flex-1 overflow-y-auto px-5 py-2.5 flex flex-col justify-between no-scrollbar">
            
            {/* Greeting & Digest Headline Header */}
            <div className="text-left mt-1 mb-2">
              <div className="text-[10.5px] font-mono tracking-wider font-bold text-[#818cf8] uppercase">
                {dateHeader}
              </div>

              <h1 className="text-[24px] sm:text-[26px] font-serif font-bold text-white tracking-tight leading-tight mt-0.5">
                {language === 'hi' ? `सुप्रभात, ${userName} —` : `Good morning, ${userName} —`}
              </h1>

              <h2 className="text-[22px] sm:text-[24px] font-serif italic text-gradient-purple -mt-1 font-normal">
                {language === 'hi' ? `${filteredStories.length} खास खबरें।` : `${filteredStories.length} things.`}
              </h2>

              <div className="flex items-center space-x-2 text-[12px] text-zinc-400 mt-1 font-medium">
                <span className="flex items-center gap-1.5 text-[#34d399] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
                  Audio live
                </span>
                <span>•</span>
                <span className="text-zinc-300">
                  Narration: <strong className="text-white font-semibold">{language === 'hi' ? 'हिन्दी' : 'English'}</strong>
                </span>
                <span>•</span>
                <span>{filteredStories.length} stories</span>
                <span>•</span>
                <span>{totalDigestMinutesFormatted}</span>
              </div>
            </div>

            {/* Main Audio Player Card */}
            <div className="w-full bg-[#141419] border border-white/[0.09] rounded-[26px] p-4.5 shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between relative overflow-hidden text-left">
              
              {/* Top Row: NOW PLAYING Pill & Counter */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#201c34] border border-[#8b5cf6]/30 text-[#818cf8] text-[10px] font-mono font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#818cf8] animate-ping" />
                  <span>NOW PLAYING • {currentStory.category}</span>
                </div>

                <span className="text-[12px] font-mono text-zinc-400 font-bold tracking-wider">
                  0{currentStoryIndex + 1} / 0{filteredStories.length}
                </span>
              </div>

              {/* Big Headline in Serif Font */}
              <h3 className="text-[18px] sm:text-[19px] font-serif font-bold text-white leading-snug tracking-tight mt-3">
                {currentStory.title}
              </h3>

              {/* Source & Action Links Row */}
              <div className="flex items-center justify-between text-[11px] font-mono tracking-wider text-zinc-400 mt-2.5">
                <div className="flex items-center space-x-2">
                  <span className="text-[#a78bfa] font-bold">{currentStory.source}</span>
                  <span>•</span>
                  <span>{currentStory.durationMinutes || '3 MIN'}</span>
                  <span>•</span>
                  <a
                    href={currentStory.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#34d399] hover:underline flex items-center gap-0.5 font-bold cursor-pointer"
                  >
                    <span>SOURCE</span>
                    <span className="text-[11px] leading-none">↗</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={(e) => toggleSaveStory(currentStory, e)}
                  className={`flex items-center gap-1 uppercase transition-colors cursor-pointer font-mono text-[11px] ${
                    isBookmarked(currentStory.id) ? 'text-[#8b5cf6] font-bold' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {isBookmarked(currentStory.id) ? '✓ SAVED' : '+ SAVE'}
                </button>
              </div>

              {/* Snippet / Subtitle */}
              <p className="text-[12px] text-zinc-500 mt-2 line-clamp-1">
                {currentStory.snippet}
              </p>

              {/* Waveform Visualizer */}
              <div className="mt-3.5 mb-1.5">
                <div className="flex items-end justify-between h-8 px-1 mb-2">
                  {[
                    30, 55, 40, 75, 45, 90, 65, 35, 80, 100, 
                    55, 70, 45, 85, 60, 40, 75, 50, 90, 35, 
                    65, 80, 40, 55
                  ].map((height, idx) => {
                    const isActive = (idx / 24) * 100 <= progressPercent;
                    return (
                      <span
                        key={idx}
                        className={`w-[4.5px] rounded-full transition-all duration-200 ${
                          isActive
                            ? 'bg-[#7c5cfc]'
                            : 'bg-[#252533]'
                        } ${isPlaying ? 'animate-pulse' : ''}`}
                        style={{ 
                          height: isPlaying ? `${Math.max(15, (height * (Math.floor(currentAudioSeconds) % 10 + 5)) / 12)}%` : `${height * 0.7}%`,
                          animationDelay: `${idx * 0.05}s`
                        }}
                      />
                    );
                  })}
                </div>

                {/* Progress bar line (Clickable / Seekable) */}
                <div 
                  onClick={handleSeek}
                  className="w-full bg-[#20202c] hover:bg-[#282836] h-[5px] rounded-full overflow-hidden cursor-pointer transition-all relative"
                  title="Click to seek audio"
                >
                  <div 
                    className="h-full bg-gradient-to-r from-[#6366f1] via-[#7c5cfc] to-[#a855f7] rounded-full transition-all duration-150"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                {/* Synchronized Real-time displays */}
                <div className="flex justify-between text-[11px] font-mono mt-1 px-0.5">
                  <span className="font-semibold text-white">{elapsedTimeFormatted}</span>
                  <span className="text-zinc-400 font-medium">{remainingTimeFormatted}</span>
                </div>
              </div>

              {/* Audio Controls Row */}
              <div className="flex items-center justify-between pt-1">
                {/* Skip Back */}
                <button
                  type="button"
                  onClick={handlePrevTrack}
                  className="w-11 h-11 rounded-full bg-[#1b1b24] hover:bg-[#23232f] text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Previous story"
                >
                  <SkipBack className="w-4 h-4 fill-current" />
                </button>

                {/* Center Glowing Purple Play/Pause Button */}
                <button
                  type="button"
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full bg-[#7c5cfc] hover:bg-[#6d4df0] text-black flex items-center justify-center shadow-[0_0_25px_rgba(124,92,252,0.6)] active:scale-95 transition-transform cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Play Live Audio'}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-black text-black" />
                  ) : (
                    <Play className="w-6 h-6 fill-black text-black translate-x-0.5" />
                  )}
                </button>

                {/* Skip Forward */}
                <button
                  type="button"
                  onClick={handleNextTrack}
                  className="w-11 h-11 rounded-full bg-[#1b1b24] hover:bg-[#23232f] text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Next story"
                >
                  <SkipForward className="w-4 h-4 fill-current" />
                </button>

                {/* Playback Speed Button */}
                <button
                  type="button"
                  onClick={cycleSpeed}
                  className="px-3 py-2 rounded-xl bg-[#1b1b24] hover:bg-[#23232f] text-zinc-300 hover:text-white font-mono text-[12px] font-semibold transition-colors cursor-pointer"
                  title="Playback speed"
                >
                  {SPEED_OPTIONS[speedIndex]}
                </button>
              </div>

              {/* ── Next / Previous Story Navigation ── */}
              <div className="flex items-stretch gap-2 mt-3">

                {/* ← Previous */}
                <button
                  type="button"
                  onClick={handlePrevTrack}
                  disabled={currentStoryIndex === 0}
                  className={`flex-1 flex flex-col items-start gap-0.5 px-3.5 py-2.5 rounded-2xl border transition-all cursor-pointer group ${
                    currentStoryIndex === 0
                      ? 'opacity-30 cursor-not-allowed bg-[#111116] border-white/[0.04]'
                      : 'bg-[#111116] hover:bg-[#181820] border-white/[0.08] hover:border-[#6366f1]/40 active:scale-[0.98]'
                  }`}
                  title="Previous story"
                >
                  <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-1">
                    <span>←</span>
                    <span>{language === 'hi' ? 'पिछली' : 'Prev'}</span>
                  </span>
                  <span className="text-[11.5px] font-semibold text-zinc-300 group-hover:text-white line-clamp-1 transition-colors text-left w-full">
                    {currentStoryIndex > 0
                      ? allStories[currentStoryIndex - 1]?.title || '—'
                      : (language === 'hi' ? 'शुरुआत' : 'Start of feed')}
                  </span>
                </button>

                {/* Story Counter */}
                <div className="flex flex-col items-center justify-center px-2 shrink-0">
                  <span className="text-[11px] font-bold text-white font-mono leading-none">
                    {currentStoryIndex + 1}
                  </span>
                  <span className="text-[9px] text-zinc-600 font-mono leading-none mt-0.5">
                    / {allStories.length}
                  </span>
                </div>

                {/* Next → */}
                <button
                  type="button"
                  onClick={handleNextTrack}
                  disabled={currentStoryIndex >= allStories.length - 1}
                  className={`flex-1 flex flex-col items-end gap-0.5 px-3.5 py-2.5 rounded-2xl border transition-all cursor-pointer group ${
                    currentStoryIndex >= allStories.length - 1
                      ? 'opacity-30 cursor-not-allowed bg-[#111116] border-white/[0.04]'
                      : 'bg-[#111116] hover:bg-[#181820] border-white/[0.08] hover:border-[#6366f1]/40 active:scale-[0.98]'
                  }`}
                  title="Next story"
                >
                  <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase flex items-center gap-1">
                    <span>{language === 'hi' ? 'अगली' : 'Next'}</span>
                    <span>→</span>
                  </span>
                  <span className="text-[11.5px] font-semibold text-zinc-300 group-hover:text-white line-clamp-1 transition-colors text-right w-full">
                    {currentStoryIndex < allStories.length - 1
                      ? allStories[currentStoryIndex + 1]?.title || '—'
                      : (language === 'hi' ? 'अंतिम खबर' : 'End of feed')}
                  </span>
                </button>
              </div>

            </div>

          </div>
        )}

        {/* ================= 4. FLOATING DOCKED BAR & BOTTOM NAVIGATION ================= */}
        <div className="w-full relative z-20 px-4 pb-3 sm:px-5 sm:pb-4 bg-gradient-to-t from-[#09090c] via-[#09090c] to-transparent">
          
          {/* Now Narrating Bar (Active when audio is playing or in player mode) */}
          <div 
            onClick={() => setViewMode(viewMode === 'player' ? 'stream' : 'player')}
            className="w-full bg-[#121218] border border-white/[0.08] rounded-2xl px-4 py-2 mb-2 flex items-center justify-between cursor-pointer hover:bg-[#16161e] transition-colors"
          >
            <div className="flex items-center space-x-2 text-[11.5px] text-[#34d399] font-medium truncate max-w-[80%]">
              <span className="text-[12px]">🎙</span>
              <span className="truncate">
                Now narrating — {currentStory.title}
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold text-zinc-400">
              {viewMode === 'player' ? 'FEED ↑' : 'VIEW ↓'}
            </span>
          </div>

          {/* Bottom Dock Navigation Bar */}
          <div className="w-full bg-[#121217] border border-white/[0.08] rounded-[28px] px-8 py-2.5 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.8)] relative">
            
            {/* Left Tab: DISCOVER */}
            <button 
              type="button"
              onClick={() => {
                setViewMode('stream');
                setSelectedCategory('All');
              }}
              className="flex flex-col items-center cursor-pointer group"
            >
              <Compass className={`w-5 h-5 transition-colors ${viewMode === 'stream' ? 'text-[#34d399]' : 'text-zinc-500 group-hover:text-white'}`} />
              <span className={`text-[10px] font-extrabold tracking-widest uppercase mt-1 ${viewMode === 'stream' ? 'text-[#34d399]' : 'text-zinc-500 group-hover:text-white'}`}>
                DISCOVER
              </span>
              {viewMode === 'stream' && (
                <span className="w-5 h-[2.5px] bg-[#34d399] rounded-full mt-0.5" />
              )}
            </button>

            {/* Right Tab: SETTINGS */}
            <button 
              type="button"
              onClick={() => setShowSettingsModal(true)}
              className="flex flex-col items-center cursor-pointer group"
            >
              <Settings className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
              <span className="text-[10px] font-extrabold tracking-widest uppercase mt-1 text-zinc-500 group-hover:text-white">
                SETTINGS
              </span>
            </button>

          </div>

          {/* iOS Bottom Indicator Bar */}
          <div className="w-[130px] h-[4px] bg-white/20 rounded-full mx-auto mt-2 sm:hidden" />
        </div>

        {/* ================= SEARCH MODAL ================= */}
        {showSearchModal && (
          <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col p-5 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.1]">
              <div className="flex items-center space-x-2 flex-1 mr-3">
                <Search className="w-4 h-4 text-zinc-400" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search live news stories"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-[14px] text-white focus:outline-none placeholder-zinc-500"
                />
                {isSearchingApi && <Loader2 className="w-4 h-4 text-[#34d399] animate-spin" />}
              </div>
              <button 
                type="button"
                onClick={() => {
                  setShowSearchModal(false);
                  setSearchQuery('');
                  setSearchApiResults([]);
                }}
                className="p-1 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-2 no-scrollbar">
              {(searchApiResults.length > 0 ? searchApiResults : allStories.filter(s => 
                !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.snippet.toLowerCase().includes(searchQuery.toLowerCase())
              )).map((story) => (
                <div
                  key={story.id}
                  onClick={() => {
                    handleOpenNewsCard(story.id);
                    setShowSearchModal(false);
                  }}
                  className="p-3 bg-[#15151c] hover:bg-[#1d1d26] rounded-xl border border-white/[0.06] cursor-pointer transition-colors text-left group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#8b5cf6] font-semibold">{story.category}</span>
                    <span className="text-[10px] font-mono text-zinc-500">{story.source}</span>
                  </div>
                  <h4 className="text-[13px] font-semibold text-white mt-1 group-hover:text-[#a78bfa] transition-colors">{story.title}</h4>
                  <p className="text-[11.5px] text-zinc-400 line-clamp-1 mt-0.5">{story.snippet}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= NOTIFICATIONS MODAL ================= */}
        {showNotificationsModal && (
          <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-end p-4 animate-in fade-in">
            <div className="w-full bg-[#111116] border border-white/[0.12] rounded-3xl p-5 text-left shadow-2xl relative">
              <button
                type="button"
                onClick={() => setShowNotificationsModal(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2 mb-3">
                <Bell className="w-5 h-5 text-[#fbbf24]" />
                <h4 className="text-[16px] font-bold text-white">Daily News Notifications</h4>
              </div>

              <div className="space-y-2.5">
                <div className="p-3 bg-[#171720] rounded-xl border border-white/[0.06]">
                  <p className="text-[12.5px] text-white font-medium">Morning Audio Digest ready</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Today's top stories tailored to your selected niches have been curated.</p>
                  <span className="text-[10px] text-[#34d399] font-mono mt-1 block">10m ago</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowNotificationsModal(false)}
                className="w-full mt-4 py-2 bg-white/[0.08] hover:bg-white/[0.12] text-white rounded-xl text-[12.5px] font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* ================= SETTINGS MODAL (FULL SCREEN) ================= */}
        {showSettingsModal && (
          <div className="absolute inset-0 z-50 flex flex-col min-h-0 overflow-hidden" style={{ background: 'rgba(5,5,7,0.98)', backdropFilter: 'blur(24px)' }}>

            {/* ── Header ── */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/[0.07] shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center">
                  <Settings className="w-4 h-4 text-zinc-300" />
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-white">{language === 'hi' ? 'सेटिंग्स' : 'Settings'}</h2>
                  <p className="text-[11px] text-zinc-500 font-mono">{language === 'hi' ? 'अपना अनुभव कस्टमाइज़ करें' : 'Personalise your experience'}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                className="w-8 h-8 rounded-full bg-white/[0.07] hover:bg-white/[0.14] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-zinc-400" />
              </button>
            </div>

            {/* ── Scrollable Body ── */}
            <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4 space-y-3 no-scrollbar">

              {/* Profile Card */}
              <div className="flex items-center gap-4 p-4 bg-[#111116] border border-white/[0.08] rounded-2xl">
                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#6366f1] to-[#a855f7] flex items-center justify-center font-bold text-white text-[20px] shrink-0 shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[15px] font-bold text-white truncate">{user?.name || 'Aarav'}</h4>
                  <p className="text-[12px] text-zinc-400 truncate">{user?.email || 'aarav@nuzio.ai'}</p>
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#34d399] font-medium mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
                    {language === 'hi' ? 'कनेक्टेड' : 'Connected'}
                  </span>
                </div>
              </div>

              {/* ── Section: Content ── */}
              <p className="text-[10.5px] font-bold tracking-widest text-zinc-500 uppercase px-1 pt-1">{language === 'hi' ? 'सामग्री' : 'Content'}</p>

              {/* Saved Stories */}
              <button
                type="button"
                onClick={() => { setShowSettingsModal(false); setShowSavedModal(true); }}
                className="w-full flex items-center justify-between p-4 bg-[#111116] hover:bg-[#16161e] border border-white/[0.08] hover:border-amber-500/30 rounded-2xl transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center group-hover:bg-amber-500/25 transition-colors">
                    <BookmarkCheck className="w-4.5 h-4.5 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-[13.5px] font-semibold text-white">{language === 'hi' ? 'सहेजी गई खबरें' : 'Saved Stories'}</p>
                    <p className="text-[11.5px] text-zinc-500">{bookmarks.length} {language === 'hi' ? 'सहेजी गई' : 'bookmarked'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {bookmarks.length > 0 && (
                    <span className="bg-amber-500/25 text-amber-300 text-[11px] font-bold rounded-full px-2 py-0.5">{bookmarks.length}</span>
                  )}
                  <span className="text-zinc-600 group-hover:text-zinc-300 text-[16px] transition-colors">→</span>
                </div>
              </button>

              {/* Niches */}
              <button
                type="button"
                onClick={handleOpenEditNiches}
                className="w-full flex items-center justify-between p-4 bg-[#111116] hover:bg-[#16161e] border border-white/[0.08] hover:border-[#6366f1]/40 rounded-2xl transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#6366f1]/15 border border-[#6366f1]/25 flex items-center justify-center group-hover:bg-[#6366f1]/25 transition-colors">
                    <Sliders className="w-4.5 h-4.5 text-[#818cf8]" />
                  </div>
                  <div className="text-left">
                    <p className="text-[13.5px] font-semibold text-white">{language === 'hi' ? 'रुचियां (Niches)' : 'Selected Niches'}</p>
                    <p className="text-[11.5px] text-zinc-500">{selectedNiches.length} / 7 {language === 'hi' ? 'सक्रिय विषय' : 'active topics'}</p>
                  </div>
                </div>
                <span className="text-zinc-600 group-hover:text-zinc-300 text-[16px] transition-colors">→</span>
              </button>

              {/* ── Section: Language ── */}
              <p className="text-[10.5px] font-bold tracking-widest text-zinc-500 uppercase px-1 pt-2">{language === 'hi' ? 'भाषा' : 'Language'}</p>

              <div className="p-4 bg-[#111116] border border-white/[0.08] rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#a855f7]/15 border border-[#a855f7]/25 flex items-center justify-center">
                      <Globe className="w-4.5 h-4.5 text-[#c084fc]" />
                    </div>
                    <div>
                      <p className="text-[13.5px] font-semibold text-white">{language === 'hi' ? 'ऑडियो भाषा' : 'Audio Language'}</p>
                      <p className="text-[11.5px] text-zinc-500 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
                        {language === 'hi' ? 'हिन्दी सक्रिय' : 'English active'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* English / Hindi Toggle */}
                <div className="grid grid-cols-2 gap-2 bg-[#0c0c10] p-1.5 rounded-xl border border-white/[0.06]">
                  <button
                    type="button"
                    onClick={async () => {
                      if (language !== 'en') { await selectLanguage('en'); setCurrentStoryIndex(0); }
                    }}
                    className={`py-2.5 px-3 rounded-lg text-[13px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      language === 'en'
                        ? 'bg-[#6366f1] text-white shadow-[0_2px_14px_rgba(99,102,241,0.5)]'
                        : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    <span className="text-[11px] font-mono font-bold opacity-70">GB</span>
                    <span>English</span>
                    {language === 'en' && <Check className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      if (language !== 'hi') { await selectLanguage('hi'); setCurrentStoryIndex(0); }
                    }}
                    className={`py-2.5 px-3 rounded-lg text-[13px] font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      language === 'hi'
                        ? 'bg-[#6366f1] text-white shadow-[0_2px_14px_rgba(99,102,241,0.5)]'
                        : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    <span className="text-[11px] font-mono font-bold opacity-70">IN</span>
                    <span>हिन्दी</span>
                    {language === 'hi' && <Check className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* ── Section: System ── */}
              <p className="text-[10.5px] font-bold tracking-widest text-zinc-500 uppercase px-1 pt-2">{language === 'hi' ? 'सिस्टम' : 'System'}</p>

              {/* Audio Narration Info */}
              <div className="flex items-center justify-between p-4 bg-[#111116] border border-white/[0.08] rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0d9488]/15 border border-[#0d9488]/25 flex items-center justify-center">
                    <Radio className="w-4 h-4 text-[#2dd4bf]" />
                  </div>
                  <div>
                    <p className="text-[13.5px] font-semibold text-white">{language === 'hi' ? 'ऑडियो नैरेटर' : 'Audio Narration'}</p>
                    <p className="text-[11.5px] text-zinc-500">{language === 'hi' ? 'वेब स्पीच API' : 'Web Speech API'}</p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-[12px] text-[#34d399] font-semibold font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
                  {language === 'hi' ? 'सक्रिय' : 'Active'}
                </span>
              </div>

              {/* Sign Out */}
              <button
                type="button"
                onClick={() => { setShowSettingsModal(false); logout(); }}
                className="w-full flex items-center gap-3 p-4 bg-[#ef4444]/08 hover:bg-[#ef4444]/15 border border-[#ef4444]/20 hover:border-[#ef4444]/40 text-[#f87171] rounded-2xl font-semibold text-[13.5px] transition-all cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-xl bg-[#ef4444]/12 border border-[#ef4444]/25 flex items-center justify-center group-hover:bg-[#ef4444]/22 transition-colors">
                  <LogOut className="w-4 h-4" />
                </div>
                <span>{language === 'hi' ? 'लॉग आउट' : 'Sign Out'}</span>
              </button>

              {/* Bottom spacing */}
              <div className="h-2" />
            </div>
          </div>
        )}

        {/* ================= SAVED STORIES MODAL ================= */}
        {showSavedModal && (
          <div className="absolute inset-0 z-[60] flex flex-col min-h-0 overflow-hidden" style={{ background: 'rgba(5,5,7,0.97)', backdropFilter: 'blur(20px)' }}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/[0.07] shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
                  <BookmarkCheck className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-white">{language === 'hi' ? 'सहेजी गई खबरें' : 'Saved Stories'}</h2>
                  <p className="text-[11px] text-zinc-500 font-mono">{bookmarks.length} {language === 'hi' ? 'कहानियां' : 'stories'}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowSavedModal(false)}
                className="w-8 h-8 rounded-full bg-white/[0.07] hover:bg-white/[0.12] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-zinc-400" />
              </button>
            </div>

            {/* Story List */}
            <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-3 no-scrollbar">
              {bookmarks.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
                  <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <Bookmark className="w-9 h-9 text-amber-500/50" />
                  </div>
                  <div className="text-center">
                    <p className="text-[15px] font-semibold text-zinc-300">{language === 'hi' ? 'कोई खबर नहीं सहेजी' : 'No saved stories yet'}</p>
                    <p className="text-[12px] text-zinc-500 mt-1">{language === 'hi' ? 'खबरों पर ⭐ दबाकर सहेजें' : 'Tap the ⭐ on any story to save it'}</p>
                  </div>
                </div>
              ) : (
                bookmarks.map((story) => (
                  <div
                    key={story.id}
                    className="group relative bg-[#111116] hover:bg-[#16161d] border border-white/[0.07] hover:border-white/[0.12] rounded-2xl p-4 transition-all cursor-pointer"
                    onClick={() => {
                      const idx = allStories.findIndex(s => s.id === story.id);
                      if (idx >= 0) {
                        setCurrentStoryIndex(idx);
                        setViewMode('player');
                      }
                      setShowSavedModal(false);
                    }}
                  >
                    {/* Category badge */}
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-lg ${story.categoryBg || 'bg-[#231b38]'} ${story.categoryText || 'text-[#a78bfa]'}`}>
                        {story.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-zinc-500 font-mono">{story.durationMinutes}</span>
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); removeBookmark(story.id); }}
                          className="w-6 h-6 rounded-full bg-[#ef4444]/10 hover:bg-[#ef4444]/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
                          title="Remove bookmark"
                        >
                          <X className="w-3 h-3 text-[#f87171]" />
                        </button>
                      </div>
                    </div>

                    <h3 className="text-[13.5px] font-semibold text-white leading-snug line-clamp-2 mb-1.5">{story.title}</h3>
                    <p className="text-[11.5px] text-zinc-500 line-clamp-2 mb-3">{story.snippet}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
                        <span className="text-[10.5px] text-zinc-500 font-mono tracking-wider">{story.source}</span>
                      </div>
                      <span className="text-[10px] text-zinc-600 font-mono">
                        {story.savedAt ? new Date(story.savedAt).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-GB', { day: 'numeric', month: 'short' }) : ''}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-4 pb-5 pt-2 border-t border-white/[0.06] shrink-0">
              <button
                type="button"
                onClick={() => setShowSavedModal(false)}
                className="w-full py-3 bg-[#6366f1]/15 hover:bg-[#6366f1]/25 border border-[#6366f1]/40 text-[#a5b4fc] hover:text-white rounded-2xl font-semibold text-[13px] transition-all cursor-pointer"
              >
                {language === 'hi' ? 'बंद करें' : 'Done'}
              </button>
            </div>
          </div>
        )}

        {/* ================= EDIT NICHES MODAL ================= */}
        {showEditNichesModal && (
          <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-end p-4 animate-in fade-in">
            <div className="w-full bg-[#111116] border border-white/[0.12] rounded-3xl p-5 text-left shadow-2xl relative max-h-[90%] flex flex-col justify-between">
              
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-3 border-b border-white/[0.08]">
                <div>
                  <div className="flex items-center space-x-2">
                    <Sliders className="w-4 h-4 text-[#818cf8]" />
                    <h3 className="text-[17px] font-bold text-white tracking-tight">
                      {language === 'hi' ? 'अपनी रुचियां अनुकूलित करें' : 'Customize Your Niches'}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-[12px] text-zinc-400">
                      {language === 'hi' ? 'अधिकतम 7 रुचियां चुनें:' : 'Select up to 7 topics:'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#064e3b]/50 border border-[#10b981]/50 text-[#34d399] font-mono text-[10.5px] font-bold">
                      {tempSelectedNiches.length}/7 Selected
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowEditNichesModal(false)}
                  className="text-zinc-400 hover:text-white p-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Niches Chips Grid */}
              <div className="flex-1 overflow-y-auto py-3.5 no-scrollbar max-h-[360px]">
                <div className="flex flex-wrap gap-2">
                  {availableNiches.map((niche) => {
                    const isSelected = tempSelectedNiches.includes(niche.id);
                    return (
                      <button
                        key={niche.id}
                        type="button"
                        onClick={() => toggleTempNiche(niche.id)}
                        className={`px-3.5 py-2 rounded-full text-[12.5px] font-medium transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
                          isSelected
                            ? "bg-[#1e1735] border-[1.5px] border-[#6366f1] text-white shadow-[0_2px_12px_rgba(99,102,241,0.3)] scale-[1.02]"
                            : "bg-[#15151a] hover:bg-[#1c1c24] border border-white/[0.08] text-[#d4d4d8] hover:text-white"
                        }`}
                      >
                        {niche.badge ? (
                          <span className="text-[9.5px] font-mono font-extrabold text-[#71717a] bg-[#0c0c10] px-1.5 py-0.5 rounded border border-white/[0.06]">
                            {niche.badge}
                          </span>
                        ) : (
                          <span className="text-[13px]">{niche.icon}</span>
                        )}
                        <span className={isSelected ? "text-white font-semibold" : ""}>{niche.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-[#818cf8] stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Modal Footer / Save Buttons */}
              <div className="pt-3 border-t border-white/[0.08] flex items-center space-x-2.5">
                <button
                  type="button"
                  onClick={() => setShowEditNichesModal(false)}
                  className="w-1/3 py-2.5 bg-white/[0.06] hover:bg-white/[0.1] text-zinc-300 hover:text-white rounded-xl font-semibold text-[13px] transition-colors cursor-pointer text-center"
                >
                  {language === 'hi' ? 'रद्द करें' : 'Cancel'}
                </button>
                <button
                  type="button"
                  disabled={isSavingNiches || tempSelectedNiches.length === 0}
                  onClick={handleSaveNiches}
                  className="flex-1 py-2.5 bg-[#6366f1] hover:bg-[#5558e6] active:scale-98 text-white rounded-xl font-bold text-[13.5px] flex items-center justify-center space-x-1.5 transition-all shadow-[0_4px_20px_rgba(99,102,241,0.4)] cursor-pointer disabled:opacity-50"
                >
                  {isSavingNiches ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-1" />
                      <span>{language === 'hi' ? 'सहेज रहे हैं...' : 'Saving...'}</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 mr-0.5" />
                      <span>{language === 'hi' ? 'रुचियां सहेजें' : 'Save Niches'}</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
