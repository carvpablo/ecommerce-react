import axios from "axios";
import { useLoaderData } from "react-router";
import Products from "../components/Products";
import NavBar from "../components/NavBar";

export async function Loader() {
  try {
    const response = await axios.get("http://localhost:3000/products");
    return response.data;
  } catch (err) {
    const message =
      (axios.isAxiosError(err) && err.response?.data?.error) ||
      "Erro ao carregar produtos do servidor.";

    throw new Error(message, { cause: err });
  }
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
}

export interface Products {
  products: Product[];
}

export default function Home() {
  const data: Products = useLoaderData();

  return (
    <div>
      <NavBar />
      <Products products={data.products} />
    </div>
  );
}
