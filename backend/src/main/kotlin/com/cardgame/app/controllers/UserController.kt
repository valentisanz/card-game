package com.cardgame.app.controllers

import com.cardgame.app.entities.User
import com.cardgame.app.entities.UserRepository
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/users")
class UserController(val userRepository: UserRepository) {

    //endpoint to save the user
    @PostMapping("/create")
    fun getUserById(@RequestBody body: Map<String,String>): User {
        return userRepository.saveAndFlush(User(null,body["username"]))
    }

}