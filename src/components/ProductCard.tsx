import IconCart from './IconCart';
import Link from 'next/link';
import { formatBalance } from '@/helper';
import { Item } from '@/helper/types';
import Image from 'next/image';

export default function ProductCard({ item }: { item: Item }) {
  const price = formatBalance(item.price);
  return (
    <div className="flex items-center justify-between mt-3">
      <h3 className="text-lg text-gray-800 font-medium relative">
        {item.name}
        <span className="bg-gray-800 h-[3px] w-0 group-hover:!w-full absolute bottom-[-2px] left-0 transition-all duration-400" />
      </h3>
      {item.currentOwner}
      <strong className="text-lg font-bold text-gray-800">{price}</strong>
    </div>
  );
}
