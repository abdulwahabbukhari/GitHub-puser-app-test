/**
 * =========================================================================
 * STAR GAMER 10M — BRAND CONFIGURATION
 * =========================================================================
 * To update your brand name, tagline, social links, logo, or content,
 * edit the values in this single file.
 */

export const siteConfig = {
  // Brand Identity
  brandName: "STAR GAMER 10M",
  tagline: "BORN TO PLAY. MADE TO WIN.",
  niche: "Free Fire Gaming Content Creator",
  foundedYear: 2024,

  // Creator Bio & Story
  about: {
    badge: "Official Creator Profile",
    title: "THE PLAYER BEHIND THE BRAND",
    description:
      "I'm Star Gamer 10M, a Free Fire content creator focused on epic gameplay, memorable moments, and connecting with gamers who share the same passion. Welcome to my world and become part of the Star Family.",
    secondaryText:
      "From high-intensity ranked clutches to community custom rooms, every session is driven by precision, passion, and the pursuit of victory. With an unstoppable mindset and loyal fans worldwide, the journey has only just begun.",
    characterName: "Wolfrahh & Orion Squad",
    rankBadge: "Mestre II (4,108 Pts)",
    level: "Level 60 Veteran",
    server: "Global / South Asia",
    motto: "Old Memories. Real Legends. Free Fire Will Always Be Home."
  },

  // Social Media Profiles
  // Update these URLs whenever your profile handles change
  socials: {
    tiktok: "https://www.tiktok.com/@stargamer10m",
    instagram: "https://www.instagram.com/star_gamerofficial10m/",
    youtube: "https://www.youtube.com/@stargamer10m",
    discord: "" // Keep empty until official server is published
  },

  // Social Handles for display
  handles: {
    tiktok: "@stargamer10m",
    instagram: "star_gamerofficial10m",
    youtube: "@stargamer10m",
    discord: "Coming Soon"
  },

  // Social Card Subtitles & Highlights
  socialCards: [
    {
      platform: "YouTube",
      id: "youtube",
      handle: "@stargamer10m",
      url: "https://www.youtube.com/@stargamer10m",
      badge: "Main Channel",
      focus: "Full Matches, Ranked Clutches & Livestreams",
      actionText: "Subscribe on YouTube",
      icon: "youtube"
    },
    {
      platform: "TikTok",
      id: "tiktok",
      handle: "@stargamer10m",
      url: "https://www.tiktok.com/@stargamer10m",
      badge: "Shorts & Viral",
      focus: "Insane Snipe Highlights & Daily Reels",
      actionText: "Follow on TikTok",
      icon: "tiktok"
    },
    {
      platform: "Instagram",
      id: "instagram",
      handle: "star_gamerofficial10m",
      url: "https://www.instagram.com/star_gamerofficial10m/",
      badge: "Community & Stories",
      focus: "Behind-The-Scenes, Setups & Match Updates",
      actionText: "Follow on Instagram",
      icon: "instagram"
    }
  ],

  // Logos & Visual Assets
  logo: "./images/star-gamer-logo.png", // Uploaded Free Fire player card / official logo
  logoEmblem: "./images/star-gamer-crest.png", // Circular luxury gold crest
  heroWarrior: "./images/hero-warrior.png", // Free Fire gold & black character
  heroSupercar: "./images/hero-supercar.png", // Luxury supercar artwork
  localVideoPreview: "./images/gameplay-clip.mp4", // Real Free Fire gameplay clip

  // Content Showcase Cards (Section 4)
  contentCards: [
    {
      id: "gameplay",
      title: "FREE FIRE GAMEPLAY",
      category: "Battle Royale Ranked",
      description:
        "High-stakes tactical rushes, squad clutches, and Master-tier gameplay strategies in the Free Fire arena.",
      thumbnail: "./images/content-gameplay.jpg",
      videoUrl: "./images/gameplay-clip.mp4", // Local video or YouTube URL
      isVideoLocal: true,
      duration: "Full HD Action",
      tag: "Competitive"
    },
    {
      id: "epic-moments",
      title: "EPIC MOMENTS",
      category: "Clutches & Sniper Kills",
      description:
        "Unbelievable 1v4 comebacks, Golden M4A1 streaks, and precision headshots that turned the tide of battle.",
      thumbnail: "./images/content-epic.jpg",
      videoUrl: "", // Leave empty for clearly marked placeholder
      youtubeUrl: "https://www.youtube.com/@stargamer10m",
      duration: "Highlights",
      tag: "Top Clutches"
    },
    {
      id: "shorts",
      title: "SHORTS & HIGHLIGHTS",
      category: "Quick Clips & Edits",
      description:
        "Fast-paced cinematic montage edits, sound-synced Free Fire shorts, and viral gaming moments.",
      thumbnail: "./images/content-shorts.jpg",
      videoUrl: "", // Leave empty for clearly marked placeholder
      youtubeUrl: "https://www.youtube.com/@stargamer10m",
      duration: "Viral Shorts",
      tag: "Trending"
    }
  ],

  // Star Family Community (Section 6)
  starFamily: {
    heading: "MORE THAN A GAME. WE ARE THE STAR FAMILY.",
    description:
      "Every match creates a memory. Every victory tells a story. Join the journey and be part of the Star Family.",
    ctaText: "JOIN THE COMMUNITY",
    discordStatus: "coming_soon", // "available" or "coming_soon"
    discordNotice:
      "The official Star Family Discord server is currently in private preparation. Join our YouTube, TikTok & Instagram to be first in line when public invites open!"
  },

  // Contact & Inquiries
  contact: {
    heading: "LET'S CONNECT",
    subheading: "Business Inquiries, Esports Collaborations & Community Questions",
    email: "business@stargamer10m.com", // Editable contact email
    responseNotice: "For brand collaborations, tournament invites, or sponsorships."
  }
};
