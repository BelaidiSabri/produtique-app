import axios, { AxiosResponse } from "axios";

interface Product {
  name: string;
  price: number;
  quantity: number;
}



export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/product");
    console.log('response',response);

    return response.data;
    
  } catch (error) {
    console.error("Error getting products:", error);
    return [];
  }
};


export const AddProduct =async (product:Product): Promise<Product[]>=>{
try {
  const response =await axios.post("http://127.0.0.1:8000/product/",product)
  return response.data
} catch (error) {
  console.error("failed to add product",error)
  return []
}
}

export const DeleteProduct =async (id:number): Promise<any>=>{
  try {
    const response =await axios.delete(`http://127.0.0.1:8000/product/${id}`)
    return response.data
  } catch (error) {
    console.error("failed to delete the product",error)
    return []
  }
  }

  export const UpdateProduct =async (product:Product): Promise<Product[]>=>{
    try {
      const response =await axios.put("http://127.0.0.1:8000/product/",product)
      return response.data
    } catch (error) {
      console.error("failed to add product",error)
      return []
    }
    }
