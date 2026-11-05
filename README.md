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
**47 orang total, sudah termasuk 5 tetangga.** Seed database sudah berisi seluruh nama dari roster BUS 9. Nomor 43, 45, dan 47 dicatat sebagai anggota keluarga Bpk Sri, Bapak Wakijo, dan Bapak Prapto karena nama pribadi mereka tidak tercantum pada daftar.

## Setup satu kali

### 1. Siapkan database Supabase
1. Buka project Supabase yang dipakai aplikasi ini.
2. Buka **SQL Editor**.
3. Jalankan seluruh isi [supabase/schema.sql](./supabase/schema.sql).
4. Di **Authentication → Users**, buat akun koordinator.
5. Salin User UID akun tersebut, lalu jalankan SQL berikut dengan UUID asli:
   ```sql
   insert into public.trip_admins (user_id)
   values ('UUID-USER-KOORDINATOR');
   ```

### 2. Simpan koneksi di Vercel (cukup sekali)
Di project Vercel yang men-deploy aplikasi ini, buka **Settings → Environment Variables**, lalu tambahkan:
- `SUPABASE_URL` = Project URL dari Supabase.
- `SUPABASE_ANON_KEY` = publishable key / anon key dari Supabase.

Pilih semua environment (Production, Preview, Development) bila ingin dipakai di semuanya, lalu **Redeploy**. Aplikasi mengambil konfigurasi otomatis melalui `/api/config`. Tidak perlu lagi memasukkan URL atau key di browser maupun di perangkat peserta.

> Gunakan hanya publishable/anon key. Jangan pernah memasukkan `service_role` atau secret key ke environment yang dikirim ke browser.

### 3. Pemakaian
1. Buka alamat aplikasi.
2. Tekan **Masuk Koordinator**, lalu login dengan email dan password akun koordinator.
3. Sesi login disimpan oleh Supabase di perangkat tersebut, jadi biasanya tidak perlu login setiap kali membuka aplikasi.
4. Bagikan alamat aplikasi kepada peserta. Peserta dapat melihat data, sedangkan perubahan checklist tetap dibatasi untuk koordinator.


## Deploy
Frontend statis, tidak membutuhkan build step. Bisa di-host di GitHub Pages, Cloudflare Pages, Netlify, atau server web biasa. Pastikan `index.html` menjadi root entrypoint.

## Catatan data awal
Seed database membuat atau memperbarui 47 baris sesuai roster BUS 9. Menjalankan ulang blok seed akan memperbaiki nama dan kategori berdasarkan nomor peserta.

## Struktur
- `index.html` — antarmuka dan logika frontend.
- `supabase/schema.sql` — tabel, RLS, seed, dan konfigurasi Realtime.
- `manifest.webmanifest` — metadata instalasi PWA.
