package ru.pochtifullstack.polusmobile.navigation

import android.util.Log
import ru.pochtifullstack.feature_shift.api.ShiftNavigation
import ru.pochtifullstack.polusmobile.R
import javax.inject.Inject

class ShiftNavigationImpl @Inject constructor(
    private val baseNavigation: BaseNavigation
): ShiftNavigation {

    override fun moveToRequestList() {
        Log.d("anime", "${baseNavigation.navController?.currentDestination}")
        baseNavigation.navController?.navigate(ru.pochtifullstack.feature_shift.R.id.action_startShiftFragment_to_requestListFragment)
    }

    override fun moveBackToStartShift() {
        TODO("Not yet implemented")
    }

    override fun moveBackToAuth() {
        TODO("Not yet implemented")
    }
}