package ru.pochtifullstack.core_database

import android.app.DownloadManager
import androidx.room.Database
import androidx.room.RoomDatabase
import ru.pochtifullstack.core_domain.domain.Request

@Database(entities = [Request::class], version = 1)
abstract class DriverDB: RoomDatabase() {

    abstract fun getDriverDao(): DriverDao
}