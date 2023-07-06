import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


import { ownedItemsAnalysis, shortAddress, getFloorPrice, formatBalance } from '@/helper';


interface OwnerItem {
  owner: string;
  nbOfItems: number;
}

interface ChartComponentProps {
  ownerAnalysis: OwnerItem[];
  collectionSize: number;
  shortAddress: (address: string) => string;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ ownerAnalysis, collectionSize }) => {
  const labels = ownerAnalysis.map(item => shortAddress(item.owner));
  const data = ownerAnalysis.map(item => item.nbOfItems);

  const dataSet = {
    labels: labels,
    datasets: [
      {
        label: 'Number of items owned',
        data: data,
        backgroundColor: ['red', 'blue', 'green', 'yellow', 'purple', 'cyan'],
        borderWidth: 1,

      }
    ],
  };


  return (
    <div>
      <div className='py-4 text-2xl font-semibold '>Owner distribution:</div>
      <Pie data={dataSet} />
    </div>
  );
};

export default ChartComponent;
