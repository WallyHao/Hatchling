import React, {type ReactNode} from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';

type CreatedFrontMatter = {
  author_name?: string;
  author_bio?: string;
  author_github?: string;
  author_email?: string;
};

export default function DocItemRightSidebar(): ReactNode {
  const {frontMatter} = useDoc();
  const {
    author_name: authorName,
    author_bio: authorBio,
    author_github: authorGithub,
    author_email: authorEmail,
  } = frontMatter as CreatedFrontMatter;

  return (
    <div className="hatchling-right-sidebar">
      {authorName && (
        <div className="hatchling-card">
          <div className="hatchling-card__title">Author</div>
          <div className="hatchling-author">
            <div className="hatchling-author__name">{authorName}</div>
            {authorBio && <div className="hatchling-author__bio">{authorBio}</div>}
            {authorGithub && (
              <div className="hatchling-author__info">GitHub: {authorGithub}</div>
            )}
            {authorEmail && (
              <div className="hatchling-author__info">Email: {authorEmail}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
