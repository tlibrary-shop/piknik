# PIKNIK — Trip Control Center

Aplikasi web pendataan peserta dan checklist perjalanan bus. Frontend statis, database, autentikasi, dan sinkronisasi realtime menggunakan Supabase.

## Fitur
- Dashboard ringkasan jumlah peserta dan status turun/naik.
- Daftar peserta, pencarian, kategori Anggota/Tetangga, edit nama, dan export CSV.
- Checklist turun dan naik kembali pada setiap titik perjalanan.
- Riwayat aktivitas dan daftar peserta yang belum kembali ke bus.
- Pengumuman yang dapat diterbitkan koordinator.
- Login koordinator melalui Supabase Auth.
- Sinkronisasi antarperangkat menggunakan Supabase Realtime.
- Tampilan responsif untuk HP dan desktop.

## Rute bawaan
1. Andi Offset — Keberangkatan
2. Oleh-Oleh Lidulapa
3. Saloka
4. Andi Offset — Kepulangan

## Jumlah peserta
**47 orang total, sudah termasuk 5 tetangga.** Seed database menyediakan 42 slot anggota sementara dan lima nama tetangga: Ajeng, Bagus, Bpk Sri, Bapak Wakijo, dan Bapak Prapto. Nama anggota yang belum tersedia harus diganti koordinator sesuai daftar asli. Tidak ada nama yang ditebak.

## Setup database (wajib untuk penggunaan bersama)
1. Siapkan project Supabase khusus aplikasi ini.
2. Buka **SQL Editor**.
3. Salin dan jalankan seluruh isi [supabase/schema.sql](./supabase/schema.sql).
4. Di **Authentication → Users**, buat user untuk koordinator.
5. Salin UUID user koordinator tersebut, lalu jalankan SQL berikut dengan UUID asli:
   ```sql
   insert into public.trip_admins (user_id)
   values ('UUID-USER-KOORDINATOR');
   ```
6. Buka **Project Settings → API Keys**. Salin Project URL dan publishable key (atau anon key legacy).
7. Buka aplikasi, masuk ke menu **Pengaturan**, isi URL dan key, lalu klik **Simpan & hubungkan**.
8. Login melalui tombol **Masuk Koordinator**.

> Jangan pernah menggunakan service_role/secret key di browser. RLS membatasi penulisan data hanya untuk user yang terdaftar di `trip_admins`.

## Deploy
Frontend statis, tidak membutuhkan build step. Bisa di-host di GitHub Pages, Cloudflare Pages, Netlify, atau server web biasa. Pastikan `index.html` menjadi root entrypoint.

## Catatan data awal
Seed database membuat 47 baris: lima nama tetangga sudah diisi dan 42 slot anggota perlu diperbarui sesuai daftar peserta final. Edit nama dilakukan dari menu **Data Peserta** setelah login koordinator.

## Struktur
- `index.html` — antarmuka dan logika frontend.
- `supabase/schema.sql` — tabel, RLS, seed, dan konfigurasi Realtime.
- `manifest.webmanifest` — metadata instalasi PWA.
