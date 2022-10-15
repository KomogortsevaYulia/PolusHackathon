package ru.pochtifullstack.polusmobile.di

import android.content.Context
import dagger.BindsInstance
import dagger.Component
import ru.pochtifullstack.feature_auth.api.AuthDeps
import ru.pochtifullstack.feature_scaner.api.ScanerDeps
import ru.pochtifullstack.feature_shift.api.ShiftDeps
import ru.pochtifullstack.polusmobile.MainActivity
import javax.inject.Qualifier
import javax.inject.Scope

@Scope
annotation class AppScope

@[AppScope Component(
    modules = [
        NavigationModule::class,
        NetworkModule::class,
        DatabaseModule::class,
        DataComponent::class
    ]
)]
interface AppComponent : AuthDeps, ShiftDeps, ScanerDeps {

    @Component.Factory
    interface Factory {

        fun create(
            @BindsInstance @ApplicationContext context: Context
        ): AppComponent
    }

    fun inject(mainActivity: MainActivity)
}

@Qualifier
annotation class ApplicationContext