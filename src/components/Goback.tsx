import { App_url } from '../utils/constants/static'
import { useNavigate } from 'react-router-dom'

function Goback({ title }: { title: string }) {
  const navigate = useNavigate();

  return (
    <div>
      <div
        className="flex text-sm gap-2 pb-3 pl-2 items-center cursor-pointer hover:text-gray-800"
        onClick={() => navigate(-1)}
      >
        <img src={App_url.image.arrowleft} className="h-3" alt="back" />
        <p className='text-md'>{title}</p>
      </div>
    </div>
  );
}

export default Goback