import axios from "axios";
import { type LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";

export async function Loader({ params }: LoaderFunctionArgs) {
  try {
    const { id } = params;
    const response = await axios.get(`http://localhost:3000/products/${id}`);
    return response.data;
  } catch (err) {
    const message =
      (axios.isAxiosError(err) && err.response?.data?.error) ||
      "Erro ao carregar produtos do servidor.";

    throw new Error(message, { cause: err });
  }
}

interface ProductResponse {
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    stock: number;
  };
}

export default function ProductDetails() {
  const data: ProductResponse = useLoaderData();
  return (
    <div>
      <h1>{data.product.name}</h1>
      <p>{data.product.description}</p>
      <p>{data.product.price}$</p>
    </div>
  );
}
