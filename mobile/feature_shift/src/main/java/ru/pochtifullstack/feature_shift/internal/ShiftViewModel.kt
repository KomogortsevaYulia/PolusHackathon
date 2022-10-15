package ru.pochtifullstack.feature_shift.internal

import androidx.lifecycle.ViewModel
import ru.pochtifullstack.core_network.api.DriverApi
import ru.pochtifullstack.feature_shift.api.ShiftNavigation
import javax.inject.Inject

class ShiftViewModel @Inject constructor(
    private val shiftNavigation: ShiftNavigation
): ViewModel() {

    fun moveToRequestList() {
        shiftNavigation.moveToRequestList()
    }

    fun moveBackToStartShift() {
        shiftNavigation.moveBackToStartShift()
    }

    fun moveBackToAuth() {
        shiftNavigation.moveBackToAuth()
    }
}