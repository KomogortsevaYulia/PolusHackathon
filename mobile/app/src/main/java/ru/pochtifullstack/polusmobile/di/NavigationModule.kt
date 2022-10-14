package ru.pochtifullstack.polusmobile.di

import dagger.Binds
import dagger.Module
import ru.pochtifullstack.feature_auth.api.AuthNavigation
import ru.pochtifullstack.polusmobile.navigation.AuthNavigationImpl

@Module
interface NavigationModule {

    @AppScope
    @Binds
    fun bindAuthNavigation(authNavigationImpl: AuthNavigationImpl): AuthNavigation
}