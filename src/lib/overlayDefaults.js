export const eventId = import.meta.env.VITE_EVENT_ID || "mandar-culture-festival-2026";

export const defaultOverlayState = {
  event: {
    title: "MANDAR CULTURE FESTIVAL 2026",
    venue: "Sport Center Polewali Mandar",
    date: "17 - 23 Mei 2026",
    logoPath: "/aset/logo/event/logo-mandar-culture-festival.png",
    kenLogoPath: "/aset/logo/ken/logo-ken.png",
    backgroundPath: "/aset/background/bg-3.png",
    mascotPath: "/aset/maskot/maskot-salam.png",
    motifPath: "/aset/background/bg-3.png",
    designMode: "elegant-international",
  },
  activeScene: "sambutan",
  speaker: {
    active: true,
    name: "Drs. H. Andi Ibrahim Masdar",
    title: "Bupati Polewali Mandar",
    subtitle: "Sambutan Pembukaan",
    photoPath: "/aset/maskot/maskot-salam.png",
    layout: "formal-photo-right",
    animation: "slide-up",
    duration: 12,
  },
  performer: {
    active: true,
    performerName: "Tari Pattuqduq",
    groupName: "Sanggar Seni Mandar",
    logoPath: "/aset/logo/event/logo-mcf-ken.png",
    photoPath: "/aset/maskot/maskot-tari.png",
    category: "Tari Tradisional",
    layout: "logo-left",
    animation: "fade-scale",
  },
  runningText: {
    active: true,
    text: "MANDAR CULTURE FESTIVAL 2026 | Sport Center Polewali Mandar | 17 - 23 Mei 2026",
    speed: "normal",
    position: "bottom",
  },
  transition: {
    active: false,
    title: "SAMBUTAN",
    subtitle: "Bupati Polewali Mandar",
    backgroundMode: "event-theme",
    duration: 8,
  },
  sponsor: {
    active: true,
    interval: 5000,
    mode: "Sponsor",
    sponsors: [
      {
        name: "Mandar Culture Festival",
        logoPath: "/aset/logo/event/logo-mcf-ken.png",
        tier: "sponsor",
      },
      {
        name: "Kharisma Event Nusantara",
        logoPath: "/aset/logo/ken/logo-ken.png",
        tier: "support",
      },
    ],
  },
  mediaPartner: {
    active: true,
    interval: 5000,
    partners: [
      {
        name: "Kharisma Event Nusantara",
        logoPath: "/aset/logo/ken/logo-ken.png",
        tier: "media-partner",
      },
    ],
  },
  schedule: {
    active: true,
    current: "Sambutan Pembukaan",
    next: "Tari Pattuqduq",
    items: [
      { time: "19.30", title: "Sambutan Pembukaan" },
      { time: "20.00", title: "Tari Pattuqduq" },
      { time: "20.30", title: "Musik Tradisi Mandar" },
    ],
  },
};

export const scenePresets = [
  {
    id: "sambutan",
    label: "Preset Sambutan Formal",
    patch: {
      activeScene: "sambutan",
      speaker: { active: true },
      performer: { active: false },
      transition: { active: false },
      runningText: { active: true },
    },
  },
  {
    id: "penampil",
    label: "Preset Penampil",
    patch: {
      activeScene: "penampil",
      speaker: { active: false },
      performer: { active: true },
      transition: { active: false },
      runningText: { active: true },
    },
  },
  {
    id: "sponsor",
    label: "Preset Sponsor Moment",
    patch: {
      activeScene: "sponsor",
      sponsor: { active: true },
      transition: { active: true, title: "SPONSOR MOMENT", subtitle: "Terima kasih atas dukungan" },
    },
  },
  {
    id: "next",
    label: "Preset Next Event",
    patch: {
      activeScene: "next",
      transition: { active: true, title: "PENAMPILAN BERIKUTNYA", subtitle: "Tari Pattuqduq" },
    },
  },
  {
    id: "closing",
    label: "Preset Closing",
    patch: {
      activeScene: "closing",
      transition: { active: true, title: "TERIMA KASIH", subtitle: "Mandar Culture Festival 2026" },
    },
  },
];
