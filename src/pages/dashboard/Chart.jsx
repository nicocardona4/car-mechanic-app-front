import { ChartTodosBar } from "./ChartTodosBar"
import { ChartTodosStats } from "./ChartTodosStats"
import "./Chart.css"

const Chart = () => {
  return (
    <div className="chart-row">
      <h5>Gráficos</h5>
      <div className="chart-col">
        <ChartTodosStats />
      </div>
      <div className="chart-col">
        <ChartTodosBar />
      </div>
    </div>
  )
}

export default Chart
