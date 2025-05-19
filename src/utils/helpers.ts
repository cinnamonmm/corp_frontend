import { StrapiImage } from '@/types/strapi';

export const getStrapiImageUrl = (image: StrapiImage | null | undefined): string => {
  console.log(image)
  if (!image || !image.data) {
    return '/placeholder.svg';
  }

  const { url } = image.data.attributes;

  // 絶対URLの場合はそのまま返す
  if (url.startsWith('http')) {
    return url;
  }

  // 相対URLの場合はStrapiのベースURLを付ける
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`;
};