import React, { useState } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, ReferenceLine, ReferenceDot, 
  BarChart, Bar, Cell, LabelList 
} from 'recharts';
import { Layout, Zap, Target, MessageSquare, HelpCircle, ArrowRight } from 'lucide-react';

// Configuración de colores institucionales de Alegra
const COLORS = {
  orange: "#FF4600",
  navy: "#001B44",
  emerald: "#10b981",
  rose: "#f43f5e",
  slate: "#64748b"
};

const data = {
  // Proyección basada estrictamente en la tendencia histórica de +0.6% anual
  fullTrend: [
    { year: 1997, val: 11.7 }, 
    { year: 2005, val: 16.5 },
    { year: 2012, val: 20.7 },
    { year: 2019, val: 24.9 },
    { year: 2040, val: 37.5 },
    { year: 2061, val: 50.1 }
  ],
  // Datos de contraste extremo (Cierre del dataset 2019)
  comparison: [
    { name: 'Rwanda', val: 61.3, type: 'top' },
    { name: 'Cuba', val: 53.2, type: 'top' },
    { name: 'Bolivia', val: 53.1, type: 'top' },
    { name: 'Promedio Global', val: 24.9, type: 'avg' },
    { name: 'Nigeria', val: 3.4, type: 'bottom' },
    { name: 'Yemen', val: 0.3, type: 'bottom' }
  ]
};

