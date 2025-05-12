// components/Seo.tsx
import Head from 'next/head';
import { getStrapiMedia } from '@/lib/api';

interface SeoProps {
  seo: {
    metaTitle: string;
    metaDescription?: string;
    shareImage?: {
      data?: {
        attributes: {
          url: string;
          alternativeText?: string;
          width?: number;
          height?: number;
        }
      }
    };
    canonicalURL?: string;
    keywords?: string;
    metaRobots?: string;
    structuredData?: any;
  };
  defaultSeo?: {
    metaTitle: string;
    metaDescription: string;
    shareImage?: {
      data?: {
        attributes: {
          url: string;
        }
      }
    };
  };
}

const Seo = ({ seo, defaultSeo }: SeoProps) => {
  const seoWithDefaults = {
    ...defaultSeo,
    ...seo,
  };
  
  const fullSeo = {
    metaTitle: seoWithDefaults.metaTitle,
    metaDescription: seoWithDefaults.metaDescription,
    shareImage: getStrapiMedia(
      seoWithDefaults.shareImage?.data?.attributes?.url
    ),
    canonicalURL: seoWithDefaults.canonicalURL || null,
    keywords: seoWithDefaults.keywords || null,
    metaRobots: seoWithDefaults.metaRobots || 'index, follow',
  };

  return (
    <Head>
      <title>{fullSeo.metaTitle}</title>
      {fullSeo.metaDescription && (
        <meta name="description" content={fullSeo.metaDescription} />
      )}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullSeo.metaTitle} />
      {fullSeo.metaDescription && (
        <meta property="og:description" content={fullSeo.metaDescription} />
      )}
      {fullSeo.shareImage && (
        <meta property="og:image" content={fullSeo.shareImage} />
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullSeo.metaTitle} />
      {fullSeo.metaDescription && (
        <meta name="twitter:description" content={fullSeo.metaDescription} />
      )}
      {fullSeo.shareImage && (
        <meta name="twitter:image" content={fullSeo.shareImage} />
      )}
      
      {/* Additional SEO fields */}
      {fullSeo.keywords && (
        <meta name="keywords" content={fullSeo.keywords} />
      )}
      {fullSeo.canonicalURL && (
        <link rel="canonical" href={fullSeo.canonicalURL} />
      )}
      {fullSeo.metaRobots && (
        <meta name="robots" content={fullSeo.metaRobots} />
      )}
      {seoWithDefaults.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoWithDefaults.structuredData),
          }}
        />
      )}
    </Head>
  );
};

export default Seo;