import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import Heading from '@theme/Heading';
import MDXContent from '@theme/MDXContent';
import type {Props} from '@theme/DocItem/Content';

type CreatedFrontMatter = {
  created?: string | Date;
};

function formatCreatedDate(value: string | Date): string {
  if (value instanceof Date) {
    return `${value.getFullYear()} 年 ${value.getMonth() + 1} 月 ${value.getDate()} 日`;
  }
  const [year, month, day] = value.split('-');
  return `${year} 年 ${Number(month)} 月 ${Number(day)} 日`;
}

export default function DocItemContent({children}: Props) {
  const {frontMatter, contentTitle} = useDoc();
  const syntheticTitle = !frontMatter.hide_title && typeof contentTitle === 'undefined';
  const created = (frontMatter as CreatedFrontMatter).created;

  return (
    <div className={clsx(ThemeClassNames.docs.docMarkdown, 'markdown')}>
      {syntheticTitle && (
        <header>
          <Heading as="h1">{frontMatter.title}</Heading>
          {created && <div className="doc-created-at">创建时间：{formatCreatedDate(created)}</div>}
        </header>
      )}
      <MDXContent>{children}</MDXContent>
    </div>
  );
}
