import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface Coin {
  id: string;
  name: string;
  symbol?: string;
}

// 2. Create a Schema corresponding to the document interface.

const schema = new Schema<Coin>({
    id: {type: String},
    name: { type: String},
    symbol: { type: String}
  });
  const CoinModel = model<Coin>('Coin', schema);
  export default CoinModel;