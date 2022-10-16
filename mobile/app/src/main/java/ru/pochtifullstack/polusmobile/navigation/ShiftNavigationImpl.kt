package ru.pochtifullstack.polusmobile.navigation

import android.os.Bundle
import android.util.Log
import ru.pochtifullstack.feature_shift.api.ApproveVehicleFragmentDirections
import ru.pochtifullstack.feature_shift.api.ShiftNavigation
import ru.pochtifullstack.polusmobile.R
import javax.inject.Inject

class ShiftNavigationImpl @Inject constructor(
    private val baseNavigation: BaseNavigation
): ShiftNavigation {

    override fun moveToScaner() {
        baseNavigation.navController?.navigate(R.id.action_startShiftFragment_to_scanerFragment)
    }

    override fun moveToRequestList() {
        baseNavigation.navController?.navigate(R.id.action_approveVehicleFragment_to_requestListFragment)
    }

    override fun moveBackToScaner() {
        baseNavigation.navController?.navigate(R.id.action_requestListFragment_to_scanerFragment)
    }

    override fun moveBackToShift() {
        baseNavigation.navController?.navigate(R.id.action_requestListFragment_to_startShiftFragment)
    }

    override fun moveBackToAuth() {
        baseNavigation.navController?.navigate(R.id.action_startShiftFragment_to_authFragment)
    }

    override fun moveToMap(bundle: Bundle) {
        baseNavigation.navController?.navigate(R.id.action_requestListFragment_to_mapFragment, bundle)
    }
}