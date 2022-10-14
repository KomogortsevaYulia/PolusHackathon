package ru.pochtifullstack.feature_auth.internal

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import ru.pochtifullstack.feature_auth.api.authDepsProvider
import ru.pochtifullstack.feature_auth.internal.di.AuthComponent
import ru.pochtifullstack.feature_auth.presentation.internal.di.DaggerAuthComponent

internal class AuthComponentViewModel(
    application: Application
): AndroidViewModel(application) {

    val todoListComponent: AuthComponent by lazy {
        DaggerAuthComponent.factory().create(
            authDeps = application.authDepsProvider.authDeps
        )
    }
}