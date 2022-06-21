import { Product } from "../product/product.class";
import { Request } from "../request/request.class";
import { Vendor } from "./vendor.class";
import { RequestLine } from "../requestline/requestline.class";


export class PoLine {

    quantity: number = 0;
    price: number = 0;
    lineTotal: number = 0;

    product!: Product;
    request!: Request;
    vendor!: Vendor;
    requestLine!: RequestLine;
}