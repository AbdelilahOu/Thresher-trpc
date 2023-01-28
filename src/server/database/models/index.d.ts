///////////////////////////////////
//////////// INTERFACES //////////
/////////////////////////////////
//////////// COMMAND INTERFACES//
export interface commandT {
  [key: string]: any;
  id: number;
  createdAt: string;
  status: string;
  clientId: number;
  commandItems: commandItemT[];
}

export interface commandItemT {
  id: number;
  productId: number;
  commandId: number;
  quantity: number;
  stockId: number;
}

export interface newCommandT extends Partial<Omit<commandT, "commandItems">> {
  // commandItems: Omit<commandItemT, "id" | "commandId" | "stockId">[];
}

export interface updateCommandT
  extends Partial<Omit<commandT, "commmandItems">> {
  // commandItems: Partial<commandItemT>[];
}

export interface newCommandItemT
  extends Pick<commandItemT, "productId" | "quantity"> {
  commandId: number;
}

export interface updateCommandItemT extends Omit<commandItemT, "stockId"> {}
// /////////////////////////////////
///////////// INVOICE INTERFACES ///
///////////////////////////////////
export interface invoiceT extends Omit<commandT, "clientId" | "commandItems"> {
  vendorId: number;
  invoiceItems: Omit<invoiceItemT, "id" | "invoiceId" | "stockId">[];
}

export interface invoiceItemT extends Omit<commandItemT, "commandId"> {
  invoiceId: number;
}

export interface newInvoiceT extends Omit<newCommandT, ""> {}
export interface newInvoiceItemT {}
export interface updateInvoiceT
  extends Partial<Omit<invoiceT, "invoiceItems">> {
  invoiceItems: Partial<invoiceItemT>[];
}

////////////////////////////////////
//////////// CLIENT INTERFACES//////
////////////////////////////////////
export interface clientT {
  id: number;
  name: string;
  phone?: string;
  addresse?: string;
  email?: string;
}

export interface newClientT extends Omit<clientT, "id"> {}
export interface updateClientT extends Partial<clientT> {}
/////////////////////////////////////////////////
//////////////////// VENDOR INTERFACES //////////
////////////////////////////////////////////////
export interface vendorT extends clientT {}
export interface newVendorT extends newClientT {}
export interface updateVendorT extends updateClientT {}
////////////////////////////////////////////////////
//////////////// STOCKMOUVMENTS INTERFACES /////////
///////////////////////////////////////////////////
export interface stockMvmT {
  id: number;
  date: string;
  model: string;
  quantity: number;
  productId: number;
  product: Pick<productT, "price" | "name">;
  commandItem?: Pick<commandItemT, "quantity" | "commandId">;
  invoiceItem?: Pick<invoiceItemT, "quantity" | "invoiceId">;
}
export interface newStockMvmT
  extends Pick<stockMvmT, "productId" | "quantity" | "model"> {}

/////////////////////////////////////////////////
/////////////// PRODUCT INTERFACES //////////////
/////////////////////////////////////////////////
export interface productT {
  id: number;
  name: string;
  price: number;
  stock: number;
  description?: string;
}
export interface newProductT extends Omit<productT, "id"> {}
export interface productTfromApiT extends Omit<productT, "stock"> {
  stockMouvements: { quantity: number }[];
}
export interface updateProductT extends Partial<productT> {}
//////////////////////////////////////////
export interface updateData<T> {
  id: number;
  data: T;
}
