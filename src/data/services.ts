import { Service } from '@/types/strapi';

export type ServiceCategory = {
  key: 'system_development' | 'dx_business' | 'it_consulting';
  label: 'システム開発' | 'DX事業' | 'IT コンサル・戦略コンサルティング';
};

export const SERVICE_CATEGORIES: Record<ServiceCategory['key'], ServiceCategory> = {
  system_development: {
    key: 'system_development',
    label: 'システム開発'
  },
  dx_business: {
    key: 'dx_business',
    label: 'DX事業'
  },
  it_consulting: {
    key: 'it_consulting',
    label: 'IT コンサル・戦略コンサルティング'
  }
} as const;

export interface ServiceWithCategory extends Service {
  category: ServiceCategory['label'];
  category_key: ServiceCategory['key'];
}

export const services: ServiceWithCategory[] = [
  // システム開発カテゴリー
  {
    title: 'Web アプリケーション開発',
    description: 'ユーザー中心設計と最先端技術を駆使した、<br>堅牢かつ拡張性の高いアプリケーションを構築します',
    icon: {
      data: {
        id: 1,
        attributes: {
          url: '/images/services/web-app-development.svg',
          width: 64,
          height: 64,
          alternativeText: 'Web アプリケーション開発'
        }
      }
    },
    order: 1,
    category: 'システム開発',
    category_key: 'system_development'
  },
  {
    title: 'モバイルアプリケーション開発',
    description: 'iOS・Android両プラットフォームに対応した、<br>パフォーマンスとユーザビリティに優れたモバイルアプリケーションを提供します',
    icon: {
      data: {
        id: 2,
        attributes: {
          url: '/images/services/mobile-app-development.svg',
          width: 64,
          height: 64,
          alternativeText: 'モバイルアプリケーション開発'
        }
      }
    },
    order: 2,
    category: 'システム開発',
    category_key: 'system_development'
  },
  {
    title: 'AI / LLM システム開発',
    description: '自然言語処理、機械学習、生成AIなどを活用し、<br>ニーズに合わせたAIソリューションを提供します',
    icon: {
      data: {
        id: 3,
        attributes: {
          url: '/images/services/ai-development.svg',
          width: 64,
          height: 64,
          alternativeText: 'AI / LLM システム開発'
        }
      }
    },
    order: 3,
    category: 'システム開発',
    category_key: 'system_development'
  },
  {
    title: 'エンタープライズシステム',
    description: '基幹業務、ERP、CRM、SCM、BIなどのエンタープライズシステムの<br>設計・構築・導入を通じて業務効率化と生産性向上を支援します',
    icon: {
      data: {
        id: 4,
        attributes: {
          url: '/images/services/enterprise-system.svg',
          width: 64,
          height: 64,
          alternativeText: 'エンタープライズシステム'
        }
      }
    },
    order: 4,
    category: 'システム開発',
    category_key: 'system_development'
  },
  {
    title: '業務システム',
    description: '受発注、在庫、勤怠、経費精算など、<br>企業の個別ニーズに合わせた業務システムを開発し、効率化と情報共有を促進します',
    icon: {
      data: {
        id: 5,
        attributes: {
          url: '/images/services/business-system.svg',
          width: 64,
          height: 64,
          alternativeText: '業務システム'
        }
      }
    },
    order: 5,
    category: 'システム開発',
    category_key: 'system_development'
  },
  {
    title: 'プロトタイプ開発',
    description: 'アイデアの早期具現化と検証のため、MVP開発やデザイン・機能・技術プロトタイピングを行い、<br>リスク軽減と意思決定を支援します',
    icon: {
      data: {
        id: 6,
        attributes: {
          url: '/images/services/prototype-development.svg',
          width: 64,
          height: 64,
          alternativeText: 'プロトタイプ開発'
        }
      }
    },
    order: 6,
    category: 'システム開発',
    category_key: 'system_development'
  },
  {
    title: 'レガシーシステムリプレイス',
    description: ' 現状分析に基づき最適な移行戦略を策定し、データ移行から新システム導入、クラウド化などを支援し、<br>運用コスト削減と保守性・セキュリティ強化を実現します',
    icon: {
      data: {
        id: 7,
        attributes: {
          url: '/images/services/legacy-system-replace.svg',
          width: 64,
          height: 64,
          alternativeText: 'レガシーシステムリプレイス'
        }
      }
    },
    order: 7,
    category: 'システム開発',
    category_key: 'system_development'
  },

  // DX事業カテゴリー
  {
    title: 'DX 戦略策定',
    description: '現状分析と技術動向を踏まえ、ビジネス目標に沿ったDX戦略とロードマップを策定し、<br>変革推進を支援します',
    icon: {
      data: {
        id: 8,
        attributes: {
          url: '/images/services/dx-strategy.svg',
          width: 64,
          height: 64,
          alternativeText: 'DX 戦略策定'
        }
      }
    },
    order: 8,
    category: 'DX事業',
    category_key: 'dx_business'
  },
  {
    title: 'データ分析基盤構築・活用支援',
    description: 'データ収集・統合基盤を構築し、BIツール導入やデータ分析、可視化を通じて、<br>データに基づいた意思決定とビジネス成長を支援します',
    icon: {
      data: {
        id: 9,
        attributes: {
          url: '/images/services/data-analysis.svg',
          width: 64,
          height: 64,
          alternativeText: 'データ分析基盤構築・活用支援'
        }
      }
    },
    order: 9,
    category: 'DX事業',
    category_key: 'dx_business'
  },
  {
    title: 'デジタルマーケティング活用支援',
    description: 'Webサイト分析からSEO、広告運用、SNS、MA活用まで、<br>データに基づいたデジタルマーケティング戦略を実行し、効果最大化を支援します',
    icon: {
      data: {
        id: 10,
        attributes: {
          url: '/images/services/digital-marketing.svg',
          width: 64,
          height: 64,
          alternativeText: 'デジタルマーケティング活用支援'
        }
      }
    },
    order: 10,
    category: 'DX事業',
    category_key: 'dx_business'
  },

  // IT コンサル・戦略コンサルティングカテゴリー
  {
    title: 'IT 戦略コンサルティング',
    description: '経営戦略と整合したIT戦略の策定、投資計画、組織最適化、<br>リスク管理、クラウド戦略などを支援し、企業のIT価値向上に貢献します',
    icon: {
      data: {
        id: 11,
        attributes: {
          url: '/images/services/it-strategy.svg',
          width: 64,
          height: 64,
          alternativeText: 'IT 戦略コンサルティング'
        }
      }
    },
    order: 11,
    category: 'IT コンサル・戦略コンサルティング',
    category_key: 'it_consulting'
  },
  {
    title: 'IT デューデリジェンス業務',
    description: 'IT資産、リスク、コストなどを評価し、<br>M&AにおけるIT統合・分離戦略策定や投資判断に必要な情報を提供します。',
    icon: {
      data: {
        id: 12,
        attributes: {
          url: '/images/services/it-due-diligence.svg',
          width: 64,
          height: 64,
          alternativeText: 'IT デューデリジェンス業務'
        }
      }
    },
    order: 12,
    category: 'IT コンサル・戦略コンサルティング',
    category_key: 'it_consulting'
  },
  {
    title: 'ビジネスデューデリジェンス業務',
    description: '市場、競合、事業戦略、財務、組織などを多角的に分析し、<br>投資判断やM&A戦略策定に必要な情報を提供します',
    icon: {
      data: {
        id: 13,
        attributes: {
          url: '/images/services/business-due-diligence.svg',
          width: 64,
          height: 64,
          alternativeText: 'ビジネスデューデリジェンス業務'
        }
      }
    },
    order: 13,
    category: 'IT コンサル・戦略コンサルティング',
    category_key: 'it_consulting'
  }
];