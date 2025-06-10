import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const HuntOrca = dynamic(() => import('../components/HuntOrca'), { ssr: false });

export default function Home() {
  useEffect(() => {
    document.body.classList.add('bg-background');
  }, []);

  return (
    <>
      <Head>
        <title>HuntOrca – AI Lead Generation</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <HuntOrca />
    </>
  );
}
