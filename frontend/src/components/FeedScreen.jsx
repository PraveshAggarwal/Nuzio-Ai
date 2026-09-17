import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNiches } from '../context/NicheContext';
import IosStatusBar from './IosStatusBar';
import { 
  Play, Pause, SkipBack, SkipForward, Search, Bell, 
  ExternalLink, Bookmark, Compass, Settings, Sparkles,
  Volume2, VolumeX, Radio, Check, X, RefreshCw, LogOut, Globe, Sliders
} from 'lucide-react';

const LIVE_NEWS_DATABASE = {
  en: [
    {
      id: 'ai-tech-1',
      nicheId: 'ai-tech',
      category: 'AI & TECH',
      title: 'Anthropic ships Claude 4.5 with 2M-token memory and native tools.',
      snippet: 'Anthropic announces Claude 4.5 featuring unprecedented context retrieval, real-time computer use agents, and deep enterprise workflow automation.',
      source: 'THE VERGE',
      sourceUrl: 'https://theverge.com',
      duration: '3 MIN',
      audioTime: '03:15',
      timeAgo: '10m ago',
    },
    {
      id: 'indian-business-1',
      nicheId: 'indian-business',
      category: 'INDIAN BUSINESS',
      title: 'Tata Electronics expands $14B semiconductor fab in Dholera, Gujarat.',
      snippet: 'Production timeline moved up as domestic component ecosystem secures long-term international supply contracts with tier-1 automakers.',
      source: 'ECONOMIC TIMES',
      sourceUrl: 'https://economictimes.indiatimes.com',
      duration: '3 MIN',
      audioTime: '03:10',
      timeAgo: '18m ago',
    },
    {
      id: 'startups-1',
      nicheId: 'startups',
      category: 'STARTUPS',
      title: 'Indian quick-commerce giant expands 10-minute delivery to 40 new cities.',
      snippet: 'Blinkit and Zepto ramp up micro-warehouses and autonomous inventory prediction as Tier-2 retail demand jumps 140% year-on-year.',
      source: 'TECHCRUNCH',
      sourceUrl: 'https://techcrunch.com',
      duration: '2 MIN',
      audioTime: '02:30',
      timeAgo: '24m ago',
    },
    {
      id: 'financial-markets-1',
      nicheId: 'financial-markets',
      category: 'MARKETS',
      title: 'Sensex rallies past milestone on tech surge and $1.8B foreign capital inflow.',
      snippet: 'Indian benchmark indices hit fresh record highs driven by heavy buying in IT, semiconductor suppliers, and private banking equities.',
      source: 'BLOOMBERG',
      sourceUrl: 'https://bloomberg.com',
      duration: '3 MIN',
      audioTime: '03:40',
      timeAgo: '42m ago',
    },
    {
      id: 'global-politics-1',
      nicheId: 'global-politics',
      category: 'POLITICS',
      title: 'Global trade ministers convene in Geneva to establish digital commerce standards.',
      snippet: 'New cross-border framework focuses on AI sovereignty, zero-tariff digital goods, and encrypted cross-border transactions.',
      source: 'REUTERS',
      sourceUrl: 'https://reuters.com',
      duration: '4 MIN',
      audioTime: '03:50',
      timeAgo: '50m ago',
    },
    {
      id: 'science-1',
      nicheId: 'science',
      category: 'SCIENCE',
      title: 'ISRO unveils timeline for next-generation modular space station modules.',
      snippet: 'Bharatiya Antariksh Station receives structural approval with advanced indigenous environmental life support systems scheduled for 2028 deployment.',
      source: 'REUTERS',
      sourceUrl: 'https://reuters.com',
      duration: '2 MIN',
      audioTime: '02:45',
      timeAgo: '1h ago',
    },
    {
      id: 'geopolitics-1',
      nicheId: 'geopolitics',
      category: 'GEOPOLITICS',
      title: 'India-Middle East-Europe Economic Corridor accelerates green maritime routes.',
      snippet: 'Trilateral shipping ports complete standardized digital customs integration, reducing transit times between Mumbai and European hubs by 40%.',
      source: 'FINANCIAL TIMES',
      sourceUrl: 'https://ft.com',
      duration: '3 MIN',
      audioTime: '03:05',
      timeAgo: '1h ago',
    },
    {
      id: 'health-medicine-1',
      nicheId: 'health-medicine',
      category: 'HEALTH & MEDICINE',
      title: 'Breakthrough clinical trial demonstrates mRNA therapy targeting autoimmune conditions.',
      snippet: 'New targeted biological approach eliminates adverse reactions while preserving normal immune system defense mechanisms.',
      source: 'NATURE',
      sourceUrl: 'https://nature.com',
      duration: '3 MIN',
      audioTime: '03:20',
      timeAgo: '2h ago',
    },
    {
      id: 'climate-energy-1',
      nicheId: 'climate-energy',
      category: 'CLIMATE & ENERGY',
      title: 'India achieves 200GW renewable milestone ahead of scheduled timeline.',
      snippet: 'Solar park expansion in Rajasthan and offshore wind projects in Tamil Nadu lead dramatic clean power transition.',
      source: 'THE HINDU',
      sourceUrl: 'https://thehindu.com',
      duration: '3 MIN',
      audioTime: '02:55',
      timeAgo: '2h ago',
    },
    {
      id: 'sports-1',
      nicheId: 'sports',
      category: 'SPORTS',
      title: 'Indian Cricket Board announces next-gen high-performance analytics center in Bengaluru.',
      snippet: 'AI motion capture and biometric strain tracking integrated into national squad conditioning ahead of upcoming world championship.',
      source: 'ESPN CRICINFO',
      sourceUrl: 'https://espncricinfo.com',
      duration: '2 MIN',
      audioTime: '02:20',
      timeAgo: '3h ago',
    },
    {
      id: 'culture-arts-1',
      nicheId: 'culture-arts',
      category: 'CULTURE & ARTS',
      title: 'National Museum launches 4K digital preservation archive for ancient Indian manuscripts.',
      snippet: 'Over 100,000 rare Sanskrit and Prakrit manuscripts digitized and opened for global AI translation and research initiatives.',
      source: 'BBC CULTURE',
      sourceUrl: 'https://bbc.com',
      duration: '3 MIN',
      audioTime: '03:00',
      timeAgo: '3h ago',
    },
    {
      id: 'legal-policy-1',
      nicheId: 'legal-policy',
      category: 'LEGAL & POLICY',
      title: 'Supreme Court establishes nationwide digital evidence authentication standards.',
      snippet: 'Cryptographic timestamping mandated for electronic judicial records to speed up commercial dispute resolutions across high courts.',
      source: 'LIVE LAW',
      sourceUrl: 'https://livelaw.in',
      duration: '3 MIN',
      audioTime: '03:10',
      timeAgo: '4h ago',
    },
  ],
  hi: [
    {
      id: 'ai-tech-1',
      nicheId: 'ai-tech',
      category: 'तकनीक & AI',
      title: 'एंथ्रोपिक ने 2M-टोकन मेमोरी और नेटिव टूल्स के साथ क्लॉड 4.5 लॉन्च किया।',
      snippet: 'क्लॉड 4.5 में एंटरप्राइज ऑटोमेशन, रीयल-टाइम कोडिंग और अभूतपूर्व मेमोरी क्षमता का समावेश किया गया है।',
      source: 'द वर्ज',
      sourceUrl: 'https://theverge.com',
      duration: '3 मिनट',
      audioTime: '03:15',
      timeAgo: '10 मिनट पहले',
    },
    {
      id: 'indian-business-1',
      nicheId: 'indian-business',
      category: 'भारतीय व्यापार',
      title: 'टाटा इलेक्ट्रॉनिक्स ने गुजरात के धोलेरा में $14 अरब के सेमीकंडक्टर फैब का विस्तार किया।',
      snippet: 'घरेलू ऑटोमोबाइल और इलेक्ट्रॉनिक्स कंपनियों के लिए चिप उत्पादन की समय-सीमा में तेजी लाई गई।',
      source: 'इकोनॉमिक टाइम्स',
      sourceUrl: 'https://economictimes.indiatimes.com',
      duration: '3 मिनट',
      audioTime: '03:10',
      timeAgo: '18 मिनट पहले',
    },
    {
      id: 'startups-1',
      nicheId: 'startups',
      category: 'स्टार्टअप',
      title: 'भारतीय क्विक-कॉमर्स कंपनियों ने 40 नए टियर-2 शहरों में 10 मिनट डिलीवरी शुरू की।',
      snippet: 'छोटे शहरों में ऑनलाइन डिलीवरी की मांग में 140% की बढ़ोतरी के बाद नए डार्क स्टोर्स का जाल बिछाया जा रहा है।',
      source: 'टेकक्रंच',
      sourceUrl: 'https://techcrunch.com',
      duration: '2 मिनट',
      audioTime: '02:30',
      timeAgo: '24 मिनट पहले',
    },
    {
      id: 'financial-markets-1',
      nicheId: 'financial-markets',
      category: 'बाजार',
      title: 'सेंसेक्स ने छुआ नया रिकॉर्ड स्तर; ₹15,000 करोड़ का विदेशी पूंजी निवेश आया।',
      snippet: 'आईटी और सेमीकंडक्टर सेक्टर के शेयरों में जोरदार तेजी के चलते भारतीय शेयर बाजारों में नया उत्साह देखने को मिला।',
      source: 'ब्लूमबर्ग',
      sourceUrl: 'https://bloomberg.com',
      duration: '3 मिनट',
      audioTime: '03:40',
      timeAgo: '42 मिनट पहले',
    },
    {
      id: 'global-politics-1',
      nicheId: 'global-politics',
      category: 'राजनीति',
      title: 'जिनेवा में वैश्विक व्यापार मंत्रियों की बैठक; डिजिटल कॉमर्स मानकों पर सहमति।',
      snippet: 'एआई संप्रभुता और सुरक्षित क्रॉस-बॉर्डर डिजिटल लेनदेन के लिए नए अंतरराष्ट्रीय नियम तैयार किए जा रहे हैं।',
      source: 'रॉयटर्स',
      sourceUrl: 'https://reuters.com',
      duration: '4 मिनट',
      audioTime: '03:50',
      timeAgo: '50 मिनट पहले',
    },
    {
      id: 'science-1',
      nicheId: 'science',
      category: 'विज्ञान',
      title: 'इसरो ने भारतीय अंतरिक्ष स्टेशन के अगले चरण के मॉड्यूल का रोडमैप जारी किया।',
      snippet: 'स्वदेशी लाइफ सपोर्ट सिस्टम और अत्याधुनिक मॉड्यूल के साथ भारतीय स्पेस स्टेशन की तैयारी तेज।',
      source: 'रॉयटर्स',
      sourceUrl: 'https://reuters.com',
      duration: '2 मिनट',
      audioTime: '02:45',
      timeAgo: '1 घंटा पहले',
    },
    {
      id: 'geopolitics-1',
      nicheId: 'geopolitics',
      category: 'भू-राजनीति',
      title: 'भारत-मध्य पूर्व-यूरोप आर्थिक गलियारे में हरित समुद्री मार्गों का विस्तार।',
      snippet: 'मुंबई और यूरोपीय बंदरगाहों के बीच माल ढुलाई समय में 40% की कमी लाने के लिए डिजिटल कस्टम्स शुरू।',
      source: 'फाइनेंशियल टाइम्स',
      sourceUrl: 'https://ft.com',
      duration: '3 मिनट',
      audioTime: '03:05',
      timeAgo: '1 घंटा पहले',
    },
    {
      id: 'health-medicine-1',
      nicheId: 'health-medicine',
      category: 'स्वास्थ्य',
      title: 'एमआरएनए थेरेपी के क्लिनिकल ट्रायल में ऑटोइम्यून बीमारियों के उपचार में बड़ी सफलता।',
      snippet: 'नई बायो-टारगेटेड तकनीक ने सामान्य प्रतिरक्षा तंत्र को सुरक्षित रखते हुए असाध्य लक्षणों को समाप्त किया।',
      source: 'नेचर',
      sourceUrl: 'https://nature.com',
      duration: '3 मिनट',
      audioTime: '03:20',
      timeAgo: '2 घंटे पहले',
    },
    {
      id: 'climate-energy-1',
      nicheId: 'climate-energy',
      category: 'पर्यावरण & ऊर्जा',
      title: 'भारत ने तय समय से पहले 200 गीगावाट स्वच्छ नवीकरणीय ऊर्जा का लक्ष्य हासिल किया।',
      snippet: 'राजस्थान के सोलर पार्क्स और तमिलनाडु के पवन ऊर्जा प्रोजेक्ट्स के दम पर ऐतिहासिक उपलब्धि।',
      source: 'द हिंदू',
      sourceUrl: 'https://thehindu.com',
      duration: '3 मिनट',
      audioTime: '02:55',
      timeAgo: '2 घंटे पहले',
    },
    {
      id: 'sports-1',
      nicheId: 'sports',
      category: 'खेल',
      title: 'बेंगलुरु में भारतीय क्रिकेट टीम के लिए अत्याधुनिक एआई एनालिटिक्स सेंटर शुरू।',
      snippet: 'खिलाड़ियों की फिटनेस और चोटों से बचाव के लिए मोशन-कैप्चर और बायोमेट्रिक तकनीक का उपयोग।',
      source: 'क्रिकइन्फो',
      sourceUrl: 'https://espncricinfo.com',
      duration: '2 मिनट',
      audioTime: '02:20',
      timeAgo: '3 घंटे पहले',
    },
    {
      id: 'culture-arts-1',
      nicheId: 'culture-arts',
      category: 'कला & संस्कृति',
      title: 'प्राचीन भारतीय पांडुलिपियों के डिजिटलाइजेशन के लिए 4K डिजिटल आर्काइव का लोकार्पण।',
      snippet: '1 लाख से अधिक दुर्लभ पांडुलिपियों का एआई अनुवाद और वैश्विक शोध के लिए ऑनलाइन संग्रह तैयार।',
      source: 'बीबीसी',
      sourceUrl: 'https://bbc.com',
      duration: '3 मिनट',
      audioTime: '03:00',
      timeAgo: '3 घंटे पहले',
    },
    {
      id: 'legal-policy-1',
      nicheId: 'legal-policy',
      category: 'कानून & नीति',
      title: 'सुप्रीम कोर्ट ने अदालतों में डिजिटल साक्ष्यों के प्रमाणीकरण के नए मानक तय किए।',
      snippet: 'क्रिप्टोग्राफिक टाइमस्टैम्पिंग से वाणिज्यिक मुकदमों के शीघ्र निपटारे का रास्ता साफ हुआ।',
      source: 'लाइव लॉ',
      sourceUrl: 'https://livelaw.in',
      duration: '3 मिनट',
      audioTime: '03:10',
      timeAgo: '4 घंटे पहले',
    },
  ]
};

