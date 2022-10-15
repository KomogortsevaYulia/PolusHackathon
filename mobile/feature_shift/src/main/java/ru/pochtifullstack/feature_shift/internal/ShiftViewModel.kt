package ru.pochtifullstack.feature_shift.internal

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch
import ru.pochtifullstack.core_domain.domain.CarInfo
import ru.pochtifullstack.core_domain.domain.Request
import ru.pochtifullstack.core_domain.repository.DriverRepository
import ru.pochtifullstack.core_domain.repository.RequestsRepository
import ru.pochtifullstack.core_domain.repository.VehicleRepository
import ru.pochtifullstack.core_network.api.DriverApi
import ru.pochtifullstack.feature_shift.api.ShiftNavigation
import javax.inject.Inject

class ShiftViewModel @Inject constructor(
    private val shiftNavigation: ShiftNavigation,
    private val vehicleRepository: VehicleRepository,
    private val driverRepository: DriverRepository,
    private val requestsRepository: RequestsRepository
): ViewModel() {

    private val _carInfoLiveData = MutableLiveData<CarInfo>()
    val carInfoLiveData: LiveData<CarInfo> = _carInfoLiveData

    fun moveToScaner() {
        shiftNavigation.moveToScaner()
    }

    fun moveBackToScaner() {
        shiftNavigation.moveBackToScaner()
    }

    fun moveBackToShift() {
        endShift()
        shiftNavigation.moveBackToShift()
    }

    fun moveBackToAuth() {
        endShift()
        shiftNavigation.moveBackToAuth()
    }

    fun loadVehicleRequests() {
        viewModelScope.launch {
            requestsRepository.loadRequests()
        }
    }

    fun getRequests(): LiveData<List<Request>> {
        return requestsRepository.getRequests()
    }

    fun getCarInfo() {
        viewModelScope.launch {
            _carInfoLiveData.postValue(vehicleRepository.getInfo())
        }
    }

    fun startShift() {
        viewModelScope.launch {
            driverRepository.startShift(3, vehicleRepository.getVehicleId().toInt())
            shiftNavigation.moveToRequestList()
        }
    }

    fun endShift() {
        viewModelScope.launch {
            driverRepository.endShift(vehicleRepository.getVehicleId().toInt())
        }
    }
}