package ru.pochtifullstack.polusmobile.di

import dagger.Binds
import dagger.Module
import dagger.Provides
import ru.pochtifullstack.feature_auth.api.AuthNavigation
import ru.pochtifullstack.polusmobile.navigation.AuthNavigationImpl
import ru.pochtifullstack.polusmobile.navigation.BaseNavigation

@Module
interface NavigationModule {

    companion object {
        @AppScope
        @Provides
        fun provideBaseNavigation(): BaseNavigation {
            return BaseNavigation()
        }
    }

    @AppScope
    @Binds
    fun bindAuthNavigation(authNavigationImpl: AuthNavigationImpl): AuthNavigation
}