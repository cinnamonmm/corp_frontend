// components/Navigation.tsx
import Link from 'next/link';
import { useState } from 'react';

interface LinkItem {
  id: number;
  label: string;
  url: string;
  isExternal?: boolean;
  icon?: string;
  children?: LinkItem[];
}

interface NavigationProps {
  links: LinkItem[];
}

// リンク項目の再帰的なレンダリング関数
const RenderLink = ({ link }: { link: LinkItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = link.children && link.children.length > 0;

  // 外部リンクと内部リンクの処理を分ける
  if (link.isExternal) {
    return (
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="nav-link"
      >
        {link.icon && <span className="icon">{link.icon}</span>}
        {link.label}
      </a>
    );
  }

  // 子メニューを持つリンク項目
  if (hasChildren) {
    return (
      <div className="dropdown">
        <button
          className="dropdown-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          {link.icon && <span className="icon">{link.icon}</span>}
          {link.label}
        </button>
        {isOpen && link.children && (
          <ul className="dropdown-menu">
            {link.children.map((childLink) => (
              <li key={childLink.id}>
                <RenderLink link={childLink} />
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  // 標準的な内部リンク
  return (
    <Link href={link.url} className="nav-link">
      {link.icon && <span className="icon">{link.icon}</span>}
      {link.label}
    </Link>
  );
};

// メインのナビゲーションコンポーネント
const Navigation = ({ links }: NavigationProps) => {
  return (
    <nav className="main-navigation">
      <ul className="nav-list">
        {links.map((link) => (
          <li key={link.id} className="nav-item">
            <RenderLink link={link} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;