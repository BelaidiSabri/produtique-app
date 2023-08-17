import { IonList } from "@ionic/react";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";
import { useEffect, useState } from "react";
import { getProducts } from "../../api/products";
import { Product } from "../../types";

interface RefreshProps {
  refresh: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  SearchInput: string;
}
const ProductList: React.FC<RefreshProps> = (props) => {
  const [products, setProducts] = useState<Product[]>([{
    product_id: 28,
    name: "clavier",
    price: 30,
    quantity: 10
},{
  product_id: 29,
  name: "souris",
  price: 20,
  quantity: 10
}]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, [props.refresh]);

  const fetchProducts = async () => {
    try {
      const productsData: any = await getProducts();
      console.log("the data kid", productsData);

      if (productsData) {
        setProducts(productsData);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(props.SearchInput.toLowerCase())
      )
    );
  }, [props.SearchInput, products]);

  return (
    <IonList className="product-grid">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            setRefresh={props.setRefresh}
          />
        ))
      ) : (
        <p>pas de produit</p>
      )}
    </IonList>
  );
};

export default ProductList;
