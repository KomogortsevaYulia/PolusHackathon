package ru.pochtifullstack.core_data.repository

import android.util.Log
import androidx.lifecycle.LiveData
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.async
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
            val requests =
                driverApi.getRequestsByCar(vehicleSharedPref.getVehicleId().toInt())

            driverDao.removeAllRequests()
            driverDao.addRequests(requests)
        }
    }

    override suspend fun approveRequest(requestId: Int): Request {
        return withContext(Dispatchers.IO) {
            driverApi.startPerform(requestId)
        }
    }

    override suspend fun endRequest(requestId: Int): Request {
        return withContext(Dispatchers.IO) {
            driverApi.endPerform(requestId)
        }
    }

    override fun getRequests(): LiveData<List<Request>> {
        return driverDao.getRequests()
    }
}