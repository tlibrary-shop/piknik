# PIKNIK — Trip Control Center

Aplikasi pendataan peserta dan checklist perjalanan bus. Tidak menggunakan Supabase.

## Fitur
- Dashboard jumlah peserta dan status turun/naik.
- Daftar 47 peserta, pencarian, kategori Anggota/Tetangga, edit nama, dan export CSV.
- Checklist turun/naik kembali pada setiap titik perjalanan.
- Riwayat aktivitas dan daftar peserta yang belum kembali ke bus.
- Pengumuman untuk seluruh peserta.
- Akses koordinator dengan satu kata sandi.
- Sinkronisasi data bersama antarperangkat melalui API server.
- Tampilan responsif untuk HP dan desktop.

## Rute
1. Andi Offset — Keberangkatan
2. Oleh-Oleh Lidulapa
3. Saloka
4. Andi Offset — Kepulangan

## Setup hosting satu kali
Aplikasi memakai file JSON di repository GitHub sebagai penyimpanan server. Tidak ada Supabase, database eksternal, URL Supabase, atau key Supabase.

Di Vercel → Project Piknik → Settings → Environment Variables, tambahkan:

- `GITHUB_TOKEN`: GitHub Personal Access Token dengan akses **Contents: Read and write** hanya ke repository `tlibrary-shop/piknik`.
- `ADMIN_PASSWORD`: kata sandi rahasia untuk login koordinator.

Simpan keduanya untuk Production, lalu Redeploy. Jangan pernah menaruh token GitHub di file frontend atau membagikannya ke peserta.

## Pemakaian
- Semua orang dapat membuka dashboard dan melihat data peserta, checklist, serta pengumuman.
- Hanya koordinator yang mengetahui kata sandi dapat mencatat turun/naik, mengubah data peserta, dan membuat pengumuman.
- Sesi koordinator berlaku 7 hari pada perangkat yang digunakan.

## Data awal
47 peserta sudah termasuk 5 tetangga. Nomor 43, 45, dan 47 dicatat sebagai anggota keluarga tetangga karena nama pribadi mereka tidak tercantum pada roster.
