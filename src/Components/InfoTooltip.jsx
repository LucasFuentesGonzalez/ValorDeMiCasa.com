// src/Components/InfoTooltip.jsx
'use client';

import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';


const InfoTooltip = ({ title, tooltip, theme = 'dark' }) => {
   // Define estilos para modo oscuro y claro
   const themeStyles = theme === 'dark'
      ? { backgroundColor: '#101828', color: '#fff', maxWidth: '250px', whiteSpace: 'normal', wordWrap: 'break-word' }
      : { backgroundColor: '#fff', color: '#000', border: '1px solid #e2e8f0', maxWidth: '250px', whiteSpace: 'normal', wordWrap: 'break-word' };

   const tooltipId = `tooltip-${title.replace(/\s+/g, '-')}`;

   return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
         <FaInfoCircle 
            className="w-4 h-4 text-gray-400 cursor-pointer" 
            data-tooltip-id={`tooltip-${tooltipId}`} 
            data-tooltip-content={tooltip} 
         />
         
         <Tooltip 
            id={`tooltip-${tooltipId}`} 
            style={themeStyles} className="text-xs p-2 rounded-md shadow-lg" 
            place="top"   // Ubica el tooltip arriba para mayor visibilidad
            strategy="fixed" // Evita que salga de la pantalla
         />
         <span>{title}</span>
      </div>
   );
};
 
export default InfoTooltip;
