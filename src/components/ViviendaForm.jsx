// src/components/ViviendaForm.jsx
'use client';

import { useEffect, useState } from 'react';
import Select from 'react-select';
import InfoTooltip from './InfoTooltip';

export default function ViviendaForm() {
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

  const [datosBarrio, setDatosBarrio] = useState(null);
  const [valorEstimadoVenta, setValorEstimadoVenta] = useState(null);
  const [valorEstimadoAlquiler, setValorEstimadoAlquiler] = useState(null);

  // Cargar comunidades al inicio
  useEffect(() => {
    fetch('/api/app1/GetComunidades')
      .then(res => res.json())
      .then(setComunidades);
  }, []);

  // Cambios progresivos
  useEffect(() => {
    if (form.comunidad) {
      fetch(`/api/app1/GetProvincias?comunidad=${form.comunidad}`)
        .then(res => res.json())
        .then(setProvincias);
    }
  }, [form.comunidad]);

  useEffect(() => {
    if (form.provincia) {
      fetch(`/api/app1/GetMunicipios?provincia=${form.provincia}`)
        .then(res => res.json())
        .then(setMunicipios);
    }
  }, [form.provincia]);

  useEffect(() => {
    if (form.municipio) {
      fetch(`/api/app1/GetDistritos?municipio=${form.municipio}`)
        .then(res => res.json())
        .then(setDistritos);
    }
  }, [form.municipio]);

  useEffect(() => {
    if (form.distrito) {
      fetch(`/api/app1/GetBarrios?distrito=${form.distrito}`)
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
    setDatosBarrio(null);
    setValorEstimadoVenta(null);
    setValorEstimadoAlquiler(null);

    const res = await fetch(`/api/app1/GetDatosBarrio?barrio=${form.barrio}`);
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
  };


  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow rounded-xl space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Estima el valor de tu vivienda</h2>

      {/* Solo renderizar cuando comunidades esté cargado */}
      <Select
        options={comunidadOptions}
        value={comunidadOptions.find((opt) => opt.value === form.comunidad)}
        onChange={handleChangeComunidad}
        placeholder="Selecciona Comunidad Autónoma"
        isClearable
        className="basic-single"
        classNamePrefix="select"
      />

      {provincias.length > 0 && (
        <Select
          options={provinciaOptions}
          value={provinciaOptions.find(opt => opt.value === form.provincia)}
          onChange={handleChangeProvincia}
          placeholder="Selecciona Provincia"
          isClearable
          className="basic-single"
          classNamePrefix="select"
        />
      )}

      {municipios.length > 0 && (
        <Select
          options={municipioOptions}
          value={municipioOptions.find(opt => opt.value === form.municipio)}
          onChange={handleChangeMunicipio}
          placeholder="Selecciona Municipio"
          isClearable
          className="basic-single"
          classNamePrefix="select"
        />
      )}

      {distritos.length > 0 && (
        <Select
          options={distritoOptions}
          value={distritoOptions.find(opt => opt.value === form.distrito)}
          onChange={handleChangeDistrito}
          placeholder="Selecciona Distrito"
          isClearable
          className="basic-single"
          classNamePrefix="select"
        />
      )}

      {barrios.length > 0 && (
        <Select
          options={barrioOptions}
          value={barrioOptions.find(opt => opt.value === form.barrio)}
          onChange={handleChangeBarrio}
          placeholder="Selecciona Barrio"
          isClearable
          className="basic-single"
          classNamePrefix="select"
        />
      )}

      <input
        type="number"
        name="metros"
        placeholder="Metros cuadrados"
        value={form.metros}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        min="1"
        required
      />

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Calcular Valor Estimado
      </button>

      {datosBarrio && (
        <div className="mt-4 bg-gray-50 p-4 border rounded shadow-sm space-y-2">
          {valorEstimadoVenta && (
            <div className="flex items-center gap-1">
              <InfoTooltip title="" tooltip="Precio medio de compra por metro cuadrado en el barrio." theme="dark"/>
              <span className="font-semibold">Precio Compra/m²:</span>
              <span>{datosBarrio.precompram2barrio} €</span>
            </div>
          )}
          {valorEstimadoAlquiler && (
             <>
            <div className="flex items-center gap-1">
              <InfoTooltip title="" tooltip="Precio medio de alquiler por metro cuadrado en el barrio." theme="dark"/>
              <span className="font-semibold">Precio Alquiler/m²:</span>
              <span>{datosBarrio.prealquilerm2barrio} €</span>
            </div>

            <div className="flex items-center gap-1">
              <InfoTooltip title="" tooltip="Porcentaje que representa la rentabilidad del alquiler." theme="dark"/>
              <span className="font-semibold">Rentabilidad:</span>
              <span>{datosBarrio.rentabilidad} %</span>
            </div>
            </>
          )}

          <hr className="my-2" />

          {valorEstimadoVenta && (
            <div className="flex items-center gap-1">
              <InfoTooltip title="" tooltip="Valor total estimado para vender la propiedad según los metros cuadrados indicados." theme="dark"/>
              <span className="text-lg font-semibold">Valor estimado de Venta:</span>
              <span className="text-lg font-semibold text-green-700">{valorEstimadoVenta} €</span>
            </div>
          )}
          {valorEstimadoAlquiler && (
            <div className="flex items-center gap-1">
              <InfoTooltip title="" tooltip="Valor total estimado para alquilar la propiedad según los metros cuadrados indicados." theme="dark"/>
              <span className="text-lg font-semibold">Valor estimado de Alquiler:</span>
              <span className="text-lg font-semibold text-green-700">{valorEstimadoAlquiler} €</span>
            </div>
          )}
        </div>
      )}
    </form>
  );
}