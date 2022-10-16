package ru.pochtifullstack.feature_shift.internal

import android.os.Bundle
import android.util.Log
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch
import ru.pochtifullstack.core_domain.domain.CarInfo
import ru.pochtifullstack.core_domain.domain.Request
import ru.pochtifullstack.core_domain.repository.AppRepository
import ru.pochtifullstack.core_domain.repository.DriverRepository
import ru.pochtifullstack.core_domain.repository.RequestsRepository
import ru.pochtifullstack.core_domain.repository.VehicleRepository
import ru.pochtifullstack.core_network.api.DriverApi
import ru.pochtifullstack.feature_shift.api.ShiftNavigation
import java.lang.Exception
import javax.inject.Inject

class ShiftViewModel @Inject constructor(
    private val shiftNavigation: ShiftNavigation,
    private val vehicleRepository: VehicleRepository,
    private val driverRepository: DriverRepository,
    private val requestsRepository: RequestsRepository,
    private val appRepository: AppRepository
): ViewModel() {

    private val _carInfoLiveData = MutableLiveData<CarInfo>()
    val carInfoLiveData: LiveData<CarInfo> = _carInfoLiveData

    private val _errorLiveData = MutableLiveData<Boolean>()
    val errorLiveData: LiveData<Boolean> = _errorLiveData

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

    fun moveToMap(bundle: Bundle) {
        shiftNavigation.moveToMap(bundle)
    }

    fun loadVehicleRequests() {
        viewModelScope.launch {
            try {
                Log.d("anime", "pidaras")
                requestsRepository.loadRequests()
            } catch (e: Exception) {}
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
            try {
                driverRepository.startShift(3, vehicleRepository.getVehicleId().toInt())
                shiftNavigation.moveToRequestList()
            } catch (e: Exception) {
                _errorLiveData.postValue(true)
            }
        }
    }

    fun endShift() {
        viewModelScope.launch {
            driverRepository.endShift(vehicleRepository.getVehicleId().toInt())
        }
    }

    fun setLogin() {
        appRepository.login()
    }

    fun setLogout() {
        appRepository.logout()
    }
}