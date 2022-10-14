package ru.pochtifullstack.feature_auth.api

import android.app.Application
import android.content.Context

interface AuthDeps {

    val authNavigation: AuthNavigation
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