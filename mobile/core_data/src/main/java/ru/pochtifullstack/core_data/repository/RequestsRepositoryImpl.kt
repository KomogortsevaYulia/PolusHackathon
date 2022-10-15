package ru.pochtifullstack.core_data.repository

import androidx.lifecycle.LiveData
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import ru.pochtifullstack.core_data.sharedpref.VehicleSharedPref
import ru.pochtifullstack.core_database.DriverDao
import ru.pochtifullstack.core_domain.domain.Request
import ru.pochtifullstack.core_domain.repository.RequestsRepository
import ru.pochtifullstack.core_network.api.DriverApi
import javax.inject.Inject

class RequestsRepositoryImpl @Inject constructor(
    private val driverApi: DriverApi,
    private val vehicleSharedPref: VehicleSharedPref,
    private val driverDao: DriverDao

): RequestsRepository {

    override suspend fun loadRequests() {
        withContext(Dispatchers.IO) {
            val requests = driverApi.getRequestsByCar(vehicleSharedPref.getVehicleId().toInt())
            driverDao.removeAllRequests()
            driverDao.addRequests(requests)
        }
    }

    override fun getRequests(): LiveData<List<Request>> {
        return driverDao.getRequests()
    }

    override suspend fun approveRequest(request: Request) {
        TODO("Not yet implemented")
    }
}