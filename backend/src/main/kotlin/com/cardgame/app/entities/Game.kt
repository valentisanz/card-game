package com.cardgame.app.entities

import com.sun.istack.Nullable
import javax.persistence.*

@Entity
class Game(
        @Id
        @Column(name = "id")
        @Nullable
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long?,
        @Column(name="score")
        val score: Long?,
        @Column(name="difficulty")
        val difficulty: Long?,
        @Column(name="duration")
        @Nullable
        val duration: String?,
        @OneToOne
        @JoinColumn(name = "userId")
        val user:User?

)