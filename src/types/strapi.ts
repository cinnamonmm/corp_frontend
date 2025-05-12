export interface StrapiResponse<T> {
  data: {
    id: number;
    attributes: T;
  } | {
    id: number;
    attributes: T;
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

export interface SiteConfig {
  siteName: string;
  logo: StrapiImage;
  favicon: StrapiImage;
  socialLinks: {
    platform: string;
    url: string;
  }[];
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
  title: string;
  description: string;
  icon: StrapiImage;
  order: number;
}
