package ru.pochtifullstack.core_domain.domain

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity
data class Request(
    @PrimaryKey(autoGenerate = true) var id: Int = 0,
    val title: String,
    val customer: String,
    val from: String,
    val to: String,
    val time: String,
    val date: String
)
