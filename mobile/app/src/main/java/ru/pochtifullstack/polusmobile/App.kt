package ru.pochtifullstack.polusmobile

import android.app.Application
import com.yandex.mapkit.MapKitFactory
import ru.pochtifullstack.feature_auth.api.AuthDeps
import ru.pochtifullstack.feature_auth.api.AuthDepsProvider
import ru.pochtifullstack.feature_scaner.api.ScanerDeps
import ru.pochtifullstack.feature_scaner.api.ScanerDepsProvider
import ru.pochtifullstack.feature_shift.api.ShiftDeps
import ru.pochtifullstack.feature_shift.api.ShiftDepsProvider
import ru.pochtifullstack.polusmobile.di.AppComponent
import ru.pochtifullstack.polusmobile.di.DaggerAppComponent
import java.util.concurrent.TimeUnit

class App: Application(), AuthDepsProvider, ShiftDepsProvider, ScanerDepsProvider {

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
    override val scanerDeps: ScanerDeps = appComponent

    override fun onCreate() {
        super.onCreate()
        INSTANCE = this
        MapKitFactory.setApiKey("47293adf-d377-4145-8282-36cbaa6bfa56")
    }
}