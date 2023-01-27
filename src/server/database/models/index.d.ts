export interface updateData<T> {
  id: number;
  data: T;
}
// client
export interface updateClientT extends Partial<newClientT> {}
export interface clientT extends newClientT {
  id: number;
}
export interface newClientT {
  name: string;
  email?: string;
  phone?: string;
  addresse?: string;
}
// product
export interface updateProductT extends Partial<newProductT> {}
export interface productT extends newProductT {
  id: number;
}

export interface newProductT {
  name: string;
  price: number;
  stock: number;
  description?: string;
}
// vendor
export interface updateVendorT extends Partial<newVendorT> {}
export interface vendorT extends newVendorT {
  id: number;
}

export interface newVendorT {
  name: string;
  email?: string;
  phone?: string;
  addresse?: string;
}
// stock

export interface stockMvmT extends newStockMvmT {
  id: number;
}

export interface newStockMvmT {
  product: number;
  model: string;
  quantity: number;
}

// invoice
export interface newInvoiceT {
  total: number;
  clientId: number;
  vendorId: number;
  products: number[];
}

export interface updateInvoiceT extends Partial<newInvoiceT> {}
// command

export interface commandT extends newCommandT {
  id: number;
}

export interface newCommandT {
  status: string;
  clientId: number;
  commandItems?: Omit<newCommandItemT, "commandId">[];
}
export interface newCommandItemT {
  commandId: number;
  productId: number;
  quantity: number;
}
export interface updateCommmandT extends Partial<newCommandT> {}
