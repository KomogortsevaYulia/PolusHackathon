package ru.pochtifullstack.polusmobile

import android.app.Application
import ru.pochtifullstack.feature_auth.api.AuthDeps
import ru.pochtifullstack.feature_auth.api.AuthDepsProvider
import ru.pochtifullstack.feature_shift.api.ShiftDeps
import ru.pochtifullstack.feature_shift.api.ShiftDepsProvider
import ru.pochtifullstack.polusmobile.di.AppComponent
import ru.pochtifullstack.polusmobile.di.DaggerAppComponent
import java.util.concurrent.TimeUnit

class App: Application(), AuthDepsProvider, ShiftDepsProvider {

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
    override val shiftDeps: ShiftDeps = appComponent

    override fun onCreate() {
        super.onCreate()
        INSTANCE = this
    }
}