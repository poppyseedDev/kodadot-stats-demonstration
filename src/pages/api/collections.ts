import { getcollectionById, getItemsListByCollection } from '@/helper/asyncCalls';
import { NextApiRequest, NextApiResponse } from 'next';



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get collection_id and chain from the request query parameters
  console.log("heri")
  const COLLECTION_ID: string = '2106275273';


  try {
    // Call your function and get the result
    const items = await getcollectionById(COLLECTION_ID, 'bsx');
    console.log(items);

    // Send the result as the API response
    res.status(200).json(items);
  } catch (error) {
    console.log(error);
    // Send an error message if something goes wrong
    res.status(500).json({ error: 'Something went wrong' });
  }
}
