-- =====================================================================
--  BANCO DE DADOS — Ranking da Gravata (Casamento Leo & Lari)
--  Cole TODO este conteúdo no Supabase > SQL Editor > New query > Run.
-- =====================================================================

-- 1) Tabela que guarda cada presente (nome + valor)
create table if not exists public.gifts (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  amount     numeric not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists gifts_amount_idx on public.gifts (amount desc);

-- Liga o tempo real nesta tabela (telão atualiza sozinho quando o celular mexe)
alter publication supabase_realtime add table public.gifts;

alter table public.gifts enable row level security;
drop policy if exists "acesso_publico_leitura"  on public.gifts;
drop policy if exists "acesso_publico_escrita"  on public.gifts;
create policy "acesso_publico_leitura" on public.gifts for select using (true);
create policy "acesso_publico_escrita" on public.gifts for all using (true) with check (true);


-- =====================================================================
-- 2) Tabela "settings" — guarda o nome e a imagem do prêmio do 1º lugar
--    Também com tempo real: quando você troca a imagem no celular, o
--    telão atualiza sozinho.
-- =====================================================================
create table if not exists public.settings (
  id              text primary key default 'main',
  prize_title     text not null default 'Green Label',
  prize_image_url text,
  updated_at      timestamptz not null default now()
);

-- Garante que já existe uma linha "main" pronta para ser editada
insert into public.settings (id, prize_title)
values ('main', 'Green Label')
on conflict (id) do nothing;

alter publication supabase_realtime add table public.settings;

alter table public.settings enable row level security;
drop policy if exists "settings_leitura" on public.settings;
drop policy if exists "settings_escrita" on public.settings;
create policy "settings_leitura" on public.settings for select using (true);
create policy "settings_escrita" on public.settings for all using (true) with check (true);


-- =====================================================================
-- 3) Bucket de armazenamento para a imagem (PNG) do prêmio
-- =====================================================================
insert into storage.buckets (id, name, public)
values ('prize-images', 'prize-images', true)
on conflict (id) do nothing;

drop policy if exists "prize_images_leitura" on storage.objects;
drop policy if exists "prize_images_escrita" on storage.objects;
create policy "prize_images_leitura"
  on storage.objects for select
  using (bucket_id = 'prize-images');
create policy "prize_images_escrita"
  on storage.objects for all
  using (bucket_id = 'prize-images')
  with check (bucket_id = 'prize-images');

-- Pronto! Seu banco está configurado. 🎉
