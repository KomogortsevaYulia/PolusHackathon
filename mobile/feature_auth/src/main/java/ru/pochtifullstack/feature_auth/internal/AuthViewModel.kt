package ru.pochtifullstack.feature_auth.internal

import androidx.lifecycle.ViewModel
import ru.pochtifullstack.feature_auth.api.AuthNavigation
import javax.inject.Inject

internal class AuthViewModel @Inject constructor(
    private val authNavigation: AuthNavigation
): ViewModel() {

    fun navigateFurther() {
        authNavigation.openNextScreen()
    }
}