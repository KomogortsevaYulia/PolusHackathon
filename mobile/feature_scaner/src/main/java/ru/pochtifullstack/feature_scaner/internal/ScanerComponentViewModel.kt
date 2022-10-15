package ru.pochtifullstack.feature_scaner.internal

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.ViewModel
import ru.pochtifullstack.feature_scaner.api.scanerDepsProvider
import ru.pochtifullstack.feature_scaner.internal.di.DaggerScanerComponent
import ru.pochtifullstack.feature_scaner.internal.di.ScanerComponent

class ScanerComponentViewModel(
    application: Application
): AndroidViewModel(application) {

    internal val scanerComponent: ScanerComponent by lazy {
        DaggerScanerComponent.factory().create(
            scanerDeps = application.scanerDepsProvider.scanerDeps
        )
    }
}