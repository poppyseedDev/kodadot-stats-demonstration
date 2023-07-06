// Assuming we've imported QueryProps and BaseEvent types
import { MultipleItems, Item } from './types'; // adjust import path accordingly
import { extendFields, getClient } from '@kodadot1/uniquery';
import { Prefix } from '@kodadot1/static'

// Function to get events by interaction
export async function getItemsListByCollection(collection_id: string, chain?: Prefix | undefined) {
    const client = getClient(chain);
    const query = client.itemListByCollectionId(collection_id, {
      fields: extendFields(['meta', 'price']),
      orderBy: 'createdAt_ASC',
    });
    const res: MultipleItems = await client.fetch(query);
    
    let items: Item[] | undefined;
  
    if (res) {
      if ('data' in res) {
        items = res.data ? res.data.items : undefined;
      } else {
        items = res.items;
      }
    }

  return items;
}

export async function getcollectionById(collection_id: string, chain?: Prefix | undefined) {
    const client = getClient(chain);
    const query = client.collectionById(
        collection_id,
        extendFields(['meta'])
    );
    const res: any = await client.fetch(query);

    let items: any | undefined;
      
    if (res) {
      if ('data' in res) {
        items = res.data ? res.data.items : undefined;
      } else {
        items = res.items;
      }
    }

  return items;
}