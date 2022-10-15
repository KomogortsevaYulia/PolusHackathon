package ru.pochtifullstack.feature_scaner.internal

import androidx.lifecycle.ViewModel
import ru.pochtifullstack.core_domain.repository.VehicleRepository
import ru.pochtifullstack.feature_scaner.api.ScanerNavigation
import javax.inject.Inject

class ScanerViewModel @Inject constructor(
    private val scanerNavigation: ScanerNavigation,
    private val vehicleRepository: VehicleRepository
) : ViewModel() {

    fun moveFurther(scanerResult: String) {
        vehicleRepository.setVehicleId(scanerResult)
        scanerNavigation.moveFurther(scanerResult)
    }

    fun moveBack() {
        scanerNavigation.moveBack()
    }
}