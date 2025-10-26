import { useSelector } from "react-redux"
import { AddService } from "./AddService"
import ServiceTable  from "./ServiceTable"

const ServiceList = () => {
  const services = useSelector(state => state.services.services)

  return (
    <div className="todos-table shadow-sm p-6 rounded-xl bg-white">
      <AddService />
      {services.length > 0 ? (
        <ServiceTable />
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-12 text-gray-600">
          <h2 className="text-2xl font-semibold mb-2">Todavía no tenés servicios</h2>
          <p className="text-gray-500 mb-4">
            Agregá tu primer servicio para empezar a organizarte 🚀
          </p>
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-3xl">
            ☕
          </div>
        </div>
      )}
    </div>
  )
}

export default ServiceList
