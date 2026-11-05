# PIKNIK — Trip Control Center

Aplikasi pendataan peserta dan checklist perjalanan bus. Tidak menggunakan Supabase.

## Fitur
- Dashboard jumlah peserta dan status turun/naik.
- Daftar 47 peserta, pencarian, kategori Anggota/Tetangga, edit nama, dan export CSV.
- Checklist turun/naik kembali pada setiap titik perjalanan.
- Riwayat aktivitas dan daftar peserta yang belum kembali ke bus.
- Pengumuman untuk seluruh peserta.
- Akses koordinator dengan satu kata sandi.
- Sinkronisasi data antarperangkat otomatis setiap 7 detik.
- Penyimpanan permanen di Vercel Blob (private storage).
- Tampilan responsif untuk HP dan desktop.

## Rute
1. Andi Offset — Keberangkatan
2. Oleh-Oleh Lidulapa
3. Saloka
4. Andi Offset — Kepulangan

## Setup hosting satu kali
1. Buka project Piknik di Vercel → **Storage** → **Create Database** → **Blob**.
2. Pilih **Private** storage dan hubungkan ke project Piknik. Vercel akan menambahkan `BLOB_READ_WRITE_TOKEN` otomatis.
3. Buka **Settings → Environment Variables**, tambahkan `ADMIN_PASSWORD` berisi kata sandi rahasia pilihanmu.
4. Redeploy project.

Setelah itu tidak ada URL Supabase, API key, GitHub token, atau database eksternal yang perlu diatur. Data disimpan di private Blob milik project Vercel.

## Pemakaian
- Semua orang dapat melihat dashboard, data peserta, checklist, dan pengumuman.
- Hanya koordinator yang mengetahui kata sandi dapat mengubah checklist, data peserta, dan pengumuman.
- Sesi koordinator berlaku 7 hari pada perangkat yang digunakan.

## Data awal
47 peserta sudah termasuk 5 tetangga. Nomor 43, 45, dan 47 dicatat sebagai anggota keluarga tetangga karena nama pribadi mereka tidak tercantum pada roster.
