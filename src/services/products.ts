export type ProductType = {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
  inStock: number
}

export const fetchProducts = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/products`);
  const data = await response.json();
  const products: ProductType[] = data.products;
  return products;
}

export const fetchProduct = async (id: string | number) => {
  const product: ProductType = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/api/products/${id}`).then(res => res.json())
  return product
}