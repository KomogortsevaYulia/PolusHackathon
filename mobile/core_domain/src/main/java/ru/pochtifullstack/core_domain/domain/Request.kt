package ru.pochtifullstack.core_domain.domain

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity
data class Request(
    @PrimaryKey(autoGenerate = true) var id: Int = 0,
    var status: String,
    var type: String,
    var subType: String,
    var startLon: Float,
    var startLat: Float,
    var endLat: Float,
    var endLon: Float,
    var firstPlace: String,
    var secondPlace: String,
    var comment: String?,
    var dateCreate: String,
    var plannedDateStart: String,
    var plannedDateEnd: String,
    var factDateStart: String?,
    var factDateEnd: String?,
    var car: CarInfo,
    var client: Client
)
