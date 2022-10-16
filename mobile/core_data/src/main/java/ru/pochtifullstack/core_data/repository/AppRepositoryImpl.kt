package ru.pochtifullstack.core_data.repository

import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import ru.pochtifullstack.core_data.sharedpref.AppSharedPref
import ru.pochtifullstack.core_domain.repository.AppRepository
import ru.pochtifullstack.core_domain.repository.DriverRepository
import ru.pochtifullstack.core_network.api.DriverApi
import ru.pochtifullstack.core_network.api.dto.DriverShift
import javax.inject.Inject

class AppRepositoryImpl @Inject constructor(
    private val appSharedPref: AppSharedPref
): AppRepository {

    override fun login() {
        appSharedPref.setLoginStatus(true)
    }

    override fun logout() {
        appSharedPref.setLoginStatus(false)
    }

    override fun getLoginStatus(): Boolean {
        return appSharedPref.getLoginStatus()
    }
}