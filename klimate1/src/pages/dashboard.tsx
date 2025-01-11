import LoadingSkelton from "@/components/loading-skelton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeolocation } from "@/hooks/use-geolocation";
import { UseForecastQuery, UseReverseQuery, UseWeatherQuery } from "@/hooks/use-weather";
import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react";

const Dashboard = () => {
    const { coordinates, error: LocationError, isLoading: LocationLoading, getLocation } = useGeolocation();

    const locationQuery = UseReverseQuery(coordinates);
    const weatherQuery = UseWeatherQuery(coordinates);
    const forecastQuery = UseForecastQuery(coordinates);

    const handleRefersh = () => {
        getLocation();
        if (coordinates) {
            locationQuery.refetch();
            weatherQuery.refetch();
            forecastQuery.refetch();
        }
    };

    if (LocationLoading) {
        return <LoadingSkelton />;
    }

    if (LocationError) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Location Error</AlertTitle>
                <AlertDescription>
                    <p>{LocationError}</p>
                    <Button onClick={getLocation} variant={"outline"} className="w-fit">
                        <MapPin className="h-4 w-4 mr-2" />
                        Enable location
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    if (!coordinates) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Location Required</AlertTitle>
                <AlertDescription>
                    <p>Please enable location access to see your local weather.</p>
                    <Button onClick={getLocation} variant={"outline"} className="w-fit">
                        <MapPin className="h-4 w-4 mr-2" />
                        Enable location
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    if (locationQuery.isFetching || weatherQuery.isFetching || forecastQuery.isFetching) {
        return <LoadingSkelton />;
    }

    if (weatherQuery.error || locationQuery.error || forecastQuery.error) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    <p>Failed to fetch weather data. Please try again.</p>
                    <Button onClick={handleRefersh} variant={"outline"} className="w-fit">
                        <RefreshCcw className="h-4 w-4 mr-2" />
                        Retry
                    </Button>
                </AlertDescription>
            </Alert>
        );
    }

    if (!weatherQuery.data || !forecastQuery.data) {
        return <LoadingSkelton />;
    }

    const locationName = locationQuery.data ? locationQuery.data[0] : "Unknown Location";

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold tracking-tight">My Location</h1>
                <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={handleRefersh}
                    disabled={weatherQuery.isFetching || forecastQuery.isFetching}
                >
                    <RefreshCcw className={`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin" : ""}`} />
                </Button>
            </div>
            {/* Current and hourly weather */}
            <div>
                <div>
                    {/* current weathr
                    hourly weather */}
                </div>
                <div>
                    {/* details
                    forecast */}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;