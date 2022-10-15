package ru.pochtifullstack.polusmobile.di

import android.content.Context
import dagger.Module
import dagger.Provides
import ru.pochtifullstack.core_data.repository.DriverRepositoryImpl
import ru.pochtifullstack.core_data.repository.VehicleRepositoryImpl
import ru.pochtifullstack.core_data.sharedpref.VehicleSharedPref
import ru.pochtifullstack.core_domain.repository.DriverRepository
import ru.pochtifullstack.core_domain.repository.VehicleRepository
import ru.pochtifullstack.core_network.api.DriverApi

@Module
interface DataComponent {

    companion object {

        @AppScope
        @Provides
        fun provideVehicleSharedPref(@ApplicationContext context: Context): VehicleSharedPref {
            return VehicleSharedPref(context)
        }

        @AppScope
        @Provides
        fun provideVehicleRepository(
            vehicleSharedPref: VehicleSharedPref,
            driverApi: DriverApi
        ): VehicleRepository {
            return VehicleRepositoryImpl(vehicleSharedPref, driverApi)
        }

        @AppScope
        @Provides
        fun provideDriverRepository(driverApi: DriverApi): DriverRepository {
            return DriverRepositoryImpl(driverApi)
        }
    }
}