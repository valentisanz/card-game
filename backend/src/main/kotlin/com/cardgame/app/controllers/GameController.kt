package com.cardgame.app.controllers

import com.cardgame.app.entities.Game
import com.cardgame.app.entities.GameRepository
import com.cardgame.app.entities.UserRepository
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/games")
class GameController(val gameRepository: GameRepository,
                     val userRepository: UserRepository) {

    //endpoint to save the game
    @PostMapping("/add/{userId}")
    fun addScoreToUser(@PathVariable("userId") userId: Long,
                       @RequestBody body: Game): Game? {

            val user = userRepository.getOne(userId)
            return gameRepository.saveAndFlush(Game(null, body.score, body.difficulty, body.duration, user))
    }
    //endpoint to list all games ordered by the score
    @GetMapping("/ranking")
    fun getAllGames(): List<Game> {
         return gameRepository.getAllGames()
        }
}




