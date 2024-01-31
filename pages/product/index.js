import Link from "next/link";

export default function ProductLists({ productId = 100 }) {
  return (
    <div>
      <Link href="/">Home</Link>
      <h2>
        <Link href="/product/1">Product 1</Link>
      </h2>
      <h2>
        <Link href="/product/2">Product 2</Link>
      </h2>
      <h2>
        <Link href="/product/3">Product 3</Link>
      </h2>
      <h2>
        <Link href={`/product/${productId}`}>Product {productId}</Link>
      </h2>
    </div>
  );
}
