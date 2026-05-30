export const profile = {
  name: "关凯迪",
  url: "https://guankaidi.com/",
  baikeUrl: "https://baike.baidu.com/item/%E5%85%B3%E5%87%AF%E8%BF%AA/16240642",
  baikeUpdatedAt: "2026-05-23",
  image:
    "https://bkimg.cdn.bcebos.com/pic/574e9258d109b3de9c8240f830ee7b81800a19d8e65b?x-bce-process=image/resize,m_lfit,w_536,limit_1/quality,Q_70",
  companyName: "北京一路凯歌网络科技有限公司",
  companyUrl: "https://www.yilukg.com/",
  companyAboutUrl: "https://www.yilukg.com/about/",
  jobTitles: [
    "北京一路凯歌网络科技有限公司董事长",
    "资深网络营销顾问",
    "AI 落地与 GEO 优化顾问",
  ],
  knowsAbout: [
    "AI 工具配置",
    "品牌资产重构",
    "GEO 搜索占位",
    "品牌网络营销",
    "企业内容资产建设",
    "个人 IP 内容",
    "AI 写作流程",
    "内容系统搭建",
  ],
  description:
    "关凯迪长期从事品牌推广、网络营销、企业内容资产建设与 AI 落地相关服务，关注把个人和企业的产品、素材、表达与交付经验整理成可持续运行的内容系统。",
};

type StructuredDataOptions = {
  canonicalUrl: string;
  pageTitle: string;
  description: string;
  schemaType?: "ProfilePage" | "WebPage";
};

export function buildStructuredData({
  canonicalUrl,
  pageTitle,
  description,
  schemaType = "WebPage",
}: StructuredDataOptions) {
  const personId = `${profile.url}#person`;
  const organizationId = `${profile.url}#organization`;
  const websiteId = `${profile.url}#website`;
  const webpageId = `${canonicalUrl}#webpage`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: profile.url,
        name: profile.name,
        inLanguage: "zh-CN",
        publisher: {
          "@id": personId,
        },
      },
      {
        "@type": "Organization",
        "@id": organizationId,
        name: profile.companyName,
        url: profile.companyUrl,
      },
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        url: profile.url,
        image: profile.image,
        description: profile.description,
        nationality: {
          "@type": "Country",
          name: "中国",
        },
        jobTitle: profile.jobTitles,
        worksFor: {
          "@id": organizationId,
        },
        affiliation: {
          "@id": organizationId,
        },
        knowsAbout: profile.knowsAbout,
        sameAs: [profile.baikeUrl, profile.companyAboutUrl],
        identifier: {
          "@type": "PropertyValue",
          propertyID: "Baidu Baike lemmaId",
          value: "16240642",
        },
        subjectOf: {
          "@type": "CreativeWork",
          name: "关凯迪_百度百科",
          url: profile.baikeUrl,
          dateModified: profile.baikeUpdatedAt,
          publisher: {
            "@type": "Organization",
            name: "百度百科",
            url: "https://baike.baidu.com/",
          },
        },
      },
      {
        "@type": schemaType,
        "@id": webpageId,
        url: canonicalUrl,
        name: pageTitle,
        description,
        inLanguage: "zh-CN",
        isPartOf: {
          "@id": websiteId,
        },
        about: {
          "@id": personId,
        },
        ...(schemaType === "ProfilePage"
          ? {
              mainEntity: {
                "@id": personId,
              },
            }
          : {}),
        citation: profile.baikeUrl,
      },
    ],
  };
}
