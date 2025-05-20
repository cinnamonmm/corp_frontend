"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SiteConfigResponse } from '@/types/strapi';
import { getStrapiImageUrl } from '@/utils/helpers';

interface HeaderProps {
  siteConfig: SiteConfigResponse;
}

const Header: React.FC<HeaderProps> = ({ siteConfig }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoUrl = getStrapiImageUrl(siteConfig.logo);

  return (
    <header className="pof t0 l0 r0 w100 z100 bdbrightness0">
      <div className="container mxa px4 fl aic jcb">
        <Link href="/" className="fl aic">
          <Image
            src={logoUrl}
            alt={siteConfig.siteName}
            width={150}
            height={60}
            style={{ objectFit: 'contain' }}
          />
        </Link>

        <nav className="hidden md:flex space-x-8">
          <Link href="#about" className="font-medium gray7 hover:text-primary-600">
            会社概要
          </Link>
          <Link href="#services" className="font-medium text-gray-700 hover:text-primary-600">
            サービス
          </Link>
          <Link href="#team" className="font-medium text-gray-700 hover:text-primary-600">
            チーム
          </Link>
          <Link href="#contact" className="font-medium text-gray-700 hover:text-primary-600">
            お問い合わせ
          </Link>
        </nav>

        {/* モバイルメニューボタン */}
        <button
          className="block md:dn"
          aria-label="メニュー"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* モバイルメニュー */}
        {isMenuOpen && (
          <div className="poa top-full l0 r0 shadow md:dn">
            <div className="container mx-auto py-4 px-4 flex flex-col space-y-4">
              <Link href="#about" className="font-medium text-gray-700 hover:text-primary-600">
                会社概要
              </Link>
              <Link href="#services" className="font-medium text-gray-700 hover:text-primary-600">
                サービス
              </Link>
              <Link href="#team" className="font-medium text-gray-700 hover:text-primary-600">
                チーム
              </Link>
              <Link href="#contact" className="font-medium text-gray-700 hover:text-primary-600">
                お問い合わせ
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;