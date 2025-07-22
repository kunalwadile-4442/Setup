import { useAppDispatch } from '../../app/hooks';
import { toggleModal } from '../../Redux/ui/uiSlice';

const ToggleButton = () => {
  const dispatch = useAppDispatch();

  return (
    <button onClick={() => dispatch(toggleModal())}>
      Toggle Modal
    </button>
  );
};

export default ToggleButton;
