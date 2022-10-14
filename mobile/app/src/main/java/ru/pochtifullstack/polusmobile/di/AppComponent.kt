package ru.pochtifullstack.polusmobile.di

import android.content.Context
import dagger.BindsInstance
import dagger.Component
import ru.pochtifullstack.feature_auth.api.AuthDeps
import javax.inject.Qualifier
import javax.inject.Scope

@Scope
annotation class AppScope

@[AppScope Component(
    modules = [
        NavigationModule::class
    ]
)]
interface AppComponent: AuthDeps {

    @Component.Factory
    interface Factory {

        fun create(
            @BindsInstance @ApplicationContext context: Context
        ): AppComponent
    }
}

@Qualifier
annotation class ApplicationContext