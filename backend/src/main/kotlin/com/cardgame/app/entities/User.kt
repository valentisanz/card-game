package com.cardgame.app.entities

import com.sun.istack.Nullable
import javax.persistence.*

@Entity
class User(
        @Id
        @Column(name = "id")
        @Nullable
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Long?,
        @Column(name="username")
        val username: String?
)