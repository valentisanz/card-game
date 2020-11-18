package com.cardgame.app.entities

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface GameRepository: JpaRepository<Game, Long> {

    @Query(value = "SELECT * FROM GAME ORDER BY score DESC LIMIT 5", nativeQuery = true)
    fun getAllGames():List<Game>
}