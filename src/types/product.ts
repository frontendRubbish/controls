export type Product = {
  ProductId: string,
  Category: string,
  MainCategory: string,
  SupplierName: string,
  Weight: number,
  WeightUnit: string,
  ShortDescription: string,
  Name: string,
  PictureUrl: string,
  Status: string,
  Price: number,
  DimensionWidth: number,
  DimensionDepth: number
  DimensionHeight: number,
  Unit: string,
  CurrencyCode: string,
}

export type Products = Array<Product>