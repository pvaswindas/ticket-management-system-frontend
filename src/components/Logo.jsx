import React from 'react';
import Icon from "@/assets/icons/ticket.png";
import TICSOL from '@/assets/icons/TICSOL.svg'
import { useNavigate } from 'react-router-dom';

function Logo() {
  const navigate = useNavigate()

  return (
    <div
      className="flex gap-2 items-center px-6 cursor-pointer"
      onClick={() => navigate('/dashboard')}
    >
      <div className="w-10 h-10">
        <img src={Icon} alt="AssistPoint" />
      </div>
      <div className="w-10">
        <img src={TICSOL} alt="TIKSOL" />
      </div>
    </div>
  );
}

export default Logo;