export default function App() {
  const [slide, setSlide] = useState(0);

  // --- SLIDE 1: TIEMPO Y PROYECCIÓN ---
  const Slide1 = () => (
    <div className="flex flex-col h-full space-y-6">
      {/* Pregunta Relevante */}
      <div className="p-5 bg-slate-50 border-l-8 border-[#FF4600] rounded-r-2xl">
        <div className="flex items-center gap-2 text-[#FF4600] font-black text-[10px] uppercase tracking-widest mb-1">
          <HelpCircle size={14} /> Pregunta Relevante
        </div>
        <h2 className="text-2xl font-black text-[#001B44] leading-tight">
          Al ritmo observado, ¿cuándo se alcanzará el equilibrio parlamentario?
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow">
        {/* Visualización Principal */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-8 border border-slate-100 shadow-inner flex flex-col justify-center min-h-[400px]">
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.fullTrend} margin={{ top: 20, right: 100, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradOrange" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.orange} stopOpacity={0.25}/>
                    <stop offset="95%" stopColor={COLORS.orange} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: COLORS.slate, fontSize: 11}} />
                <YAxis domain={[0, 70]} axisLine={false} tickLine={false} tick={{fill: COLORS.slate, fontSize: 11}} unit="%" />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 8px 16px rgba(0,0,0,0.1)'}} />
                
                {/* Referencia de Paridad con Etiqueta Explícita */}
                <ReferenceLine 
                  y={50} 
                  stroke={COLORS.emerald} 
                  strokeWidth={2} 
                  strokeDasharray="5 5"
                >
                  <label 
                    position="right" 
                    fill={COLORS.emerald} 
                    fontSize={10} 
                    fontWeight="bold"
                    offset={10}
                  >
                    50% = PARIDAD
                  </label>
                </ReferenceLine>

                <Area type="monotone" dataKey="val" stroke={COLORS.orange} strokeWidth={4} fill="url(#gradOrange)" />
                
                <ReferenceDot x={1997} y={11.7} r={6} fill={COLORS.navy} stroke="white" strokeWidth={2} label={{ position: 'top', value: '11.7%', fill: COLORS.navy, fontSize: 11, fontWeight: 'bold' }} />
                <ReferenceDot x={2019} y={24.9} r={6} fill={COLORS.orange} stroke="white" strokeWidth={2} label={{ position: 'top', value: 'Hoy: 24.9%', fill: COLORS.orange, fontSize: 11, fontWeight: 'bold' }} />
                <ReferenceDot x={2061} y={50.1} r={6} fill={COLORS.emerald} stroke="white" strokeWidth={2} label={{ position: 'left', value: '2061', fill: COLORS.emerald, fontSize: 11, fontWeight: 'bold' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-slate-400 text-[10px] mt-6 italic font-medium uppercase tracking-tight">Proyección lineal (+0.6% anual) basada en datos históricos 1997-2019</p>
        </div>

        {/* Respuesta e Insights */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-[#001B44] text-white p-6 rounded-3xl shadow-xl border-b-8 border-[#FF4600] flex-grow flex flex-col justify-center">
            <h4 className="text-orange-400 font-bold flex items-center gap-2 mb-3 text-[10px] uppercase tracking-[0.2em]">
              <Target size={16} /> Respuesta Directa
            </h4>
            <p className="text-2xl font-black leading-tight mb-4 text-white uppercase tracking-tight">
              Faltan 42 años para lograr la igualdad representativa.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed font-medium">
              Al ritmo actual (+0.6% anual), la paridad no se alcanzará sino hasta el año <strong>2061</strong>. Esto significa que dos generaciones de mujeres verán un progreso estancado.
            </p>
            <div className="mt-6 flex items-center gap-2 text-orange-400 font-bold text-xs">
              <ArrowRight size={14} /> FOCO: Cambio Estructural
            </div>
          </div>
          <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex items-center gap-3 shadow-sm">
             <Zap size={16} className="text-[#FF4600]" />
             <p className="text-[#001B44] text-[10px] font-bold leading-tight uppercase tracking-tighter">Sin aceleración política, el equilibrio es inalcanzable hoy.</p>
          </div>
        </div>
      </div>
    </div>
  );

  // --- SLIDE 2: CONTRASTE ---
  const Slide2 = () => (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in duration-500">
      {/* Pregunta Relevante */}
      <div className="p-5 bg-slate-50 border-l-8 border-[#10b981] rounded-r-2xl">
        <div className="flex items-center gap-2 text-[#10b981] font-black text-[10px] uppercase tracking-widest mb-1">
          <HelpCircle size={14} /> Pregunta Relevante
        </div>
        <h2 className="text-2xl font-black text-[#001B44] leading-tight">
          ¿Es la representación un fenómeno uniforme o existen brechas extremas?
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow">
        {/* Visualización de Barras de Extremos */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-100 shadow-inner flex flex-col justify-center min-h-[400px]">
          <h3 className="text-[#001B44] font-bold text-xs mb-6 uppercase tracking-wider">Contraste de Extremos (Datos al cierre 2019)</h3>
          <div className="h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.comparison} layout="vertical" margin={{ left: 30, right: 80 }}>
                <XAxis type="number" domain={[0, 70]} hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: COLORS.navy, fontWeight: 'bold', fontSize: 11}} width={110} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar 
                  dataKey="val" 
                  radius={[0, 5, 5, 0]} 
                  barSize={25}
                  minPointSize={5} // Asegura visibilidad para Yemen (0.3%)
                >
                  {data.comparison.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.type === 'top' ? COLORS.emerald : entry.type === 'avg' ? COLORS.navy : COLORS.rose} 
                    />
                  ))}
                  <LabelList 
                    dataKey="val" 
                    position="right" 
                    formatter={(v) => `${v}%`} 
                    style={{
                      fill: COLORS.navy, 
                      fontWeight: '800', 
                      fontSize: '12px',
                    }} 
                    offset={10} 
                  />
                </Bar>
                <ReferenceLine x={24.9} stroke={COLORS.navy} strokeDasharray="3 3" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4 text-[10px] font-bold uppercase tracking-tight text-slate-400">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#10b981]"></span> Desempeño Superior</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#f43f5e]"></span> Representación Mínima</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#001B44]"></span> Promedio Global</span>
          </div>
        </div>

        {/* Insight Concreto */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="bg-[#001B44] text-white p-6 rounded-3xl shadow-xl border-b-8 border-[#10b981] flex-grow flex flex-col justify-center">
            <h4 className="text-emerald-400 font-bold flex items-center gap-2 mb-3 text-[10px] uppercase tracking-wider">
              <Target size={16} /> Insight Concreto
            </h4>
            <p className="text-2xl font-black leading-tight mb-4 text-white uppercase tracking-tight">
              La brecha es crítica: el 60% convive con el 0%.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed font-medium">
              Mientras países como <strong>Rwanda</strong> superan el 60%, naciones como <strong>Yemen</strong> se mantienen en niveles de invisibilidad (0.3%). La brecha extrema es la verdadera crisis detrás del promedio.
            </p>
          </div>

          <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100 flex items-center gap-3">
            <MessageSquare size={18} className="text-[#10b981]" />
            <p className="text-[#001B44] text-[10px] font-bold leading-tight uppercase tracking-tighter">Alegra BI: Urge segmentar por regiones estancadas.</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F7F9] p-4 md:p-6 font-sans text-[#001B44]">
      <div className="max-w-6xl mx-auto">
        {/* Navegación y Cabecera */}
        <header className="mb-4 flex justify-between items-center bg-[#001B44] p-3 rounded-xl shadow-lg border-b-4 border-orange-500">
          <div className="flex items-center gap-3">
            <div className="bg-[#FF4600] p-1 rounded-md"><Layout size={16} className="text-white" /></div>
            <span className="text-white font-black text-xs uppercase tracking-tighter">Alegra <span className="text-orange-400 font-medium tracking-normal">Business Intelligence</span></span>
          </div>
          <div className="flex gap-2">
            {[0, 1].map((i) => (
              <button 
                key={i} 
                onClick={() => setSlide(i)} 
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black transition-all duration-300 ${slide === i ? 'bg-[#FF4600] text-white shadow-lg scale-105' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
              >
                {i === 0 ? "1. TIEMPO" : "2. CONTRASTE"}
              </button>
            ))}
          </div>
        </header>

        {/* Área Principal de Contenido */}
        <main className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-10 min-h-[620px] border border-white relative overflow-hidden flex flex-col">
          {slide === 0 ? <Slide1 /> : <Slide2 />}
          
          {/* Pie de página con fuente */}
          <div className="mt-8 flex justify-between items-center pt-4 border-t border-slate-50 opacity-50 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
            <span>Fuente: Datos Banco Mundial (Cierre 2019)</span>
            <span>Página {slide + 1} / 2</span>
          </div>
        </main>
      </div>

      {/* Estilos Globales y Tipografía */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; margin: 0; }
        .recharts-cartesian-axis-line, .recharts-cartesian-axis-tick-line { display: none; }
        .animate-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}