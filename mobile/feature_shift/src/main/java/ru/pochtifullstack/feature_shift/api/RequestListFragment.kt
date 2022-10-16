package ru.pochtifullstack.feature_shift.api

import android.content.Context
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.View
import androidx.fragment.app.viewModels
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.SimpleItemAnimator
import by.kirich1409.viewbindingdelegate.viewBinding
import com.google.android.material.snackbar.Snackbar
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.yandex.mapkit.geometry.Point
import dagger.Lazy
import ru.pochtifullstack.core_domain.domain.Request
import ru.pochtifullstack.core_util.isInternetAvailable
import ru.pochtifullstack.feature_shift.R
import ru.pochtifullstack.feature_shift.databinding.FragmentRequestListBinding
import ru.pochtifullstack.feature_shift.internal.ShiftComponentViewModel
import ru.pochtifullstack.feature_shift.internal.ShiftViewModel
import ru.pochtifullstack.feature_shift.internal.ShiftViewModelFactory
import ru.pochtifullstack.feature_shift.internal.adapter.OnRequestItemClickListener
import ru.pochtifullstack.feature_shift.internal.adapter.RequestListAdapter
import ru.pochtifullstack.feature_shift.internal.adapter.RequestListDiffUtilCallback
import javax.inject.Inject

class RequestListFragment : Fragment(R.layout.fragment_request_list) {

    @Inject
    internal lateinit var shiftViewModelFactory: Lazy<ShiftViewModelFactory>

    private val binding by viewBinding(FragmentRequestListBinding::bind)
    private val shiftViewModel: ShiftViewModel by viewModels {
        shiftViewModelFactory.get()
    }

    private val componentViewModel: ShiftComponentViewModel by viewModels()

    private var adapter = RequestListAdapter(object : OnRequestItemClickListener {

        override fun onRequestItemClicked(request: Request) {
            val bundle = Bundle()
            val gson = Gson()
            val point1 = Point(request.startLon.toDouble(), request.startLat.toDouble())
            val point2 = Point(request.endLon.toDouble(), request.endLat.toDouble())
            val type = object : TypeToken<Point>() {}.type

            bundle.apply {
                putString("point1", gson.toJson(point1, type))
                putString("point2", gson.toJson(point2, type))
                putString("firstPlace", request.firstPlace)
                putString("secondPlace", request.secondPlace)
                putString("taskName", request.subType)
                putString("time", request.dateCreate)
                putString("customer", request.client.name)
                putInt("id", request.id)
                putInt(
                    "status",
                    if (request.status == "Назначена") 0 else if (request.status == "Выполняется") 1 else 2
                )
            }

            shiftViewModel.moveToMap(bundle)
        }
    })

    override fun onAttach(context: Context) {
        componentViewModel.shiftComponent.inject(this)

        super.onAttach(context)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        shiftViewModel.setLogin()
    }

    override fun onResume() {
        super.onResume()

        init()
    }

    private fun init() {
        (binding.rcvRequests.itemAnimator as SimpleItemAnimator).supportsChangeAnimations = false
        shiftViewModel.getRequests().observe(viewLifecycleOwner) {
            adapter.requests = it
            binding.rcvRequests.adapter = adapter
            triggerDealListDiffUtil(it)
        }

        binding.btnChangeVehicle.setOnClickListener {
            if (!isInternetAvailable(requireContext())) {
                Snackbar.make(binding.root, "Нет доступа к интернету", Snackbar.LENGTH_SHORT).show()
                return@setOnClickListener
            }
            shiftViewModel.setLogout()
            shiftViewModel.moveBackToScaner()
        }

        binding.btnEndShift.setOnClickListener {
            if (!isInternetAvailable(requireContext())) {
                Snackbar.make(binding.root, "Нет доступа к интернету", Snackbar.LENGTH_SHORT).show()
                return@setOnClickListener
            }
            shiftViewModel.setLogout()
            shiftViewModel.moveBackToShift()
        }

        Log.d("anime", "ya huesos")
        shiftViewModel.loadVehicleRequests()
    }

    private fun triggerDealListDiffUtil(newRequests: List<Request>) {
        val diffUtilCallback = RequestListDiffUtilCallback(adapter.requests, newRequests)
        val diffResult = DiffUtil.calculateDiff(diffUtilCallback)
        adapter.requests = newRequests.toMutableList()
        diffResult.dispatchUpdatesTo(adapter)
    }
}