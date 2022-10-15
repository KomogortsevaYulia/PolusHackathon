package ru.pochtifullstack.feature_shift.internal

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import ru.pochtifullstack.core_network.api.DriverApi
import ru.pochtifullstack.feature_shift.api.ShiftNavigation
import javax.inject.Inject
import javax.inject.Provider

internal class ShiftViewModelFactory @Inject constructor(
    private val shiftNavigation: Provider<ShiftNavigation>
): ViewModelProvider.Factory {

    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        return ShiftViewModel(
            shiftNavigation = shiftNavigation.get()
        ) as T
    }
}