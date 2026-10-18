'use client';
import { usePathname } from 'next/navigation';
import { sendGAEvent } from '@next/third-parties/google';
import { FaWhatsapp, FaCalendarAlt } from 'react-icons/fa';
import { useTranslation } from '@/hooks/useTranslation';
import { CALENDLY_URL, WHATSAPP_URL } from '@/lib/links';

// Rutas donde la barra estorba: herramientas internas a pantalla completa.
const HIDDEN_ON = ['/presupuestos'];

// Barra fija inferior solo en mobile: WhatsApp y agendar siempre a un toque.
export default function MobileCtaBar() {
  const pathname = usePathname();
  const { t } = useTranslation();

  if (HIDDEN_ON.some((p) => pathname?.startsWith(p))) return null;

  const whatsappHref = `${WHATSAPP_URL}?text=${encodeURIComponent(t('cta_bar_whatsapp_msg'))}`;

  return (
    <div
      className="md:hidden fixed inset-x-0 bottom-0 z-40 bg-dark/95 backdrop-blur border-t border-yellow/15 px-3 pt-2"
      style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
    >
      <div className="grid grid-cols-2 gap-2">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sendGAEvent('event', 'cta_click', { cta: 'whatsapp', location: 'mobile_bar', page: pathname })}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] text-dark font-bold text-sm py-3"
        >
          <FaWhatsapp className="text-lg" aria-hidden />
          {t('cta_bar_whatsapp')}
        </a>
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sendGAEvent('event', 'cta_click', { cta: 'calendly', location: 'mobile_bar', page: pathname })}
          className="flex items-center justify-center gap-2 rounded-lg bg-yellow text-dark font-bold text-sm py-3"
        >
          <FaCalendarAlt aria-hidden />
          {t('cta_bar_meeting')}
        </a>
      </div>
    </div>
  );
}
