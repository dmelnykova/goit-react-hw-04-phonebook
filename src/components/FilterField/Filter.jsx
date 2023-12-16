import React from 'react';
import { FilterWrapper } from './Filter.styled';


export const FilterField = ({ filter, onChange }) => {
  return (
    <FilterWrapper>
      Filter contacts by name:
      <input
        type="text"
        value={filter}
        onChange={e => onChange(e.target.value)}
      />
    </FilterWrapper>
  );
};