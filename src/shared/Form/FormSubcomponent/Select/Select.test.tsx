import { render, screen } from '@testing-library/react';
import { MenuItem } from '@mui/material';
import SelectInput from '@/shared/Form/FormSubcomponent/Select';

const selectOptions = ['select 1', 'select 2'].map(item => (
  <MenuItem key={item} value={item}>
    {item}
  </MenuItem>
));

function SelectComponent({ value = '' }) {
  return (
    <SelectInput
      fullWidth
      error={false}
      variant="filled"
      helperText="Select from existing admin roles."
      label="Select"
      value={value}
      testId={{ 'data-testid': 'select-input' }}
    >
      {selectOptions}
    </SelectInput>
  );
}

describe('Test Select Component', () => {
  it('should display label', async () => {
    render(<SelectComponent />);

    expect(await screen.findByLabelText('Select')).toBeInTheDocument();
  });

  it('takes the value prop', async () => {
    render(<SelectComponent value="select 1" />);
    const selectElement = screen.getByDisplayValue('select 1');
    expect(selectElement).toHaveValue('select 1');
  });

  it('should be unselected by default', async () => {
    render(<SelectComponent />);

    const selectElement = await screen.findByTestId('select-input');
    // Verify that the Select is initially unselected
    expect(selectElement).toHaveValue('');
  });
});
