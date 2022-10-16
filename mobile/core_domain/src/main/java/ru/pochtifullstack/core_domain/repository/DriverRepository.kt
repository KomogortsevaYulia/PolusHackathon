package ru.pochtifullstack.core_domain.repository

interface DriverRepository {

    suspend fun startShift(userId: Int, vehicleId: Int)

    suspend fun endShift(vehicleId: Int)
}