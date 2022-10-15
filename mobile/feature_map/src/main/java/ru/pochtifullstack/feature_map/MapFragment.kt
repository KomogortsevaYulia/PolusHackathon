package ru.pochtifullstack.feature_map

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import by.kirich1409.viewbindingdelegate.viewBinding
import com.google.android.material.bottomsheet.BottomSheetBehavior
import com.google.gson.Gson
import com.google.gson.reflect.TypeToken
import com.yandex.mapkit.Animation
import com.yandex.mapkit.MapKitFactory
import com.yandex.mapkit.geometry.Point
import com.yandex.mapkit.location.Location
import com.yandex.mapkit.map.CameraPosition
import com.yandex.mapkit.map.PointOfView
import com.yandex.runtime.image.ImageProvider
import ru.pochtifullstack.feature_map.databinding.FragmentMapBinding
import ru.pochtifullstack.core_style.R as styleModule

class MapFragment : Fragment(R.layout.fragment_map) {

    private val binding by viewBinding(FragmentMapBinding::bind)

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        MapKitFactory.initialize(requireContext())


        Log.d("anime", "${arguments}")

        val gson = Gson()
        val type = object : TypeToken<Point>() {}.type
        val point1 =
            gson.fromJson<Point>(requireArguments().getSerializable("point1").toString(), type)
        val point2 =
            gson.fromJson<Point>(requireArguments().getSerializable("point2").toString(), type)

        Log.d("anime", "point1 = ${point1.latitude} ${point1.longitude}")
        Log.d("anime", "point2 = ${point1.latitude} ${point1.longitude}")

        binding.mapview.map.move(
            CameraPosition(point1, 11.0f, 0.0f, 0.0f),
            Animation(Animation.Type.SMOOTH, 0f),
            null
        )

        setPointOnMap(point1, point2)

        initBottomSheet()
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

        val loc = Location(
            point1,
            null,
            null,
            null,
            null,
            null,
            Location().absoluteTimestamp,
            Location().relativeTimestamp
        )
        Log.d("anime", "${loc.position}")

        mapObjects.addPlacemark(point1)
        mapObjects.addPlacemark(point2)
    }

    private fun initBottomSheet() {
        binding.apply {
            val bottomSheetBehavior = BottomSheetBehavior.from(binding.bottomSheet.root)
            bottomSheetBehavior.isHideable = true
            bottomSheetBehavior.peekHeight = 200
            bottomSheetBehavior.maxHeight = 1200
            bottomSheetBehavior.setState(BottomSheetBehavior.STATE_COLLAPSED)
        }
    }
}