import axios from 'axios';
import { StrapiResponse, SiteConfig, HomePage, Service } from '../types/strapi';

const strapiAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL + '/api',
});

export const getSiteConfig = async (): Promise<SiteConfig> => {
  const response = await strapiAPI.get<StrapiResponse<SiteConfig>>('/site-configuration', {
    params: {
      populate: 'logo,favicon,socialLinks',
    },
  });
  return response.data.data.attributes;
};

export const getHomePage = async (): Promise<HomePage> => {
  const response = await strapiAPI.get<StrapiResponse<HomePage>>('/home-page', {
    params: {
      populate: 'heroImage,aboutImage',
    },
  });
  return response.data.data.attributes;
};

export const getServices = async (): Promise<Service[]> => {
  const response = await strapiAPI.get<StrapiResponse<Service>>('/services', {
    params: {
      populate: 'icon',
      sort: 'order:asc',
    },
  });
  
  // Array型の処理
  const dataArray = Array.isArray(response.data.data) 
    ? response.data.data 
    : [response.data.data];
    
  return dataArray.map(item => item.attributes);
};