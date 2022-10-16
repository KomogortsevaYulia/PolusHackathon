package ru.pochtifullstack.feature_scaner.internal

import android.content.Context
import android.view.View
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.google.android.material.snackbar.Snackbar
import ru.pochtifullstack.core_domain.repository.VehicleRepository
import ru.pochtifullstack.core_util.isInternetAvailable
import ru.pochtifullstack.feature_scaner.api.ScanerNavigation
import java.lang.Exception
import javax.inject.Inject

class ScanerViewModel @Inject constructor(
    private val scanerNavigation: ScanerNavigation,
    private val vehicleRepository: VehicleRepository
) : ViewModel() {

    private val _errorLiveData = MutableLiveData<Boolean>()
    val errorLiveData: LiveData<Boolean> = _errorLiveData

    fun moveFurther(scanerResult: String, view: View) {
        if (!isInternetAvailable(view.context)) {
            Snackbar.make(view, "Нет доступа к интернету", Snackbar.LENGTH_SHORT).show()
            _errorLiveData.postValue(true)
            return
        }
        vehicleRepository.setVehicleId(scanerResult)
        scanerNavigation.moveFurther(scanerResult)
    }

    fun moveBack() {
        scanerNavigation.moveBack()
    }
}