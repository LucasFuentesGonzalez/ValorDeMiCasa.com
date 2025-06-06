// src/components/ViviendaForm.jsx
'use client';

import { useEffect, useState } from 'react';
import Select from 'react-select';
import ComunidadSelector from '@/components/ComunidadSelector';

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
  const [valorEstimado, setValorEstimado] = useState(null);

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

  // Manejar cambio
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({...prev, [name]: value,}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDatosBarrio(null);
    setValorEstimado(null);

    const res = await fetch(`/api/app1/GetDatosBarrio?barrio=${form.barrio}`);
    const data = await res.json();
    setDatosBarrio(data);

    if (data?.precompram2barrio && form.metros) {
      const total = parseFloat(data.precompram2barrio) * parseFloat(form.metros);
      setValorEstimado(total.toFixed(2));
    }
  };

  // Transforma cada array en opciones para react-select
  const comunidadOptions = comunidades.map(c => ({ label: c, value: c }));
  const provinciaOptions = provincias.map(p => ({ label: p, value: p }));
  const municipioOptions = municipios.map(m => ({ label: m, value: m }));
  const distritoOptions = distritos.map(d => ({ label: d, value: d }));
  const barrioOptions = barrios.map(b => ({ label: b, value: b }));

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow rounded-xl space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Estima el valor de tu vivienda</h2>

      {/* Solo renderizar cuando comunidades esté cargado */}
      <Select
        options={comunidadOptions}
        value={comunidadOptions.find((opt) => opt.value === form.comunidad)}
        onChange={(option) =>setForm((prev) => ({ ...prev, comunidad: option?.value || '' }))}
        placeholder="Selecciona Comunidad Autónoma"
        isClearable
        className="basic-single"
        classNamePrefix="select"
      />

      {provincias.length > 0 && (
        <Select
          options={provinciaOptions}
          value={provinciaOptions.find(opt => opt.value === form.provincia)}
          onChange={(option) =>setForm((prev) => ({ ...prev, provincia: option?.value || '' }))}
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
          onChange={(option) =>orm((prev) => ({ ...prev, municipio: option?.value || '' }))}
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
          onChange={(option) =>((prev) => ({ ...prev, distrito: option?.value || '' }))}
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
          onChange={(option) =>setForm((prev) => ({ ...prev, barrio: option?.value || '' }))}
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

      {valorEstimado && datosBarrio && (
        <div className="mt-4 bg-gray-50 p-4 border rounded shadow-sm">
          <p><strong>Precio Compra/m²:</strong> {datosBarrio.precompram2barrio} €</p>
          <p><strong>Precio Alquiler/m²:</strong> {datosBarrio.prealquilerm2barrio} €</p>
          <p><strong>Rentabilidad:</strong> {datosBarrio.rentabilidad} %</p>
          <hr className="my-2" />
          <p className="text-lg font-semibold">Valor estimado: <span className="text-green-700">{valorEstimado} €</span></p>
        </div>
      )}
    </form>
  );
}