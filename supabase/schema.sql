-- PIKNIK · Supabase schema
-- Jalankan seluruh file ini di Supabase Dashboard > SQL Editor.
-- Akses baca tersedia untuk peserta; perubahan hanya untuk user yang tercatat di trip_admins.

create extension if not exists pgcrypto;

create table if not exists public.trip_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.trip_participants (
  id uuid primary key default gen_random_uuid(),
  position integer not null unique,
  name text not null,
  category text not null default 'Anggota' check (category in ('Anggota','Tetangga')),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.trip_events (
  id bigint generated always as identity primary key,
  participant_id uuid not null references public.trip_participants(id) on delete restrict,
  stop_key text not null check (stop_key in ('andi_berangkat','lidulapa','saloka','andi_pulang')),
  action text not null check (action in ('turun','naik')),
  created_at timestamptz not null default now(),
  created_by uuid not null references auth.users(id)
);

create table if not exists public.trip_announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  created_by uuid not null references auth.users(id),
  created_at timestamptz not null default now()
);

create index if not exists trip_events_participant_stop_idx
  on public.trip_events(participant_id, stop_key, created_at desc);
create index if not exists trip_events_created_at_idx
  on public.trip_events(created_at desc);

alter table public.trip_admins enable row level security;
alter table public.trip_participants enable row level security;
alter table public.trip_events enable row level security;
alter table public.trip_announcements enable row level security;

grant select on public.trip_admins to authenticated;
grant select on public.trip_participants to anon, authenticated;
grant update on public.trip_participants to authenticated;
grant select on public.trip_events to anon, authenticated;
grant insert, delete on public.trip_events to authenticated;
grant select on public.trip_announcements to anon, authenticated;
grant insert, update, delete on public.trip_announcements to authenticated;
grant usage, select on sequence public.trip_events_id_seq to authenticated;

drop policy if exists "Admins can read own admin record" on public.trip_admins;
create policy "Admins can read own admin record"
on public.trip_admins for select to authenticated
using (user_id = (select auth.uid()));

drop policy if exists "Anyone can read participants" on public.trip_participants;
create policy "Anyone can read participants"
on public.trip_participants for select to anon, authenticated
using (true);

drop policy if exists "Only coordinators can edit participants" on public.trip_participants;
create policy "Only coordinators can edit participants"
on public.trip_participants for update to authenticated
using (exists (select 1 from public.trip_admins a where a.user_id = (select auth.uid())))
with check (exists (select 1 from public.trip_admins a where a.user_id = (select auth.uid())));

drop policy if exists "Anyone can read trip events" on public.trip_events;
create policy "Anyone can read trip events"
on public.trip_events for select to anon, authenticated
using (true);

drop policy if exists "Only coordinators can record trip events" on public.trip_events;
create policy "Only coordinators can record trip events"
on public.trip_events for insert to authenticated
with check (
  exists (select 1 from public.trip_admins a where a.user_id = (select auth.uid()))
  and created_by = (select auth.uid())
);

drop policy if exists "Only coordinators can delete trip events" on public.trip_events;
create policy "Only coordinators can delete trip events"
on public.trip_events for delete to authenticated
using (exists (select 1 from public.trip_admins a where a.user_id = (select auth.uid())));

drop policy if exists "Anyone can read announcements" on public.trip_announcements;
create policy "Anyone can read announcements"
on public.trip_announcements for select to anon, authenticated
using (true);

drop policy if exists "Only coordinators can publish announcements" on public.trip_announcements;
create policy "Only coordinators can publish announcements"
on public.trip_announcements for insert to authenticated
with check (
  exists (select 1 from public.trip_admins a where a.user_id = (select auth.uid()))
  and created_by = (select auth.uid())
);

drop policy if exists "Only coordinators can edit announcements" on public.trip_announcements;
create policy "Only coordinators can edit announcements"
on public.trip_announcements for update to authenticated
using (exists (select 1 from public.trip_admins a where a.user_id = (select auth.uid())))
with check (exists (select 1 from public.trip_admins a where a.user_id = (select auth.uid())));

drop policy if exists "Only coordinators can delete announcements" on public.trip_announcements;
create policy "Only coordinators can delete announcements"
on public.trip_announcements for delete to authenticated
using (exists (select 1 from public.trip_admins a where a.user_id = (select auth.uid())));

-- Seed data: 47 peserta total, termasuk 5 tetangga yang sudah disebutkan.
-- 42 nama anggota masih berupa slot sementara karena daftar nama asli tidak tersedia di repo.
insert into public.trip_participants (position, name, category)
select n, 'Anggota ' || lpad(n::text, 2, '0'), 'Anggota'
from generate_series(1,42) as n
on conflict (position) do nothing;

insert into public.trip_participants (position, name, category) values
  (43, 'Ajeng', 'Tetangga'),
  (44, 'Bagus', 'Tetangga'),
  (45, 'Bpk Sri', 'Tetangga'),
  (46, 'Bapak Wakijo', 'Tetangga'),
  (47, 'Bapak Prapto', 'Tetangga')
on conflict (position) do nothing;

-- Realtime untuk sinkronisasi checklist antar perangkat.
do $$
begin
  alter publication supabase_realtime add table public.trip_participants;
exception when duplicate_object then null;
end $$;
do $$
begin
  alter publication supabase_realtime add table public.trip_events;
exception when duplicate_object then null;
end $$;
do $$
begin
  alter publication supabase_realtime add table public.trip_announcements;
exception when duplicate_object then null;
end $$;
