package ru.pochtifullstack.feature_auth.internal

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import ru.pochtifullstack.core_domain.repository.AppRepository
import ru.pochtifullstack.feature_auth.api.AuthNavigation
import javax.inject.Inject
import javax.inject.Provider

class AuthViewModelFactory @Inject constructor(
    private val authNavigation: Provider<AuthNavigation>,
    private val appRepository: Provider<AppRepository>,
) : ViewModelProvider.Factory {

    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        return AuthViewModel(
            authNavigation = authNavigation.get(),
            appRepository = appRepository.get()
        ) as T
    }
}