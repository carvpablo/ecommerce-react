import { type Products } from "../pages/Home";
import { Link } from "react-router";

export default function Products({ products }: Products) {
  return (
    <ul>
      {products?.map((product) => {
        return (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price}$</p>
            <p>{product.stock}</p>
            <Link
              to={{
                pathname: `products/${product.id}`,
              }}
            >
              Product Detail
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
