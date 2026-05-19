# Arahan Teknis Developer

## Sistem Overlay OBS Event - Firebase Free + Vite + Tailwind

Bangun aplikasi web overlay OBS untuk kebutuhan event/festival. Sistem ini harus diperlakukan sebagai **Broadcast Graphics System untuk Event**, bukan dashboard aplikasi umum.

Prioritas:

- Stabil untuk OBS Browser Source
- Cepat dan mudah dipakai operator
- Visual profesional untuk LED/live streaming
- Ringan untuk Firebase Free Plan
- Tidak menampilkan blank screen saat data gagal dimuat

## Output OBS

### Layar Tengah - Rasio 6:4

URL:

```txt
/overlay/main
```

Fungsi:

- Sambutan dengan foto pejabat/tamu
- Nama penampil
- Judul segmen acara
- Running text
- Sponsor rotator
- Full screen transition
- Next event / jadwal berikutnya

### Layar Kiri - Rasio 2:3

URL:

```txt
/overlay/left
```

Fungsi:

- Branding event
- Logo event
- Foto sambutan
- Nama pembicara
- Sponsor kecil
- Visual pendukung

### Layar Kanan - Rasio 2:3

URL:

```txt
/overlay/right
```

Fungsi:

- Nama penampil
- Logo sanggar/komunitas
- Jadwal berikutnya
- Informasi sponsor
- Visual budaya/event

## Struktur Halaman

```txt
/
├── /control
├── /overlay/main
├── /overlay/left
├── /overlay/right
├── /preview
└── /docs
```

## Fitur Control Panel

Menu operator:

```txt
Dashboard
Sambutan
Penampil
Running Text
Jadwal Acara
Full Screen
Sponsor
Media Partner
Asset Manager
Scene Preset
Pengaturan Tampilan
```

## Data Overlay

### Sambutan

```js
{
  active: true,
  name: "Drs. H. Andi Ibrahim Masdar",
  title: "Bupati Polewali Mandar",
  subtitle: "Sambutan Pembukaan",
  photoPath: "/aset/foto/sambutan/bupati.png",
  layout: "formal-photo-right",
  animation: "slide-up",
  duration: 12
}
```

Tampilan:

- Lower third dengan foto
- Foto bisa kiri/kanan
- Nama besar
- Jabatan kecil
- Label: "SAMBUTAN"
- Ornamen motif Mandar
- Auto hide opsional

### Penampil

```js
{
  active: true,
  performerName: "Tari Pattuqduq",
  groupName: "Sanggar Seni Mandar",
  logoPath: "/aset/logo/event/logo-mcf.png",
  category: "Tari Tradisional",
  layout: "logo-left",
  animation: "fade-scale"
}
```

### Running Text

```js
{
  active: true,
  text: "MANDAR CULTURE FESTIVAL 2026 | Sport Center Polewali Mandar | 17 - 23 Mei 2026",
  speed: "normal",
  position: "bottom"
}
```

Catatan:

- Running text jangan terlalu tinggi
- Harus aman untuk LED dan live streaming
- Tambahkan opsi kecepatan: slow, normal, fast

### Full Screen Transition

```js
{
  active: true,
  title: "SAMBUTAN",
  subtitle: "Bupati Polewali Mandar",
  backgroundMode: "event-theme",
  duration: 8
}
```

Preset:

```txt
Opening
Sambutan
Penampilan Berikutnya
Istirahat
Sponsor Moment
Closing
Terima Kasih
```

### Sponsor Rotator

```js
{
  active: true,
  sponsors: [
    {
      name: "La Tulipe",
      logoPath: "/aset/logo/sponsor/la-tulipe.png",
      tier: "sponsor"
    }
  ],
  interval: 5000
}
```

Mode wajib:

- Support
- Sponsor
- Media Partner

## Pengelolaan Gambar dan Logo dari `/aset`

Semua gambar, logo, icon, motif, sponsor, media partner, foto pejabat, dan visual penampil diambil dari folder lokal `/aset`.

Folder wajib berada di:

```txt
public/aset/
```

Struktur disarankan:

