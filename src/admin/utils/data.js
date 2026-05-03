const slug = 'streamcast';

export const dashboardInfo = (info) => {
  const { version, isPremium, hasPro, licenseActiveNonce } = info;

  const proSuffix = isPremium ? ' Pro' : '';

  return {
    name: `StreamCast${proSuffix}`,
    displayName: `StreamCast${proSuffix} - Live Radio Streaming Player`,
    description: "A simple, accessible, user-friendly and fully customizable radio player for WordPress. You can play iceCast, Shoutcast, Radionomy, Radiojar, RadioCo Live stream in WordPress website using shortcode.",
    slug,
    version,
    isPremium,
    hasPro,
    displayOurPlugins: true,
    media: {
      logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`,
      banner: `https://ps.w.org/${slug}/assets/banner-772x250.png`,
      thumbnail: `https://bplugins.com/wp-content/themes/b-technologies/assets/images/products/${slug}.png`,
      // proThumbnail: `https://bplugins.com/wp-content/themes/b-technologies/assets/images/products/${slug}-pro.png`,
      // video: 'https://www.youtube.com/watch?v=milYZrqLJsE',
      // isYoutube: true
    },
    pages: {
      org: `https://wordpress.org/plugins/${slug}/`,
      landing: `https://bplugins.com/products/${slug}/`,
      docs: `https://bplugins.com/docs/${slug}/`,
      pricing: `https://bplugins.com/products/${slug}/pricing`,
    },
    freemius: {
      product_id: '6433',
      plan_id: '10492',
      public_key: 'pk_a19d159db561c020210345da466f1',
    },
    licenseActiveNonce,
    changelogs: [
      {
        version: "2.4.0 - 2 May 2026",
        type: "update",
        list: [
          "Compliance: Removed all trialware/ feature - gating logic to ensure full functionality for all users.",
          "Compliance: Localized third - party assets(WebFontLoader, FontAwesome, Plyr, Muses) to eliminate remote CDN dependencies.",
          "Privacy: Removed unconditional Google Analytics tracking from the player script.",
          "Compliance: Standardized internationalization(i18n) by migrating all text domains to 'streamcast'.",
          "Security: Enhanced output escaping and data sanitization in shortcodes and Gutenberg blocks.",
          "Enhancement: Added explicit '===External Services===' and '=== Source Code===' documentation in readme.txt.",
          "Fix: Updated shortcode attributes to correctly honor user - provided stream URLs and background colors.",
          "Maintenance: Updated compatibility tags and improved code adherence to WordPress.org standards.",
        ],
      },
      {
        version: "2.3.9 - 23 February 2026",
        type: "update",
        list: ["Redesigned the dashboard with a modern and improved user interface, replacing the previous outdated layout."],
      },
      {
        version: "2.3.7 - 22 November 2025",
        type: "update",
        list: ["Updated readme.txt and fixed issues"],
      },
      {
        version: "2.3.6 - 2 September 2025",
        type: "update",
        list: ["Updated Advanced Radio Player"],
      },
      {
        version: "2.3.5 - 23 September 2025",
        type: "update",
        list: [
          "Accessibility: Add screen reader support across all audio players.",
        ],
      },
      {
        version: "2.3.4 - 17 September 2025",
        type: "update",
        list: ["Added Modern Dashboard."],
      },
      {
        version: "2.3.1 - 17 May, 2025",
        type: "update",
        list: ["Added a new radio skin."],
      },
      {
        version: "2.3.0 - 19 Feb, 2025",
        type: "update",
        list: ["Added gutenberg block and re-customize whole plugin."],
      },
      {
        version: "2.2.4 - 30 July, 2024",
        type: "update",
        list: ["Fixed: Cross Site Scripting"],
      },
      {
        version: "2.2.3 - 4 July, 2024",
        type: "update",
        list: ["Update: WordPress SDK"],
      },
      {
        version: "2.2.2 - 1 Jan, 2024",
        type: "update",
        list: ["Fixed: Unexpected number"],
      },
      {
        version: "2.2.0 - 26 Aug, 2023",
        type: "update",
        list: ["Added new skin name ‘B Circle’ (Premium)"],
      },
    ],
    proFeatures: [
      "Customize You Player with some awesome options",
      "Enhance your player using 85+ radio player skins.",
      "Works great with Shoutcast, Icecast, and other compatible streaming servers.",
      "This plugin creates ShortCode for Each radio. So that you can play radio anywhere without coding.",
      "Collect Stream Name or Title or Artist Name from you streaming name.",
      "Alignment your player like left, center, right.",  
      "Set image for player background, player poster or art image.",
    ],
    startButton: {
      label: 'Start Now',
      url: `wp-admin/post-new.php?post_type=streamcast`
    }
  }
}

export const demoInfo = {
  allInOneLabel: 'See All Demos',
  allInOneLink: 'https://wpradioplayer.com/demo/all-radio-player/',
  demos: [
    {
      icon: "",
      title: "Minimal Player (Default)",
      type: "iframe",
      url: "https://wpradioplayer.com/demo/demo-6-minimal-default/",
    },
    {
      icon: "",
      title: "Standard Player Skins (80+ Skins)",
      type: "image",
      url: "https://i.ibb.co.com/nsgPvyzT/bg.png",
    },
    {
      icon: "",
      title: "Ultimate Player (Customized)",
      type: "iframe",
      url: "https://wpradioplayer.com/demo/demo-1-ultimate-default/",
    },
    {
      icon: "",
      title: "Ultimate Bittersweet Theme",
      type: "iframe",
      url: "https://wpradioplayer.com/demo/demo-2-ultimate-bittersweet-theme/",
    },
    {
      icon: "",
      title: "Ultimate Lightsea Green Theme",
      type: "iframe",
      url: "https://wpradioplayer.com/demo/demo-3-ultimate-lightsea-green-theme/",
    },
    {
      icon: "",
      title: "Ultimate Custom Color",
      type: "iframe",
      url: "https://wpradioplayer.com/demo/demo-4-ultimate-custom-color/",
    },
    {
      icon: "",
      title: "Ultimate Icecast Station",
      type: "iframe",
      url: "https://wpradioplayer.com/demo/demo-5-ultimate-icecast-station/",
    },
    {
      icon: "",
      title: "Advanced Default",
      type: "iframe",
      url: "https://wpradioplayer.com/demo/demo-7-advanced-default/",
    },
    {
      icon: "",
      title: "Advanced Custom Color & Align Right",
      type: "iframe",
      url: "https://wpradioplayer.com/demo/demo-8-advanced-custom-color-and-align-right/",
    },
    {
      icon: "",
      title: "EchoPlayer",
      description: "",
      type: "iframe",
      url: "https://wpradioplayer.com/demo/demo-13/",
    },
    {
      icon: "",
      title: "AuroraPlay",
      type: "iframe",
      url: "https://wpradioplayer.com/demo/demo-14-aurora-play/",
    },
    {
      icon: "",
      title: "Wooden Player",
      type: "iframe",
      url: "https://wpradioplayer.com/demo/demo-15-wooden-player/",
    },
  ]
}

export const pricingInfo = {
  logo: `https://ps.w.org/${slug}/assets/icon-128x128.png`, // Optional
  pluginId: 6433,
  planId: 10492,
  licenses: [
    1,
    3,
    null
  ],
  button: {
    label: 'Buy Now ➜'
  },
  featured: {
    selected: 3, // choose from licenses item
  }
}


