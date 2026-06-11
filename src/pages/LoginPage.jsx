import { useState } from 'react';
import { store, systemUsers } from '@/data/dummy';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function LoginPage({ onLogin }) {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [status,   setStatus]   = useState('idle'); // idle | loading | error

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    setStatus('loading');
    setTimeout(() => {
      const ok = systemUsers.some(
        u => u.email.toLowerCase() === email.trim().toLowerCase() && password === 'demo'
      );
      if (ok) onLogin();
      else setStatus('error');
    }, 1500);
  };

  const fillAccount = (u) => {
    setEmail(u.email);
    setPassword('demo');
    setStatus('idle');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-wiki-bg-page p-6">
      <div className="w-full max-w-[440px] border border-wiki-border bg-white">

        {/* Brand header */}
        <div className="bg-wiki-navy px-[22px] pt-[18px] pb-4">
          <div className="text-[1.35em] font-bold tracking-[0.01em] text-white">RetailOS</div>
          <div className="mt-[3px] text-[0.8em] text-wiki-navy-accent">Point of Sale · {store.name}</div>
        </div>

        {/* Form */}
        <form className="border-b border-wiki-border-light px-[22px] pt-5 pb-[18px]" onSubmit={handleSubmit}>
          <div className="mb-4 font-serif text-[1em] font-semibold text-wiki-navy">Sign in to your account</div>

          {status === 'error' && (
            <div className="mb-3.5 border border-[#e05a40] border-l-[3px] border-l-status-critical-strong bg-[#fff8f8] px-[11px] py-2 text-[0.84em] text-status-critical-strong">
              Invalid email or password. Try one of the demo accounts below.
            </div>
          )}

          <div className="mb-[13px]">
            <label htmlFor="l-email" className="mb-1 block text-[0.84em] font-semibold text-wiki-text-dark">
              Email address
            </label>
            <Input
              id="l-email"
              type="text"
              value={email}
              onChange={e => { setEmail(e.target.value); setStatus('idle'); }}
              placeholder="you@retailos.com"
              autoComplete="username"
              disabled={status === 'loading'}
              spellCheck={false}
              className="h-auto rounded-none border-wiki-border px-2.5 py-2 text-[0.9em] shadow-none focus-visible:border-wiki-blue focus-visible:ring-wiki-blue/15 disabled:bg-wiki-bg-page disabled:text-wiki-text-muted"
            />
          </div>

          <div className="mb-[13px]">
            <label htmlFor="l-password" className="mb-1 block text-[0.84em] font-semibold text-wiki-text-dark">
              Password
            </label>
            <Input
              id="l-password"
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setStatus('idle'); }}
              placeholder="Password"
              autoComplete="current-password"
              disabled={status === 'loading'}
              className="h-auto rounded-none border-wiki-border px-2.5 py-2 text-[0.9em] shadow-none focus-visible:border-wiki-blue focus-visible:ring-wiki-blue/15 disabled:bg-wiki-bg-page disabled:text-wiki-text-muted"
            />
          </div>

          <Button
            type="submit"
            disabled={status === 'loading' || !email || !password}
            className={cn(
              'mt-1.5 h-auto w-full gap-2 rounded-none px-3.5 py-[9px] text-[0.92em] font-semibold tracking-[0.01em]',
              'bg-wiki-blue text-white hover:bg-wiki-blue-hover disabled:bg-[#8aaee0] disabled:opacity-100'
            )}
          >
            {status === 'loading'
              ? <><span className="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Signing in…</>
              : 'Sign in'}
          </Button>
        </form>

        {/* Demo accounts hint */}
        <div className="border-b border-wiki-border-light px-[22px] pt-[13px] pb-3.5 text-[0.8em]">
          <div className="mb-2 text-wiki-text-secondary">
            Demo accounts — click any row to fill, password is{' '}
            <code className="border border-wiki-border-light bg-wiki-bg-page px-1 text-[0.95em] text-wiki-navy">demo</code>
          </div>
          <table className="w-full border-collapse border border-wiki-border-light text-[0.93em]">
            <thead>
              <tr>
                <th className="border-b border-wiki-border-light bg-wiki-header-bg px-[9px] py-[5px] text-left font-semibold text-wiki-text-dark">Name</th>
                <th className="border-b border-wiki-border-light bg-wiki-header-bg px-[9px] py-[5px] text-left font-semibold text-wiki-text-dark">Role</th>
                <th className="border-b border-wiki-border-light bg-wiki-header-bg px-[9px] py-[5px] text-left font-semibold text-wiki-text-dark">Email</th>
              </tr>
            </thead>
            <tbody>
              {systemUsers.filter(u => u.status === 'Active').map(u => (
                <tr
                  key={u.id}
                  onClick={() => fillAccount(u)}
                  className={cn(
                    'cursor-pointer [&>td]:border-b [&>td]:border-[#f0f2f4] last:[&>td]:border-b-0',
                    email === u.email
                      ? '[&>td]:bg-[#eef3fb] [&>td]:font-semibold [&>td]:text-wiki-navy'
                      : 'hover:[&>td]:bg-wiki-bg-hover'
                  )}
                >
                  <td className="px-[9px] py-[5px] text-wiki-text-dark">{u.name}</td>
                  <td className="px-[9px] py-[5px] text-wiki-text-dark">{u.role}</td>
                  <td className="px-[9px] py-[5px] text-wiki-text-dark">{u.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-[22px] py-[9px] text-center text-[0.75em] tracking-[0.01em] text-wiki-text-faint">
          {store.address} &nbsp;·&nbsp; {store.phone} &nbsp;·&nbsp; Tax ID: {store.taxId}
        </div>
      </div>
    </div>
  );
}
