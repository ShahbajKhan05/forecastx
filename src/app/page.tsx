'use client';
import { useState, useEffect } from 'react';
import { Search, MapPin, Wind, Droplets, CloudRain, Activity, Cloud, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

interface WeatherData {
  temp: number;
  high: number;
  low: number;
  desc: string;
  humidity: number;
  windSpeed: number;
  aqi: number;
}

export default function FinalDashboard() {
  const [city, setCity] = useState('New Delhi');
  const [searchInput, setSearchInput] = useState('');
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  // --- API FETCH LOGIC ---
  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    try {
      const API_KEY = "cc41e6ea8da8b17d628aaa5af720b270";
      const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`);
      if (!weatherRes.ok) throw new Error("City not found");
      const weatherData = await weatherRes.json();

      const { lat, lon } = weatherData.coord;
      const aqiRes = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
      const aqiData = await aqiRes.json();

      setData({
        temp: Math.round(weatherData.main.temp),
        high: Math.round(weatherData.main.temp_max),
        low: Math.round(weatherData.main.temp_min),
        desc: weatherData.weather[0].description,
        humidity: weatherData.main.humidity,
        windSpeed: Math.round(weatherData.wind.speed * 3.6),
        aqi: aqiData.list[0].main.aqi
      });
      setCity(weatherData.name);
    } catch (error) {
      console.error(error);
      alert("City not found!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    const initWeather = async () => {
      // Yield to avoid calling setState synchronously during effect mount phase
      await Promise.resolve();
      if (active) {
        fetchWeather('New Delhi');
      }
    };
    initWeather();
    return () => {
      active = false;
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim() !== '') {
      fetchWeather(searchInput);
      setSearchInput('');
    }
  };

  const getAqiText = (aqi: number) => ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'][aqi - 1];

  return (
    <main className="min-h-screen bg-black text-white font-sans p-4 md:p-12 pt-16 md:pt-16 overflow-x-hidden selection:bg-white/20">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        
        {/* --- 1. HEADER (Top margin added for mobile notch) --- */}
        <header className="mt-4">
          <form 
            onSubmit={handleSearchSubmit}
            className="w-full flex items-center px-5 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full focus-within:bg-white/10 transition-all"
          >
            <Search size={18} className="text-white/60 mr-3" />
            <input 
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search city, zip, or airport..."
              className="w-full bg-transparent border-none outline-none text-white placeholder-white/40 text-sm font-medium"
            />
            <button type="submit" className="hidden">Search</button>
          </form>
        </header>

        {/* --- 2. MAIN DASHBOARD GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Hero Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 p-8 md:p-10 flex flex-col justify-between min-h-[300px] md:min-h-[400px] bg-white/5 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-[32px]"
          >
            <div className="flex justify-between items-center text-xs text-white/50">
              <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <MapPin size={14} /> <span className="capitalize">{loading ? '...' : city}</span>
              </div>
              <p>{loading ? '--' : `H:${data?.high}° L:${data?.low}°`}</p>
            </div>

            <div className="flex justify-between items-end mt-12">
              <div>
                <h2 className="text-[100px] md:text-[140px] font-thin leading-none tracking-tighter">
                  {loading ? '--' : data?.temp}°
                </h2>
                <p className="text-xl md:text-3xl font-medium opacity-80 capitalize">{loading ? 'Loading...' : data?.desc}</p>
              </div>
              <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                {loading ? <Cloud size={40}/> : data?.desc?.includes('rain') ? <CloudRain size={40}/> : <Sun size={40}/>}
              </div>
            </div>
          </motion.div>

          {/* Quick Metrics Grid (Mobile Optimized) */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            <MetricBox icon={<Wind size={20}/>} label="WIND" value={loading ? '--' : data?.windSpeed} unit="km/h" />
            <MetricBox icon={<Droplets size={20}/>} label="HUMIDITY" value={loading ? '--' : data?.humidity} unit="%" />
            <MetricBox icon={<Activity size={20}/>} label="AQI" value={loading ? '--' : data?.aqi} unit={loading ? '' : getAqiText(data?.aqi || 1)} />
          </div>
        </div>

      </div>
    </main>
  );
}

interface MetricBoxProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit: string;
}

// Reusable White Metric Box
function MetricBox({ icon, label, value, unit }: MetricBoxProps) {
  return (
    <div className="bg-white p-5 rounded-3xl flex flex-col justify-center gap-2 border border-white/20 shadow-xl transition-transform hover:scale-[1.02]">
      <div className="text-slate-500">{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">{label}</p>
        <p className="text-2xl font-black text-slate-800">{value} <span className="text-xs font-semibold text-slate-500">{unit}</span></p>
      </div>
    </div>
  );
}