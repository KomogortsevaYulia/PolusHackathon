package ru.pochtifullstack.core_domain.repository

import ru.pochtifullstack.core_domain.domain.CarInfo

interface VehicleRepository {

    fun getVehicleId(): String

    fun setVehicleId(vehicleId: String)

    suspend fun getInfo(): CarInfo
}