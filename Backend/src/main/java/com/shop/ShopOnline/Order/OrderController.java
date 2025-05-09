package com.shop.ShopOnline.Order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping("/user/{userId}")
    public List<Order> getOrderByUser(@PathVariable Long userId){
        return orderService.getOrdersByUser(userId);
    }
    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id){
        return orderService.getOrderById(id).orElse(null);
    }
    @PostMapping
    public Order createOrder(@RequestBody Order order){
        return orderService.saveorder(order);
    }
    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id){
        orderService.deleteOrder(id);
    }
}
