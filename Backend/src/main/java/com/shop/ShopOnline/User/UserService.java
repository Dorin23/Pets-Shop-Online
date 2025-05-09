package com.shop.ShopOnline.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public Optional<User> getuserByUsername(String username){
        return userRepository.findByUsername(username);
    }
    public User saveUser(User user){
        return userRepository.save(user);
    }
    public Optional<User> getUserById(Long id){
        return userRepository.findById(id);
    }
    public void deleteUser(Long id){
        userRepository.deleteById(id);
    }
}
