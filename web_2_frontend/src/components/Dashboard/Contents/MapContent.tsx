import { useEffect, useState } from 'react'

import L from 'leaflet'
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet'
import { Alert, AlertTitle } from '@mui/material'
import { AxiosError, isAxiosError } from 'axios'
import Geocode from 'react-geocode'
import 'leaflet/dist/leaflet.css'

import { UnapprovedOrder } from '../../../models/OrderModels'
import { getUnapproved } from '../../../services/OrderService'
import alertStyle from '../../../App.module.css'
import { ErrorData } from '../../../models/ErrorModels'
import { GeocodeResponse } from '../../../models/GeocodeModel'
import payedPackagePic from '../../../images/payed_packet.png'
import unpayedPackagePic from '../../../images/unpayed_packet.png'
import PopupContent from '../../PopupContent/PopupContent'

const MapContent = () => {
  Geocode.setApiKey(process.env.REACT_APP_GEOCODING_KEY ? process.env.REACT_APP_GEOCODING_KEY : '')
  Geocode.setLanguage('en')
  Geocode.setRegion('rs')
  Geocode.setLocationType('ROOFTOP')
  Geocode.enableDebug()

  const payedOrderMarker = new L.Icon({
    iconUrl: payedPackagePic,
    iconSize: [35, 35],
    popupAnchor: [0, -15]
  })

  const unpayedOrderMarker = new L.Icon({
    iconUrl: unpayedPackagePic,
    iconSize: [35, 35],
    popupAnchor: [0, -15]
  })

  const position = [45.2396, 19.8227]
  const [marks, setMarks] = useState<UnapprovedOrder[]>([])
  const [alertError, setAlertError] = useState({
    isError: false,
    message: ''
  })

  useEffect(() => {
    getUnapproved()
      .then((response) => {
        const markersData: UnapprovedOrder[] = []
        const promises = response.data.map((order) => {
          return Geocode.fromAddress(order.address)
            .then((respond: GeocodeResponse) => {
              const { lat, lng } = respond.results[0].geometry.location
              markersData.push({ order: order, lat: lat, lon: lng })
            })
            .catch((error) => {
              setAlertError({
                isError: true,
                message: JSON.stringify(error)
              })
            })
        })

        Promise.all(promises)
          .then(() => {
            setMarks(markersData)
          })
          .catch((error) => {
            setAlertError({
              isError: true,
              message: JSON.stringify(error)
            })
          })
      })
      .catch((error: AxiosError<ErrorData>) => {
        if (isAxiosError(error)) {
          setAlertError({
            isError: true,
            message: error.response?.data.Exception as string
          })
        }
      })
  }, [])

  return (
    <div>
      {alertError.isError && (
        <Alert
          className={alertStyle.alert}
          severity='error'
          onClose={() =>
            setAlertError((pervState) => ({
              ...pervState,
              isError: false
            }))
          }
        >
          <AlertTitle>Error</AlertTitle>
          {alertError.message}
        </Alert>
      )}
      <MapContainer
        center={position as L.LatLngExpression}
        zoom={10}
        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: -2 }}
      >
        <TileLayer url={process.env.REACT_APP_MAP_ENDPOINT as string} />
        {marks.length === 0 ? (
          <Marker position={position as L.LatLngExpression} icon={payedOrderMarker} />
        ) : (
          marks.map((marker) => {
            return (
              <div key={marker.order.id}>
                <Marker
                  position={[marker.lat, marker.lon] as L.LatLngExpression}
                  icon={marker.order.isPayed ? payedOrderMarker : unpayedOrderMarker}
                >
                  <Popup>
                    <PopupContent mark={marker} />
                  </Popup>
                </Marker>
              </div>
            )
          })
        )}
      </MapContainer>
    </div>
  )
}

export default MapContent
