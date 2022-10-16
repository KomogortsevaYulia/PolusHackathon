package ru.pochtifullstack.feature_auth.internal

import androidx.lifecycle.ViewModel
import ru.pochtifullstack.core_domain.repository.AppRepository
import ru.pochtifullstack.feature_auth.api.AuthNavigation
import javax.inject.Inject

internal class AuthViewModel @Inject constructor(
    private val authNavigation: AuthNavigation,
    private val appRepository: AppRepository
): ViewModel() {

    fun navigateFurther() {
        authNavigation.openNextScreen()
    }

    fun getLoginState(): Boolean {
        return appRepository.getLoginStatus()
    }

    fun setLogout() {
        appRepository.logout()
    }

    fun navigateToRequestList() {
        authNavigation.openRequestList()
    }
}