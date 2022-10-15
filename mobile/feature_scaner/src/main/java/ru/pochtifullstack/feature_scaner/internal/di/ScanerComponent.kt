package ru.pochtifullstack.feature_scaner.internal.di

import dagger.Component
import ru.pochtifullstack.feature_scaner.api.ScanerDeps
import ru.pochtifullstack.feature_scaner.api.ScanerFragment
import javax.inject.Scope

@Scope
annotation class ScanerScope()

@[ScanerScope Component(
    dependencies = [ScanerDeps::class]
)]
internal interface ScanerComponent {

    @Component.Factory
    interface Factory {

        fun create(
            scanerDeps: ScanerDeps
        ): ScanerComponent
    }

    fun inject(scanerFragment: ScanerFragment)
}