/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  INVITE CONFIG — edit EVERYTHING here. No UI component needs to be touched.
 *  Every value in [SQUARE BRACKETS] is a placeholder waiting for real details.
 *
 *  Images:  put files in /public/images and set e.g.  image: '/images/haldi.jpg'
 *           Leave image: null to show the built-in hand-drawn illustration.
 *  Dates:   *ISO fields must be valid ISO-8601 strings with IST offset (+05:30),
 *           they drive the countdown + "Add to Calendar". The *Display fields are
 *           what guests read, so write them however you like.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// One place for map links — reuse below.
export const GOOGLE_MAPS_URL = 'https://maps.google.com/?q=[MAIN+WEDDING+VENUE+NAME,+CITY]'

export const WHATSAPP_NUMBER = '919999999999' // [WHATSAPP NUMBER] country code + number, digits only
export const WHATSAPP_RSVP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Namaste! 🙏 We'd love to attend Madhuresh & Sayantani's wedding. — [YOUR NAME]",
)}`

// Google Sheet RSVP — deploy /google-apps-script/Code.gs as a Web App and paste its URL here.
// Leave empty ('') to send RSVPs via WhatsApp only.
export const GOOGLE_SHEET_WEBAPP_URL = 'https://script.google.com/macros/s/AKfycbzcsDhvTFMj_O0AE9A1Bk_HZ6GvKlhW1g4svvuuzdBnj_A_vb5S44qsMvAqfbX8yq0h/exec'

// Countdown target = the muhurat / lagna time.
export const TARGET_WEDDING_ISO_DATE = '2027-02-14T19:30:00+05:30' // [TARGET_WEDDING_ISO_DATE]

const inviteConfig = {
  couple: {
    groom: {
      name: 'Madhuresh',
      fullName: '[GROOM FULL NAME]',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      stateShort: 'UP',
      father: "[GROOM'S FATHER NAME]",
      mother: "[GROOM'S MOTHER NAME]",
      about: '[A LINE ABOUT MADHURESH — e.g. a Lucknowi at heart who believes every evening deserves kebabs and a kite in the sky.]',
      image: null, // '/images/groom.jpg'
    },
    bride: {
      name: 'Sayantani',
      fullName: '[BRIDE FULL NAME]',
      city: 'Kolkata',
      state: 'West Bengal',
      stateShort: 'WB',
      father: "[BRIDE'S FATHER NAME]",
      mother: "[BRIDE'S MOTHER NAME]",
      about: '[A LINE ABOUT SAYANTANI — e.g. a Kolkata girl who hums Rabindrasangeet and never says no to phuchka.]',
      image: null, // '/images/bride.jpg'
    },
    hashtag: '#MaddyWedsSanny',
    monogram: 'M ✦ S',
  },

  invocation: {
    hindi: 'ॐ श्री गणेशाय नमः',
    bengali: 'শ্রী শ্রী প্রজাপতয়ে নমঃ',
    blessingHindi: 'आपकी उपस्थिति प्रार्थनीय है',
    blessingBengali: 'আপনার উপস্থিতি একান্ত কাম্য',
  },

  // Front-page summary
  wedding: {
    dateDisplay: '[WEDDING DATE]', // e.g. 'Sunday, 14 February 2027'
    venueDisplay: '[MAIN WEDDING VENUE NAME, CITY]',
    mapsUrl: GOOGLE_MAPS_URL, // [GOOGLE MAPS LINK PLACEHOLDER]
  },

  welcome: {
    heading: 'Two cities, one celebration',
    message:
      'From the arches of Lucknow to the banks of the Hooghly — with the blessings of our elders, we invite you to share in the joy of our wedding. Your presence will make our celebrations complete.',
    coupleImage: null, // '/images/couple.jpg'  [PLACEHOLDER: AI-GENERATED COUPLE PORTRAIT]
    coupleImageLabel: '[PLACEHOLDER: AI-GENERATED COUPLE PORTRAIT]',
  },

  /**
   * Events — order here = order on the page.
   * art: which built-in illustration to show when image is null
   *      (tilak | aiburobhat | mehendi | haldi | sangeet | baraat | wedding | reception)
   * tone: 'emerald' or 'crimson' card style
   */
  events: [
    {
      id: 'aiburobhat',
      title: 'Aiburobhat',
      native: 'আইবুড়োভাত',
      subtitle: "Bride's side · Kolkata",
      blurb: 'The bride’s last feast as an unmarried girl — rice, fish and payesh served with love.',
      dateDisplay: '[DATE & TIME]',
      startISO: '2027-02-11T13:00:00+05:30',
      endISO: '2027-02-11T16:00:00+05:30',
      venue: '[VENUE NAME & ADDRESS]',
      mapsUrl: GOOGLE_MAPS_URL,
      image: null,
      imageLabel: '[PLACEHOLDER: AI-GENERATED EVENT IMAGE]',
      art: 'aiburobhat',
      tone: 'emerald',
    },
    {
      id: 'mehendi',
      title: 'Mehendi',
      native: 'मेहंदी · মেহেন্দি',
      subtitle: 'Henna, music & laughter',
      blurb: 'Intricate henna, dholak beats and the search for the groom’s name hidden in the bride’s palm.',
      dateDisplay: '[DATE & TIME]',
      startISO: '2027-02-12T16:00:00+05:30',
      endISO: '2027-02-12T20:00:00+05:30',
      venue: '[VENUE NAME & ADDRESS]',
      mapsUrl: GOOGLE_MAPS_URL,
      image: null,
      imageLabel: '[PLACEHOLDER: AI-GENERATED EVENT IMAGE]',
      art: 'mehendi',
      tone: 'emerald',
    },
    {
      id: 'haldi',
      title: 'Haldi · Gaye Holud',
      native: 'हल्दी · গায়ে হলুদ',
      subtitle: 'Turmeric blessings',
      blurb: 'Turmeric touches the groom first, and the blessed paste travels to the bride — a golden glow for both.',
      dateDisplay: '[DATE & TIME]',
      startISO: '2027-02-13T10:00:00+05:30',
      endISO: '2027-02-13T13:00:00+05:30',
      venue: '[VENUE NAME & ADDRESS]',
      mapsUrl: GOOGLE_MAPS_URL,
      image: null,
      imageLabel: '[PLACEHOLDER: AI-GENERATED EVENT IMAGE]',
      art: 'haldi',
      tone: 'crimson',
    },
    {
      id: 'sangeet',
      title: 'Sangeet',
      native: 'संगीत · সংগীত',
      subtitle: 'An evening of song & dance',
      blurb: 'Banna-banni folk songs meet Bengali melodies — come ready to dance.',
      dateDisplay: '[DATE & TIME]',
      startISO: '2027-02-13T19:00:00+05:30',
      endISO: '2027-02-13T23:30:00+05:30',
      venue: '[VENUE NAME & ADDRESS]',
      mapsUrl: GOOGLE_MAPS_URL,
      image: null,
      imageLabel: '[PLACEHOLDER: AI-GENERATED EVENT IMAGE]',
      art: 'sangeet',
      tone: 'emerald',
    },
    {
      id: 'baraat',
      title: 'Baraat',
      native: 'बारात · বরযাত্রী',
      subtitle: 'The groom’s grand procession',
      blurb: 'Dhol, shehnai and the groom on his ghodi — join the baraat as it dances its way to the bride.',
      dateDisplay: '[DATE & TIME]',
      startISO: '2027-02-14T18:00:00+05:30',
      endISO: '2027-02-14T19:30:00+05:30',
      venue: '[VENUE NAME & ADDRESS]',
      mapsUrl: GOOGLE_MAPS_URL,
      image: null,
      imageLabel: '[PLACEHOLDER: AI-GENERATED EVENT IMAGE]',
      art: 'baraat',
      tone: 'crimson',
    },
    {
      id: 'wedding',
      title: 'Shubh Vivah · Shubho Bibaho',
      native: 'शुभ विवाह · শুভ বিবাহ',
      subtitle: 'The Wedding · Lagna [TIME] onwards',
      blurb: 'Jaimala & Mala Badal, Shubho Drishti, the sacred pheras and Sindoor Daan.',
      dateDisplay: '[DATE & TIME]',
      startISO: TARGET_WEDDING_ISO_DATE,
      endISO: '2027-02-15T01:00:00+05:30',
      venue: '[VENUE NAME & ADDRESS]',
      mapsUrl: GOOGLE_MAPS_URL,
      image: null,
      imageLabel: '[PLACEHOLDER: AI-GENERATED EVENT IMAGE]',
      art: 'wedding',
      tone: 'crimson',
      featured: true,
    },
    {
      id: 'reception',
      title: 'Reception · Bou Bhaat',
      native: 'स्वागत समारोह · বৌভাত',
      subtitle: 'Welcoming the bride home',
      blurb: 'The new bride serves her first meal to her new family, followed by an evening of celebration.',
      dateDisplay: '[DATE & TIME]',
      startISO: '2027-02-16T19:30:00+05:30',
      endISO: '2027-02-16T23:30:00+05:30',
      venue: '[VENUE NAME & ADDRESS]',
      mapsUrl: GOOGLE_MAPS_URL,
      image: null,
      imageLabel: '[PLACEHOLDER: AI-GENERATED EVENT IMAGE]',
      art: 'reception',
      tone: 'emerald',
    },
  ],

  thingsToKnow: [
    { icon: 'hashtag', title: 'Wedding Hashtag', text: 'Share your moments with #MaddyWedsSanny' },
    { icon: 'weather', title: 'Weather', text: '[EXPECTED WEATHER NOTE — e.g. Pleasant February evenings, 14–24°C. Carry a light shawl.]' },
    { icon: 'parking', title: 'Parking & Hospitality', text: '[PARKING / ACCOMMODATION NOTE — e.g. Valet at the venue; rooms reserved at the hotel for outstation guests.]' },
  ],

  rsvp: {
    heading: 'Please RSVP',
    note: '[RSVP BY DATE — e.g. Kindly respond by 15 January 2027]',
    whatsappLink: WHATSAPP_RSVP_LINK, // [WHATSAPP_RSVP_LINK]
    sheetUrl: GOOGLE_SHEET_WEBAPP_URL,
  },

  finale: {
    heading: 'The countdown begins',
    targetISO: TARGET_WEDDING_ISO_DATE,
    closing: 'With love, the Families of Madhuresh & Sayantani',
  },

  audio: {
    // Drop your own track at /public/audio/wedding.mp3 (it replaces the bundled one).
    src: '/audio/wedding.mp3',
    // Required attribution for the bundled CC BY-SA track — change/clear it if you replace the mp3.
    credit: 'Music: “Sitar and tabla rendition – Freedom Jam 2015”, Ashok Ayengar, CC BY-SA 4.0 via Wikimedia Commons',
    playMusicOnOpen: true, // music fades in when the guest taps to unveil (no sound effects)
  },

  // Theme the guest sees first: 'pastel' | 'royal' | 'night'
  defaultTheme: 'pastel',
}

export default inviteConfig
