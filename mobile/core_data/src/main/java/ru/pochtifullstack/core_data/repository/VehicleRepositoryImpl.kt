package ru.pochtifullstack.core_data.repository

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import ru.pochtifullstack.core_data.sharedpref.VehicleSharedPref
import ru.pochtifullstack.core_domain.domain.CarInfo
import ru.pochtifullstack.core_domain.repository.VehicleRepository
import ru.pochtifullstack.core_network.api.DriverApi
import javax.inject.Inject

class VehicleRepositoryImpl @Inject constructor(
    private val vehicleSharedPref: VehicleSharedPref,
    private val driverApi: DriverApi
): VehicleRepository {

    override fun getVehicleId(): String {
        return vehicleSharedPref.getVehicleId()
    }

    override fun setVehicleId(vehicleId: String) {
        vehicleSharedPref.setVehicleId(vehicleId)
    }

    override suspend fun getInfo(): CarInfo {
        return withContext(Dispatchers.IO) {
            driverApi.getCarInfo(getVehicleId().toInt())
        }
    }
}