const SPEED_OPTIONS = ['1x', '1.25x', '1.5x', '2x'];

export default function FeedScreen({ onEditNiches }) {
  const { user, logout } = useAuth();
  const { language, selectLanguage } = useLanguage();
  const { selectedNiches, availableNiches, resetNichesOnboarding } = useNiches();

  const allStories = language === 'hi' ? LIVE_NEWS_DATABASE.hi : LIVE_NEWS_DATABASE.en;

  // Filter stories based on selected niches
  const userNicheStories = allStories.filter((story) => 
    selectedNiches.length === 0 || selectedNiches.includes(story.nicheId)
  );

  const displayStories = userNicheStories.length > 0 ? userNicheStories : allStories;

  // Dynamic category tabs derived from user's selected niches
  const categoryPills = [
    'All',
    ...selectedNiches.map(id => {
      const match = availableNiches.find(n => n.id === id);
      return match ? match.category : id;
    })
  ];

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedIndex, setSpeedIndex] = useState(0);
  const [savedIds, setSavedIds] = useState([]);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [progressPercent, setProgressPercent] = useState(38);

  // Filtered by selected tab
  const filteredStories = displayStories.filter((story) => {
    if (selectedCategory === 'All') return true;
    const match = availableNiches.find(n => n.category.toLowerCase() === selectedCategory.toLowerCase());
    if (match && story.nicheId === match.id) return true;
    return story.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  const currentStory = filteredStories[currentStoryIndex] || filteredStories[0] || displayStories[0];

  // Speech synthesis audio engine for real narration
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isPlaying && currentStory) {
      window.speechSynthesis.cancel();
      const textToSpeak = `${currentStory.title}. ${currentStory.snippet}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = speedIndex === 0 ? 1 : speedIndex === 1 ? 1.25 : speedIndex === 2 ? 1.5 : 2;
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';

      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => 
        language === 'hi' ? v.lang.includes('hi') : (v.lang.includes('en-IN') || v.name.includes('Aria') || v.name.includes('Natural') || v.name.includes('Google'))
      );
      if (preferredVoice) utterance.voice = preferredVoice;

      utterance.onend = () => {
        if (currentStoryIndex < filteredStories.length - 1) {
          setCurrentStoryIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
          setProgressPercent(0);
        }
      };

      window.speechSynthesis.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isPlaying, currentStoryIndex, language, speedIndex, currentStory]);

  // Animated waveform progress simulation
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgressPercent(prev => (prev >= 100 ? 0 : prev + 1));
      }, 750);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

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

  const toggleSaveStory = (id) => {
    setSavedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Dynamic Date string
  const dateHeader = (() => {
    const now = new Date();
    const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const months = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    return `${days[now.getDay()]} • ${now.getDate()} ${months[now.getMonth()]} • MORNING BRIEF`;
  })();

  const userName = user?.name ? user.name.split(' ')[0] : (language === 'hi' ? 'आरव' : 'Aarav');

  return (
    <div className="min-h-screen w-full bg-[#050507] text-white flex items-center justify-center p-0 sm:p-6 sm:py-8 select-none font-sans">
      
      {/* Ambient background glow */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-25 sm:opacity-40 blur-[140px] transition-opacity"
        style={{
          background: 'radial-gradient(ellipse 650px 500px at 50% 35%, rgba(124, 58, 237, 0.25), rgba(52, 211, 153, 0.08), transparent 80%)'
        }}
      />

      {/* Main Container */}
      <div className="relative w-full max-w-[420px] h-[100dvh] sm:h-[860px] sm:max-h-[94vh] sm:rounded-[52px] bg-[#0c0c10] sm:border-[9px] sm:border-[#1a1a20] sm:shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06)] overflow-hidden flex flex-col justify-between z-10 text-left">
        
        {/* ================= 1. HEADER & STATUS BAR (REAL TIME) ================= */}
        <div className="w-full relative z-20 px-6 pt-5 sm:px-7 sm:pt-6">
          
          {/* iOS Status Bar with Dynamic Wi-Fi / Tower Network Switching */}
          <IosStatusBar showIsland={true} />

          {/* Nuzio Brand Header Row + Search & Bell Icons */}
          <div className="flex items-center justify-between mt-3.5 px-0.5">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-[2px] h-4">
                <span className="w-[2px] h-2 bg-gradient-to-t from-[#6366f1] to-[#a855f7]" />
                <span className="w-[2px] h-3.5 bg-gradient-to-t from-[#6366f1] to-[#a855f7]" />
                <span className="w-[2px] h-4 bg-gradient-to-t from-[#818cf8] to-[#c084fc]" />
                <span className="w-[2px] h-3 bg-gradient-to-t from-[#6366f1] to-[#a855f7]" />
              </div>
              <div className="flex items-baseline">
                <span className="text-[14.5px] font-bold text-white tracking-tight">Nuzio</span>
                <span className="text-[14.5px] font-bold ml-1 text-[#8b5cf6]">AI</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setShowSearchModal(true)}
                className="w-8 h-8 rounded-full bg-[#181820] hover:bg-[#20202a] border border-white/[0.08] flex items-center justify-center transition-colors cursor-pointer"
                title="Search stories"
              >
                <Search className="w-3.5 h-3.5 text-[#38bdf8]" />
              </button>

              <button 
                onClick={() => {
                  resetNichesOnboarding();
                  if (onEditNiches) onEditNiches();
                }}
                className="w-8 h-8 rounded-full bg-[#181820] hover:bg-[#20202a] border border-white/[0.08] flex items-center justify-center relative transition-colors cursor-pointer"
                title="Edit Niches"
              >
                <Sliders className="w-3.5 h-3.5 text-[#a855f7]" />
              </button>
            </div>
          </div>

          {/* ================= 2. DYNAMIC NICHE CATEGORY PILLS ================= */}
          <div className="flex items-center space-x-2 mt-4 overflow-x-auto no-scrollbar py-1">
            {categoryPills.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentStoryIndex(0);
                  }}
                  className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'bg-[#34d399] text-[#092219] shadow-[0_2px_12px_rgba(52,211,153,0.35)]'
                      : 'bg-[#15151c] text-[#8e8e9d] hover:text-white border border-white/[0.06]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* ================= 3. MORNING BRIEF TITLE HEADER ================= */}
          <div className="mt-4">
            <div className="text-[11px] font-mono tracking-wider font-semibold text-[#6366f1] uppercase">
              {dateHeader}
            </div>

            <h1 className="text-[25px] sm:text-[27px] font-bold text-white tracking-tight leading-tight mt-1">
              {language === 'hi' ? `सुप्रभात, ${userName} —` : `Good morning, ${userName} —`}
            </h1>
            
            <h2 className="text-[23px] sm:text-[25px] font-serif italic text-gradient-purple -mt-1 font-normal">
              {language === 'hi' ? `${filteredStories.length} खास खबरें।` : `${filteredStories.length} things.`}
            </h2>

            {/* Audio live subheader */}
            <div className="flex items-center space-x-2 text-[12px] text-zinc-400 mt-1.5 font-medium">
              <span className="flex items-center gap-1.5 text-[#34d399] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#34d399] animate-pulse" />
                Audio live
              </span>
              <span>•</span>
              <span>Voice: <strong className="text-white font-semibold">Aria</strong></span>
              <span>•</span>
              <span>{filteredStories.length} stories</span>
              <span>•</span>
              <span>18:30</span>
            </div>
          </div>

        </div>

        {/* ================= 4. MAIN NEWS PLAYER CARD ================= */}
        <div className="flex-1 px-6 sm:px-7 py-2.5 flex flex-col justify-center">
          <div className="w-full bg-[#13131a] border border-white/[0.09] rounded-[30px] p-5 shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex flex-col justify-between relative overflow-hidden">
            
            {/* Ambient inner soft glow */}
            <div 
              className="pointer-events-none absolute -top-10 -right-10 w-44 h-44 rounded-full opacity-20 blur-[50px]"
              style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }}
            />

            {/* Top pill & Counter row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#201c34] border border-[#8b5cf6]/30 text-[#a855f7] text-[10.5px] font-mono font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] animate-ping" />
                <span>NOW PLAYING • {currentStory.category}</span>
              </div>

              <span className="text-[12px] font-mono text-zinc-400 font-semibold tracking-wider">
                0{currentStoryIndex + 1} / 0{filteredStories.length}
              </span>
            </div>

            {/* Big Headline */}
            <h3 className="text-[19px] sm:text-[21px] font-bold text-white leading-snug mt-3 font-serif">
              {currentStory.title}
            </h3>

            {/* Source & Metadata row */}
            <div className="flex items-center justify-between text-[11px] font-mono tracking-wider text-zinc-400 mt-2">
              <div className="flex items-center space-x-2">
                <span className="text-[#818cf8] font-bold">{currentStory.source}</span>
                <span>•</span>
                <span>{currentStory.duration}</span>
                <span>•</span>
                <a 
                  href={currentStory.sourceUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-[#34d399] hover:underline flex items-center gap-0.5 font-bold cursor-pointer"
                >
                  SOURCE <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>

              <button
                onClick={() => toggleSaveStory(currentStory.id)}
                className={`flex items-center gap-1 uppercase transition-colors cursor-pointer ${
                  savedIds.includes(currentStory.id) ? 'text-[#8b5cf6] font-bold' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {savedIds.includes(currentStory.id) ? '✓ SAVED' : '+ SAVE'}
              </button>
            </div>

            {/* Subtitle Snippet */}
            <p className="text-[12px] text-zinc-500 mt-2 line-clamp-1">
              {currentStory.snippet}
            </p>

            {/* Waveform Visualizer */}
            <div className="mt-4 mb-2">
              <div className="flex items-end justify-between h-8 px-1 mb-2">
                {[
                  35, 60, 45, 80, 50, 95, 70, 40, 85, 100, 
                  60, 75, 50, 90, 65, 45, 80, 55, 95, 40, 
                  70, 85, 45, 60
                ].map((height, idx) => {
                  const isActive = (idx / 24) * 100 <= progressPercent;
                  return (
                    <span
                      key={idx}
                      className={`w-[4.5px] rounded-full transition-all duration-200 ${
                        isActive
                          ? 'bg-gradient-to-t from-[#6366f1] to-[#a855f7]'
                          : 'bg-[#252533]'
                      } ${isPlaying ? 'animate-pulse' : ''}`}
                      style={{ 
                        height: isPlaying ? `${Math.max(15, (height * (progressPercent % 10 + 5)) / 12)}%` : `${height * 0.7}%`,
                        animationDelay: `${idx * 0.05}s`
                      }}
                    />
                  );
                })}
              </div>

              {/* Scrub timeline */}
              <div className="w-full bg-[#20202c] h-[3.5px] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Time displays */}
              <div className="flex justify-between text-[11px] font-mono text-zinc-500 mt-1 px-0.5">
                <span>02:14</span>
                <span>-03:47</span>
              </div>
            </div>

            {/* Audio Controls Row */}
            <div className="flex items-center justify-between pt-1">
              
              {/* Skip Back */}
              <button
                onClick={handlePrevTrack}
                className="w-11 h-11 rounded-full bg-[#1b1b24] hover:bg-[#23232f] text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Previous story"
              >
                <SkipBack className="w-4 h-4 fill-current" />
              </button>

              {/* Large Glowing Play/Pause Button */}
              <button
                onClick={togglePlay}
                className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#6366f1] via-[#7c3aed] to-[#a855f7] text-white flex items-center justify-center shadow-[0_0_25px_rgba(139,92,246,0.6)] active:scale-95 transition-transform cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play Live Audio'}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 fill-current" />
                ) : (
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                )}
              </button>

              {/* Skip Forward */}
              <button
                onClick={handleNextTrack}
                className="w-11 h-11 rounded-full bg-[#1b1b24] hover:bg-[#23232f] text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Next story"
              >
                <SkipForward className="w-4 h-4 fill-current" />
              </button>

              {/* Playback Speed Button */}
              <button
                onClick={cycleSpeed}
                className="px-3.5 py-2.5 rounded-2xl bg-[#1b1b24] hover:bg-[#23232f] text-zinc-300 hover:text-white font-mono text-[12px] font-semibold transition-colors cursor-pointer"
                title="Playback speed"
              >
                {SPEED_OPTIONS[speedIndex]}
              </button>

            </div>

          </div>
        </div>

        {/* ================= 5. DOCKED NARRATING BAR & BOTTOM NAVIGATION ================= */}
        <div className="w-full relative z-20 px-4 pb-3 sm:px-6 sm:pb-5">
          
          {/* Now Narrating Bar with Floating Mini Play Button */}
          <div className="w-full bg-[#121218] border border-white/[0.08] rounded-2xl px-4 py-2.5 mb-2 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-[12px] text-[#34d399] font-medium truncate max-w-[70%]">
              <span className="text-[13px]">🎙</span>
              <span className="truncate">
                Now narrating — {currentStory.title}
              </span>
            </div>

            {/* Floating glowing Pause / Play Button */}
            <button
              onClick={togglePlay}
              className="w-11 h-11 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.6)] shrink-0 cursor-pointer active:scale-95 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-current" />
              ) : (
                <Play className="w-4 h-4 fill-current translate-x-0.5" />
              )}
            </button>
          </div>

          {/* Bottom Bar: Discover & Settings */}
          <div className="w-full bg-[#121218]/90 backdrop-blur-md rounded-2xl border border-white/[0.06] px-8 py-2.5 flex items-center justify-between text-zinc-400">
            <button 
              onClick={() => {
                setSelectedCategory('All');
              }}
              className="flex flex-col items-center space-y-1 hover:text-white transition-colors cursor-pointer group"
            >
              <Compass className="w-4 h-4 group-hover:text-[#34d399]" />
              <span className="text-[10px] font-semibold tracking-wider uppercase">Discover</span>
            </button>

            <button 
              onClick={() => setShowSettingsModal(true)}
              className="flex flex-col items-center space-y-1 hover:text-white transition-colors cursor-pointer group"
            >
              <Settings className="w-4 h-4 group-hover:text-[#8b5cf6]" />
              <span className="text-[10px] font-semibold tracking-wider uppercase">Settings</span>
            </button>
          </div>

          {/* iOS Bottom Home Bar */}
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
                  placeholder="Search live news topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-[14px] text-white focus:outline-none placeholder-zinc-500"
                />
              </div>
              <button 
                onClick={() => setShowSearchModal(false)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-3 space-y-2">
              {allStories
                .filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.snippet.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((story) => (
                  <div
                    key={story.id}
                    onClick={() => {
                      const idx = filteredStories.findIndex(fs => fs.id === story.id);
                      if (idx !== -1) setCurrentStoryIndex(idx);
                      setIsPlaying(true);
                      setShowSearchModal(false);
                    }}
                    className="p-3 bg-[#15151c] hover:bg-[#1d1d26] rounded-xl border border-white/[0.06] cursor-pointer transition-colors text-left"
                  >
                    <span className="text-[10px] font-mono text-[#8b5cf6] font-semibold">{story.category}</span>
                    <h4 className="text-[13px] font-semibold text-white mt-0.5">{story.title}</h4>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ================= SETTINGS & ACCOUNT MODAL ================= */}
        {showSettingsModal && (
          <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-end p-4 animate-in fade-in">
            <div className="w-full bg-[#111116] border border-white/[0.12] rounded-3xl p-5 text-left shadow-2xl relative">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-3.5 pb-4 border-b border-white/[0.08]">
                <img
                  src={user?.picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.name || 'User')}`}
                  alt={user?.name || 'User'}
                  className="w-12 h-12 rounded-full border-2 border-[#8b5cf6] p-0.5 object-cover"
                />
                <div className="flex flex-col">
                  <h4 className="text-[15px] font-bold text-white">{user?.name || 'Nuzio Member'}</h4>
                  <p className="text-[11.5px] text-zinc-400 truncate max-w-[200px]">{user?.email}</p>
                  <span className="text-[10.5px] text-[#34d399] font-medium mt-0.5">● Connected to Database</span>
                </div>
              </div>

              <div className="py-3 space-y-2.5 text-[13px]">
                <div className="flex justify-between items-center py-1 text-zinc-400">
                  <span>Selected Topics:</span>
                  <button 
                    onClick={() => {
                      setShowSettingsModal(false);
                      resetNichesOnboarding();
                      if (onEditNiches) onEditNiches();
                    }}
                    className="text-[#38bdf8] hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>{selectedNiches.length} niches (Edit)</span>
                  </button>
                </div>

                <div className="flex justify-between items-center py-1 text-zinc-400">
                  <span>Language / भाषा:</span>
                  <button 
                    onClick={() => selectLanguage(language === 'en' ? 'hi' : 'en')}
                    className="text-[#a855f7] hover:text-white font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    {language === 'en' ? 'English (Switch to हिन्दी)' : 'हिन्दी (Switch to English)'}
                  </button>
                </div>
                <div className="flex justify-between py-1 text-zinc-400">
                  <span>Voice Agent:</span>
                  <span className="text-white font-medium">Aria (Neural Studio Engine)</span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.08] flex flex-col space-y-2">
                <button
                  onClick={() => {
                    setShowSettingsModal(false);
                    logout();
                  }}
                  className="w-full py-2.5 bg-[#ef4444]/10 hover:bg-[#ef4444]/20 border border-[#ef4444]/30 text-[#f87171] rounded-xl font-semibold text-[13.5px] flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
                <button
                  onClick={() => setShowSettingsModal(false)}
                  className="w-full py-2 text-zinc-400 hover:text-white text-[12.5px] font-medium text-center cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
