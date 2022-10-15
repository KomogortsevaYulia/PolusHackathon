package ru.pochtifullstack.feature_shift.internal

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch
import ru.pochtifullstack.core_domain.domain.CarInfo
import ru.pochtifullstack.core_domain.repository.DriverRepository
import ru.pochtifullstack.core_domain.repository.VehicleRepository
import ru.pochtifullstack.core_network.api.DriverApi
import ru.pochtifullstack.feature_shift.api.ShiftNavigation
import javax.inject.Inject

class ShiftViewModel @Inject constructor(
    private val shiftNavigation: ShiftNavigation,
    private val vehicleRepository: VehicleRepository,
    private val driverRepository: DriverRepository
): ViewModel() {

    private val _carInfoLiveData = MutableLiveData<CarInfo>()
    val carInfoLiveData: LiveData<CarInfo> = _carInfoLiveData

    fun moveToScaner() {
        shiftNavigation.moveToScaner()
    }

    fun moveBackToStartShift() {
        shiftNavigation.moveBackToStartShift()
    }

    fun moveBackToAuth() {
        shiftNavigation.moveBackToAuth()
    }

    fun getVehicleRequests() {

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