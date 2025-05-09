package com.shop.ShopOnline.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/{username}")
    public User getUserByUsername(@PathVariable String username){
        return userService.getuserByUsername(username).orElse(null);
    }
    @PostMapping
    public User createUser(@RequestBody User user){
        return userService.saveUser(user);
    }
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
    }
}
