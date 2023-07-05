import { formatBalance as format } from "@polkadot/util"
import { $purify, AvailableProviders } from "@kodadot1/minipfs"
import { Item } from '@/helper/types';

export function shortAddress(
    address: string,
    begin?: number,
    end?: number
  ): string {
    begin = begin ? begin : 6
    end = end ? end : -6
  
    if (address) {
      return `${address.slice(0, begin)}...${address.slice(end)}`
    }
    return ''
}

export function ownedItemsAnalysis(items: Item[]): { owner: string, nbOfItems: number }[] {
  let lookup: { [key: string]: number } = {};

  // loop through items and count the number of items each owner has
  items.forEach(item => {
    if (!lookup[item.currentOwner]) {
      lookup[item.currentOwner] = 0;
    }

    lookup[item.currentOwner]++;
  });

  // map lookup object to desired array format
  let arr = Object.keys(lookup).map(owner => {
    return { owner: owner, nbOfItems: lookup[owner] };
  });

  // sort arr from highest nbOfItems to lowest
  arr.sort((a, b) => b.nbOfItems - a.nbOfItems);

  return arr;
}


export function formatBalance(amount?: bigint | string) {
    const value = BigInt(amount || BigInt(0));
    const magic = format(value, { decimals: 12, forceUnit: '-', withZero: false, withUnit: false });
    const intl = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: 'KSM',
      useGrouping: false,
    });
    return intl.format(Number(magic)).replace(',', '.');
}

export function sanitizeUri(uri?: string) {
    let gateway: AvailableProviders = ['nftstorage']
    return uri ? $purify(uri, gateway).at(0) : ''
  }