```txt
public/aset/
├── logo/
│   ├── event/
│   ├── ken/
│   ├── sponsor/
│   ├── media-partner/
│   └── instansi/
├── foto/
│   ├── sambutan/
│   ├── penampil/
│   └── mc/
├── motif/
├── maskot/
├── ornament/
├── background/
└── footer/
```

Pemanggilan di React:

```jsx
<img src="/aset/logo/event/logo-mcf.png" />
<img src="/aset/foto/sambutan/bupati.png" />
<img src="/aset/logo/sponsor/la-tulipe.png" />
```

Firestore cukup menyimpan path relatif:

```js
{
  name: "La Tulipe",
  logoPath: "/aset/logo/sponsor/la-tulipe.png"
}
```

Untuk tampilan overlay:

```css
.logo-fit {
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
}

.photo-fit {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
```

Control panel wajib memiliki Asset Picker:

```txt
Pilih Foto Sambutan
Pilih Logo Penampil
Pilih Logo Sponsor
Pilih Background
Pilih Motif
Pilih Footer Sponsor
```

## Firebase

Struktur Firestore:

```txt
events/{eventId}
  settings
  overlays
  assets
  sponsors
  performers
  speakers
  schedules
```

Dokumen overlay:

```txt
events/mandar-culture-festival-2026/overlays/main
events/mandar-culture-festival-2026/overlays/left
events/mandar-culture-festival-2026/overlays/right
events/mandar-culture-festival-2026/overlays/live
```

Optimasi Firebase Free:

- Jangan polling manual
- Gunakan `onSnapshot`
- Batasi dokumen realtime hanya overlay aktif
- Jangan simpan file di Firestore
- Jangan update ticker setiap detik
- Jam realtime cukup di browser lokal
- Upload gambar besar ke Storage hanya jika benar-benar dibutuhkan
- Kompres asset sebelum upload

## Fallback Wajib

Jika Firebase gagal:

- Tampilkan background event default
- Jangan blank screen
- Tampilkan logo event
- Hide lower third jika data tidak valid
- Running text default boleh tetap tampil

## Keamanan Minimal

Gunakan Firebase Auth sederhana untuk operator.

Role:

```txt
admin
operator
viewer
```

Untuk awal:

- Login email/password
- Hanya admin/operator boleh edit
- Overlay public read-only

## Struktur Project Vite

```txt
src/
├── components/
│   ├── control/
│   ├── overlay/
│   ├── common/
│   └── ui/
├── pages/
│   ├── ControlPanel.jsx
│   ├── OverlayMain.jsx
│   ├── OverlayLeft.jsx
│   ├── OverlayRight.jsx
│   └── Preview.jsx
├── lib/
│   ├── firebase.js
│   ├── uploadAsset.js
│   └── overlayDefaults.js
├── hooks/
│   ├── useOverlayData.js
│   ├── useAssetUpload.js
│   └── useRealtimeDoc.js
└── styles/
    └── overlay.css
```

## Rasio dan Resolusi

Gunakan CSS aspect ratio.

```css
.overlay-main {
  aspect-ratio: 6 / 4;
  width: 100vw;
  height: 100vh;
}

.overlay-side {
  aspect-ratio: 2 / 3;
  width: 100vw;
  height: 100vh;
}
```

Rekomendasi OBS:

```txt
Main: 1800 x 1200
Side: 800 x 1200
```

Sesuaikan lagi dengan pixel mapping prosesor LED aktual.

## Desain Visual

Tema:

```txt
Cream background
Maroon title
Gold accent
Black text
Motif Mandar halus
Ornamen tenun
Footer sponsor
Maskot/event character opsional
```

Prioritas keterbacaan:

```txt
Nama: besar dan tebal
Jabatan: sedang
Label segmen: kecil tapi jelas
Logo: proporsional
```

## Animasi

Gunakan Framer Motion.

Preset animasi:

```txt
fade
slide-up
slide-left
scale-soft
wipe-maroon
ticker-scroll
```

Animasi harus ringan dan tidak terlalu banyak blur.

## Output Akhir

Developer harus menghasilkan:

```txt
1. Control Panel Event
2. Overlay Main 6:4
3. Overlay Left 2:3
4. Overlay Right 2:3
5. Preview semua layar
6. Asset Manager / Asset Picker
7. Firebase realtime sync
8. Dokumentasi OBS setup
```
