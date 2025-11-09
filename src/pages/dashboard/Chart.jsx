import { ChartServicesBar } from "./ChartServicesBar"
import { ChartServicesStats } from "./ChartServicesStats"
import "./Chart.css"

const Chart = () => {
  return (
    <div className="chart-row">
      <h5>Graphics</h5>
      <div className="chart-col">
        <ChartServicesBar />
      </div>
      <div className="chart-col">
        <ChartServicesStats />

      </div>
    </div>
  )
}

export default Chart
