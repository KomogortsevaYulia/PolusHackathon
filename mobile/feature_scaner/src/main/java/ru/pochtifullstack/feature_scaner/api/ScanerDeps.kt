package ru.pochtifullstack.feature_scaner.api

import android.app.Application
import android.content.Context
import ru.pochtifullstack.core_domain.repository.VehicleRepository

interface ScanerDeps {

    val scanerNavigation: ScanerNavigation
    val vehicleRepository: VehicleRepository
}

interface ScanerDepsProvider {

    val scanerDeps: ScanerDeps
}

val Context.scanerDepsProvider: ScanerDepsProvider
    get() = when (this) {
        is ScanerDepsProvider -> this
        is Application -> error("Application must implement ScanerDepsProvider")
        else -> applicationContext.scanerDepsProvider
    }