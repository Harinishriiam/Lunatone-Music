
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { 
  Home, 
  Search, 
  Library, 
  Heart, 
  ListMusic, 
  PlayCircle, 
  PauseCircle, 
  SkipBack, 
  SkipForward, 
  Shuffle, 
  Repeat, 
  Volume2, 
  VolumeX,
  User as UserIcon,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Disc,
  Flame,
  Music2,
  Clock,
  Plus,
  X,
  Mic2,
  Globe,
  Radio,
  Star,
  CreditCard,
  CheckCircle,
  Zap,
  LayoutGrid,
  TrendingUp,
  Headphones,
  Compass,
  Smile,
  Moon,
  Coffee,
  PartyPopper,
  Gamepad2,
  Library as LibraryIcon,
  FolderMusic,
  Users
} from 'lucide-react';
import { Song, Language, Category, ViewType, User } from './types';
import { MOCK_SONGS, LANGUAGES, CATEGORIES, BRAND_LOGO } from './constants';

// --- Utilities ---
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// --- Components ---

const SidebarItem: React.FC<{ icon: any, label: string, active?: boolean, onClick: () => void }> = ({ icon: Icon, label, active = false, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-3 cursor-pointer transition-all duration-300 rounded-xl group ${active ? 'bg-purple-900/40 text-purple-400 border border-purple-500/20 shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
  >
    <Icon size={20} className={active ? 'text-purple-400' : 'group-hover:text-purple-300'} />
    <span className="font-semibold text-sm tracking-wide">{label}</span>
  </button>
);

const SongCard: React.FC<{ song: Song; onPlay: (song: Song) => void; isPlaying: boolean; isLiked: boolean; onLike: (id: string) => void }> = ({ song, onPlay, isPlaying, isLiked, onLike }) => (
  <div className="group bg-white/5 hover:bg-white/10 p-4 rounded-2xl transition-all duration-500 cursor-pointer flex flex-col gap-3 glass relative hover:scale-[1.03] shadow-lg">
    <div className="relative aspect-square rounded-xl overflow-hidden shadow-2xl" onClick={() => onPlay(song)}>
      <img src={song.cover} alt={song.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className={`absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isPlaying ? 'opacity-100' : ''}`}>
        {isPlaying ? <PauseCircle size={56} className="text-purple-400 drop-shadow-glow" /> : <PlayCircle size={56} className="text-white drop-shadow-xl" />}
      </div>
      <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur rounded text-[10px] font-bold text-white uppercase tracking-tighter border border-white/10">
        {song.language}
      </div>
    </div>
    <div className="flex justify-between items-start px-1">
      <div className="mt-1 overflow-hidden" onClick={() => onPlay(song)}>
        <h3 className="font-bold text-white truncate text-sm leading-tight group-hover:text-purple-300 transition-colors">{song.title}</h3>
        <p className="text-[11px] text-purple-400/80 font-bold truncate mt-1">{song.movie || song.album}</p>
        <p className="text-[11px] text-gray-400 truncate mt-0.5">{song.artist}</p>
      </div>
      <button 
        onClick={(e) => { e.stopPropagation(); onLike(song.id); }}
        className={`mt-1.5 transition-all active:scale-125 ${isLiked ? 'text-purple-500 drop-shadow-glow' : 'text-gray-600 hover:text-white'}`}
      >
        <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
      </button>
    </div>
  </div>
);

const BrowseCategoryCard: React.FC<{ title: string, gradient: string, icon: any }> = ({ title, gradient, icon: Icon }) => (
  <div className={`relative aspect-square rounded-[2rem] overflow-hidden cursor-pointer group hover:scale-[1.05] transition-all duration-500 shadow-2xl border border-white/5`}>
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-80 group-hover:opacity-100 transition-opacity duration-500`}></div>
    <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
       <h3 className="text-2xl font-black tracking-tighter leading-tight drop-shadow-lg">{title}</h3>
       <div className="self-end transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <Icon size={48} className="text-white/80" />
       </div>
    </div>
    <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
  </div>
);

const LoginScreen: React.FC<{ onLogin: (name: string) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'harini.shrii.am@gmail.com' && password === 'hariniluna') {
      onLogin("HARINISHRII");
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black p-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_#2D004B_0%,_#000000_70%)] opacity-50"></div>
      <div className="glass border border-purple-500/20 w-full max-w-lg p-12 rounded-[3rem] relative animate-in fade-in zoom-in duration-500 shadow-[0_0_100px_rgba(147,51,234,0.1)]">
        <div className="text-center mb-10">
          <div className="w-24 h-24 bg-gradient-to-tr from-purple-600 to-indigo-500 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-purple-600/40 mx-auto mb-8 rotate-3">
             <span className="text-white font-black text-5xl">L</span>
          </div>
          <h2 className="text-5xl font-black bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent tracking-tighter">LUNATONE</h2>
          <p className="text-gray-400 mt-3 font-medium text-lg">Premium Sound, Professional Taste</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="harini.shrii.am@gmail.com" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium text-white" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium text-white" 
            />
          </div>
          {error && <p className="text-red-400 text-sm font-bold text-center">{error}</p>}
          <button type="submit" className="w-full py-5 rounded-2xl bg-purple-600 text-white font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-purple-600/20 mt-4 tracking-tight">Login Now</button>
        </form>
      </div>
    </div>
  );
};

const PaymentModal: React.FC<{ isOpen: boolean, onClose: () => void, onComplete: () => void }> = ({ isOpen, onClose, onComplete }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onComplete();
        onClose();
        setIsSuccess(false);
      }, 2000);
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-xl p-6">
      <div className="glass border border-white/10 w-full max-w-md p-10 rounded-[3rem] relative animate-in fade-in zoom-in duration-300">
        {!isSuccess ? (
          <>
            <button onClick={onClose} className="absolute top-8 right-8 text-gray-500 hover:text-white"><X/></button>
            <div className="text-center mb-8">
               <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-purple-400" size={32} />
               </div>
               <h3 className="text-3xl font-black tracking-tighter">Upgrade to Pro</h3>
               <p className="text-gray-400 text-sm mt-2">Unlock HIFI Audio & No Ads</p>
            </div>
            <form onSubmit={handlePay} className="space-y-4">
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Card Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18}/>
                    <input type="text" placeholder="4242 4242 4242 4242" className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50" required />
                  </div>
               </div>
               <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 ml-1">Expiry</label>
                    <input type="text" placeholder="MM/YY" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50" required />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 ml-1">CVC</label>
                    <input type="text" placeholder="123" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50" required />
                  </div>
               </div>
               <button 
                type="submit" 
                disabled={isProcessing}
                className="w-full py-4 bg-white text-black font-black rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
               >
                 {isProcessing ? <Disc className="animate-spin" size={20}/> : "Pay $9.99 / mo"}
               </button>
            </form>
          </>
        ) : (
          <div className="text-center py-10 animate-in zoom-in duration-500">
             <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                <CheckCircle size={56} className="text-white" />
             </div>
             <h3 className="text-4xl font-black tracking-tighter text-white">Payment Success!</h3>
             <p className="text-gray-400 mt-3">Welcome to Lunatone Pro, HARINISHRII.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [activeLangHub, setActiveLangHub] = useState<Language | null>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [volume, setVolume] = useState(80);
  const [progress, setProgress] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'none' | 'one' | 'all'>('none');
  const [likedSongs, setLikedSongs] = useState<Set<string>>(new Set());
  const [user, setUser] = useState<User | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [libraryTab, setLibraryTab] = useState<'playlists' | 'artists' | 'albums'>('playlists');

  const sidebarVolumeRef = useRef<HTMLDivElement>(null);
  const sidebarProgressRef = useRef<HTMLDivElement>(null);

  const toggleLike = (id: string) => {
    setLikedSongs(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handlePlaySong = (song: Song) => {
    if (currentSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  const navigateToHub = (lang: Language | null) => {
    setSelectedArtist(null);
    if (lang === null) {
      setCurrentView('home');
      setActiveLangHub(null);
    } else {
      setActiveLangHub(lang);
      setCurrentView('language-hub');
    }
  };

  const handleSeek = (e: React.MouseEvent, ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setProgress(newProgress);
  };

  const handleVolumeClick = (e: React.MouseEvent, ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newVol = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setVolume(newVol);
  };

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      // Each interval tick represents about 0.5 seconds.
      // We increment progress such that it covers the song's duration correctly.
      interval = setInterval(() => setProgress(prev => {
        if (!currentSong) return prev;
        const increment = (0.5 / currentSong.duration) * 100;
        return (prev >= 100 ? 0 : prev + increment);
      }), 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSong]);

  // Dynamic Theme Logic
  const getThemeColor = () => {
    if (isPlaying && currentSong?.themeColor) return currentSong.themeColor;
    if (currentView === 'language-hub' && activeLangHub) {
       const colors: Record<string, string> = {
         'Tamil': '#9333EA', 'Telugu': '#1E40AF', 'Malayalam': '#064E3B', 
         'Kannada': '#991B1B', 'Hindi': '#1F2937', 'English': '#334155'
       };
       return colors[activeLangHub] || '#1A0033';
    }
    return '#1A0033';
  };

  const backgroundStyle = {
    background: `radial-gradient(circle at 50% 0%, ${getThemeColor()}44 0%, #000000 70%), linear-gradient(135deg, #000000 0%, #1A0033 100%)`
  };

  // Search logic
  const filteredLibrary = useMemo(() => {
    if (!searchQuery) return MOCK_SONGS;
    const q = searchQuery.toLowerCase();
    return MOCK_SONGS.filter(s => 
      s.title.toLowerCase().includes(q) || 
      s.artist.toLowerCase().includes(q) || 
      s.movie?.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const hubSongs = useMemo(() => {
    if (!activeLangHub) return [];
    let base = MOCK_SONGS.filter(s => s.language === activeLangHub);
    if (selectedArtist) base = base.filter(s => s.artist === selectedArtist);
    return base;
  }, [activeLangHub, selectedArtist]);

  const hubArtists = useMemo(() => {
    if (!activeLangHub) return [];
    return Array.from(new Set(MOCK_SONGS.filter(s => s.language === activeLangHub).map(s => s.artist)));
  }, [activeLangHub]);

  const libraryArtists = useMemo(() => {
     return Array.from(new Set(MOCK_SONGS.map(s => s.artist))).slice(0, 20);
  }, []);

  const libraryAlbums = useMemo(() => {
     const albums: Record<string, Song> = {};
     MOCK_SONGS.forEach(s => {
       if (s.movie && !albums[s.movie]) albums[s.movie] = s;
     });
     return Object.values(albums).slice(0, 20);
  }, []);

  if (!user) {
    return <LoginScreen onLogin={(name) => setUser({ name, isLoggedIn: true })} />;
  }

  // --- View Renderers ---

  const renderLanguageChips = () => (
    <div className="flex items-center gap-4 mb-10 overflow-x-auto no-scrollbar pb-2">
      <button 
        onClick={() => navigateToHub(null)}
        className={`px-6 py-2 rounded-full text-xs font-black tracking-widest uppercase transition-all border ${!activeLangHub ? 'bg-white text-black border-white' : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'}`}
      >
        All
      </button>
      {LANGUAGES.map(lang => (
        <button 
          key={lang}
          onClick={() => navigateToHub(lang)}
          className={`px-6 py-2 rounded-full text-xs font-black tracking-widest uppercase transition-all border ${activeLangHub === lang ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-600/20' : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'}`}
        >
          {lang}
        </button>
      ))}
    </div>
  );

  const renderHome = () => (
    <div className="space-y-16 animate-in fade-in duration-1000">
      <section className="relative h-[28rem] rounded-[3rem] overflow-hidden group shadow-2xl border border-white/5">
         <img src="https://images.unsplash.com/photo-1514525253361-bee8718a74a2?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[4s]" alt="Featured" />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-16">
            <div className="flex items-center gap-3 mb-6">
               <span className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center shadow-lg"><Star size={20}/></span>
               <span className="text-xs font-black uppercase tracking-[0.4em] text-purple-400">Featured Mix</span>
            </div>
            <h2 className="text-8xl font-black mb-8 tracking-tighter drop-shadow-2xl">EVENING GLOW</h2>
            <div className="flex gap-6">
               <button onClick={() => handlePlaySong(MOCK_SONGS[0])} className="px-10 py-4 bg-white text-black font-black rounded-full hover:scale-110 active:scale-95 transition-all shadow-2xl">PLAY NOW</button>
               <button className="px-10 py-4 glass border border-white/10 font-black rounded-full hover:bg-white/10 transition-all">VIEW ALBUM</button>
            </div>
         </div>
      </section>

      {CATEGORIES.map(cat => (
        <section key={cat} className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black tracking-tight flex items-center gap-4">
              {cat === Category.TopHits ? <Flame className="text-orange-500" fill="currentColor"/> : <Radio className="text-purple-500"/>}
              {cat}
            </h2>
            <button className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-[0.3em] transition-colors">SEE ALL</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-8">
             {MOCK_SONGS.filter(s => s.category === cat).slice(0, 6).map(song => (
               <SongCard key={song.id} song={song} onPlay={handlePlaySong} isPlaying={currentSong?.id === song.id && isPlaying} isLiked={likedSongs.has(song.id)} onLike={toggleLike} />
             ))}
          </div>
        </section>
      ))}
    </div>
  );

  const renderHub = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
       <section className="relative h-[25rem] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/40 to-transparent z-10 flex flex-col justify-center p-16">
             <div className="flex items-center gap-3 mb-3">
               <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur border border-white/10 overflow-hidden">
                  <span className="text-white font-black text-xs">L</span>
               </div>
               <span className="text-xs font-black uppercase tracking-[0.4em] text-white/50">{activeLangHub} Spotlight</span>
             </div>
             <h2 className="text-7xl font-black tracking-tighter">{activeLangHub} Music</h2>
             <p className="text-gray-400 mt-4 max-w-xl font-medium leading-relaxed">
               Curated collection of the best {activeLangHub} melodies. From legendary classics to modern chart-toppers.
             </p>
             <div className="mt-8 flex gap-4">
                <button onClick={() => handlePlaySong(hubSongs[0])} className="px-10 py-3 bg-purple-600 rounded-full font-black text-sm flex items-center gap-3 hover:scale-105 transition-all shadow-xl shadow-purple-600/20">
                   <PlayCircle size={24} fill="currentColor"/> PLAY HUB MIX
                </button>
                <button className="px-10 py-3 glass border border-white/10 rounded-full font-black text-sm hover:bg-white/5 transition-all">FOLLOW</button>
             </div>
          </div>
          <img src={`https://picsum.photos/seed/${activeLangHub}-hub/1200/600`} className="w-full h-full object-cover opacity-50" alt={activeLangHub} />
       </section>

       <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 border-b border-white/5 pb-8">
          <button 
            onClick={() => setSelectedArtist(null)}
            className={`px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${!selectedArtist ? 'bg-purple-600 text-white shadow-lg' : 'bg-white/5 hover:bg-white/10 text-gray-400'}`}
          >
            All Artists
          </button>
          {hubArtists.map(artist => (
            <button 
              key={artist}
              onClick={() => setSelectedArtist(artist)}
              className={`px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${selectedArtist === artist ? 'bg-purple-600 text-white scale-105 shadow-lg' : 'bg-white/5 hover:bg-white/10 text-gray-400'}`}
            >
              {artist}
            </button>
          ))}
       </div>

       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-8">
          {hubSongs.map(song => (
            <SongCard key={song.id} song={song} onPlay={handlePlaySong} isPlaying={currentSong?.id === song.id && isPlaying} isLiked={likedSongs.has(song.id)} onLike={toggleLike} />
          ))}
       </div>
    </div>
  );

  const renderLiked = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex items-end gap-12 pt-10">
         <div className="w-72 h-72 bg-gradient-to-br from-indigo-700 to-purple-800 rounded-[3rem] shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex items-center justify-center border border-white/10">
            <Heart size={120} fill="white" className="drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]" />
         </div>
         <div className="flex flex-col gap-4 pb-4">
            <span className="text-xs font-black uppercase tracking-[0.5em] text-purple-400">Library Collection</span>
            <h2 className="text-9xl font-black tracking-tighter leading-none mb-2">Liked</h2>
            <div className="flex items-center gap-4 font-bold text-sm text-gray-300">
               <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center shadow-lg"><UserIcon size={14}/></div>
               <span>{user.name}</span> • <span className="text-white">{likedSongs.size} tracks collected</span>
            </div>
         </div>
      </div>
      <div className="glass rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
         <table className="w-full text-left">
            <thead className="border-b border-white/5 text-gray-500 text-[10px] uppercase tracking-[0.3em] font-black">
               <tr>
                  <th className="px-10 py-6 w-16 text-center">#</th>
                  <th className="px-10 py-6">Track Detail</th>
                  <th className="px-10 py-6">Collection / Lang</th>
                  <th className="px-10 py-6 text-right"><Clock size={18} className="inline-block" /></th>
               </tr>
            </thead>
            <tbody>
               {MOCK_SONGS.filter(s => likedSongs.has(s.id)).map((song, i) => (
                 <tr key={song.id} onClick={() => handlePlaySong(song)} className="group hover:bg-white/5 transition-all cursor-pointer">
                    <td className="px-10 py-5 text-center text-gray-500 font-bold group-hover:text-purple-400">{i + 1}</td>
                    <td className="px-10 py-5">
                       <div className="flex items-center gap-6">
                          <img src={song.cover} className="w-14 h-14 rounded-xl shadow-lg" alt={song.title} />
                          <div className="flex flex-col">
                             <span className="text-base font-bold group-hover:text-purple-400 transition-colors">{song.title}</span>
                             <span className="text-xs text-gray-400 mt-1">{song.artist}</span>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-5">
                       <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-300">{song.movie || song.album}</span>
                          <span className="text-[10px] text-purple-500 font-black uppercase tracking-widest mt-1">{song.language}</span>
                       </div>
                    </td>
                    <td className="px-10 py-5 text-sm text-gray-500 font-bold text-right tabular-nums tracking-tighter group-hover:text-white transition-colors">{formatTime(song.duration)}</td>
                 </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );

  const renderBrowse = () => (
    <div className="space-y-16 animate-in fade-in slide-in-from-bottom-12 duration-1000">
       <div className="flex flex-col gap-6">
          <h2 className="text-5xl font-black tracking-tighter flex items-center gap-4">
             <Compass className="text-purple-500" size={40} />
             Discover New Realms
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl font-medium">Explore handpicked genres, trending moods, and cultural hits across the globe.</p>
       </div>

       <section className="space-y-8">
          <h3 className="text-2xl font-black tracking-tight text-white/60 uppercase tracking-widest text-sm">Top Genres</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
             <BrowseCategoryCard title="Pop Magic" gradient="from-pink-600 to-orange-400" icon={Star} />
             <BrowseCategoryCard title="Hip-Hop Beats" gradient="from-blue-600 to-cyan-400" icon={Headphones} />
             <BrowseCategoryCard title="Indie Waves" gradient="from-emerald-600 to-teal-400" icon={Music2} />
             <BrowseCategoryCard title="Rock Classics" gradient="from-red-600 to-rose-400" icon={Disc} />
             <BrowseCategoryCard title="Electronic" gradient="from-indigo-600 to-purple-500" icon={Zap} />
          </div>
       </section>

       <section className="space-y-8">
          <h3 className="text-2xl font-black tracking-tight text-white/60 uppercase tracking-widest text-sm">Moods & Activities</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
             <BrowseCategoryCard title="Chill Lo-Fi" gradient="from-slate-700 to-slate-900" icon={Moon} />
             <BrowseCategoryCard title="Workout Energy" gradient="from-orange-600 to-red-600" icon={Flame} />
             <BrowseCategoryCard title="Morning Coffee" gradient="from-amber-600 to-yellow-600" icon={Coffee} />
             <BrowseCategoryCard title="Party Vibe" gradient="from-fuchsia-600 to-purple-700" icon={PartyPopper} />
             <BrowseCategoryCard title="Focus Mode" gradient="from-sky-700 to-blue-900" icon={Gamepad2} />
          </div>
       </section>

       <section className="space-y-8 pb-20">
          <div className="flex items-center justify-between">
             <h3 className="text-2xl font-black tracking-tight text-white/60 uppercase tracking-widest text-sm">Trending Worldwide</h3>
             <button className="text-[10px] font-black text-purple-500 hover:text-white uppercase tracking-widest">Global Top 50</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-8">
             {MOCK_SONGS.filter(s => s.category === Category.Trending).slice(0, 6).map(song => (
               <SongCard key={song.id} song={song} onPlay={handlePlaySong} isPlaying={currentSong?.id === song.id && isPlaying} isLiked={likedSongs.has(song.id)} onLike={toggleLike} />
             ))}
          </div>
       </section>
    </div>
  );

  const renderLibrary = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
       <div className="flex flex-col gap-8">
          <h2 className="text-5xl font-black tracking-tighter flex items-center gap-4">
             <LibraryIcon className="text-purple-500" size={44} />
             Your Collection
          </h2>
          
          <div className="flex items-center gap-6 border-b border-white/5 pb-4 overflow-x-auto no-scrollbar">
             {[
               { id: 'playlists', label: 'Playlists', icon: ListMusic },
               { id: 'artists', label: 'Artists', icon: Users },
               { id: 'albums', label: 'Albums', icon: Disc },
             ].map(tab => (
               <button 
                key={tab.id}
                onClick={() => setLibraryTab(tab.id as any)}
                className={`flex items-center gap-3 px-6 py-2 rounded-full text-sm font-bold transition-all border ${libraryTab === tab.id ? 'bg-purple-600 text-white border-purple-500 shadow-lg' : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'}`}
               >
                 <tab.icon size={18} />
                 {tab.label}
               </button>
             ))}
          </div>
       </div>

       {libraryTab === 'playlists' && (
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 animate-in fade-in zoom-in duration-500">
            {/* Special Liked Playlist Card */}
            <div 
              onClick={() => setCurrentView('liked')}
              className="col-span-2 relative h-full rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-2xl border border-white/5 p-8 flex flex-col justify-end min-h-[22rem]"
            >
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 via-purple-900 to-purple-600"></div>
               <div className="relative z-10 space-y-4">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur shadow-xl border border-white/10">
                     <Heart fill="white" size={32} />
                  </div>
                  <h3 className="text-5xl font-black tracking-tighter">Liked Songs</h3>
                  <p className="text-white/60 font-bold">{likedSongs.size} tracks saved</p>
               </div>
               <div className="absolute top-8 right-8 w-14 h-14 bg-white rounded-full flex items-center justify-center text-purple-600 transform scale-0 group-hover:scale-100 transition-transform duration-500 shadow-2xl">
                  <PlayCircle size={40} fill="currentColor" />
               </div>
            </div>

            {/* Other Mock Playlists */}
            {[
              { title: 'Daily Mix 1', color: 'bg-emerald-600', desc: 'Anirudh, Yuvan and more' },
              { title: 'Mega Hit Mix', color: 'bg-blue-600', desc: 'A.R. Rahman and more' },
              { title: 'Mood Booster', color: 'bg-amber-600', desc: 'High energy tracks' },
              { title: 'Late Night Melodies', color: 'bg-indigo-600', desc: 'Soothing favorites' },
              { title: 'Regional Gems', color: 'bg-rose-600', desc: 'Classic favorites' },
            ].map((p, i) => (
              <div key={i} className="group bg-white/5 hover:bg-white/10 p-6 rounded-[2rem] transition-all duration-500 cursor-pointer flex flex-col gap-4 glass relative shadow-lg h-full min-h-[22rem]">
                 <div className={`w-full aspect-square rounded-2xl ${p.color} shadow-2xl flex items-center justify-center p-8 relative overflow-hidden`}>
                    <Disc size={80} className="text-white/20 absolute -right-4 -bottom-4 rotate-12" />
                    <ListMusic size={60} className="text-white/80" />
                 </div>
                 <div className="mt-2">
                    <h3 className="text-xl font-black tracking-tight group-hover:text-purple-400 transition-colors">{p.title}</h3>
                    <p className="text-xs text-gray-500 mt-2 font-medium leading-relaxed">{p.desc}</p>
                 </div>
              </div>
            ))}
         </div>
       )}

       {libraryTab === 'artists' && (
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-10 animate-in fade-in slide-in-from-top-8 duration-500">
            {libraryArtists.map((artist, i) => (
              <div key={i} className="group flex flex-col items-center gap-6 cursor-pointer hover:scale-105 transition-all duration-500">
                 <div className="relative w-full aspect-square rounded-full overflow-hidden shadow-2xl border-4 border-white/5 ring-0 group-hover:ring-8 ring-purple-600/20 transition-all duration-500">
                    <img src={`https://picsum.photos/seed/${artist}-artist/300/300`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={artist} />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <UserIcon size={40} className="text-white/80" />
                    </div>
                 </div>
                 <div className="text-center">
                    <h3 className="text-lg font-black tracking-tight group-hover:text-purple-400 transition-colors">{artist}</h3>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">Artist</p>
                 </div>
              </div>
            ))}
         </div>
       )}

       {libraryTab === 'albums' && (
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
            {libraryAlbums.map((album, i) => (
              <div key={i} className="group bg-white/5 hover:bg-white/10 p-4 rounded-2xl transition-all duration-500 cursor-pointer flex flex-col gap-3 glass relative shadow-lg">
                 <div className="relative aspect-square rounded-xl overflow-hidden shadow-2xl">
                    <img src={album.cover} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={album.movie} />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <PlayCircle size={48} className="text-white shadow-2xl" />
                    </div>
                 </div>
                 <div className="mt-1">
                    <h3 className="font-bold text-white truncate text-sm leading-tight group-hover:text-purple-300 transition-colors">{album.movie}</h3>
                    <p className="text-[11px] text-gray-400 truncate mt-1">{album.artist}</p>
                 </div>
              </div>
            ))}
         </div>
       )}
    </div>
  );

  return (
    <div className="flex h-screen text-white overflow-hidden transition-all duration-1000 select-none font-sans" style={backgroundStyle}>
      
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        onComplete={() => setUser(u => u ? {...u, isLoggedIn: true} : null)} 
      />

      {/* Sidebar */}
      <aside className="w-72 flex flex-col glass border-r border-white/5 p-8 z-20">
        <div className="flex items-center gap-4 mb-14 px-2 cursor-pointer group" onClick={() => navigateToHub(null)}>
          <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-indigo-400 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-600/20 group-hover:rotate-12 transition-transform">
             <span className="text-white font-black text-2xl">L</span>
          </div>
          <h1 className="text-2xl font-black tracking-tighter group-hover:text-purple-400 transition-colors uppercase">LUNATONE</h1>
        </div>

        <nav className="flex-1 space-y-3 no-scrollbar overflow-y-auto">
          <SidebarItem icon={Home} label="Home" active={currentView === 'home'} onClick={() => navigateToHub(null)} />
          <SidebarItem icon={Compass} label="Browse" active={currentView === 'browse'} onClick={() => setCurrentView('browse')} />
          <SidebarItem icon={LibraryIcon} label="Your Library" active={currentView === 'library'} onClick={() => setCurrentView('library')} />
          
          <div className="pt-12 pb-4 px-4 flex justify-between items-center opacity-40">
             <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Personal</span>
             <Plus size={14} className="cursor-pointer hover:text-white" />
          </div>

          <SidebarItem icon={Heart} label="Liked Songs" active={currentView === 'liked'} onClick={() => setCurrentView('liked')} />
          <SidebarItem icon={Mic2} label="Tamil Hub" active={activeLangHub === Language.Tamil} onClick={() => navigateToHub(Language.Tamil)} />
          <SidebarItem icon={Music2} label="Telugu Hub" active={activeLangHub === Language.Telugu} onClick={() => navigateToHub(Language.Telugu)} />
          
          <div className="mt-6 px-4 space-y-3 border-l border-white/5 ml-2">
             {['Morning Melodies', 'Global Chart Busters', 'Indie Waves'].map(p => (
               <div key={p} className="text-[13px] font-medium text-gray-500 hover:text-purple-400 cursor-pointer transition-colors truncate py-1">{p}</div>
             ))}
          </div>
        </nav>

        <div 
          onClick={() => setIsPaymentModalOpen(true)}
          className="mt-auto p-6 rounded-[2rem] glass border border-purple-500/30 bg-purple-600/10 group hover:bg-purple-600/20 transition-all cursor-pointer text-center"
        >
           <Zap className="mx-auto mb-2 text-purple-400" size={24}/>
           <span className="text-sm font-black block">UPGRADE TO PRO</span>
           <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest">Only $9.99/mo</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        
        <header className="h-24 flex items-center justify-between px-12 z-10 sticky top-0 bg-transparent">
           <div className="flex items-center gap-10">
              <div className="flex gap-3">
                 <button onClick={() => navigateToHub(null)} className="p-3 rounded-full bg-black/60 border border-white/5 hover:bg-white/10 transition-all shadow-xl"><ChevronLeft size={20}/></button>
                 <button className="p-3 rounded-full bg-black/60 border border-white/5 opacity-50"><ChevronRight size={20}/></button>
              </div>
              <div className="relative group">
                 <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={20} />
                 <input 
                    type="text" 
                    placeholder="Search music, artists, movies..."
                    className="bg-white/5 border border-white/10 rounded-full pl-14 pr-8 py-3.5 w-[32rem] focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all text-sm font-semibold shadow-inner"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                 />

                 {/* Search Results Dropdown */}
                 {searchQuery && (
                   <div className="absolute top-full mt-4 w-full glass rounded-[2rem] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden z-[60] animate-in fade-in slide-in-from-top-4 duration-300 max-h-[35rem] overflow-y-auto no-scrollbar">
                      {filteredLibrary.length > 0 ? (
                        <div className="p-4 space-y-1">
                          {filteredLibrary.slice(0, 15).map(song => (
                            <div 
                              key={song.id} 
                              onClick={() => {
                                handlePlaySong(song);
                                setSearchQuery('');
                              }}
                              className="flex items-center gap-5 p-3.5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group border border-transparent hover:border-white/5"
                            >
                              <div className="w-14 h-14 rounded-xl overflow-hidden shadow-xl shrink-0">
                                 <img src={song.cover} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={song.title} />
                              </div>
                              <div className="flex-1 overflow-hidden">
                                 <p className="font-bold text-base truncate group-hover:text-purple-400 transition-colors tracking-tight">{song.title}</p>
                                 <p className="text-[11px] text-gray-400 truncate mt-0.5 font-medium">{song.artist} • {song.movie || song.album}</p>
                              </div>
                              <div className="flex flex-col items-end gap-1.5 shrink-0">
                                 <div className="text-[9px] font-black text-purple-400 uppercase tracking-widest bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20 shadow-sm">
                                    {song.language}
                                 </div>
                                 {likedSongs.has(song.id) && <Heart size={12} fill="#A855F7" className="text-purple-500" />}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-16 text-center animate-in fade-in zoom-in duration-500">
                           <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                              <Search size={32} className="text-gray-600" />
                           </div>
                           <h4 className="text-xl font-black text-white/40 tracking-tight">No tracks found</h4>
                           <p className="text-sm text-gray-500 mt-2">Try searching for a different keyword</p>
                        </div>
                      )}
                   </div>
                 )}
              </div>
           </div>

           <div className="flex items-center gap-8">
              <div 
                className="flex items-center gap-4 bg-black/50 p-2 pr-6 rounded-full cursor-pointer hover:bg-white/10 transition-all border border-white/5 shadow-2xl"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg ring-2 ring-purple-500/20"><UserIcon size={20}/></div>
                <div className="flex flex-col">
                   <span className="text-sm font-black tracking-tight leading-none">{user.name}</span>
                   <span className="text-[10px] font-black text-purple-500 uppercase tracking-tighter mt-1">{user.isLoggedIn ? 'PREMIUM' : 'GUEST'}</span>
                </div>
              </div>
           </div>
        </header>

        {/* Dynamic View Area */}
        <div className="flex-1 overflow-y-auto px-12 pb-44 no-scrollbar scroll-smooth">
           {currentView === 'home' && renderLanguageChips()}
           {currentView === 'home' && renderHome()}
           {currentView === 'language-hub' && renderHub()}
           {currentView === 'liked' && renderLiked()}
           {currentView === 'browse' && renderBrowse()}
           {currentView === 'library' && renderLibrary()}
        </div>

      </main>

      {/* Right Sidebar - Now Playing Detail */}
      {currentSong && (
        <aside className="w-[26rem] flex flex-col glass border-l border-white/5 p-10 z-20 animate-in slide-in-from-right duration-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-600/10 to-transparent pointer-events-none"></div>
          
          <div className="flex items-center justify-between mb-8 relative">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">Now Playing</h2>
            <button 
              onClick={() => setCurrentSong(null)} 
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-500 hover:text-white"
            >
              <X size={20}/>
            </button>
          </div>

          <div className="flex-1 flex flex-col relative no-scrollbar overflow-y-auto pb-32">
             <div className="relative aspect-square rounded-[2.5rem] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)] mb-8 border border-white/5 group">
                <img src={currentSong.cover} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" alt="Cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
             </div>

             <div className="mb-8 px-2">
                <h3 className="text-4xl font-black tracking-tighter leading-tight mb-3 hover:text-purple-300 transition-colors cursor-pointer">{currentSong.title}</h3>
                <p className="text-purple-400 font-bold text-xl mb-0.5">{currentSong.artist}</p>
                <p className="text-gray-400 text-sm font-semibold italic opacity-80 mb-3">{currentSong.movie || currentSong.album}</p>
                
                <div className="inline-flex items-center px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full shadow-sm">
                   <span className="uppercase text-[10px] tracking-[0.2em] font-black text-purple-300">{currentSong.language}</span>
                </div>
             </div>

             <div className="space-y-8 mt-auto bg-black/40 p-8 rounded-[2rem] border border-white/5 backdrop-blur-md shadow-inner">
                {/* Progress Section */}
                <div className="space-y-4">
                   <div 
                    ref={sidebarProgressRef}
                    onClick={(e) => handleSeek(e, sidebarProgressRef)}
                    className="h-1.5 bg-white/10 rounded-full relative group cursor-pointer overflow-hidden hover:h-2 transition-all"
                   >
                      <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-600 to-indigo-400 rounded-full group-hover:from-purple-400 transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.5)]" style={{ width: `${progress}%` }}></div>
                   </div>
                   <div className="flex justify-between text-[11px] font-black text-gray-500 tracking-tighter tabular-nums">
                      <span>{formatTime((progress / 100) * currentSong.duration)}</span>
                      <span className="text-gray-400">{formatTime(currentSong.duration)}</span>
                   </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between px-2">
                   <button className="text-gray-500 hover:text-white transition-all active:scale-90"><Shuffle size={20}/></button>
                   <div className="flex items-center gap-6">
                      <button className="text-gray-400 hover:text-white transition-all active:scale-90"><SkipBack size={28} fill="currentColor"/></button>
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-purple-600/30 border-4 border-black/5"
                      >
                        {isPlaying ? <PauseCircle size={36} fill="currentColor"/> : <PlayCircle size={36} fill="currentColor" className="ml-1"/>}
                      </button>
                      <button className="text-gray-400 hover:text-white transition-all active:scale-90"><SkipForward size={28} fill="currentColor"/></button>
                   </div>
                   <button className="text-gray-500 hover:text-white transition-all active:scale-90"><Repeat size={20}/></button>
                </div>

                {/* Volume Section */}
                <div className="pt-8 border-t border-white/10">
                   <div className="flex items-center gap-4 group">
                      <Volume2 size={20} className="text-gray-500 group-hover:text-purple-400 transition-colors"/>
                      <div 
                        ref={sidebarVolumeRef}
                        onClick={(e) => handleVolumeClick(e, sidebarVolumeRef)}
                        className="flex-1 h-1.5 bg-white/10 rounded-full relative cursor-pointer group-hover:bg-white/20 transition-all"
                      >
                         <div className="absolute inset-y-0 left-0 bg-purple-500 rounded-full shadow-glow" style={{ width: `${volume}%` }}></div>
                         <div className="absolute h-3 w-3 bg-white rounded-full -top-[3px] opacity-0 group-hover:opacity-100 shadow-2xl transition-all" style={{ left: `calc(${volume}% - 6px)` }}></div>
                      </div>
                      <span className="text-[11px] font-black text-gray-500 w-10 text-right tabular-nums group-hover:text-white">{Math.round(volume)}%</span>
                   </div>
                </div>
             </div>
          </div>
        </aside>
      )}

      {/* Music Player Bar (Maintains bottom player as per original structure) */}
      <footer className="fixed bottom-0 left-0 right-0 h-32 glass border-t border-white/5 px-10 flex items-center justify-between z-50 shadow-[0_-20px_80px_rgba(0,0,0,0.9)]">
        
        {/* Current Info */}
        <div className="w-1/4 flex items-center gap-6">
           {currentSong ? (
             <>
               <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-2xl relative group border border-white/5">
                  <img src={currentSong.cover} className="w-full h-full object-cover" alt="Cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ChevronLeft size={24} className="rotate-90 text-white"/>
                  </div>
               </div>
               <div className="flex flex-col gap-1.5 overflow-hidden">
                  <span className="text-lg font-black truncate hover:underline cursor-pointer tracking-tight">{currentSong.title}</span>
                  <div className="flex items-center gap-2">
                     <span className="text-[11px] font-black text-purple-500 uppercase tracking-tighter">{currentSong.language}</span>
                     <span className="text-[11px] font-bold text-gray-500 truncate hover:text-white cursor-pointer">{currentSong.artist} • {currentSong.movie || currentSong.album}</span>
                  </div>
               </div>
               <button onClick={() => toggleLike(currentSong.id)} className={`transition-all hover:scale-125 ml-2 ${likedSongs.has(currentSong.id) ? 'text-purple-500 drop-shadow-glow' : 'text-gray-500 hover:text-white'}`}>
                 <Heart size={22} fill={likedSongs.has(currentSong.id) ? "currentColor" : "none"} />
               </button>
             </>
           ) : (
             <div className="text-gray-700 font-black uppercase tracking-[0.5em] text-[11px] flex items-center gap-3">
                <Radio className="animate-pulse" size={16}/> LUNATONE STREAMING
             </div>
           )}
        </div>

        {/* Player Core */}
        <div className="w-2/4 max-w-3xl flex flex-col items-center gap-4">
           <div className="flex items-center gap-12">
              <button onClick={() => setIsShuffle(!isShuffle)} className={`transition-all hover:scale-110 ${isShuffle ? 'text-purple-400 drop-shadow-glow' : 'text-gray-500 hover:text-white'}`}><Shuffle size={22}/></button>
              <button className="text-gray-400 hover:text-white transition-all active:scale-90"><SkipBack size={32} fill="currentColor"/></button>
              <button onClick={() => setIsPlaying(!isPlaying)} className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black hover:scale-110 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] border-[6px] border-black/5">
                 {isPlaying ? <PauseCircle size={44} fill="currentColor"/> : <PlayCircle size={44} fill="currentColor" className="ml-1.5"/>}
              </button>
              <button className="text-gray-400 hover:text-white transition-all active:scale-90"><SkipForward size={32} fill="currentColor"/></button>
              <button onClick={() => setRepeatMode(r => r === 'none' ? 'all' : r === 'all' ? 'one' : 'none')} className={`relative transition-all hover:scale-110 ${repeatMode !== 'none' ? 'text-purple-400 drop-shadow-glow' : 'text-gray-500 hover:text-white'}`}>
                 <Repeat size={22}/>
                 {repeatMode === 'one' && <span className="absolute -top-2 -right-2 bg-purple-500 text-[9px] px-1.5 py-0.5 rounded-full text-white font-black shadow-lg">1</span>}
              </button>
           </div>
           <div className="w-full flex items-center gap-6 px-10">
              <span className="text-[11px] font-black text-gray-500 w-14 text-right tabular-nums tracking-tighter">
                {currentSong ? formatTime((progress / 100) * currentSong.duration) : '0:00'}
              </span>
              <div className="flex-1 h-2 bg-white/10 rounded-full relative group cursor-pointer overflow-hidden">
                 <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full group-hover:from-purple-400 transition-all duration-300" style={{ width: `${progress}%` }}></div>
                 <div className="absolute h-4 w-4 bg-white rounded-full -top-1 opacity-0 group-hover:opacity-100 shadow-2xl transition-all" style={{ left: `calc(${progress}% - 8px)` }}></div>
              </div>
              <span className="text-[11px] font-black text-gray-500 w-14 tabular-nums tracking-tighter">
                {currentSong ? formatTime(currentSong.duration) : '0:00'}
              </span>
           </div>
        </div>

        {/* Utilities */}
        <div className="w-1/4 flex items-center justify-end gap-8 pr-4">
           <Mic2 size={20} className="text-gray-500 hover:text-purple-400 cursor-pointer transition-all hover:scale-110"/>
           <ListMusic size={20} className="text-gray-500 hover:text-purple-400 cursor-pointer transition-all hover:scale-110"/>
           <div className="flex items-center gap-4 group">
              <Volume2 size={22} className="text-gray-500 group-hover:text-white transition-colors"/>
              <div 
                className="w-28 h-2 bg-white/10 rounded-full relative overflow-hidden group-hover:bg-white/20 cursor-pointer transition-all"
              >
                 <div className="absolute inset-y-0 left-0 bg-purple-500 rounded-full shadow-glow" style={{ width: `${volume}%` }}></div>
              </div>
           </div>
           <MoreHorizontal size={22} className="text-gray-500 hover:text-white cursor-pointer transition-all hover:scale-110"/>
        </div>

      </footer>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        .drop-shadow-glow {
          filter: drop-shadow(0 0 10px rgba(168, 85, 247, 0.6));
        }
        .shadow-glow {
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.4);
        }
      `}</style>
    </div>
  );
}
