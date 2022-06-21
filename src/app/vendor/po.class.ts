import { Vendor } from "./vendor.class";
import { PoLine } from "./poline.class";

export class PO {
    vendor!: Vendor;

    polines!: PoLine[];

    poTotal: number = 0;

}