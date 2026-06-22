-- Pom PentHouse Database Schema
-- Run this in Supabase SQL Editor to set up your database

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================
-- TABLES
-- ============================================

-- Penthouses
create table if not exists penthouses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  location text default 'Lakeside Road, Pokhara',
  price_per_night integer not null,
  status text default 'available' check (status in ('available','booked','maintenance')),
  image text,
  description text,
  amenities text[] default '{}',
  max_guests integer default 2,
  bedrooms integer default 1,
  bathrooms integer default 1,
  rules text[] default '{}',
  images text[] default '{}',
  created_at timestamptz default now()
);

-- Bookings
create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  penthouse_id uuid references penthouses(id) on delete set null,
  penthouse_name text,
  guest_name text not null,
  guest_email text not null,
  guest_phone text,
  check_in date not null,
  check_out date not null,
  nights integer not null,
  total integer not null,
  status text default 'pending' check (status in ('pending','confirmed','declined','cancelled','completed')),
  payment_status text default 'unpaid' check (payment_status in ('paid','unpaid','refunded')),
  guests integer default 1,
  addons jsonb default '{}',
  notes text,
  created_at timestamptz default now()
);

-- Profiles (extends Supabase Auth users)
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  role text default 'guest' check (role in ('guest','staff','admin')),
  avatar text,
  banned boolean default false,
  created_at timestamptz default now()
);

-- Activities (audit log)
create table if not exists activities (
  id uuid primary key default gen_random_uuid(),
  action text not null,
  detail text,
  type text check (type in ('booking','review','payment','user')),
  created_at timestamptz default now()
);

-- Settings (CMS key-value store)
create table if not exists settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz default now()
);

-- Contact messages
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  read boolean default false,
  created_at timestamptz default now()
);

-- ============================================
-- INDEXES
-- ============================================

create index if not exists idx_bookings_status on bookings(status);
create index if not exists idx_bookings_check_in on bookings(check_in);
create index if not exists idx_bookings_penthouse_id on bookings(penthouse_id);
create index if not exists idx_activities_created_at on activities(created_at desc);
create index if not exists idx_penthouses_status on penthouses(status);
create index if not exists idx_contact_messages_read on contact_messages(read);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

alter table penthouses enable row level security;
alter table bookings enable row level security;
alter table profiles enable row level security;
alter table activities enable row level security;
alter table settings enable row level security;
alter table contact_messages enable row level security;

-- Public can read penthouses
create policy "Public can read penthouses" on penthouses
  for select using (true);

-- Service role can do everything (used by API routes)
create policy "Service role full access penthouses" on penthouses
  for all using (auth.role() = 'service_role');

create policy "Service role full access bookings" on bookings
  for all using (auth.role() = 'service_role');

create policy "Service role full access profiles" on profiles
  for all using (auth.role() = 'service_role');

create policy "Service role full access activities" on activities
  for all using (auth.role() = 'service_role');

create policy "Service role full access settings" on settings
  for all using (auth.role() = 'service_role');

create policy "Service role full access contact_messages" on contact_messages
  for all using (auth.role() = 'service_role');

-- Admin role can do everything
create policy "Admin full access penthouses" on penthouses
  for all using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admin full access bookings" on bookings
  for all using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admin full access profiles" on profiles
  for all using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admin full access activities" on activities
  for all using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admin full access settings" on settings
  for all using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

create policy "Admin full access contact_messages" on contact_messages
  for all using (
    exists (select 1 from profiles where id = auth.uid() and role = 'admin')
  );

-- Anyone can insert contact messages
create policy "Anyone can insert contact_messages" on contact_messages
  for insert with check (true);

-- Anyone can read their own bookings
create policy "Guests can read own bookings" on bookings
  for select using (
    guest_email = (select email from auth.users where id = auth.uid())
  );

-- ============================================
-- FUNCTIONS
-- ============================================

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    new.email,
    coalesce(new.raw_user_meta_data ->> 'role', 'guest')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Auto-log booking activity
create or replace function public.log_booking_activity()
returns trigger as $$
begin
  if TG_OP = 'INSERT' then
    insert into public.activities (action, detail, type)
    values (
      'New Booking',
      new.penthouse_name || ' booked by ' || new.guest_name,
      'booking'
    );
  elsif TG_OP = 'UPDATE' and old.status != new.status then
    insert into public.activities (action, detail, type)
    values (
      'Booking ' || initcap(new.status),
      new.penthouse_name || ' — ' || new.guest_name,
      'booking'
    );
  end if;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for booking activity
drop trigger if exists on_booking_change on bookings;
create trigger on_booking_change
  after insert or update on bookings
  for each row execute procedure public.log_booking_activity();

-- ============================================
-- SEED DATA
-- ============================================

-- Default settings
insert into settings (key, value) values
  ('hero_title', '"Pom PentHouse"'),
  ('hero_subtitle', '"A Lakeside Sanctuary — 180 meters from Phewa Lake"'),
  ('contact_email', '"hello@pompenthouse.np"'),
  ('contact_phone', '"+977 61-XXXXXX"'),
  ('pricing_rules', '{"peakMultiplier": 20, "minStay": 2, "holidayRate": 30}')
on conflict (key) do nothing;
