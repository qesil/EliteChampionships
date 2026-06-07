import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Trophy, Users, ChevronDown } from 'lucide-react';
import { TOP_PLAYERS, TEAM_STANDINGS, avatarUrl } from '../data';

function PlayerRow({ player }) {
  return (
    <Link to={`/profil/${player.name}`}>
      <div className={`flex items-center justify-between rounded-3xl border p-4 hover:border-cyan-400/50 transition cursor-pointer hover:bg-zinc-800/40 group ${
        player.avgPlace === 1.0 ? 'border-yellow-400/50 bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 shadow-lg shadow-yellow-500/20' :
        player.avgPlace === 2.0 ? 'border-gray-300/50 bg-gradient-to-r from-gray-400/10 to-gray-500/5 shadow-lg shadow-gray-400/20' :
        player.avgPlace === 3.0 ? 'border-orange-400/50 bg-gradient-to-r from-orange-500/10 to-orange-600/5 shadow-lg shadow-orange-500/20' :
        'border-zinc-800/70 bg-zinc-900/60'
      }`}>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-zinc-950/70 text-sm font-bold text-zinc-100">{player.rank}</div>
          <img 
            src={avatarUrl(player.mcName, 48)} 
            alt={player.name}
            className="h-12 w-12 rounded-lg border border-white/10"
          />
          <div>
            <div className="font-semibold text-white group-hover:text-cyan-300 transition">{player.displayName}</div>
            <div className="text-xs uppercase tracking-[0.25em] text-zinc-500">{player.team}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-black text-white">{player.points}</div>
          <div className="text-xs text-zinc-500">{player.avgPlace.toFixed(1)} śr. msc</div>
        </div>
      </div>
    </Link>
  );
}

function TeamRow({ team, players }) {
  return (
    <div className="rounded-3xl border border-zinc-800/70 bg-zinc-900/60 p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`h-10 w-10 rounded-3xl bg-gradient-to-br ${team.color}`} />
          <div>
            <div className="font-semibold text-white">{team.name}</div>
            <div className="text-xs text-zinc-500">{team.rank}. miejsce • {team.points} pkt</div>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        {players.map((player) => (
          <Link
            key={player.name}
            to={`/profil/${player.name}`}
            className="group relative"
            title={`${player.displayName} #${player.rank}`}
          >
            <img 
              src={avatarUrl(player.mcName, 40)} 
              alt={player.name}
              className="h-10 w-10 rounded-lg border border-white/20 hover:border-cyan-400/70 transition"
            />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 rounded bg-zinc-950/95 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none border border-zinc-700/50">
              {player.displayName} #{player.rank}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Leaderboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [editionFilter, setEditionFilter] = useState('ec1');

  const filteredPlayers = useMemo(() => {
    let results = TOP_PLAYERS;
    
    if (searchTerm.trim()) {
      results = results.filter((p) =>
        p.displayName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (editionFilter === 'all') {
      return results.slice(0, 10);
    }

    return results;
  }, [searchTerm, editionFilter]);

  const topPlayers = editionFilter === 'all' ? 
    TOP_PLAYERS.sort((a, b) => a.avg - b.avg).slice(0, 10) : 
    filteredPlayers;

  const visibleTeams = editionFilter === 'ec1' ? TEAM_STANDINGS : [];

  const teamPlayersMap = useMemo(() => {
    const map = {};
    TEAM_STANDINGS.forEach((team) => {
      map[team.id] = TOP_PLAYERS.filter((p) => p.teamId === team.id);
    });
    return map;
  }, []);

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
      <div className="mb-10 sm:flex sm:items-end sm:justify-between sm:gap-6">
        <div>
          <div className="text-[10px] uppercase tracking-[0.35em] text-amber-300">/ Wyniki /</div>
          <h1 className="mt-3 text-4xl font-black text-white sm:text-5xl">Tabela Wyników</h1>
          <p className="mt-4 max-w-2xl text-sm text-zinc-400">Historia, punkty i rankingi z każdej edycji.</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr_320px]">
        {/* Left Sidebar - Filtry */}
        <aside className="space-y-4">
          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-900/50 p-6">
            <div className="flex items-center gap-2 text-zinc-200 mb-6">
              <Search className="h-4 w-4" />
              <span className="text-[10px] uppercase tracking-[0.35em] text-amber-300">Filtry</span>
            </div>

            <div className="space-y-4">
              {/* Wyszukiwanie gracza */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 mb-2 block">Szukaj gracza</label>
                <input
                  type="text"
                  placeholder="Wpisz nick..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-3xl border border-zinc-700/70 bg-zinc-950/60 px-4 py-3 text-white placeholder-zinc-500 outline-none focus:border-cyan-400/50 transition text-sm"
                />
              </div>

              {/* Filtr edycji */}
              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-zinc-400 mb-2 block">Edycja</label>
                <div className="space-y-2">
                  {[
                    { value: 'ec1', label: 'EC1' },
                    { value: 'all', label: 'Wszystkie edycje' },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setEditionFilter(option.value)}
                      className={`w-full rounded-3xl border px-4 py-3 text-sm font-semibold transition ${
                        editionFilter === option.value
                          ? 'border-cyan-400/70 bg-cyan-500/20 text-cyan-300'
                          : 'border-zinc-700/70 bg-zinc-950/60 text-zinc-300 hover:border-zinc-600/70'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-dashed border-zinc-700/70 bg-zinc-950/60 p-4 text-center text-zinc-500 text-[11px]">
                Pełny ranking 32 zawodników, 8 drużyn, suma 137312 punktów.
              </div>
            </div>
          </div>
        </aside>

        {/* Center - Main Content */}
        <main className="space-y-4">
          {topPlayers.length > 0 ? (
            topPlayers.map((player) => (
              <PlayerRow key={player.name} player={player} />
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-zinc-700/60 bg-zinc-950/60 p-12 text-center text-zinc-400">
              <div className="text-lg font-semibold text-white">Brak wyników</div>
              <div className="mt-2 text-sm">Nie znaleziono gracza "{searchTerm}"</div>
            </div>
          )}
        </main>

        {/* Right Sidebar - Drużyny */}
        <aside className="space-y-4">
          {visibleTeams.length > 0 && (
            <div className="rounded-3xl border border-zinc-800/70 bg-zinc-900/50 p-6">
              <div className="flex items-center gap-2 text-zinc-200 mb-6">
                <Trophy className="h-4 w-4" />
                <span className="text-[10px] uppercase tracking-[0.35em] text-amber-300">Drużyny EC 1</span>
              </div>
              <div className="space-y-3">
                {TEAM_STANDINGS.map((team) => (
                  <TeamRow key={team.id} team={team} players={teamPlayersMap[team.id] || []} />
                ))}
              </div>
            </div>
          )}

          <div className="rounded-3xl border border-zinc-800/70 bg-zinc-900/50 p-6">
            <div className="flex items-center gap-2 text-zinc-200 mb-4">
              <Users className="h-4 w-4" />
              <span className="text-[10px] uppercase tracking-[0.35em] text-amber-300">Profil gracza</span>
            </div>
            <div className="rounded-3xl border border-dashed border-zinc-700/60 bg-zinc-950/60 p-6 text-center text-zinc-500 text-sm">
              Kliknij na gracza z tabeli aby zobaczyć szczegóły i partnerów.
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
