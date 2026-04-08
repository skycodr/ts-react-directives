import { FC, PropsWithChildren } from 'react';

type PageProps = PropsWithChildren<{
  title: string;
  description?: string;
}>;

export const Page: FC<PageProps> = ({ title, description = '', children }) => {
  return (
    <div className="trd-page">
      <header className="trd-page__header">
        <h1 className="trd-page__title">{title}</h1>
        <p className="trd-page__description">{description}</p>
      </header>
      <hr />
      <div className="trd-page__content">{children}</div>
    </div>
  );
};
