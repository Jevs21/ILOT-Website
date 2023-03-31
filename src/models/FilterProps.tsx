interface FilterProps {
  //{ key: 'make', label: 'Make', filt_type: 'list', el_type: 'select'  },
  key: string;
  label: string;
  n_selected?: number;
  filt_type: string;
  filt_opts?: any;
  el_type: string;
  values?: string[];
  selected: string[];
  group: string;
}

export default FilterProps;