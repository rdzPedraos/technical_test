const UserConfigInputs = [
    { id: 'document_number', label: 'Ingresa el número de documento', placeholder: '1006556729' },
    { id: 'name', label: 'Ingresa los nombres', placeholder: 'Pepe' },
    { id: 'last_name', label: 'Ingresa los apellidos', placeholder: '' },
    { id: 'email', label: 'Ingresa el correo electrónico', placeholder: 'ex@am.ple' },
    { id: 'phone_number', label: 'Ingresa un número telefónico', placeholder: '000000000' },
    {
        id: 'country_code',
        type: 'select',
        value: 'COL',
        label: 'Selecciona un pais',
        id_options: 'countrylist',
        idAsValue: true,
    },
    { id: 'residence_address', label: 'Ingresa la dirección', placeholder: 'Cra ##' },
    {
        id: 'categories',
        type: 'select',
        label: 'Categorias ha asignar',
        renderValue: selected => selected.join(', '),
        multiple: true,
        id_options: 'categories',
    },
];

export default UserConfigInputs;
