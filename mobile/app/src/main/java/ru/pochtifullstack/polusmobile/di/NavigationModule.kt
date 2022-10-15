package ru.pochtifullstack.polusmobile.di

import dagger.Binds
import dagger.Module
import dagger.Provides
import ru.pochtifullstack.feature_auth.api.AuthNavigation
import ru.pochtifullstack.feature_shift.api.ShiftNavigation
import ru.pochtifullstack.polusmobile.navigation.AuthNavigationImpl
import ru.pochtifullstack.polusmobile.navigation.BaseNavigation
import ru.pochtifullstack.polusmobile.navigation.ShiftNavigationImpl

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

    @AppScope
    @Binds
    fun bindShiftNavigation(shiftNavigationImpl: ShiftNavigationImpl): ShiftNavigation
}