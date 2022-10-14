package ru.pochtifullstack.feature_auth.internal.di

import dagger.Component
import ru.pochtifullstack.feature_auth.api.AuthDeps
import ru.pochtifullstack.feature_auth.api.AuthFragment
import javax.inject.Scope

@Scope
annotation class AuthScope()

@[AuthScope Component(
    dependencies = [AuthDeps::class]
)]
internal interface AuthComponent {

    @Component.Factory
    interface Factory {

        fun create(
            authDeps: AuthDeps
        ): AuthComponent
    }

    fun inject(authFragment: AuthFragment)
}