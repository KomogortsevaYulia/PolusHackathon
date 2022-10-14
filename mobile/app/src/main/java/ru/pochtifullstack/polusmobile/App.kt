package ru.pochtifullstack.polusmobile

import android.app.Application
import ru.pochtifullstack.feature_auth.api.AuthDeps
import ru.pochtifullstack.feature_auth.api.AuthDepsProvider
import ru.pochtifullstack.polusmobile.di.AppComponent
import ru.pochtifullstack.polusmobile.di.DaggerAppComponent

class App: Application(), AuthDepsProvider {

    internal val appComponent: AppComponent by lazy {
        DaggerAppComponent.factory()
            .create(
                context = this
            )
    }
    override val authDeps: AuthDeps = appComponent
}