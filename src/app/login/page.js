'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button, Input, Card, Alert } from '@/app/components/ui';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');

    try {
      if (isLogin) {
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        if (result?.error) {
          setError('Invalid email or password');
        } else {
          router.push('/');
          router.refresh();
        }
      } else {
        const res = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, name }),
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || 'Registration failed');
        } else {
          const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
          });

          if (!result?.error) {
            router.push('/');
            router.refresh();
          }
        }
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5FA] flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-[20px] font-bold text-[#142A4E]">
            មន្ទីរពហុព្យាបាល សុខ លាភ មេត្រី
          </h1>
          <p className="text-[#5E6366] mt-1 text-[14px]">SOK LEAP METREY POLYCLINIC</p>
        </div>

        <h2 className="text-[18px] font-semibold text-center mb-6 text-[#050505]">
          {isLogin ? 'Sign In' : 'Create Account'}
        </h2>

        {error && (
          <Alert variant="error" className="mb-4">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <Input
              label="Full Name"
              name="name"
              required={!isLogin}
              placeholder="Enter your full name"
            />
          )}

          <Input
            label="Email"
            name="email"
            type="email"
            required
            placeholder="Enter your email"
          />

          <Input
            label="Password"
            name="password"
            type="password"
            required
            placeholder="Enter your password"
          />

          <Button
            type="submit"
            loading={loading}
            className="w-full"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <p className="text-center mt-6 text-[#5E6366] text-[14px]">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
            }}
            className="text-[#142A4E] hover:underline font-semibold"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </Card>
    </div>
  );
}
