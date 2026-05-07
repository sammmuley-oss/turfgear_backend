import { X, CheckCircle, AlertTriangle, XCircle, Info, Wifi, Package, CreditCard } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import { NotificationType } from '../types';

const typeConfig: Record<NotificationType, { icon: typeof Info; accent: string; glow: string }> = {
  [NotificationType.SUCCESS]:         { icon: CheckCircle,   accent: '#22c55e', glow: 'rgba(34,197,94,0.15)' },
  [NotificationType.WARNING]:         { icon: AlertTriangle, accent: '#f59e0b', glow: 'rgba(245,158,11,0.15)' },
  [NotificationType.ERROR]:           { icon: XCircle,       accent: '#ef4444', glow: 'rgba(239,68,68,0.15)' },
  [NotificationType.INFO]:            { icon: Info,          accent: '#22d3ee', glow: 'rgba(34,211,238,0.15)' },
  [NotificationType.MACHINE_OFFLINE]: { icon: Wifi,          accent: '#ef4444', glow: 'rgba(239,68,68,0.15)' },
  [NotificationType.LOW_STOCK]:       { icon: Package,       accent: '#f59e0b', glow: 'rgba(245,158,11,0.15)' },
  [NotificationType.PAYMENT]:         { icon: CreditCard,    accent: '#22c55e', glow: 'rgba(34,197,94,0.15)' },
};

export function NotificationToasts() {
  const { notifications, removeNotification } = useNotifications();

  if (notifications.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '72px',
      right: '16px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      width: '320px',
      maxHeight: 'calc(100vh - 90px)',
      pointerEvents: 'none',
    }}>
      {notifications.map((n) => {
        const cfg = typeConfig[n.type] || typeConfig[NotificationType.INFO];
        const Icon = cfg.icon;

        return (
          <div
            key={n.id}
            style={{
              pointerEvents: 'auto',
              background: 'linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(10,15,30,0.98) 100%)',
              border: `1px solid ${cfg.accent}33`,
              borderLeft: `3px solid ${cfg.accent}`,
              borderRadius: '12px',
              padding: '14px 16px',
              backdropFilter: 'blur(20px)',
              boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 20px ${cfg.glow}`,
              animation: 'toast-slide-in 0.35s cubic-bezier(0.16,1,0.3,1)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Progress bar for auto-dismiss */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '2px',
              background: `linear-gradient(90deg, ${cfg.accent}, ${cfg.accent}88)`,
              animation: 'toast-progress 4s linear forwards',
              borderRadius: '0 0 0 12px',
            }} />

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: cfg.glow,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon size={14} color={cfg.accent} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  margin: 0,
                  fontSize: '12px',
                  fontWeight: 700,
                  color: cfg.accent,
                  lineHeight: 1.3,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>{n.title}</p>
                <p style={{
                  margin: '3px 0 0',
                  fontSize: '11px',
                  color: 'rgb(148,163,184)',
                  lineHeight: 1.4,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                }}>{n.message}</p>
              </div>

              <button
                onClick={() => removeNotification(n.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '4px',
                  cursor: 'pointer',
                  color: 'rgb(100,116,139)',
                  flexShrink: 0,
                  borderRadius: '6px',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = 'rgb(100,116,139)';
                  e.currentTarget.style.background = 'none';
                }}
              >
                <X size={13} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
