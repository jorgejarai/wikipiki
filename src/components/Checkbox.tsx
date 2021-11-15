interface IProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox = ({ label, checked, onChange }: IProps) => {
  return (
    <div className='flex items-center space-x-2'>
      <button
        onClick={() => onChange(!checked)}
        className='flex items-center justify-center h-6 w-6 bg-gray-300 rounded'
      >
        {checked && <div className='h-4 w-4 bg-gray-500 rounded'></div>}
      </button>
      <span>{label}</span>
    </div>
  );
};

export default Checkbox;
