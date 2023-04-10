import React, { ReactElement } from 'react';
import { Sidebar } from './sidebar';
import { Header } from './Header/Header';
import { Container, LeftSideContainer } from './Layout.style';
import Head from 'next/head';

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>zzuhann&apos;s blog</title>
      </Head>
      <Header />
      <Container>
        <LeftSideContainer>{children}</LeftSideContainer>
        <Sidebar />
      </Container>
    </>
  );
};

export const getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
