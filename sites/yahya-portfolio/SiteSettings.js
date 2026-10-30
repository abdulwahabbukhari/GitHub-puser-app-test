import mongoose from 'mongoose';

// Singleton document: profile, about, contact info and SEO. Defaults are the initial site copy.
const s = (def) => ({ type: String, default: def });

const siteSettingsSchema = new mongoose.Schema(
  {
    heroName: s('MUHAMMAD YAHYA'),
    headline: s('Digital Creator • Web Developer • Social Media Influencer'),
    tagline: s('Turning ideas into modern digital experiences through creative design, technology and digital content.'),
    intro: s(
      "I'm Muhammad Yahya, a student, social media influencer and digital creator. I build websites, edit photos and videos, and create advertisements and digital content. If you need help with a digital project, I'd be glad to hear from you."
    ),
    aboutText: s(
      "I'm a BBA student who enjoys mixing technology with creativity. Alongside my studies I work as a digital creator and social media influencer, building websites, editing photos and videos, making advertisements and producing content for social platforms.\n\nI'm comfortable with MS Office and communicate confidently in English, which helps me turn a client's idea into something clear, polished and useful. I'm open to digital projects, big or small."
    ),
    education: s('BBA'),
    role: s('Student & Digital Creator'),
    focus: s('Technology + Creativity'),
    availability: s('Open for Digital Projects'),
    email: s('yahyabachaoff@gmail.com'),
    whatsapp: s('923259126918'),
    seoTitle: s('Muhammad YAHYA — Digital Creator & Web Developer'),
    seoDescription: s(
      'Muhammad Yahya is a BBA student, digital creator and social media influencer offering website development, photo and video editing, advertisement creation, MS Office work and digital content.'
    ),
  },
  { timestamps: true }
);

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);

export const getSettings = () =>
  SiteSettings.findOneAndUpdate({}, {}, { upsert: true, new: true, setDefaultsOnInsert: true });

export default SiteSettings;
