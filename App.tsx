
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
  Radio,
  Star,
  CreditCard,
  CheckCircle,
  Zap,
  Compass,
  Library as LibraryIcon,
  Users,
  Play,
  Pause,
  Menu,
  Settings,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { Song, Language, Category, ViewType, User } from './types';
import { MOCK_SONGS, LANGUAGES, CATEGORIES } from './constants';

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
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [libraryTab, setLibraryTab] = useState<'playlists' | 'artists' | 'albums'>('playlists');
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const sidebarVolumeRef = useRef<HTMLDivElement>(null);
  const sidebarProgressRef = useRef<HTMLDivElement>(null);
  const footerVolumeRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

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
      setIsRightSidebarOpen(true);
    }
  };

  const navigateTo = (view: ViewType, lang: Language | null = null) => {
    setCurrentView(view);
    setActiveLangHub(lang);
    setSelectedArtist(null);
    setIsRightSidebarOpen(false); 
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
      interval = setInterval(() => setProgress(prev => {
        if (!currentSong) return prev;
        const increment = (0.5 / currentSong.duration) * 100;
        return (prev >= 100 ? 0 : prev + increment);
      }), 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentSong]);

  // Outside click listener for profile dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileOpen]);

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

  const filteredLibrary = useMemo(() => {
    if (!searchQuery) return [];
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
        onClick={() => { setActiveLangHub(null); navigateTo('home'); }}
        className={`px-6 py-2 rounded-full text-xs font-black tracking-widest uppercase transition-all border shrink-0 ${!activeLangHub ? 'bg-white text-black border-white' : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'}`}
      >
        All
      </button>
      {LANGUAGES.map(lang => (
        <button 
          key={lang}
          onClick={() => navigateTo('language-hub', lang)}
          className={`px-6 py-2 rounded-full text-xs font-black tracking-widest uppercase transition-all border shrink-0 ${activeLangHub === lang ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-600/20' : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'}`}
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
               Curated collection of the best {activeLangHub} melodies.
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
         <div className="w-56 h-56 bg-gradient-to-br from-indigo-700 to-purple-800 rounded-[2rem] shadow-2xl flex items-center justify-center border border-white/10">
            <Heart size={80} fill="white" className="drop-shadow-lg" />
         </div>
         <div className="flex flex-col gap-4 pb-4">
            <span className="text-xs font-black uppercase tracking-[0.5em] text-purple-400">Library Collection</span>
            <h2 className="text-7xl font-black tracking-tighter leading-none mb-2">Liked Songs</h2>
            <div className="flex items-center gap-4 font-bold text-sm text-gray-300">
               <span>{user.name}</span> • <span className="text-white">{likedSongs.size} tracks collected</span>
            </div>
         </div>
      </div>
      <div className="glass rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
         <table className="w-full text-left">
            <thead className="border-b border-white/5 text-gray-500 text-[10px] uppercase tracking-[0.3em] font-black">
               <tr>
                  <th className="px-10 py-4 w-16 text-center">#</th>
                  <th className="px-10 py-4">Track Detail</th>
                  <th className="px-10 py-4">Collection / Lang</th>
                  <th className="px-10 py-4 text-right"><Clock size={18} className="inline-block" /></th>
               </tr>
            </thead>
            <tbody>
               {MOCK_SONGS.filter(s => likedSongs.has(s.id)).map((song, i) => (
                 <tr key={song.id} onClick={() => handlePlaySong(song)} className="group hover:bg-white/5 transition-all cursor-pointer border-b border-white/5 last:border-0">
                    <td className="px-10 py-3 text-center text-gray-500 font-bold group-hover:text-purple-400">{i + 1}</td>
                    <td className="px-10 py-3">
                       <div className="flex items-center gap-4">
                          <img src={song.cover} className="w-12 h-12 rounded-lg shadow-lg" alt={song.title} />
                          <div className="flex flex-col">
                             <span className="text-sm font-bold group-hover:text-purple-400 transition-colors">{song.title}</span>
                             <span className="text-xs text-gray-400">{song.artist}</span>
                          </div>
                       </div>
                    </td>
                    <td className="px-10 py-3">
                       <div className="flex flex-col">
                          <span className="text-xs font-bold text-gray-300">{song.movie || song.album}</span>
                          <span className="text-[9px] text-purple-500 font-black uppercase tracking-widest mt-0.5">{song.language}</span>
                       </div>
                    </td>
                    <td className="px-10 py-3 text-xs text-gray-500 font-bold text-right tabular-nums group-hover:text-white transition-colors">{formatTime(song.duration)}</td>
                 </tr>
               ))}
            </tbody>
         </table>
      </div>
    </div>
  );

  const renderLibrary = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
       <div className="flex flex-col gap-6">
          <h2 className="text-4xl font-black tracking-tighter flex items-center gap-4">
             <LibraryIcon className="text-purple-500" size={36} />
             Your Collection
          </h2>
          <div className="flex items-center gap-6 border-b border-white/5 pb-2 overflow-x-auto no-scrollbar">
             {[
               { id: 'playlists', label: 'Playlists', icon: ListMusic },
               { id: 'artists', label: 'Artists', icon: Users },
               { id: 'albums', label: 'Albums', icon: Disc },
             ].map(tab => (
               <button 
                key={tab.id}
                onClick={() => setLibraryTab(tab.id as any)}
                className={`flex items-center gap-3 px-6 py-2 rounded-full text-xs font-bold transition-all border ${libraryTab === tab.id ? 'bg-purple-600 text-white border-purple-500 shadow-lg' : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20'}`}
               >
                 <tab.icon size={16} />
                 {tab.label}
               </button>
             ))}
          </div>
       </div>

       {libraryTab === 'playlists' && (
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 animate-in fade-in zoom-in duration-500">
            <div 
              onClick={() => navigateTo('liked')}
              className="col-span-2 relative rounded-[2rem] overflow-hidden group cursor-pointer shadow-2xl border border-white/5 p-8 flex flex-col justify-end min-h-[16rem]"
            >
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-800 via-purple-900 to-purple-600"></div>
               <div className="relative z-10 space-y-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur shadow-xl border border-white/10">
                     <Heart fill="white" size={24} />
                  </div>
                  <h3 className="text-4xl font-black tracking-tighter">Liked Songs</h3>
                  <p className="text-white/60 font-bold">{likedSongs.size} tracks saved</p>
               </div>
            </div>
            {[{ title: 'Daily Mix 1', color: 'bg-emerald-600' }, { title: 'Mood Booster', color: 'bg-amber-600' }].map((p, i) => (
              <div key={i} className="group bg-white/5 hover:bg-white/10 p-4 rounded-[2rem] transition-all cursor-pointer flex flex-col gap-4 glass relative shadow-lg min-h-[16rem]">
                 <div className={`w-full aspect-square rounded-2xl ${p.color} flex items-center justify-center shadow-lg relative overflow-hidden`}>
                    <Music2 size={40} className="text-white/80" />
                 </div>
                 <h3 className="text-base font-black tracking-tight group-hover:text-purple-400 transition-colors">{p.title}</h3>
              </div>
            ))}
         </div>
       )}

       {libraryTab === 'artists' && (
         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-10 animate-in fade-in slide-in-from-top-8 duration-500">
            {libraryArtists.map((artist, i) => (
              <div key={i} className="group flex flex-col items-center gap-4 cursor-pointer hover:scale-105 transition-all">
                 <div className="relative w-full aspect-square rounded-full overflow-hidden shadow-xl border-4 border-white/5 group-hover:border-purple-600/40 transition-all duration-500">
                    <img src={`https://picsum.photos/seed/${artist}-artist/300/300`} className="w-full h-full object-cover" alt={artist} />
                 </div>
                 <h3 className="text-sm font-black text-center group-hover:text-purple-400 transition-colors">{artist}</h3>
              </div>
            ))}
         </div>
       )}

       {libraryTab === 'albums' && (
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 animate-in fade-in slide-in-from-top-8 duration-500">
            {libraryAlbums.map((album, i) => (
              <div 
                key={i} 
                onClick={() => { setSelectedAlbum(album.movie); navigateTo('album-detail'); }}
                className="group flex flex-col gap-4 cursor-pointer hover:scale-105 transition-all p-4 glass rounded-3xl"
              >
                 <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-xl">
                    <img src={album.cover} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={album.movie} />
                 </div>
                 <div>
                    <h3 className="text-sm font-black truncate group-hover:text-purple-400 transition-colors">{album.movie}</h3>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{album.language} • {album.artist}</p>
                 </div>
              </div>
            ))}
         </div>
       )}
    </div>
  );

  const renderAlbumDetail = () => {
    if (!selectedAlbum) return null;
    const albumTracks = MOCK_SONGS.filter(s => s.movie === selectedAlbum);
    const firstSong = albumTracks[0];

    return (
      <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex items-end gap-12 pt-10">
           <div className="w-64 h-64 rounded-[2rem] shadow-2xl overflow-hidden border border-white/10 relative group">
              <img src={firstSong.cover} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={selectedAlbum} />
           </div>
           <div className="flex flex-col gap-4 pb-4 flex-1">
              <span className="text-xs font-black uppercase tracking-[0.5em] text-purple-400">Album Collection</span>
              <h2 className="text-8xl font-black tracking-tighter leading-none mb-2 drop-shadow-2xl">{selectedAlbum}</h2>
              <div className="flex items-center gap-6 font-bold text-sm text-gray-300">
                 <div className="flex items-center gap-2">
                    <img src={`https://picsum.photos/seed/${firstSong.artist}/50/50`} className="w-6 h-6 rounded-full" alt={firstSong.artist} />
                    <span className="text-white hover:text-purple-400 cursor-pointer transition-colors">{firstSong.artist}</span>
                 </div>
                 <span>•</span>
                 <span>{firstSong.language}</span>
                 <span>•</span>
                 <span>{albumTracks.length} tracks</span>
              </div>
              <div className="mt-4 flex items-center gap-4">
                 <button onClick={() => handlePlaySong(firstSong)} className="px-10 py-3 bg-white text-black font-black rounded-full hover:scale-110 active:scale-95 transition-all shadow-2xl flex items-center gap-2">
                    <Play size={18} fill="currentColor"/> PLAY ALL
                 </button>
                 <button className="p-3 glass rounded-full border border-white/10 hover:bg-white/10 transition-all">
                    <Plus size={24}/>
                 </button>
                 <button className="p-3 glass rounded-full border border-white/10 hover:bg-white/10 transition-all">
                    <MoreHorizontal size={24}/>
                 </button>
              </div>
           </div>
        </div>

        <div className="glass rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
           <table className="w-full text-left">
              <thead className="border-b border-white/5 text-gray-500 text-[10px] uppercase tracking-[0.3em] font-black">
                 <tr>
                    <th className="px-10 py-4 w-16 text-center">#</th>
                    <th className="px-10 py-4">Track Detail</th>
                    <th className="px-10 py-4">Genre / Lang</th>
                    <th className="px-10 py-4 text-right"><Clock size={18} className="inline-block" /></th>
                 </tr>
              </thead>
              <tbody>
                 {albumTracks.map((song, i) => (
                   <tr key={song.id} onClick={() => handlePlaySong(song)} className="group hover:bg-white/5 transition-all cursor-pointer border-b border-white/5 last:border-0">
                      <td className="px-10 py-3 text-center text-gray-500 font-bold group-hover:text-purple-400">{i + 1}</td>
                      <td className="px-10 py-3">
                         <div className="flex items-center gap-4">
                            <div className="relative">
                               <img src={song.cover} className="w-10 h-10 rounded shadow-md group-hover:opacity-50 transition-opacity" alt={song.title} />
                               {currentSong?.id === song.id && isPlaying && (
                                 <Pause size={16} className="absolute inset-0 m-auto text-white opacity-100" />
                               )}
                            </div>
                            <div className="flex flex-col">
                               <span className={`text-sm font-bold transition-colors ${currentSong?.id === song.id ? 'text-purple-400' : 'group-hover:text-purple-400'}`}>{song.title}</span>
                               <span className="text-xs text-gray-400">{song.artist}</span>
                            </div>
                         </div>
                      </td>
                      <td className="px-10 py-3">
                         <span className="text-[9px] text-purple-500 font-black uppercase tracking-widest">{song.language}</span>
                      </td>
                      <td className="px-10 py-3 text-xs text-gray-500 font-bold text-right tabular-nums group-hover:text-white transition-colors">{formatTime(song.duration)}</td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen text-white overflow-hidden transition-all duration-1000 select-none font-sans" style={backgroundStyle}>
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        onComplete={() => setUser(u => u ? {...u, isLoggedIn: true} : null)} 
      />

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 w-72 flex flex-col glass border-r border-white/5 p-8 pb-28 z-[100] transition-transform duration-500 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => navigateTo('home')}>
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-indigo-400 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
               <span className="text-white font-black text-xl">L</span>
            </div>
            <h1 className="text-xl font-black tracking-tighter uppercase group-hover:text-purple-400 transition-colors">LUNATONE</h1>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-white"><X/></button>
        </div>

        <nav className="flex-1 space-y-2 no-scrollbar overflow-y-auto pb-4">
          <SidebarItem icon={Home} label="Home" active={currentView === 'home'} onClick={() => navigateTo('home')} />
          <SidebarItem icon={Compass} label="Browse" active={currentView === 'browse'} onClick={() => navigateTo('browse')} />
          <SidebarItem icon={LibraryIcon} label="Your Library" active={currentView === 'library'} onClick={() => navigateTo('library')} />
          <div className="pt-8 pb-2 px-4 opacity-40">
             <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Personal</span>
          </div>
          <SidebarItem icon={Heart} label="Liked Songs" active={currentView === 'liked'} onClick={() => navigateTo('liked')} />
          <SidebarItem icon={Mic2} label="Tamil Hub" active={activeLangHub === Language.Tamil} onClick={() => navigateTo('language-hub', Language.Tamil)} />
          <SidebarItem icon={Music2} label="Telugu Hub" active={activeLangHub === Language.Telugu} onClick={() => navigateTo('language-hub', Language.Telugu)} />
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        <header className="h-20 flex items-center justify-between px-10 z-10 sticky top-0 bg-transparent">
           <div className="flex items-center gap-6">
              <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-gray-500 hover:text-white"><Menu/></button>
              <div className="relative group">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400" size={18} />
                 <input 
                    type="text" 
                    placeholder="Search library..."
                    className="bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-2.5 w-[24rem] focus:outline-none focus:ring-1 focus:ring-purple-500/50 transition-all text-xs font-semibold"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                 />
                 
                 {/* Real-time Search Results Dropdown */}
                 {searchQuery && (
                   <div className="absolute top-full mt-2 w-[24rem] glass rounded-[1.5rem] border border-white/10 shadow-2xl overflow-hidden z-[120] animate-in fade-in slide-in-from-top-2 duration-300">
                      {filteredLibrary.length > 0 ? (
                        <div className="max-h-[25rem] overflow-y-auto no-scrollbar py-2">
                           {filteredLibrary.slice(0, 10).map(song => (
                             <div 
                               key={song.id} 
                               onClick={() => {
                                 handlePlaySong(song);
                                 setSearchQuery('');
                               }}
                               className="flex items-center gap-4 px-4 py-3 hover:bg-white/10 transition-colors cursor-pointer group"
                             >
                                <img src={song.cover} className="w-10 h-10 rounded-lg shadow-md" alt={song.title} />
                                <div className="flex-1 min-w-0">
                                   <p className="text-sm font-bold text-white truncate group-hover:text-purple-400">{song.title}</p>
                                   <p className="text-[10px] text-gray-400 truncate">{song.artist} • {song.language}</p>
                                </div>
                                <PlayCircle size={18} className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                             </div>
                           ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center">
                           <p className="text-xs text-gray-500 font-bold">No tracks found for "{searchQuery}"</p>
                        </div>
                      )}
                   </div>
                 )}
              </div>
           </div>
           
           {/* Profile & Upgrade Section */}
           <div className="flex items-center gap-6 relative" ref={profileDropdownRef}>
              <button 
                onClick={() => setIsPaymentModalOpen(true)}
                className="px-5 py-2 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-[10px] font-black tracking-widest shadow-lg shadow-purple-600/20 transition-all hover:scale-105"
              >
                UPGRADE
              </button>

              <div 
                className="flex items-center gap-4 cursor-pointer group select-none"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="flex flex-col items-end">
                   <span className="text-xs font-black tracking-tight group-hover:text-purple-400 transition-colors">{user.name}</span>
                   <span className="text-[9px] font-black text-purple-500 uppercase tracking-tighter opacity-80">Premium</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg border border-white/10 group-hover:ring-2 ring-purple-500/40 transition-all">
                  <UserIcon size={18}/>
                </div>
                <ChevronDown size={14} className={`text-gray-500 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
              </div>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-4 w-64 glass rounded-2xl border border-white/10 shadow-2xl z-[150] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                   <div className="p-5 border-b border-white/5 bg-white/5">
                      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Logged in as</p>
                      <p className="font-bold text-sm text-white truncate">{user.name}</p>
                      <p className="text-xs text-gray-400 truncate">harini.shrii.am@gmail.com</p>
                   </div>
                   <div className="p-2">
                      <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-xs font-semibold text-gray-300 transition-colors">
                         <Settings size={16} />
                         Account Settings
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-xs font-semibold text-gray-300 transition-colors">
                         <CreditCard size={16} />
                         Subscription Details
                      </button>
                      <div className="my-2 border-t border-white/5"></div>
                      <button 
                        onClick={() => setUser(null)}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-xs font-semibold text-red-400 transition-colors"
                      >
                         <LogOut size={16} />
                         Log out
                      </button>
                   </div>
                </div>
              )}
           </div>
        </header>

        <div className="flex-1 overflow-y-auto px-10 pb-36 no-scrollbar">
           {(currentView === 'home' || currentView === 'language-hub') && renderLanguageChips()}
           {currentView === 'home' && renderHome()}
           {currentView === 'language-hub' && renderHub()}
           {currentView === 'liked' && renderLiked()}
           {currentView === 'library' && renderLibrary()}
           {currentView === 'album-detail' && renderAlbumDetail()}
        </div>
      </main>

      {/* Left-Closing Now Playing Sidebar (Right) */}
      {(currentSong && isRightSidebarOpen) && (
        <aside className="w-80 flex flex-col glass border-l border-white/5 p-8 z-[90] animate-in slide-in-from-right duration-300">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-purple-400">Now Playing</h2>
            <button onClick={() => setIsRightSidebarOpen(false)} className="text-gray-500 hover:text-white"><X size={18}/></button>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
             <img src={currentSong.cover} className="w-full aspect-square rounded-2xl shadow-2xl mb-6 object-cover" alt="Cover" />
             <h3 className="text-xl font-black tracking-tighter mb-1">{currentSong.title}</h3>
             <p className="text-purple-400 font-bold text-sm mb-4">{currentSong.artist}</p>
             <div className="space-y-6 pt-6 border-t border-white/10">
                <div className="space-y-3">
                   <div 
                    onClick={(e) => handleSeek(e, sidebarProgressRef)} 
                    ref={sidebarProgressRef} 
                    className="h-1 bg-white/10 rounded-full relative cursor-pointer"
                   >
                      <div className="absolute inset-y-0 left-0 bg-purple-500 rounded-full" style={{ width: `${progress}%` }}></div>
                   </div>
                   <div className="flex justify-between text-[10px] text-gray-500 font-bold">
                      <span>{formatTime((progress/100) * currentSong.duration)}</span>
                      <span>{formatTime(currentSong.duration)}</span>
                   </div>
                </div>
                <div className="flex items-center justify-between px-2">
                   <button className="text-gray-500 hover:text-white transition-all"><SkipBack size={24}/></button>
                   <button onClick={() => setIsPlaying(!isPlaying)} className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center shadow-lg transition-transform active:scale-90">
                      {isPlaying ? <Pause size={24}/> : <Play size={24} className="ml-1"/>}
                   </button>
                   <button className="text-gray-500 hover:text-white transition-all"><SkipForward size={24}/></button>
                </div>
             </div>
          </div>
        </aside>
      )}

      {/* Main Music Player Footer Bar - Reduced height to h-20 */}
      <footer className="fixed bottom-0 left-0 right-0 h-20 glass border-t border-white/5 px-8 flex items-center justify-between z-[110] shadow-2xl">
        <div className="w-1/4 flex items-center gap-4">
           {currentSong ? (
             <>
               <div className="w-12 h-12 rounded-lg overflow-hidden shadow-lg border border-white/10 shrink-0 cursor-pointer" onClick={() => setIsRightSidebarOpen(true)}>
                  <img src={currentSong.cover} className="w-full h-full object-cover" alt="Cover" />
               </div>
               <div className="flex flex-col gap-0.5 overflow-hidden">
                  <span className="text-sm font-black truncate hover:text-purple-400 transition-colors cursor-pointer" onClick={() => setIsRightSidebarOpen(true)}>{currentSong.title}</span>
                  <span className="text-[10px] font-bold text-gray-500 truncate">{currentSong.artist}</span>
               </div>
               <button onClick={() => toggleLike(currentSong.id)} className={`ml-2 transition-transform active:scale-125 ${likedSongs.has(currentSong.id) ? 'text-purple-500' : 'text-gray-500 hover:text-white'}`}>
                 <Heart size={18} fill={likedSongs.has(currentSong.id) ? "currentColor" : "none"} />
               </button>
             </>
           ) : (
             <span className="text-[10px] font-black uppercase text-gray-600 tracking-widest flex items-center gap-2"><Radio size={14}/> LUNATONE</span>
           )}
        </div>

        <div className="w-2/4 flex flex-col items-center gap-1.5">
           <div className="flex items-center gap-8">
              <button onClick={() => setIsShuffle(!isShuffle)} className={`transition-colors ${isShuffle ? 'text-purple-400' : 'text-gray-500 hover:text-white'}`}><Shuffle size={16}/></button>
              <button className="text-gray-400 hover:text-white transition-transform active:scale-90"><SkipBack size={20} fill="currentColor"/></button>
              
              {/* Modern Square-Rounded Play Button */}
              <button 
                onClick={() => setIsPlaying(!isPlaying)} 
                className="w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl flex items-center justify-center text-white transition-all shadow-md active:scale-95 group"
              >
                 {isPlaying ? <Pause size={20} className="group-hover:text-purple-400" /> : <Play size={20} className="ml-0.5 group-hover:text-purple-400" />}
              </button>

              <button className="text-gray-400 hover:text-white transition-transform active:scale-90"><SkipForward size={20} fill="currentColor"/></button>
              <button onClick={() => setRepeatMode(r => r === 'none' ? 'all' : r === 'all' ? 'one' : 'none')} className={`transition-colors ${repeatMode !== 'none' ? 'text-purple-400' : 'text-gray-500 hover:text-white'}`}><Repeat size={16}/></button>
           </div>
           
           <div className="w-full flex items-center gap-4 px-10">
              <span className="text-[9px] font-bold text-gray-500 w-8 text-right">
                {currentSong ? formatTime((progress / 100) * currentSong.duration) : '0:00'}
              </span>
              <div 
                className="flex-1 h-1 bg-white/5 rounded-full relative group cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  setProgress((x / rect.width) * 100);
                }}
              >
                 <div className="absolute inset-y-0 left-0 bg-white group-hover:bg-purple-400 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
              <span className="text-[9px] font-bold text-gray-500 w-8">
                {currentSong ? formatTime(currentSong.duration) : '0:00'}
              </span>
           </div>
        </div>

        <div className="w-1/4 flex items-center justify-end gap-6 pr-4">
           <Mic2 size={16} className="text-gray-500 hover:text-purple-400 cursor-pointer transition-colors"/>
           
           <div className="flex items-center gap-3 group relative">
              <Volume2 size={18} className="text-gray-500 group-hover:text-white transition-colors shrink-0"/>
              {/* Interactive Slider Implementation */}
              <div 
                ref={footerVolumeRef}
                onClick={(e) => handleVolumeClick(e, footerVolumeRef)}
                className="w-24 h-1 bg-white/10 rounded-full relative overflow-hidden group-hover:bg-white/20 cursor-pointer transition-all"
              >
                 <div className="absolute inset-y-0 left-0 bg-purple-500 rounded-full" style={{ width: `${volume}%` }}></div>
              </div>
           </div>
           
           <MoreHorizontal size={20} className="text-gray-500 hover:text-white cursor-pointer"/>
        </div>
      </footer>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .drop-shadow-glow {
          filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.4));
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
