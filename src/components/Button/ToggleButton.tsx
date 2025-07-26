import { useAppDispatch } from '../../app/hooks';
import { toggleModal } from '../../routes/Redux/ui/uiSlice';

const ToggleButton = () => {
  const dispatch = useAppDispatch();

  return (
    <button onClick={() => dispatch(toggleModal())}>
      Toggle Modal
    </button>
  );
};

export default ToggleButton;
