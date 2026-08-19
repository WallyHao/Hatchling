import React, {type ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

type CreatedFrontMatter = {
  created?: string | Date;
};

function formatDate(value: string | Date): string {
  const d = value instanceof Date ? value : new Date(`${value}T00:00:00`);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export default function DocItemRightSidebar(): ReactNode {
  const {frontMatter, metadata} = useDoc();
  const {siteConfig} = useDocusaurusContext();
  const created = (frontMatter as CreatedFrontMatter).created;
  const lastUpdatedAt = metadata.lastUpdatedAt;
  const repoUrl = `https://github.com/${siteConfig.organizationName}/${siteConfig.projectName}`;

  return (
    <div className="hatchling-right-sidebar">
      <div className="hatchling-card">
        <div className="hatchling-card__title">文档信息</div>
        {created && (
          <div className="hatchling-card__row">
            <span>创建时间</span>
            <span>{formatDate(created)}</span>
          </div>
        )}
        {lastUpdatedAt && (
          <div className="hatchling-card__row">
            <span>更新时间</span>
            <span>{formatDate(new Date(lastUpdatedAt * 1000))}</span>
          </div>
        )}
      </div>

      <div className="hatchling-card">
        <div className="hatchling-card__title">资源</div>
        <a
          className="hatchling-card__link"
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer">
          查看 GitHub 仓库
        </a>
        {metadata.editUrl && (
          <a
            className="hatchling-card__link"
            href={metadata.editUrl}
            target="_blank"
            rel="noopener noreferrer">
            编辑此页
          </a>
        )}
      </div>
    </div>
  );
}
