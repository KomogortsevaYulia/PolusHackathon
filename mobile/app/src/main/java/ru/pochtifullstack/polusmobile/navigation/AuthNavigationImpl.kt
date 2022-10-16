package ru.pochtifullstack.polusmobile.navigation

import android.util.Log
import ru.pochtifullstack.feature_auth.api.AuthNavigation
import ru.pochtifullstack.polusmobile.R
import javax.inject.Inject

class AuthNavigationImpl @Inject constructor(
    private val baseNavigation: BaseNavigation
): AuthNavigation {

    override fun openNextScreen() {
        baseNavigation.navController?.navigate(R.id.action_authFragment_to_startShiftFragment)
        Log.d("anime", "navigated")
    }

    override fun openRequestList() {
        baseNavigation.navController?.navigate(R.id.action_authFragment_to_requestListFragment)
    }
}