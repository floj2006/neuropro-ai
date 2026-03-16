import GlowButton from './glow-button';

interface TopBarProps {
  name: string;
  isAuthenticated: boolean;
  onProfileClick?: () => void;
  onAuthClick?: () => void;
}

export default function TopBar({ name, isAuthenticated, onProfileClick, onAuthClick }: TopBarProps) {
  return (
    <header className="flex items-center justify-between gap-3">
      <div>
        <p className="text-lg font-semibold">
          Neuro<span className="text-neon">Pro</span>
        </p>
        <p className="text-xs text-muted">В потоке: Весна 2026</p>
      </div>
      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted">
            {name}
          </div>
        ) : null}
        <GlowButton variant="ghost" onClick={onProfileClick}>
          Профиль
        </GlowButton>
        <GlowButton onClick={onAuthClick}>{isAuthenticated ? 'Аккаунт' : 'Войти'}</GlowButton>
      </div>
    </header>
  );
}
