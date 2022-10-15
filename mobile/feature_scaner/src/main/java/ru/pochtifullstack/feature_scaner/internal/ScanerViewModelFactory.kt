package ru.pochtifullstack.feature_scaner.internal

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import ru.pochtifullstack.core_domain.repository.VehicleRepository
import ru.pochtifullstack.feature_scaner.api.ScanerNavigation
import javax.inject.Inject
import javax.inject.Provider

internal class ScanerViewModelFactory @Inject constructor(
    private val scanerNavigation: Provider<ScanerNavigation>,
    private val vehicleRepository: Provider<VehicleRepository>
): ViewModelProvider.Factory {

    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        return ScanerViewModel(
            scanerNavigation = scanerNavigation.get(),
            vehicleRepository = vehicleRepository.get()
        ) as T
    }
}