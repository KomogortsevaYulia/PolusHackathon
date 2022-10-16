package ru.pochtifullstack.polusmobile.di

import androidx.room.Room
import dagger.Module
import dagger.Provides
import ru.pochtifullstack.core_database.DriverDB

import ru.pochtifullstack.core_database.DriverDao
import ru.pochtifullstack.polusmobile.App

@Module
interface DatabaseModule {

    companion object {

        @AppScope
        @Provides
        fun provideTodoDatabase(): DriverDB {
            return Room.databaseBuilder(
                App.INSTANCE.applicationContext,
                DriverDB::class.java,
                "driver_database"
            ).fallbackToDestructiveMigration()
                .build()
        }

        @AppScope
        @Provides
        fun provideDriverDao(driverDB: DriverDB): DriverDao {
            return driverDB.getDriverDao()
        }
    }
}