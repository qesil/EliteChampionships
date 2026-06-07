import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Crown, Sparkles, Calendar, ChevronRight, Flame, Users, Inbox, Swords, Radio, MapPin, Award, ArrowRight, Zap } from 'lucide-react';
import Countdown from '../components/Countdown';
import Marquee from '../components/Marquee';
import { SITE, STATS, NEXT_EVENT, LAST_CHAMPION, NEWS, MARQUEE, PILLARS, avatarUrl } from '../data';

const ICONS = { Swords, Crown, Radio, Trophy, Flame, Award, Zap };

const ACCENTS = {
  red: { ring: 'from-red-500 to-rose-500', text: 'text-red-300', glow: 'shadow-red-600/30', chip: 'bg-red-500/10 border-red-400/30 text-red-200' },
  amber: { ring: 'from-amber-400 to-orange-500', text: 'text-amber-300', glow: 'shadow-amber-600/30', chip: 'bg-amber-500/10 border-amber-400/30 text-amber-200' },
  cyan: { ring: 'from-cyan-400 to-teal-500', text: 'text-cyan-300', glow: 'shadow-cyan-600/30', chip: 'bg-cyan-500/10 border-cyan-400/30 text-cyan-200' },
  violet: { ring: 'from-violet-500 to-fuchsia-500', text: 'text-violet-300', glow: 'shadow-violet-600/30', chip: 'bg-violet-500/10 border-violet-400/30 text-violet-200' },
};

function StatCard({ label, value, icon: Icon, accent }) {
  const a = ACCENTS[accent] || ACCENTS.red;
  return (
    <div className="group relative rounded-3xl border border-zinc-800/70 bg-zinc-900/50 backdrop-blur-xl p-5 overflow-hidden hover:border-zinc-600/70 hover:-translate-y-0.5 transition-all shadow-soft">
      <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${a.ring} opacity-10 group-hover:opacity-25 transition-opacity blur-2xl`} />
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">{label}</div>
          <div className="mt-2 text-3xl font-black text-white tabular-nums">{value}</div>
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${a.ring} flex items-center justify-center shadow-lg ${a.glow} ring-1 ring-white/10`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </div>
  );
}

function PillarCard({ pillar }) {
  const Icon = ICONS[pillar.icon] || Swords;
  const a = ACCENTS[pillar.accent] || ACCENTS.red;
  return (
    <div className="group relative rounded-[2rem] border border-zinc-800/70 bg-zinc-900/40 backdrop-blur-xl p-6 overflow-hidden hover:border-zinc-600/70 transition-all shadow-soft">
      <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${a.ring}`} />
      <div className={`absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${a.ring} opacity-[0.07] group-hover:opacity-20 transition-opacity blur-2xl`} />
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] uppercase tracking-widest font-bold ${a.chip}`}>
        <Icon className="w-3.5 h-3.5" />
        {pillar.title}
      </div>
      <p className="mt-4 text-sm text-zinc-300 leading-relaxed">{pillar.desc}</p>
    </div>
  );
}

