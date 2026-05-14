import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Droplets, ThermometerSun, Leaf, Settings } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ref, onValue } from "firebase/database"
import { database } from "./firebase"

export default function App() {
  const [chartData, setChartData] = useState([])
  const [currentData, setCurrentData] = useState({ temp: 0, hum: 0, moisture: 0 })
  const [isOnline, setIsOnline] = useState(false)

  useEffect(() => {
    // Reference to your device's logs in Firebase
    const logsRef = ref(database, 'devices/ESP_001/logs')
    
    // Listen for changes automatically!
    const unsubscribe = onValue(logsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val()
        
        // Convert the Firebase object into an array and take the last 20 readings for the chart
        const dataArray = Object.keys(data).map(key => data[key])
        
        // Ensure we sort them by time (if your ESP32 pushes out of order)
        // Here we just assume they are inserted sequentially, so we slice the last 20
        const recentData = dataArray.slice(-20)
        
        // Grab the absolute latest reading for the metric cards
        const latestReading = recentData[recentData.length - 1]

        setChartData(recentData)
        setCurrentData({
          temp: latestReading.temp || 0,
          hum: latestReading.hum || 0,
          moisture: latestReading.moisture || 0
        })
        setIsOnline(true)
      } else {
        setIsOnline(false)
      }
    })

    // Cleanup the listener when the component unmounts
    return () => unsubscribe()
  }, [])

  return (
    <div className="min-h-screen bg-muted/40 p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Luminode Dashboard</h1>
            <p className="text-muted-foreground">Live Telemetry via Firebase Realtime Database.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
            <Button>Connect Device</Button>
          </div>
        </div>

        {/* The Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Temperature</CardTitle>
              <ThermometerSun className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentData.temp.toFixed(1)}°C</div>
              <p className="text-xs text-muted-foreground">Live from ESP32</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Humidity</CardTitle>
              <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentData.hum.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Live from ESP32</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Soil Moisture</CardTitle>
              <Leaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentData.moisture.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">Live from ESP32</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${isOnline ? 'text-green-600' : 'text-red-500'}`}>
                {isOnline ? 'Online' : 'Offline'}
              </div>
              <p className="text-xs text-muted-foreground">Firebase Connection</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Chart Area */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          <Card className="md:col-span-4 lg:col-span-5 min-h-[400px]">
            <CardHeader>
              <CardTitle>Environmental Overview</CardTitle>
              <CardDescription>Live Temperature and Humidity trends</CardDescription>
            </CardHeader>
            <CardContent className="h-[350px]">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="time" 
                      tick={{fontSize: 12}} 
                      tickFormatter={(val) => val.toString().substring(0, 5)} // Shorten time label
                    />
                    <YAxis yAxisId="left" tick={{fontSize: 12}} />
                    <YAxis yAxisId="right" orientation="right" tick={{fontSize: 12}} />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#f97316" strokeWidth={3} dot={false} />
                    <Line yAxisId="right" type="monotone" dataKey="hum" stroke="#3b82f6" strokeWidth={3} dot={false} />
                    <Line yAxisId="right" type="monotone" dataKey="moisture" stroke="#22c55e" strokeWidth={3} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full flex items-center justify-center border-dashed border-2 border-muted rounded-lg">
                  <p className="text-muted-foreground">Waiting for ESP32 Data...</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Alerts (Logs) Card */}
          <Card className="md:col-span-3 lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>System notifications.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Connected to Firebase</p>
                    <p className="text-sm text-muted-foreground">Just now</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Moisture low in Zone B</p>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
