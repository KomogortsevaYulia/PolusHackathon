package ru.pochtifullstack.feature_shift.internal.di

import dagger.Component
import ru.pochtifullstack.feature_shift.api.RequestListFragment
import ru.pochtifullstack.feature_shift.api.ShiftDeps
import ru.pochtifullstack.feature_shift.api.StartShiftFragment
import javax.inject.Scope

@Scope
annotation class ShiftScope

@[ShiftScope Component(
    dependencies = [ShiftDeps::class]
)]
internal interface ShiftComponent {

    @Component.Factory
    interface Factory {

        fun create(
            shiftDeps: ShiftDeps
        ): ShiftComponent
    }

    fun inject(startShiftFragment: StartShiftFragment)
    fun inject(requestListFragment: RequestListFragment)
}