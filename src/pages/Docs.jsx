export default function Docs() {
  return (
    <main className="workspace docs-page">
      <div className="page-heading">
        <p>Dokumentasi OBS</p>
        <h1>Setup Browser Source</h1>
      </div>

      <section>
        <h2>URL Overlay</h2>
        <code>http://localhost:5173/overlay/main</code>
        <code>http://localhost:5173/overlay/left</code>
        <code>http://localhost:5173/overlay/right</code>
      </section>

      <section>
        <h2>Resolusi Rekomendasi</h2>
        <p>Main 6:4: 1800 x 1200. Side 2:3: 800 x 1200. Sesuaikan lagi dengan pixel mapping prosesor LED.</p>
      </section>

      <section>
        <h2>Firebase</h2>
        <p>
          Isi `.env` dari `.env.example` untuk mengaktifkan Firestore realtime. Tanpa Firebase, control panel dan overlay tetap berjalan
          memakai penyimpanan lokal browser.
        </p>
        <code>cp .env.example .env</code>
        <code>VITE_EVENT_ID=mandar-culture-festival-2026</code>
      </section>

      <section>
        <h2>Firestore Path</h2>
        <p>Control panel menyimpan state live ke satu dokumen agar aman untuk Firebase Free Plan.</p>
        <code>events/mandar-culture-festival-2026/overlays/live</code>
      </section>

      <section>
        <h2>Auth Minimal</h2>
        <p>
          Aktifkan Firebase Auth email/password untuk operator. Overlay dapat public read-only, sementara halaman control sebaiknya
          dipakai oleh akun admin atau operator saja saat deploy produksi.
        </p>
        <code>Firebase Console - Authentication - Sign-in method - Email/Password</code>
      </section>

      <section>
        <h2>Deploy Firebase</h2>
        <p>Project sudah menyediakan `firebase.json`, `firestore.rules`, dan `storage.rules` sebagai baseline produksi.</p>
        <code>npm run build</code>
        <code>firebase deploy --only hosting,firestore:rules,storage</code>
      </section>

      <section>
        <h2>Troubleshooting</h2>
        <p>
          Jika control panel bisa login tetapi Simpan hanya tersimpan lokal, deploy `firestore.rules` lebih dulu. Setelah rules aktif,
          tekan Seed Live di control panel untuk membuat dokumen awal.
        </p>
        <code>events/mandar-culture-festival-2026/overlays/live</code>
      </section>

      <section>
        <h2>OBS Checklist</h2>
        <p>Tambahkan Browser Source per layar, matikan custom CSS OBS, lalu set width dan height sesuai mapping LED.</p>
        <code>Main: 1800 x 1200</code>
        <code>Side: 800 x 1200</code>
      </section>

      <section>
        <h2>Asset Lokal</h2>
        <p>Semua gambar utama berada di `public/aset` dan dipanggil melalui URL `/aset/...`.</p>
      </section>
    </main>
  );
}
