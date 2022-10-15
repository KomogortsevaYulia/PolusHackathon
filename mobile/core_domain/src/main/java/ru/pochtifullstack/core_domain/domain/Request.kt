package ru.pochtifullstack.core_domain.domain

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity
data class Request(
    @PrimaryKey(autoGenerate = true) var id: Int = 0,
    var status: String,
    var type: String,
    var subType: String,
    var requiredCarName: String,
    var startLon: Int,
    var startLat: Int,
    var endLat: Int,
    var endLon: Int,
    var comment: String?,
    var dateCreate: String,
    var plannedDateStart: String,
    var plannedDateEnd: String,
    var factDateStart: String?,
    var factDateEnd: String?,
    var appointDate: String,
    var car: CarInfo,
    var client: Client
)
