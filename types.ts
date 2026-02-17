
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  movie?: string; // Movie name for regional songs
  themeColor?: string; // Vibe color for the artist
  cover: string;
  audioUrl: string;
  language: Language;
  category: Category;
  duration: number; 
}

export enum Language {
  Tamil = 'Tamil',
  Telugu = 'Telugu',
  Malayalam = 'Malayalam',
  Kannada = 'Kannada',
  Hindi = 'Hindi',
  English = 'English'
}

export enum Category {
  TopHits = 'Top Hits',
  NewReleases = 'New Releases',
  RegionalClassics = 'Regional Classics',
  Trending = 'Trending'
}

export type ViewType = 'home' | 'browse' | 'library' | 'liked' | 'playlists' | 'language-hub' | 'search' | 'album-detail';

export interface User {
  name: string;
  isLoggedIn: boolean;
}

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  isShuffle: boolean;
  repeatMode: 'none' | 'one' | 'all';
  queue: Song[];
  history: Song[];
}
