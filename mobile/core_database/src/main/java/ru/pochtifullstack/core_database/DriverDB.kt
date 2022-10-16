package ru.pochtifullstack.core_database

import android.app.DownloadManager
import androidx.room.Database
import androidx.room.RoomDatabase
import androidx.room.TypeConverters
import ru.pochtifullstack.core_domain.domain.Request

@TypeConverters(
    CarInfoTypeConverter::class,
    ClientTypeConverter::class
)
@Database(entities = [Request::class], version = 2)
abstract class DriverDB: RoomDatabase() {

    abstract fun getDriverDao(): DriverDao
}