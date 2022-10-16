package ru.pochtifullstack.polusmobile.navigation

import ru.pochtifullstack.feature_scaner.api.ScanerNavigation
import javax.inject.Inject
import ru.pochtifullstack.feature_scaner.api.ScanerFragmentDirections
import ru.pochtifullstack.polusmobile.R

class ScanerNavigationImpl @Inject constructor(
    private val baseNavigation: BaseNavigation
): ScanerNavigation {

    override fun moveFurther(vehicleId: String) {
        baseNavigation.navController?.navigate(R.id.action_scanerFragment_to_approveVehicleFragment)
    }

    override fun moveBack() {
        TODO("Not yet implemented")
    }
}