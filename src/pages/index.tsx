import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { InferGetStaticPropsType } from 'next';
import ProductCard from '@/components/ProductCard';

import { extendFields, getClient } from '@kodadot1/uniquery';
import Header from '@/components/Header';
import { MultipleItems, Item } from '@/helper/types';
import Footer from '@/components/Footer';
import { ownedItemsAnalysis, shortAddress } from '@/helper';

//const COLLECTION_ID: string = process.env.COLLECTION_ID as string;

const COLLECTION_ID: string = '2106275273';

export const getStaticProps = async () => {
  const client = getClient('bsx');
  const query = client.itemListByCollectionId(COLLECTION_ID, {
    fields: extendFields(['meta', 'price']),
    orderBy: 'createdAt_ASC',
  });
  const res: MultipleItems = await client.fetch(query);

  let itemam: { items: Item[] } | null;
  let items: Item[] | undefined;

  if (res) {
    if ('data' in res) {
      itemam = res.data;
    } else {
      itemam = res;
    }
    items = itemam?.items;
  }

  return {
    props: { items },
  };
};

export default function Home({
  items,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (typeof items == 'undefined') {
    return <>Data unaccessible</>;
  }

  console.log(items);
  console.log(ownedItemsAnalysis(items));

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div
        className="w-11/12 max-w-5xl mx-auto mt-28"
        aria-labelledby="information-heading"
      >
        <h2 className="text-3xl">
          Collection Id:  {COLLECTION_ID}
        </h2>
        <div className='text-xl'>Items in collection: {items.length}</div>
        <div className='text-xl'>Owners</div>
        <div className='grid grid-cols-1'>
          {ownedItemsAnalysis(items).map((item) => (
            <div key={item.owner}>
              {item.nbOfItems} - {shortAddress(item.owner)}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1">
          {items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
