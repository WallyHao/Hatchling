import React, {type ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

type CreatedFrontMatter = {
  created?: string | Date;
  author_name?: string;
  author_bio?: string;
  author_github?: string;
  author_url?: string;
  author_email?: string;
};

function formatDate(value: string | Date): string {
  const d = value instanceof Date ? value : new Date(`${value}T00:00:00`);
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export default function DocItemRightSidebar(): ReactNode {
  const {frontMatter, metadata} = useDoc();
  const {siteConfig} = useDocusaurusContext();
  const {
    created,
    author_name: authorName,
    author_bio: authorBio,
    author_github: authorGithub,
    author_url: authorUrl,
    author_email: authorEmail,
  } = frontMatter as CreatedFrontMatter;
  const lastUpdatedAt = metadata.lastUpdatedAt;
  const repoUrl = `https://github.com/${siteConfig.organizationName}/${siteConfig.projectName}`;

  return (
    <div className="hatchling-right-sidebar">
      {authorName && (
        <div className="hatchling-card">
          <div className="hatchling-card__title">作者</div>
          <div className="hatchling-author">
            <div className="hatchling-author__name">{authorName}</div>
            {authorBio && <div className="hatchling-author__bio">{authorBio}</div>}
            {(authorGithub || authorUrl || authorEmail) && (
              <div className="hatchling-author__links">
                {authorGithub && (
                  <a
                    className="hatchling-author__link"
                    href={authorGithub}
                    target="_blank"
                    rel="noopener noreferrer">
                    GitHub
                  </a>
                )}
                {authorUrl && (
                  <a
                    className="hatchling-author__link"
                    href={authorUrl}
                    target="_blank"
                    rel="noopener noreferrer">
                    个人主页
                  </a>
                )}
                {authorEmail && (
                  <a className="hatchling-author__link" href={`mailto:${authorEmail}`}>
                    邮箱
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      )}

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
