package ru.pochtifullstack.feature_shift.internal

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import ru.pochtifullstack.core_domain.repository.AppRepository
import ru.pochtifullstack.core_domain.repository.DriverRepository
import ru.pochtifullstack.core_domain.repository.RequestsRepository
import ru.pochtifullstack.core_domain.repository.VehicleRepository
import ru.pochtifullstack.core_network.api.DriverApi
import ru.pochtifullstack.feature_shift.api.ShiftNavigation
import javax.inject.Inject
import javax.inject.Provider

internal class ShiftViewModelFactory @Inject constructor(
    private val shiftNavigation: Provider<ShiftNavigation>,
    private val vehicleRepository: Provider<VehicleRepository>,
    private val driverRepository: Provider<DriverRepository>,
    private val requestsRepository: Provider<RequestsRepository>,
    private val appRepository: Provider<AppRepository>
): ViewModelProvider.Factory {

    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        return ShiftViewModel(
            shiftNavigation = shiftNavigation.get(),
            vehicleRepository = vehicleRepository.get(),
            driverRepository = driverRepository.get(),
            requestsRepository = requestsRepository.get(),
            appRepository = appRepository.get()
        ) as T
    }
}