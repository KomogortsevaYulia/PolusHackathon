package ru.pochtifullstack.feature_map.api

import android.content.Context
import dagger.Lazy
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.View
import androidx.fragment.app.viewModels
import by.kirich1409.viewbindingdelegate.viewBinding
import com.google.android.material.bottomsheet.BottomSheetBehavior
import com.google.android.material.snackbar.Snackbar
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.yandex.mapkit.Animation
import com.yandex.mapkit.MapKitFactory
import com.yandex.mapkit.geometry.Point
import com.yandex.mapkit.map.CameraPosition
import com.yandex.mapkit.mapview.MapView
import com.yandex.runtime.image.ImageProvider
import ru.pochtifullstack.core_util.isInternetAvailable
import ru.pochtifullstack.feature_map.R
import ru.pochtifullstack.feature_map.databinding.FragmentMapBinding
import ru.pochtifullstack.feature_map.internal.MapComponentViewModel
import ru.pochtifullstack.feature_map.internal.MapViewModel
import ru.pochtifullstack.feature_map.internal.MapViewModelFactory
import ru.pochtifullstack.feature_map.internal.di.MapComponent
import java.lang.Math.min
import javax.inject.Inject

class MapFragment : Fragment(R.layout.fragment_map) {

    @Inject
    internal lateinit var mapViewModelFactory: Lazy<MapViewModelFactory>

    private val binding by viewBinding(FragmentMapBinding::bind)
    private val mapViewModel: MapViewModel by viewModels {
        mapViewModelFactory.get()
    }

    private val componentViewModel: MapComponentViewModel by viewModels()

    private var status: Int = 0

    override fun onAttach(context: Context) {
        componentViewModel.mapComponent.inject(this)

        super.onAttach(context)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        MapKitFactory.initialize(requireContext())


        Log.d("anime", "${arguments}")

        val gson = Gson()
        val type = object : TypeToken<Point>() {}.type
        val point1 =
            gson.fromJson<Point>(requireArguments().getString("point1"), type)
        val point2 =
            gson.fromJson<Point>(requireArguments().getString("point2"), type)

        binding.mapview.map.move(
            CameraPosition(findCenterPoint(point1, point2), 5.0f, 0.0f, 0.0f),
            Animation(Animation.Type.SMOOTH, 0f),
            null
        )

        setPointOnMap(point1, point2)

        binding.fabBack.setOnClickListener {
            requireActivity().onBackPressed()
        }

        status = requireArguments().getInt("status")
        updateButtonChangeRequestStatus()

        binding.bottomSheet.btnChangeRequestStatus.setOnClickListener {
            if (!isInternetAvailable(requireContext())) {
                Snackbar.make(binding.root, "Нет подключения к интернету", Snackbar.LENGTH_SHORT).show()
                return@setOnClickListener
            }
            when (status) {
                0 -> {
                    mapViewModel.approveRequest(requireArguments().getInt("id"))
                }
                1 -> {
                    mapViewModel.endRequest(requireArguments().getInt("id"))
                }
            }
            updateButtonChangeRequestStatus()
        }

        mapViewModel.errorLiveData.observe(viewLifecycleOwner) {
            Snackbar.make(binding.root, "Нет подключения к интернету", Snackbar.LENGTH_SHORT).show()
        }

        mapViewModel.statusLiveData.observe(viewLifecycleOwner) {
            status = if (it.status == "Назначена") 0 else if (it.status == "Выполняется") 1 else 2
            updateButtonChangeRequestStatus()
        }

        initBottomSheet()
    }

    private fun updateButtonChangeRequestStatus() {
        when (status) {
            0 -> {
                binding.bottomSheet.btnChangeRequestStatus.text = "Взять заявку"
                binding.bottomSheet.tvStatus.text = "Назначена"
            }
            1 -> {
                binding.bottomSheet.btnChangeRequestStatus.text = "Закончить заявку"
                binding.bottomSheet.tvStatus.text = "Выполняется"
            }
            2 -> {
                binding.bottomSheet.btnChangeRequestStatus.visibility = View.GONE
                binding.bottomSheet.tvStatus.text = "Выполнена"
            }
        }
    }

    private fun findCenterPoint(point1: Point, point2: Point): Point {
        return Point(
            kotlin.math.abs(point2.latitude - point1.latitude) + min(point1.latitude, point2.latitude),
            kotlin.math.abs(point2.longitude - point1.longitude) + min(point1.longitude, point2.longitude)
        )
    }

    override fun onStart() {
        super.onStart()
        MapKitFactory.getInstance().onStart()
        binding.mapview.onStart()
    }

    override fun onStop() {
        binding.mapview.onStop()
        MapKitFactory.getInstance().onStop()
        super.onStop()
    }

    private fun setPointOnMap(point1: Point, point2: Point) {
        val mapObjects = binding.mapview.map.mapObjects

        val a = mapObjects.addPlacemark(point1)
        val b = mapObjects.addPlacemark(point2)
        a.setIcon(ImageProvider.fromResource(requireContext(), ru.pochtifullstack.core_style.R.drawable.img_point))
        b.setIcon(ImageProvider.fromResource(requireContext(), ru.pochtifullstack.core_style.R.drawable.img_point_geo))
    }

    private fun initBottomSheet() {
        binding.apply {
            val bottomSheetBehavior = BottomSheetBehavior.from(binding.layoutBottomSheet)
            bottomSheetBehavior.isHideable = true
            bottomSheetBehavior.peekHeight = 200
            bottomSheetBehavior.maxHeight = 1600
            bottomSheetBehavior.state = BottomSheetBehavior.STATE_COLLAPSED

            bottomSheet.tvRequestName.text = requireArguments().getString("taskName")
            bottomSheet.tvCustomer.text = requireArguments().getString("customer")
            bottomSheet.tvFrom.text = requireArguments().getString("firstPlace")
            bottomSheet.tvTo.text = requireArguments().getString("secondPlace")
        }
    }
}