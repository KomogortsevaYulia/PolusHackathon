package ru.pochtifullstack.polusmobile

import android.app.Application
import ru.pochtifullstack.feature_auth.api.AuthDeps
import ru.pochtifullstack.feature_auth.api.AuthDepsProvider
import ru.pochtifullstack.polusmobile.di.AppComponent
import ru.pochtifullstack.polusmobile.di.DaggerAppComponent
import java.util.concurrent.TimeUnit

class App: Application(), AuthDepsProvider {

    companion object {
        internal lateinit var INSTANCE: App
            private set
    }

    internal val appComponent: AppComponent by lazy {
        DaggerAppComponent.factory()
            .create(
                context = this
            )
    }
    override val authDeps: AuthDeps = appComponent

    override fun onCreate() {
        super.onCreate()
        INSTANCE = this
    }
}