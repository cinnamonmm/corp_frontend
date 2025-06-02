export interface StrapiResponse<T> {
  data: {
    id: number;
    attributes?: T;
  } | {
    id: number;
    attributes?: T;
  }[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface SeoMetadata {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  metaRobots: string;
  metaImage: StrapiImage;
  canonicalURL: string;
}

export interface SiteConfig {
  id: number;
  documentId: string;
  siteName: string;
  logo: StrapiImageData;
  favicon: StrapiImageData;
  socialLinks: {
    platform: string;
    url: string;
  }[];
  // createdAt: string;
  // updatedAt: string;
  // publishedAt: string;
}

export interface SiteConfigResponse {
  siteName: string;
  logo: StrapiImage;
  favicon: StrapiImage;
  socialLinks: {
    platform: string;
    url: string;
  }[];
  // defaultSeo: SeoMetadata;
}

export interface StrapiImage {
  data: {
    id: number;
    attributes: {
      url: string;
      width: number;
      height: number;
      alternativeText: string;
    };
  };
}

export interface HomePage {
  heroTitle: string;
  heroDescription: string;
  heroImage: StrapiImage;
  aboutTitle: string;
  aboutDescription: string;
  aboutImage: StrapiImage;
  servicesTitle: string;
  contactTitle: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: StrapiImage;
  order: number;
}

export interface HomePageResponse {
  id: number;
  documentId: string;
  heroTitle: string;
  heroDescription: string | null;
  aboutTitle: string;
  aboutDescription: string | null;
  serviceTitle: string;
  contactTitle: string;
  heroImage: StrapiImageData;
  aboutImage: StrapiImageData;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiImageData {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    thumbnail: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}
