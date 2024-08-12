'use client';
import React, { useState } from 'react';
import AuthForm from '../components/UserForm';
import { useRouter } from 'next/navigation';

const AuthPage: React.FC = () => {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="container">
      <AuthForm isLogin={isLogin} toggleForm={toggleForm} />
      <button onClick={()=>router.push('/')}>Back to Home</button>
    </div>
  );
};

export default AuthPage;
