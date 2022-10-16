package ru.pochtifullstack.feature_auth.api

import android.app.Application
import android.content.Context
import ru.pochtifullstack.core_domain.repository.AppRepository

interface AuthDeps {

    val authNavigation: AuthNavigation
    val appRepository: AppRepository
}

interface AuthDepsProvider {

    val authDeps: AuthDeps
}

val Context.authDepsProvider: AuthDepsProvider
    get() = when (this) {
        is AuthDepsProvider -> this
        is Application -> error("Application must implement AuthDepsProvider")
        else -> applicationContext.authDepsProvider
    }