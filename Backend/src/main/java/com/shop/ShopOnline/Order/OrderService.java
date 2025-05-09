package com.shop.ShopOnline.Order;

import com.shop.ShopOnline.OrderItem.OrderItem;
import com.shop.ShopOnline.Product.Product;
import com.shop.ShopOnline.Product.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private ProductRepository productRepository;

    public List<Order> getOrdersByUser(Long userId){
        return orderRepository.findByUser_Id(userId);
    }
    public Order saveorder(Order order) {
        // Setăm referința de comandă în fiecare OrderItem
        for (OrderItem item : order.getOrderItemList()) {
            item.setOrder(order);
        }

        // Salvăm comanda inițial
        Order savedOrder = orderRepository.save(order);

        // Procesăm fiecare produs din comandă
        for (OrderItem item : savedOrder.getOrderItemList()) {
            Long productId = item.getProduct().getId();

            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new IllegalArgumentException("Produsul cu ID-ul " + productId + " nu a fost găsit"));

            int quantityOrdered = item.getQuantity();

            if (product.getQuantity() >= quantityOrdered) {
                product.setQuantity(product.getQuantity() - quantityOrdered);
                productRepository.save(product);
            } else {
                throw new IllegalArgumentException("Stoc insuficient pentru produsul: " + product.getName());
            }

            // Setăm produsul actualizat
            item.setProduct(product);
        }

        return savedOrder;
    }
    public Optional<Order> getOrderById(Long id){
        return orderRepository.findById(id);
    }
    public void deleteOrder(Long id){
        orderRepository.deleteById(id);
    }
}
