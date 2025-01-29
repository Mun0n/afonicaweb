import { Show } from '../types/band';

export const filterShowsByDate = (shows: Show[]): { upcomingShows: Show[], pastShows: Show[] } => {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Reset time to start of day for fair comparison

  const initial: { upcomingShows: Show[], pastShows: Show[] } = { upcomingShows: [], pastShows: [] };
  
  return shows.reduce((acc, show) => {
    const showDate = new Date(show.date);
    if (showDate >= now) {
      acc.upcomingShows.push(show);
    } else {
      acc.pastShows.push(show);
    }
    return acc;
  }, initial);
};

// Sort shows by date (ascending)
export const sortShowsByDate = (shows: Show[]): Show[] => {
  return [...shows].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}; 