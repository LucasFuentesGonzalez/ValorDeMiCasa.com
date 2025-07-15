// src/app/calcular-precio-vivienda/page.jsx
'use client';

import { useEffect, useState } from 'react';
import { IoArrowRedoSharp } from "react-icons/io5";
import Select from 'react-select';
import InfoTooltip from '../../Components/InfoTooltip';


export default function CalcularPrecioVivienda() {
   const [comunidades, setComunidades] = useState([]);
   const [provincias, setProvincias] = useState([]);
   const [municipios, setMunicipios] = useState([]);
   const [distritos, setDistritos] = useState([]);
   const [barrios, setBarrios] = useState([]);

   const [form, setForm] = useState({
      comunidad: '',
      provincia: '',
      municipio: '',
      distrito: '',
      barrio: '',
      metros: '',
   });

   const [mensajeError, setMensajeError] = useState('');
   const [datosBarrio, setDatosBarrio] = useState(null);
   const [valorEstimadoVenta, setValorEstimadoVenta] = useState(null);
   const [valorEstimadoAlquiler, setValorEstimadoAlquiler] = useState(null);
   const [mostrarResultado, setMostrarResultado] = useState(false);

   // Cargar comunidades al inicio
   useEffect(() => {
      fetch('/Api/AppCalcularPrecioVivienda/GetComunidades')
         .then(res => res.json())
         .then(setComunidades);
   }, []);

   // Cambios progresivos
   useEffect(() => {
      if (form.comunidad) {
         fetch(`/Api/AppCalcularPrecioVivienda/GetProvincias?comunidad=${form.comunidad}`)
         .then(res => res.json())
         .then(setProvincias);
      }
   }, [form.comunidad]);

   useEffect(() => {
      if (form.provincia) {
         fetch(`/Api/AppCalcularPrecioVivienda/GetMunicipios?provincia=${form.provincia}`)
         .then(res => res.json())
         .then(setMunicipios);
      }
   }, [form.provincia]);

   useEffect(() => {
      if (form.municipio) {
         fetch(`/Api/AppCalcularPrecioVivienda/GetDistritos?municipio=${form.municipio}`)
         .then(res => res.json())
         .then(setDistritos);
      }
   }, [form.municipio]);

   useEffect(() => {
      if (form.distrito) {
         fetch(`/Api/AppCalcularPrecioVivienda/GetBarrios?distrito=${form.distrito}`)
         .then(res => res.json())
         .then(setBarrios);
      }
   }, [form.distrito]);

      // Función para formatear labels
      const formatLabel = (str) =>
         str
         .replace(/-/g, ' ')
         .replace(/\b\w/g, (l) => l.toUpperCase());

      // Transforma cada array en opciones para react-select y tambien formatea las etiquetas
      const comunidadOptions = comunidades.map(c => ({ label: formatLabel(c), value: c }));
      const provinciaOptions = provincias.map(p => ({ label: formatLabel(p), value: p }));
      const municipioOptions = municipios.map(m => ({ label: formatLabel(m), value: m }));
      const distritoOptions = distritos.map(d => ({ label: formatLabel(d), value: d }));
      const barrioOptions = barrios.map(b => ({ label: formatLabel(b), value: b }));

   // Manejar cambios en las selecciones
   const handleChangeComunidad = (option) => {
      const comunidad = option?.value || '';
      setForm(prev => ({
         ...prev,
         comunidad,
         provincia: '',
         municipio: '',
         distrito: '',
         barrio: '',
      }));
      setProvincias([]);
      setMunicipios([]);
      setDistritos([]);
      setBarrios([]);
   };

   const handleChangeProvincia = (option) => {
      const provincia = option?.value || '';
      setForm(prev => ({
         ...prev,
         provincia,
         municipio: '',
         distrito: '',
         barrio: '',
      }));
      setMunicipios([]);
      setDistritos([]);
      setBarrios([]);
   };

   const handleChangeMunicipio = (option) => {
      const municipio = option?.value || '';
      setForm(prev => ({
         ...prev,
         municipio,
         distrito: '',
         barrio: '',
      }));
      setDistritos([]);
      setBarrios([]);
   };

   const handleChangeDistrito = (option) => {
      const distrito = option?.value || '';
      setForm(prev => ({
         ...prev,
         distrito,
         barrio: '',
      }));
      setBarrios([]);
   };

   const handleChangeBarrio = (option) => {
      const barrio = option?.value || '';
      setForm(prev => ({
         ...prev,
         barrio,
      }));
   };

   // Manejar cambio
   const handleChange = (e) => {
      const { name, value } = e.target;
      setForm(prev => ({...prev, [name]: value,}));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setMensajeError(''); // Reinicia el mensaje de error
      setDatosBarrio(null);
      setValorEstimadoVenta(null);
      setValorEstimadoAlquiler(null);
      setMostrarResultado(false); // Oculta resultados antes del nuevo cálculo

      // Verificar si faltan campos requeridos
      if (!form.comunidad || !form.provincia || !form.municipio || !form.distrito || !form.barrio || !form.metros) {
         setMensajeError('Por favor, completa todos los campos antes de continuar.');
         return;
      }

      const res = await fetch(`/Api/AppCalcularPrecioVivienda/GetDatosBarrio?barrio=${form.barrio}`);
      const data = await res.json();
      setDatosBarrio(data);

      if (form.metros) {
         if (data?.precompram2barrio !== null && data?.precompram2barrio !== undefined) {
         const totalPrecioVenta = parseFloat(data.precompram2barrio) * parseFloat(form.metros);
         setValorEstimadoVenta(totalPrecioVenta.toLocaleString('es-ES', { minimumFractionDigits: 0 }));
         } else {
         setValorEstimadoVenta(null);
         }

         if (data?.prealquilerm2barrio !== null && data?.prealquilerm2barrio !== undefined) {
         const totalPrecioAlquiler = parseFloat(data.prealquilerm2barrio) * parseFloat(form.metros);
         setValorEstimadoAlquiler(totalPrecioAlquiler.toLocaleString('es-ES', { minimumFractionDigits: 0 }));
         } else {
         setValorEstimadoAlquiler(null);
         }
      }

      // Mostrar resultado tras 200 milisegundos
      setTimeout(() => {
         setMostrarResultado(true);
      }, 200);
   };

   const customSelectStyles = {
      control: (base) => ({...base, backgroundColor: '#262626', borderColor: '#3f3f46', color: 'white',}),
      menu: (base) => ({...base,backgroundColor: '#1f1f1f', color: 'white',}),
      option: (base, state) => ({...base, backgroundColor: state.isFocused? '#3b82f6': 'transparent',color: state.isFocused ? 'white' : '#d4d4d4',cursor: 'pointer',}),
      singleValue: (base) => ({...base,color: 'white',}),
      placeholder: (base) => ({...base,color: '#a3a3a3',}),
      input: (base) => ({...base,color: 'white',}),
   }


   return (
      <div>
         <h2 className="text-center text-5xl font-semibold text-white">Estima el valor de tu vivienda</h2>
         <p className="mt-3 mb-6 text-center text-lg font-normal text-[#A3A3A3]">Obten una estimación del valor de tu vivienda.</p>

         <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-[#171717] shadow rounded-xl space-y-4 text-white">

            {/* Solo renderizar cuando comunidades esté cargado */}
            <Select
               options={comunidadOptions}
               value={comunidadOptions.find((opt) => opt.value === form.comunidad)}
               onChange={handleChangeComunidad}
               placeholder="Selecciona Comunidad Autónoma"
               isClearable
               classNamePrefix="select"
               styles={customSelectStyles}
            />

            {provincias.length > 0 && (
               <Select
               options={provinciaOptions}
               value={provinciaOptions.find(opt => opt.value === form.provincia)}
               onChange={handleChangeProvincia}
               placeholder="Selecciona Provincia"
               isClearable
               classNamePrefix="select"
               styles={customSelectStyles}
               />
            )}

            {municipios.length > 0 && (
               <Select
               options={municipioOptions}
               value={municipioOptions.find(opt => opt.value === form.municipio)}
               onChange={handleChangeMunicipio}
               placeholder="Selecciona Municipio"
               isClearable
               classNamePrefix="select"
               styles={customSelectStyles}
               />
            )}

            {distritos.length > 0 && (
               <Select
               options={distritoOptions}
               value={distritoOptions.find(opt => opt.value === form.distrito)}
               onChange={handleChangeDistrito}
               placeholder="Selecciona Distrito"
               isClearable
               classNamePrefix="select"
               styles={customSelectStyles}
               />
            )}

            {barrios.length > 0 && (
               <Select
               options={barrioOptions}
               value={barrioOptions.find(opt => opt.value === form.barrio)}
               onChange={handleChangeBarrio}
               placeholder="Selecciona Barrio"
               isClearable
               classNamePrefix="select"
               styles={customSelectStyles}
               />
            )}

            <input
               type="number"
               name="metros"
               placeholder="Metros cuadrados"
               value={form.metros}
               onChange={handleChange}
               min="1"
               className="w-full p-2 rounded border border-[#3f3f46] bg-[#262626] text-white placeholder-[#a3a3a3] 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:bg-[#262626] active:bg-[#262626] transition"
            />

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2">
               Calcular Valor Estimado
               <IoArrowRedoSharp />
            </button>


            {mensajeError && (
               <div className="text-red-400 font-semibold bg-[#2a1212] border border-red-500/30 p-3 rounded">
                  {mensajeError}
               </div>
            )}


            {datosBarrio && mostrarResultado && (
               <div className="mt-4 bg-[#1f1f1f] text-[#d4d4d4] border border-[#3f3f46] rounded shadow-sm p-4 space-y-2">
                  {valorEstimadoVenta && (
                     <div className="flex items-center gap-1 hover:text-white">
                        <InfoTooltip title="" tooltip="Precio medio de compra por metro cuadrado en el barrio." theme="dark"/>
                        <span className="font-semibold">Precio Compra/m²:</span>
                        <span>{datosBarrio.precompram2barrio} €</span>
                     </div>
                  )}
                  {valorEstimadoAlquiler && (
                     <>
                     <div className="flex items-center gap-1 hover:text-white">
                        <InfoTooltip title="" tooltip="Precio medio de alquiler por metro cuadrado en el barrio." theme="dark"/>
                        <span className="font-semibold">Precio Alquiler/m²:</span>
                        <span>{datosBarrio.prealquilerm2barrio} €</span>
                     </div>

                     <div className="flex items-center gap-1 hover:text-white">
                        <InfoTooltip title="" tooltip="Porcentaje que representa la rentabilidad del alquiler." theme="dark"/>
                        <span className="font-semibold">Rentabilidad:</span>
                        <span>{datosBarrio.rentabilidad} %</span>
                     </div>
                     </>
                  )}

                  <hr className="my-2" />

                  {valorEstimadoVenta && (
                     <div className="flex items-center gap-1 hover:text-white">
                        <InfoTooltip title="" tooltip="Valor total estimado para vender la propiedad según los metros cuadrados indicados." theme="dark"/>
                        <span className="text-lg font-semibold">Valor estimado de Venta:</span>
                        <span className="text-lg font-semibold text-emerald-600">{valorEstimadoVenta} €</span>
                     </div>
                  )}
                  {valorEstimadoAlquiler && (
                     <div className="flex items-center gap-1 hover:text-white">
                        <InfoTooltip title="" tooltip="Valor total estimado para alquilar la propiedad según los metros cuadrados indicados." theme="dark"/>
                        <span className="text-lg font-semibold">Valor estimado de Alquiler:</span>
                        <span className="text-lg font-semibold text-emerald-600">{valorEstimadoAlquiler} €</span>
                     </div>
                  )}
               </div>
            )}
         </form>
      </div>
   );
}
