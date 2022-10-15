package ru.pochtifullstack.polusmobile.di

import dagger.Binds
import dagger.Module
import dagger.Provides
import ru.pochtifullstack.core_network.api.DriverApi
import ru.pochtifullstack.core_network.api.clients.DriverClient
import ru.pochtifullstack.feature_auth.api.AuthNavigation
import ru.pochtifullstack.feature_shift.api.ShiftNavigation
import ru.pochtifullstack.polusmobile.navigation.AuthNavigationImpl
import ru.pochtifullstack.polusmobile.navigation.BaseNavigation
import ru.pochtifullstack.polusmobile.navigation.ShiftNavigationImpl

@Module
interface NetworkModule {

    companion object {

        @AppScope
        @Provides
        fun provideDriverApi(): DriverApi {
            return DriverClient().buildDriverApi()
        }
    }
}