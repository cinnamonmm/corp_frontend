import { StrapiImage } from '../types/strapi';

export const getStrapiImageUrl = (image: StrapiImage | null): string => {
  if (!image || !image.data) {
    return '/placeholder.png';
  }
  
  const { url } = image.data.attributes;
  
  // 絶対URLの場合はそのまま返す
  if (url.startsWith('http')) {
    return url;
  }
  
  // 相対URLの場合はStrapiのベースURLを付ける
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`;
};