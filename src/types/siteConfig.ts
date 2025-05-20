import { StrapiImage } from './strapi';

export interface SiteConfig {
  siteName: string;
  siteDescription?: string;
  logo?: StrapiImage;
}