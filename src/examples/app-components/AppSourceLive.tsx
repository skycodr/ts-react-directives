import { FC, Suspense } from 'react';
import { AppSourceLiveProps } from './types';

const AppSourceLive: FC<AppSourceLiveProps> = ({ component: Component }) => (
  <section id="live" className="mb-6">
    <div className="mb-2 flex items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-emerald-500" />
      <h2 className="text-sm font-semibold text-slate-800">Live render</h2>
    </div>
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <Suspense fallback={<p className="text-sm text-slate-500">Loading example...</p>}>
        <Component />
      </Suspense>
    </div>
  </section>
);

export default AppSourceLive;
