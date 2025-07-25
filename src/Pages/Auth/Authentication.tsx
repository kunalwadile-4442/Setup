import React from 'react'
import { useLocation } from 'react-router-dom'
import { App_url } from '../../utils/constants/static';
import Auth from '../../components/Auth';

function Authentication() {

   const location = useLocation();
   const path = location.pathname;

  return (
    <div>
        {(path === App_url.link.LOGIN || path === App_url.link.REGISTER || path === App_url.link.FORGOT_PASSWORD || path === App_url.link.RESET_PASSWORD)  && 
          <Auth/>
        }
        
    </div>
  )
}

export default Authentication