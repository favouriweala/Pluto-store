import React, { createContext, useContext, useState } from 'react';

export interface Product {
  id: string;
  name: string;
  category: 'mens' | 'womens' | 'kids';
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  material: string;
  care: string;
  sizes: string[];
  inStock: boolean;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  getAllProducts: () => Product[];
  getDiscountPercentage: (product: Product) => number;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Premium White Shirt',
      category: 'mens',
      price: 89.99,
      originalPrice: 129.99,
      image: 'https://via.placeholder.com/300x400?text=White+Shirt',
      description: 'Elegant white shirt perfect for any occasion. Made from premium cotton.',
      material: 'Premium Cotton',
      care: 'Machine wash cold, hang to dry',
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      inStock: true,
    },
    {
      id: '2',
      name: 'Luxury Black Dress',
      category: 'womens',
      price: 159.99,
      originalPrice: 199.99,
      image: 'https://via.placeholder.com/300x400?text=Black+Dress',
      description: 'Sophisticated black dress with elegant draping. Perfect for special events.',
      material: '95% Viscose, 5% Spandex',
      care: 'Dry clean only',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      inStock: true,
    },
    {
      id: '3',
      name: 'Kids Grey T-Shirt',
      category: 'kids',
      price: 34.99,
      image: 'https://via.placeholder.com/300x400?text=Kids+Tshirt',
      description: 'Comfortable and durable grey t-shirt for kids. Great for everyday wear.',
      material: '100% Organic Cotton',
      care: 'Machine wash warm',
      sizes: ['2Y', '3Y', '4Y', '5Y', '6Y', '7Y', '8Y', '10Y', '12Y'],
      inStock: true,
    },
  ]);

  const addProduct = (product: Product) => {
    setProducts([...products, product]);
  };

  const updateProduct = (id: string, updatedData: Partial<Product>) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, ...updatedData } : product
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const getProductById = (id: string) => {
    return products.find((product) => product.id === id);
  };

  const getProductsByCategory = (category: string) => {
    return products.filter((product) => product.category === category);
  };

  const getAllProducts = () => {
    return products;
  };

  const getDiscountPercentage = (product: Product) => {
    if (!product.originalPrice) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        getProductsByCategory,
        getAllProducts,
        getDiscountPercentage,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