export default function Home() {
  const eventTs = new Date(NEXT_EVENT.startISO).getTime();
  const hasChampion = !!LAST_CHAMPION;

  return (
    <>
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-12">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 text-amber-200 text-[11px] font-bold tracking-[0.25em] uppercase">
              <Flame className="w-3.5 h-3.5" />
              {SITE.season} • nadchodzi
            </div>

            <h1 className="mt-5 text-5xl sm:text-7xl lg:text-[5.5rem] font-black leading-[0.95] tracking-tight">
              <span className="block bg-gradient-to-r from-red-400 via-amber-200 to-zinc-100 bg-clip-text text-transparent">ELITE</span>
              <span className="block bg-gradient-to-r from-cyan-300 via-zinc-100 to-violet-300 bg-clip-text text-transparent">CHAMPIONSHIP</span>
            </h1>

            <p className="mt-6 text-lg text-zinc-300 max-w-xl leading-relaxed">{SITE.tagline}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/licytacje"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-400 hover:to-amber-400 text-white font-bold tracking-wider transition-all"
              >
                <Radio className="w-4 h-4" />
                Dołącz do aukcji
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/tabela"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900/70 hover:bg-zinc-800/80 border border-zinc-700/70 text-white font-bold tracking-wide transition-colors"
              >
                Zobacz wyniki
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-300" />
                {NEXT_EVENT.dateLabel}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-300" />
                {NEXT_EVENT.location}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-[2rem] border border-zinc-800/70 bg-gradient-to-br from-zinc-950/80 via-zinc-900/50 to-zinc-950/80 backdrop-blur-3xl p-6 sm:p-8 shadow-2xl shadow-black/40">
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-red-500/20 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-cyan-400/15 blur-3xl pointer-events-none" />
              <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-red-500/15 border border-red-400/30 text-red-200 text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                Live wkrótce
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.35em] text-zinc-500">Następny event</div>
                <div className="mt-1 text-2xl sm:text-3xl font-black text-white">{NEXT_EVENT.name}</div>
                <div className="text-sm text-zinc-400">{NEXT_EVENT.subtitle}</div>
              </div>
              <div className="mt-6">
                <Countdown target={eventTs} />
              </div>
              <div className="mt-6 flex flex-col gap-3 border-t border-zinc-800/70 pt-4 text-[11px] text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-3.5 h-3.5 text-amber-300" />
                  {NEXT_EVENT.prize}
                </div>
                <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                  Szczegóły <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee items={MARQUEE} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Edycje" value={STATS.editions} icon={Trophy} accent="red" />
          <StatCard label="Gracze" value={STATS.players} icon={Users} accent="amber" />
          <StatCard label="Drużyny" value={STATS.teams} icon={Award} accent="violet" />
          <StatCard label="Punkty" value={STATS.totalPoints} icon={Zap} accent="cyan" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.35em] text-amber-300">/ Format /</div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-white">Jak wygląda turniej</h2>
          </div>
          <Link to="/licytacje" className="inline-flex items-center gap-1 text-xs uppercase tracking-widest font-bold text-cyan-300 hover:text-cyan-200">
            Aukcje na żywo <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {PILLARS.map((p, i) => <PillarCard key={i} pillar={p} />)}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 relative rounded-[2rem] border border-zinc-800/70 bg-zinc-900/40 backdrop-blur-xl p-6 sm:p-8 overflow-hidden shadow-soft">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-400 via-red-400 to-violet-400" />
            <div className="flex items-center justify-between mb-5 gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.35em] text-amber-300">/ Mistrzowie /</div>
                <h3 className="mt-1 text-xl font-black text-white">Ostatni triumf</h3>
              </div>
              <Crown className="w-7 h-7 text-amber-300" />
            </div>
            {hasChampion ? (
              <>
                <div className="text-2xl font-extrabold text-white">{LAST_CHAMPION.team}</div>
                <div className="text-sm text-zinc-400">{LAST_CHAMPION.tournament}</div>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.24em] text-zinc-300">
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-200">{LAST_CHAMPION.score.toLocaleString('pl-PL')} pkt</span>
                  <span className="rounded-full bg-amber-500/10 px-3 py-1 text-amber-200">Miejsce {LAST_CHAMPION.place}</span>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {LAST_CHAMPION.members.map((m) => (
                    <Link key={m.name} to={`/profil/${m.name}`} className="group rounded-2xl border border-zinc-700/60 bg-zinc-950/70 p-4 text-center hover:border-cyan-400/50 transition-all">
                      <img 
                        src={avatarUrl(m.name)} 
                        alt={m.name} 
                        className="mx-auto mb-3 h-16 w-16 rounded-2xl border border-white/10 object-cover group-hover:border-cyan-400/50 transition-colors" 
                        loading="lazy" 
                      />
                      <div className="text-sm font-semibold text-white truncate group-hover:text-cyan-300">{m.name}</div>
                      <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-amber-300">#{m.rank}</div>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-3xl border border-dashed border-zinc-700/60 bg-zinc-950/60 p-10 text-center text-zinc-400">
                Brak danych — sekcja pusta
              </div>
            )}
          </div>

          <div className="lg:col-span-2 relative rounded-[2rem] border border-zinc-800/70 bg-zinc-900/40 backdrop-blur-xl p-6 sm:p-8 overflow-hidden shadow-soft">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-cyan-400 to-violet-500" />
            <div className="flex items-center gap-2 mb-5">
              <Sparkles className="w-5 h-5 text-cyan-300" />
              <h3 className="text-xl font-black text-white">Co nowego</h3>
            </div>
            {NEWS.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-zinc-700/60 bg-zinc-950/60 p-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-zinc-900/50 text-zinc-400">
                  <Inbox className="h-6 w-6" />
                </div>
                <div className="font-semibold text-white">Cisza przed burzą</div>
                <div className="mt-2 text-sm text-zinc-500">Pierwsze ogłoszenia wkrótce.</div>
              </div>
            ) : (
              <div className="space-y-3">
                {NEWS.map((news) => (
                  <div key={news.id} className="rounded-3xl border border-zinc-700/60 bg-zinc-950/60 p-4">
                    <div className="text-sm font-semibold text-white">{news.title}</div>
                    <div className="mt-2 text-sm text-zinc-400">{news.description}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        <div className="relative rounded-[2rem] border border-zinc-800/70 bg-gradient-to-r from-red-500/10 via-zinc-900/40 to-cyan-400/10 backdrop-blur-xl p-8 overflow-hidden shadow-soft">
          <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-amber-400/15 blur-3xl" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.35em] text-amber-300">/ Dołącz /</div>
              <h3 className="mt-1 text-2xl sm:text-3xl font-black text-white">Śledź aukcje w przyszłych turniejach</h3>
              <p className="mt-2 max-w-xl text-sm text-zinc-400">Wejdź do pokoju aukcji jako kapitan, admin lub widz — i przeżyj licytacje na żywo.</p>
            </div>
            <Link to="/licytacje" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-500/50 hover:shadow-violet-400/60 transition-all">
              Wejdź do aukcji <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
