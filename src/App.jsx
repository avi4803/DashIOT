import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, Droplets, ThermometerSun, Leaf, Settings } from "lucide-react"

export default function App() {
  return (
    <div className="min-h-screen bg-muted/40 p-8 font-sans">
      
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">IoT Dashboard</h1>
            <p className="text-muted-foreground">Real-time telemetry and device management.</p>
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
              <div className="text-2xl font-bold">24.5°C</div>
              <p className="text-xs text-muted-foreground">+0.5°C from last hour</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Humidity</CardTitle>
              <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45.0%</div>
              <p className="text-xs text-muted-foreground">-2% from last hour</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Soil Moisture</CardTitle>
              <Leaf className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">62.8%</div>
              <p className="text-xs text-muted-foreground">Irrigation active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Online</div>
              <p className="text-xs text-muted-foreground">Ping: 12ms</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Chart Area */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          <Card className="md:col-span-4 lg:col-span-5 min-h-[400px]">
            <CardHeader>
              <CardTitle>Environmental Overview</CardTitle>
              <CardDescription>Temperature and humidity data over the last 24 hours.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center border-dashed border-2 border-muted m-6 rounded-lg">
              <p className="text-muted-foreground">Real-time Chart Component will render here</p>
            </CardContent>
          </Card>

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
                    <p className="text-sm font-medium leading-none">Firmware Updated</p>
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
