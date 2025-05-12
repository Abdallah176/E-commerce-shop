import { Link } from 'react-router-dom';
import imgLogo from '../../assets/logoo.png';

export default function Logo() {
  return (
    <Link to={'/'}>
      <img className='w-28' src={imgLogo} alt="Logo" />
    </Link>
  );
}
