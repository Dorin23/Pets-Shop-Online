package com.shop.ShopOnline.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("products")
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllproduct(){
        return productService.getAllProduct();
    }
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id){
        return productService.getProductByid(id).orElse(null);
    }
    @GetMapping("/category/{categoryId}")
    public List<Product> getProdusctByCategory(@PathVariable Long categoryId){
        return productService.getProductByCategory(categoryId);
    }
    @PostMapping
    public Product addProduct(@RequestBody Product product){
        return productService.saveProduct(product);
    }
    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        updatedProduct.setId(id); // Asigură-te că ID-ul din URL e același cu cel salvat
        return productService.updateProductPartial(updatedProduct);
    }
    @DeleteMapping("/{id}")
    public boolean deleteProductById(@PathVariable Long id){
        if(productService.deleteProduct(id)){
            return true;
        }
        return false;
    }
}
