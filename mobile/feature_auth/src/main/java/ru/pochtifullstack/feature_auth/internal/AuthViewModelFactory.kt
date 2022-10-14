package ru.pochtifullstack.feature_auth.internal

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import ru.pochtifullstack.feature_auth.api.AuthNavigation
import javax.inject.Inject
import javax.inject.Provider

class AuthViewModelFactory @Inject constructor(
    private val authNavigation: Provider<AuthNavigation>
) : ViewModelProvider.Factory {

    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        return AuthViewModel(
            authNavigation = authNavigation.get()
        ) as T
    }
}