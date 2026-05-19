export const assetManifest = {
  eventLogos: [
    {
      name: "Logo Mandar Culture Festival",
      path: "/aset/logo/event/logo-mandar-culture-festival.png",
    },
    {
      name: "Logo MCF KEN",
      path: "/aset/logo/event/logo-mcf-ken.png",
    },
    {
      name: "Logo KEN",
      path: "/aset/logo/ken/logo-ken.png",
    },
  ],
  backgrounds: [
    { name: "Background 1", path: "/aset/background/bg-1.png" },
    { name: "Background 2", path: "/aset/background/bg-2.png" },
    { name: "Background 3", path: "/aset/background/bg-3.png" },
  ],
  mascots: [
    { name: "Maskot Halo", path: "/aset/maskot/maskot-halo.png" },
    { name: "Maskot Nyanyi", path: "/aset/maskot/maskot-nyanyi.png" },
    { name: "Maskot Salam", path: "/aset/maskot/maskot-salam.png" },
    { name: "Maskot Tari", path: "/aset/maskot/maskot-tari.png" },
    { name: "Maskot Tunjuk Kanan", path: "/aset/maskot/maskot-tunjuk-kanan.png" },
    { name: "Maskot Tunjuk Kiri", path: "/aset/maskot/maskot-tunjuk-kiri.png" },
  ],
  sponsorLogos: [
    { name: "Logo MCF KEN", path: "/aset/logo/event/logo-mcf-ken.png" },
    { name: "Logo KEN", path: "/aset/logo/ken/logo-ken.png" },
    {
      name: "Logo Mandar Culture Festival",
      path: "/aset/logo/event/logo-mandar-culture-festival.png",
    },
  ],
};

export const flatAssets = Object.entries(assetManifest).flatMap(([category, items]) =>
  items.map((item) => ({ ...item, category })),
);
