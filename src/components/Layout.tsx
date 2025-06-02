import { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { getStrapiMedia } from '@/lib/api';

interface LayoutProps {
  children: ReactNode;
  global: {
    siteName: string;
    logo: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    footer: string;
  };
  navigation: {
    links: Array<{
      text: string;
      url: string;
    }>;
  };
}

export default function Layout({ children, global, navigation }: LayoutProps) {
  const logoUrl = getStrapiMedia(global.logo?.data?.attributes?.url);

  return (
    <div className="layout">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <div className="logo">
          <Link href="/">
            {logoUrl && (
              <Image
                src={logoUrl}
                alt={global.siteName}
                width={150}
                height={60}
                style={{ objectFit: 'contain' }}
              />
            )}
          </Link>
        </div>
        <nav>
          <ul>
            {navigation.links.map((link, i) => (
              <li key={i}>
                <Link href={link.url}>{link.text}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>{children}</main>

      <footer dangerouslySetInnerHTML={{ __html: global.footer }} />
    </div>
  );
}