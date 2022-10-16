package ru.pochtifullstack.core_data.repository

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import ru.pochtifullstack.core_domain.repository.DriverRepository
import ru.pochtifullstack.core_network.api.DriverApi
import ru.pochtifullstack.core_network.api.dto.DriverShift
import javax.inject.Inject

class DriverRepositoryImpl @Inject constructor(
    private val driverApi: DriverApi
): DriverRepository {

    override suspend fun startShift(userId: Int, vehicleId: Int) {
        withContext(Dispatchers.IO) {
            driverApi.startShift(DriverShift(userId, vehicleId))
        }
    }

    override suspend fun endShift(vehicleId: Int) {
        withContext(Dispatchers.IO) {
            driverApi.endShift(vehicleId)
        }
    }
}