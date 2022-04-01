// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Product } from '@apps-workspace/products';

export class OrderItem {
    product?: Product;
    quantity?: number;
}
