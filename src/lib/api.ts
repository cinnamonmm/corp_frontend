import axios from 'axios';
import { HomePage, Service, StrapiImage, StrapiImageData, SiteConfig, SiteConfigResponse, HomePageResponse } from '../types/strapi';

const strapiAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL + '/api',
});

export const getSiteConfig = async (): Promise<SiteConfigResponse> => {
  try {
    const response = await strapiAPI.get<{ data: SiteConfig[] }>('/globals', {
      params: {
        'populate[0]': 'logo',
        'populate[1]': 'favicon',
        'populate[2]': 'socialLinks'
      }
    });

    console.log('SiteConfig Response:', JSON.stringify(response.data, null, 2));

    if (!response.data.data || response.data.data.length === 0) {
      throw new Error('No site configuration found');
    }

    const config = response.data.data[0];
    if (!config) {
      throw new Error('No site configuration data');
    }

    console.log(config);

    // 画像データをStrapiImageの形式に変換
    const convertToStrapiImage = (image: StrapiImageData | undefined): StrapiImage => {
      if (!image || Object.keys(image).length === 0) {
        return {
          data: {
            id: 0,
            attributes: {
              url: '',
              width: 0,
              height: 0,
              alternativeText: ''
            }
          }
        };
      }
      return {
        data: {
          id: image.id,
          attributes: {
            url: image.url,
            width: image.width,
            height: image.height,
            alternativeText: image.alternativeText || ''
          }
        }
      };
    };

    return {
      siteName: config.siteName,
      logo: convertToStrapiImage(config.logo),
      favicon: convertToStrapiImage(config.favicon),
      socialLinks: config.socialLinks || [],
      // defaultSeo: {
      //   metaTitle: '',
      //   metaDescription: '',
      //   metaKeywords: '',
      //   metaRobots: '',
      //   metaImage: convertToStrapiImage([]),
      //   canonicalURL: ''
      // }
    };
  } catch (error) {
    console.error('Error fetching site config:', error);
    throw error;
  }
};

export const getHomePage = async (): Promise<HomePage> => {
  try {
    console.log('Fetching home page data...');
    const response = await strapiAPI.get<{ data: HomePageResponse[] }>('/home-pages', {
      params: {
        'populate[0]': 'heroImage',
        'populate[1]': 'aboutImage'
      }
    });

    console.log('HomePage Response:', JSON.stringify(response.data, null, 2));

    if (!response.data.data || response.data.data.length === 0) {
      console.error('No home page content found');
      throw new Error('No home page content found');
    }

    const homeData = response.data.data[0];
    console.log('Home Data:', homeData);

    if (!homeData) {
      console.error('Home data is undefined');
      throw new Error('Home data is undefined');
    }

    if (!homeData.heroTitle) {
      console.error('heroTitle is missing from home data');
    }

    if (!homeData.serviceTitle) {
      console.error('serviceTitle is missing from home data');
    }

    // StrapiImageData[] から StrapiImage に変換
    const convertToStrapiImage = (image: StrapiImageData | undefined): StrapiImage => {

      console.log('image:', image);

      if (!image || Object.keys(image).length === 0) {
        console.log('No images found, returning placeholder');
        return {
          data: {
            id: 0,
            attributes: {
              url: '',
              width: 0,
              height: 0,
              alternativeText: ''
            }
          }
        };
      }

      console.log('Converting image:', image);
      return {
        data: {
          id: image.id,
          attributes: {
            url: image.url,
            width: image.width,
            height: image.height,
            alternativeText: image.alternativeText || ''
          }
        }
      };
    };

    const result = {
      heroTitle: homeData.heroTitle,
      heroDescription: homeData.heroDescription || '',
      heroImage: convertToStrapiImage(homeData.heroImage),
      aboutTitle: homeData.aboutTitle,
      aboutDescription: homeData.aboutDescription || '',
      aboutImage: convertToStrapiImage(homeData.aboutImage),
      servicesTitle: homeData.serviceTitle,
      contactTitle: homeData.contactTitle
    };

    console.log('Final HomePage object:', result);
    return result;
  } catch (error) {
    console.error('Error fetching home page:', error);
    throw error;
  }
};

export const getServices = async (): Promise<Service[]> => {
  try {
    console.log('Fetching services data...');
    const response = await strapiAPI.get<{ data: unknown[] }>('/services', {
      params: {
        'populate[0]': 'icon',
        sort: 'order:asc',
      },
    });

    console.log('Services Response:', JSON.stringify(response.data, null, 2));

    if (!response.data.data) {
      console.error('No services data found');
      return [];
    }

    // StrapiImageData[] から StrapiImage に変換
    const convertToStrapiImage = (image: StrapiImageData | undefined): StrapiImage => {
      if (!image || Object.keys(image).length === 0) {
        console.log('No service icon found, returning placeholder');
        return {
          data: {
            id: 0,
            attributes: {
              url: '',
              width: 0,
              height: 0,
              alternativeText: ''
            }
          }
        };
      }

      console.log('Converting service icon:', image);
      return {
        data: {
          id: image.id,
          attributes: {
            url: image.url,
            width: image.width,
            height: image.height,
            alternativeText: image.alternativeText || ''
          }
        }
      };
    };

    // レスポンスデータをService型に変換
    const services = response.data.data.map(item => {
      console.log('Processing service item:', item);

      if (!item) {
        return null;
      }

      // 型アサーションを使用して安全にプロパティにアクセス
      const itemObj = item as { attributes?: {
        title?: string;
        description?: string;
        order?: number;
        icon?: {
          data?: StrapiImageData
        }
      }};

      // APIレスポンスの構造に応じて適切にデータを抽出
      const service: Service = {
        title: itemObj.attributes?.title || '',
        description: itemObj.attributes?.description || '',
        icon: convertToStrapiImage(itemObj.attributes?.icon?.data ? itemObj.attributes.icon.data : undefined),
        order: itemObj.attributes?.order || 0
      };

      console.log('Converted service:', service);
      return service;
    }).filter((service): service is Service => service !== null);

    console.log('Final services array:', services);
    return services;
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
};
