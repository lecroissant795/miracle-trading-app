import React, { useState, useEffect } from 'react';
import { Button } from './AuthButton';
import { Input } from './AuthInput';
import { VisualSidebar } from './VisualSidebar';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle, ArrowLeft } from 'lucide-react';
import Logo from './Logo';

export enum AuthMode {
    LOGIN = 'LOGIN',
    SIGNUP = 'SIGNUP',
    FORGOT_PASSWORD = 'FORGOT_PASSWORD'
}

interface AuthPageProps {
  onLogin: () => void;
  startView?: 'LOGIN' | 'SIGNUP';
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin, startView = 'LOGIN' }) => {
  const [authMode, setAuthMode] = useState<AuthMode>(
    startView === 'SIGNUP' ? AuthMode.SIGNUP : AuthMode.LOGIN
  );
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const toggleMode = (mode: AuthMode) => {
    setAuthMode(mode);
    // Reset states on toggle
    setShowPassword(false);
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      // Call parent onLogin when successful
      onLogin();
    }, 1500);
  };

  const renderSocialLogin = () => (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Button variant="secondary" type="button" className="w-full">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </Button>
        <Button variant="secondary" type="button" className="w-full">
          <svg className="w-5 h-5 mr-2 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.31-.89 3.51-.84 1.54.06 2.74.56 3.54 1.75-1.94 1.15-2.65 3.45-1.43 5.42 1.15 1.83 2.53 4.14 1.3 5.86zM12.04 7.21c1.23-1.49 1.05-3.69-.97-4.21-1.39.4-2.52 1.69-2.22 3.26.12 1.25 1.15 2.15 3.19.95z"/>
          </svg>
          Apple
        </Button>
      </div>
    </div>
  );

  const renderLoginForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
        <p className="text-gray-500">Please enter your details to sign in.</p>
      </div>

      <Input 
        label="Email Address" 
        type="email" 
        placeholder="you@example.com" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<Mail className="w-5 h-5" />}
        required
      />
      
      <div className="relative">
        <Input 
          label="Password" 
          type={showPassword ? "text" : "password"} 
          placeholder="••••••••" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock className="w-5 h-5" />}
          required
        />
        <button 
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-[38px] text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center cursor-pointer">
          <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          <span className="ml-2 text-gray-600">Remember me</span>
        </label>
        <button 
          type="button" 
          onClick={() => toggleMode(AuthMode.FORGOT_PASSWORD)}
          className="font-medium text-blue-600 hover:text-blue-700"
        >
          Forgot password?
        </button>
      </div>

      <Button fullWidth isLoading={isLoading} type="submit" className="mt-2">
        Sign in
      </Button>

      {renderSocialLogin()}

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <button 
            type="button" 
            onClick={() => toggleMode(AuthMode.SIGNUP)}
            className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            Create account
          </button>
        </p>
      </div>
    </form>
  );

  const renderSignupForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
        <p className="text-gray-500">Start your journey to financial freedom today.</p>
      </div>

      <Input 
        label="Full Name" 
        type="text" 
        placeholder="John Doe" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        icon={<User className="w-5 h-5" />}
        required
      />

      <Input 
        label="Email Address" 
        type="email" 
        placeholder="you@example.com" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        icon={<Mail className="w-5 h-5" />}
        required
      />
      
      <div className="relative">
        <Input 
          label="Password" 
          type={showPassword ? "text" : "password"} 
          placeholder="••••••••" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Lock className="w-5 h-5" />}
          required
        />
        <button 
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-[38px] text-gray-400 hover:text-gray-600"
        >
          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>

      {/* Password requirements hint */}
      <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-2">
         <div className="flex items-center"><CheckCircle className="w-3 h-3 mr-1 text-green-500" /> Min. 8 characters</div>
         <div className="flex items-center"><CheckCircle className="w-3 h-3 mr-1 text-gray-300" /> 1 Special character</div>
         <div className="flex items-center"><CheckCircle className="w-3 h-3 mr-1 text-gray-300" /> 1 Uppercase</div>
         <div className="flex items-center"><CheckCircle className="w-3 h-3 mr-1 text-gray-300" /> 1 Number</div>
      </div>

      <Button fullWidth isLoading={isLoading} type="submit" className="mt-4">
        Create Account <ArrowRight className="w-4 h-4 ml-2" />
      </Button>

      {renderSocialLogin()}

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <button 
            type="button" 
            onClick={() => toggleMode(AuthMode.LOGIN)}
            className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            Log in
          </button>
        </p>
      </div>
    </form>
  );

  const renderForgotPassword = () => (
    <div className="animate-in fade-in slide-in-from-left-4 duration-300">
      <button 
        onClick={() => toggleMode(AuthMode.LOGIN)}
        className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to log in
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
        <p className="text-gray-500">Don't worry! It happens. Please enter the email associated with your account.</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); setIsLoading(true); setTimeout(() => setIsLoading(false), 1500); }}>
        <Input 
          label="Email Address" 
          type="email" 
          placeholder="you@example.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          icon={<Mail className="w-5 h-5" />}
          required
        />
        
        <Button fullWidth isLoading={isLoading} type="submit" className="mt-4">
          Send Reset Code
        </Button>
      </form>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Side - Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 sm:p-12 lg:p-16 xl:p-24 overflow-y-auto">
        <div className="flex-1 max-w-md mx-auto w-full">
          <div className="cursor-pointer">
              <Logo />
          </div>
          
          <main className="mt-12">
            {authMode === AuthMode.LOGIN && renderLoginForm()}
            {authMode === AuthMode.SIGNUP && renderSignupForm()}
            {authMode === AuthMode.FORGOT_PASSWORD && renderForgotPassword()}
          </main>
        </div>
        
        <footer className="mt-auto pt-8 text-center sm:text-left">
          <p className="text-xs text-gray-400">
            © 2025 Miracle Trading Platform. All rights reserved.
          </p>
          <div className="flex gap-4 mt-2 text-xs text-gray-400 justify-center sm:justify-start">
             <a href="#" className="hover:text-gray-600">Privacy Policy</a>
             <a href="#" className="hover:text-gray-600">Terms of Service</a>
          </div>
        </footer>
      </div>

      {/* Right Side - Visual Area */}
      <VisualSidebar />
    </div>
  );
};

export default AuthPage;
