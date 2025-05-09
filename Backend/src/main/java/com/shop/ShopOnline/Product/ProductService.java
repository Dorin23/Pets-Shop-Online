package com.shop.ShopOnline.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProduct(){
        return productRepository.findAll();
    }

    public List<Product> getProductByCategory(Long categoryId){
        return productRepository.findByCategory_Id(categoryId);
    }

    public Product saveProduct(Product product){
        return productRepository.save(product);
    }

    public Optional<Product> getProductByid(Long id){
        return productRepository.findById(id);
    }
    public boolean deleteProduct(Long id){
        productRepository.deleteById(id);
        return false;
    }

    public Product updateProductPartial(Product updatedProduct) {
        if (!productRepository.existsById(updatedProduct.getId())) {
            throw new RuntimeException("Produsul cu ID " + updatedProduct.getId() + " nu există.");
        }
        return productRepository.save(updatedProduct);
    }


}
