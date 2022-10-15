package ru.pochtifullstack.polusmobile.di

import android.content.Context
import dagger.BindsInstance
import dagger.Component
import ru.pochtifullstack.feature_auth.api.AuthDeps
import ru.pochtifullstack.feature_shift.api.ShiftDeps
import ru.pochtifullstack.polusmobile.MainActivity
import ru.pochtifullstack.polusmobile.MainFragment
import javax.inject.Qualifier
import javax.inject.Scope

@Scope
annotation class AppScope

@[AppScope Component(
    modules = [
        NavigationModule::class,
        NetworkModule::class
    ]
)]
interface AppComponent : AuthDeps, ShiftDeps {

    @Component.Factory
    interface Factory {

        fun create(
            @BindsInstance @ApplicationContext context: Context
        ): AppComponent
    }

    fun inject(mainActivity: MainActivity)
    fun inject(mainFragment: MainFragment)
}

@Qualifier
annotation class ApplicationContext