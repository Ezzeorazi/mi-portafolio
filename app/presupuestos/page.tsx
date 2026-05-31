'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  FiDownload,
  FiPlus,
  FiTrash2,
  FiFileText,
  FiRefreshCw,
  FiZap,
} from 'react-icons/fi';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ServiceItem {
  id: string;
  description: string;
  detail: string;
  quantity: number;
  unitPrice: number;
}

type Currency = 'USD' | 'ARS' | 'EUR';

interface BudgetData {
  quoteNumber: string;
  issueDate: string;
  validUntil: string;
  currency: Currency;
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  clientPhone: string;
  services: ServiceItem[];
  comments: string;
  paymentTerms: string;
  taxEnabled: boolean;
  taxRate: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MY_INFO = {
  name: 'Ezequiel Orazi',
  role: 'Desarrollador Web & Diseñador',
  email: 'ezequiel.orazi90@gmail.com',
  website: 'ezequiel-orazi.online',
  location: 'Playa del Carmen, México',
  linkedin: 'linkedin.com/in/ezequiel-orazi32',
};

const QUICK_SERVICES = [
  { name: 'Diseño Web Profesional', price: 800 },
  { name: 'Rediseño de Sitio Web', price: 600 },
  { name: 'Landing Page', price: 400 },
  { name: 'E-commerce / Tienda Online', price: 1200 },
  { name: 'Blog / CMS', price: 700 },
  { name: 'Mantenimiento Mensual', price: 150 },
  { name: 'Optimización SEO', price: 300 },
  { name: 'Consultoría (1h)', price: 80 },
];

const PASSWORD =
  (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_PRESUPUESTO_PASSWORD) ||
  'eze2024';

function generateQuoteNumber(): string {
  const now = new Date();
  const yy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const rand = String(Math.floor(Math.random() * 900) + 100);
  return `PRE-${yy}${mm}-${rand}`;
}

function getDefaultForm(): BudgetData {
  const today = new Date().toISOString().split('T')[0];
  const in30 = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];
  return {
    quoteNumber: generateQuoteNumber(),
    issueDate: today,
    validUntil: in30,
    currency: 'USD',
    clientName: '',
    clientCompany: '',
    clientEmail: '',
    clientPhone: '',
    services: [{ id: '1', description: '', detail: '', quantity: 1, unitPrice: 0 }],
    comments: '',
    paymentTerms: '50% al inicio del proyecto y 50% a la entrega final.',
    taxEnabled: false,
    taxRate: 21,
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  if (!dateStr) return '—';
  const [year, month, day] = dateStr.split('-');
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
  ];
  return `${Number(day)} de ${months[Number(month) - 1]} de ${year}`;
}

function formatMoney(amount: number, currency: Currency): string {
  const symbols: Record<Currency, string> = { USD: 'USD $', ARS: 'ARS $', EUR: '€' };
  return `${symbols[currency]} ${amount.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// ─── UI Atoms ─────────────────────────────────────────────────────────────────

function InputField({
  label, value, onChange, type = 'text', placeholder = '',
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] text-[#414851] mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#0f1215] border border-[#2a2f36] rounded-lg px-3 py-2 text-xs text-[#f0eeed] placeholder-[#414851] focus:outline-none focus:border-[#f5d805] transition-colors"
      />
    </div>
  );
}

function SelectField({
  label, value, onChange, options,
}: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <div>
      <label className="block text-[10px] text-[#414851] mb-1">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-[#0f1215] border border-[#2a2f36] rounded-lg px-3 py-2 text-xs text-[#f0eeed] focus:outline-none focus:border-[#f5d805] transition-colors"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#161a1e] rounded-xl p-5 border border-[#2a2f36]">
      <h2 className="text-[9px] font-bold text-[#f5d805] uppercase tracking-[3px] mb-4">{title}</h2>
      {children}
    </div>
  );
}

// ─── PDF Template ─────────────────────────────────────────────────────────────

interface PDFTemplateProps {
  data: BudgetData;
  subtotal: number;
  tax: number;
  total: number;
}

function PDFTemplate({ data, subtotal, tax, total }: PDFTemplateProps) {
  const fc = (n: number) => formatMoney(n, data.currency);
  const fd = (s: string) => formatDate(s);

  return (
    <div
      style={{
        width: '794px',
        background: '#ffffff',
        fontFamily: 'Montserrat, sans-serif',
        color: '#1a1a1a',
        boxSizing: 'border-box',
      }}
    >
      {/* ── HEADER ── */}
      <div style={{ background: '#161a1e', padding: '36px 52px', position: 'relative' }}>
        {/* Rainbow top bar */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '5px',
            background: 'linear-gradient(90deg, #f5d805 0%, #fd02d1 100%)',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div
              style={{
                fontSize: '10px',
                fontWeight: '800',
                color: '#f5d805',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              Presupuesto
            </div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#f0eeed', lineHeight: 1 }}>
              Ezequiel Orazi
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '7px' }}>
              Desarrollador Web &amp; Diseñador
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontSize: '22px',
                fontWeight: '800',
                color: '#f5d805',
                marginBottom: '10px',
                letterSpacing: '-0.5px',
              }}
            >
              {data.quoteNumber}
            </div>
            <div style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>
              Fecha de emisión:{' '}
              <span style={{ color: '#e5e7eb', fontWeight: 600 }}>{fd(data.issueDate)}</span>
            </div>
            <div style={{ fontSize: '11px', color: '#9ca3af' }}>
              Válido hasta:{' '}
              <span style={{ color: '#e5e7eb', fontWeight: 600 }}>{fd(data.validUntil)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTACT INFO ── */}
      <div
        style={{
          display: 'flex',
          background: '#f9fafb',
          borderBottom: '1px solid #e5e7eb',
        }}
      >
        {/* FROM */}
        <div
          style={{
            flex: 1,
            padding: '24px 52px',
            borderRight: '1px solid #e5e7eb',
          }}
        >
          <div
            style={{
              fontSize: '8px',
              fontWeight: '800',
              color: '#f5d805',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            De
          </div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
            {MY_INFO.name}
          </div>
          <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '3px' }}>{MY_INFO.role}</div>
          <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '3px' }}>{MY_INFO.website}</div>
          <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '3px' }}>{MY_INFO.email}</div>
          <div style={{ fontSize: '11px', color: '#6b7280' }}>{MY_INFO.location}</div>
        </div>

        {/* TO */}
        <div style={{ flex: 1, padding: '24px 52px' }}>
          <div
            style={{
              fontSize: '8px',
              fontWeight: '800',
              color: '#f5d805',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            Para
          </div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#111827', marginBottom: '4px' }}>
            {data.clientName || '—'}
          </div>
          {data.clientCompany && (
            <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '3px' }}>
              {data.clientCompany}
            </div>
          )}
          {data.clientEmail && (
            <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '3px' }}>
              {data.clientEmail}
            </div>
          )}
          {data.clientPhone && (
            <div style={{ fontSize: '11px', color: '#6b7280' }}>{data.clientPhone}</div>
          )}
        </div>
      </div>

      {/* ── SERVICES TABLE ── */}
      <div style={{ padding: '28px 52px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{ width: '44%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '23%' }} />
            <col style={{ width: '23%' }} />
          </colgroup>
          <thead>
            <tr>
              {(['Descripción', 'Cant.', 'Precio Unit.', 'Total'] as const).map((h, i) => (
                <th
                  key={h}
                  style={{
                    background: '#161a1e',
                    padding: '11px 14px',
                    textAlign: i === 0 ? 'left' : i === 1 ? 'center' : 'right',
                    fontSize: '8px',
                    fontWeight: '800',
                    color: '#f5d805',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    borderRadius: i === 0 ? '6px 0 0 6px' : i === 3 ? '0 6px 6px 0' : 0,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.services.map((svc, idx) => (
              <tr key={svc.id} style={{ background: idx % 2 === 0 ? '#ffffff' : '#f9fafb' }}>
                <td
                  style={{
                    padding: '13px 14px',
                    borderBottom: '1px solid #f3f4f6',
                    verticalAlign: 'top',
                  }}
                >
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#111827' }}>
                    {svc.description || '—'}
                  </div>
                  {svc.detail && (
                    <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '2px' }}>
                      {svc.detail}
                    </div>
                  )}
                </td>
                <td
                  style={{
                    padding: '13px 14px',
                    textAlign: 'center',
                    fontSize: '12px',
                    color: '#4b5563',
                    borderBottom: '1px solid #f3f4f6',
                  }}
                >
                  {svc.quantity}
                </td>
                <td
                  style={{
                    padding: '13px 14px',
                    textAlign: 'right',
                    fontSize: '12px',
                    color: '#4b5563',
                    borderBottom: '1px solid #f3f4f6',
                  }}
                >
                  {fc(svc.unitPrice)}
                </td>
                <td
                  style={{
                    padding: '13px 14px',
                    textAlign: 'right',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#111827',
                    borderBottom: '1px solid #f3f4f6',
                  }}
                >
                  {fc(svc.quantity * svc.unitPrice)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTALS */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <div style={{ width: '270px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 0',
                fontSize: '12px',
                color: '#6b7280',
                borderBottom: '1px solid #f3f4f6',
              }}
            >
              <span>Subtotal</span>
              <span style={{ fontWeight: 600, color: '#374151' }}>{fc(subtotal)}</span>
            </div>
            {data.taxEnabled && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  fontSize: '12px',
                  color: '#6b7280',
                  borderBottom: '1px solid #f3f4f6',
                }}
              >
                <span>IVA ({data.taxRate}%)</span>
                <span style={{ fontWeight: 600, color: '#374151' }}>{fc(tax)}</span>
              </div>
            )}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '13px 18px',
                marginTop: '10px',
                background: '#161a1e',
                borderRadius: '8px',
              }}
            >
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: '800',
                  color: '#f5d805',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                }}
              >
                Total
              </span>
              <span style={{ fontSize: '14px', fontWeight: '800', color: '#f5d805' }}>
                {fc(total)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── WORK DESCRIPTION ── */}
      {data.comments && (
        <div style={{ padding: '0 52px 28px' }}>
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>
            <div
              style={{
                fontSize: '8px',
                fontWeight: '800',
                color: '#f5d805',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              Alcance del Trabajo
            </div>
            <div
              style={{
                fontSize: '12px',
                color: '#4b5563',
                lineHeight: '1.75',
                whiteSpace: 'pre-wrap',
              }}
            >
              {data.comments}
            </div>
          </div>
        </div>
      )}

      {/* ── PAYMENT TERMS ── */}
      {data.paymentTerms && (
        <div style={{ padding: '0 52px 28px' }}>
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
            <div
              style={{
                fontSize: '8px',
                fontWeight: '800',
                color: '#f5d805',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              Condiciones de Pago
            </div>
            <div style={{ fontSize: '12px', color: '#4b5563', lineHeight: '1.7' }}>
              {data.paymentTerms}
            </div>
          </div>
        </div>
      )}

      {/* ── SIGNATURE ── */}
      <div style={{ padding: '20px 52px 44px' }}>
        <div
          style={{
            borderTop: '2px solid #e5e7eb',
            paddingTop: '28px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '10px', color: '#9ca3af', marginBottom: '10px', letterSpacing: '1px' }}>
              Firma autorizada
            </div>
            <div
              style={{
                fontFamily: 'var(--font-dancing), "Dancing Script", cursive',
                fontSize: '42px',
                color: '#111827',
                lineHeight: 1.1,
                paddingBottom: '8px',
                borderBottom: '1.5px solid #d1d5db',
                paddingLeft: '12px',
                paddingRight: '12px',
                minWidth: '220px',
                display: 'inline-block',
              }}
            >
              Ezequiel Orazi
            </div>
            <div
              style={{
                fontSize: '11px',
                fontWeight: '700',
                color: '#374151',
                marginTop: '8px',
                letterSpacing: '0.3px',
              }}
            >
              {MY_INFO.name}
            </div>
            <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '3px' }}>
              {MY_INFO.role}
            </div>
            <div style={{ fontSize: '10px', color: '#b0b6bf', marginTop: '3px' }}>
              {fd(data.issueDate)}
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div
        style={{
          background: '#161a1e',
          padding: '14px 52px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: '9px', color: '#6b7280' }}>
          {MY_INFO.website} · {MY_INFO.email}
        </div>
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          <div
            style={{ width: '7px', height: '7px', background: '#f5d805', borderRadius: '50%' }}
          />
          <div
            style={{ width: '7px', height: '7px', background: '#fd02d1', borderRadius: '50%' }}
          />
        </div>
        <div style={{ fontSize: '9px', color: '#6b7280' }}>
          {data.quoteNumber} · {MY_INFO.linkedin}
        </div>
      </div>
    </div>
  );
}

// ─── Password Gate ────────────────────────────────────────────────────────────

function PasswordGate({ onAuth }: { onAuth: () => void }) {
  const [pwd, setPwd] = useState('');
  const [err, setErr] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd === PASSWORD) {
      sessionStorage.setItem('presupuesto_auth', '1');
      onAuth();
    } else {
      setErr(true);
      setPwd('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-[#161a1e] border border-[#2a2f36] rounded-2xl p-10 w-full max-w-sm shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #f5d805, #fd02d1)' }}>
            <FiFileText className="text-white text-xl" />
          </div>
          <h1 className="text-lg font-bold text-[#f0eeed]">Panel de Presupuestos</h1>
          <p className="text-[11px] text-[#414851] mt-1">Acceso privado · Ezequiel Orazi</p>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="password"
            value={pwd}
            onChange={e => { setPwd(e.target.value); setErr(false); }}
            placeholder="Contraseña"
            autoFocus
            className={`w-full bg-[#0f1215] border rounded-xl px-4 py-3 text-sm text-[#f0eeed] placeholder-[#414851] focus:outline-none transition-colors ${
              err ? 'border-red-500' : 'border-[#2a2f36] focus:border-[#f5d805]'
            }`}
          />
          {err && <p className="text-xs text-red-400">Contraseña incorrecta. Intentá de nuevo.</p>}
          <button
            type="submit"
            className="w-full font-bold rounded-xl py-3 text-sm transition-colors text-black"
            style={{ background: 'linear-gradient(90deg, #f5d805, #fbbf24)' }}
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PresupuestosPage() {
  const [authed, setAuthed] = useState(false);
  const [form, setForm] = useState<BudgetData>(getDefaultForm);
  const [generating, setGenerating] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem('presupuesto_auth') === '1') setAuthed(true);
  }, []);

  const subtotal = form.services.reduce((s, i) => s + i.quantity * i.unitPrice, 0);
  const tax = form.taxEnabled ? (subtotal * form.taxRate) / 100 : 0;
  const total = subtotal + tax;
  const fc = useCallback((n: number) => formatMoney(n, form.currency), [form.currency]);

  const set = useCallback(<K extends keyof BudgetData>(key: K, val: BudgetData[K]) => {
    setForm(f => ({ ...f, [key]: val }));
  }, []);

  const addService = () =>
    setForm(f => ({
      ...f,
      services: [
        ...f.services,
        { id: Date.now().toString(), description: '', detail: '', quantity: 1, unitPrice: 0 },
      ],
    }));

  const addQuick = (name: string, price: number) =>
    setForm(f => {
      const first = f.services[0];
      if (f.services.length === 1 && !first.description) {
        return { ...f, services: [{ ...first, description: name, unitPrice: price }] };
      }
      return {
        ...f,
        services: [
          ...f.services,
          { id: Date.now().toString(), description: name, detail: '', quantity: 1, unitPrice: price },
        ],
      };
    });

  const removeService = (id: string) =>
    setForm(f => ({
      ...f,
      services: f.services.length > 1 ? f.services.filter(s => s.id !== id) : f.services,
    }));

  const updateService = (id: string, field: keyof ServiceItem, value: string | number) =>
    setForm(f => ({
      ...f,
      services: f.services.map(s => (s.id === id ? { ...s, [field]: value } : s)),
    }));

  const generatePDF = async () => {
    if (!captureRef.current || generating) return;
    setGenerating(true);
    try {
      await document.fonts.ready;
      const { default: html2canvas } = await import('html2canvas');
      const { jsPDF } = await import('jspdf');

      const canvas = await html2canvas(captureRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: 794,
        windowWidth: 794,
      });

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const imgH = (canvas.height * pageW) / canvas.width;
      const pages = Math.ceil(imgH / pageH);

      for (let i = 0; i < pages; i++) {
        if (i > 0) pdf.addPage();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, -(i * pageH), pageW, imgH);
      }

      const slug = form.clientName ? `-${form.clientName.replace(/\s+/g, '-')}` : '';
      pdf.save(`${form.quoteNumber}${slug}.pdf`);
    } catch (e) {
      console.error('PDF error:', e);
    } finally {
      setGenerating(false);
    }
  };

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen text-[#f0eeed] flex flex-col">
      {/* ── TOP BAR ── */}
      <div className="sticky top-0 z-50 bg-[#0f1215]/95 backdrop-blur-sm border-b border-[#2a2f36] px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #f5d805, #fd02d1)' }}
          >
            <FiFileText className="text-white text-sm" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-[#f0eeed] leading-tight">Presupuestos</h1>
            <p className="text-[10px] text-[#414851] leading-tight">Panel privado · Ezequiel Orazi</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setForm(getDefaultForm())}
            className="flex items-center gap-1.5 px-3 py-2 text-[11px] border border-[#2a2f36] rounded-lg text-[#414851] hover:border-[#f5d805] hover:text-[#f5d805] transition-colors"
          >
            <FiRefreshCw size={11} />
            Nuevo
          </button>
          <button
            onClick={generatePDF}
            disabled={generating}
            className="flex items-center gap-2 px-5 py-2 text-[11px] font-bold rounded-lg text-black transition-all disabled:opacity-50 hover:scale-[1.02]"
            style={{ background: 'linear-gradient(90deg, #f5d805, #fbbf24)' }}
          >
            <FiDownload size={12} />
            {generating ? 'Generando PDF...' : 'Descargar PDF'}
          </button>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="flex flex-1 overflow-hidden">
        {/* ── LEFT: EDITOR ── */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 min-w-0">

          {/* Quote Info */}
          <Card title="Información del Presupuesto">
            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="N° de Presupuesto"
                value={form.quoteNumber}
                onChange={v => set('quoteNumber', v)}
              />
              <SelectField
                label="Moneda"
                value={form.currency}
                onChange={v => set('currency', v as Currency)}
                options={['USD', 'ARS', 'EUR']}
              />
              <InputField
                label="Fecha de emisión"
                type="date"
                value={form.issueDate}
                onChange={v => set('issueDate', v)}
              />
              <InputField
                label="Válido hasta"
                type="date"
                value={form.validUntil}
                onChange={v => set('validUntil', v)}
              />
            </div>
          </Card>

          {/* Client Info */}
          <Card title="Datos del Cliente">
            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="Nombre completo"
                value={form.clientName}
                onChange={v => set('clientName', v)}
                placeholder="Juan García"
              />
              <InputField
                label="Empresa (opcional)"
                value={form.clientCompany}
                onChange={v => set('clientCompany', v)}
                placeholder="Empresa S.A."
              />
              <InputField
                label="Email"
                type="email"
                value={form.clientEmail}
                onChange={v => set('clientEmail', v)}
                placeholder="juan@empresa.com"
              />
              <InputField
                label="Teléfono"
                value={form.clientPhone}
                onChange={v => set('clientPhone', v)}
                placeholder="+54 9 11 XXXX XXXX"
              />
            </div>
          </Card>

          {/* Services */}
          <Card title="Servicios">
            {/* Quick add chips */}
            <div className="mb-4">
              <p className="text-[9px] text-[#414851] mb-2 flex items-center gap-1 uppercase tracking-wider">
                <FiZap size={9} /> Agregar rápido
              </p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_SERVICES.map(qs => (
                  <button
                    key={qs.name}
                    onClick={() => addQuick(qs.name, qs.price)}
                    className="text-[10px] px-2.5 py-1 border border-[#2a2f36] rounded-full text-[#414851] hover:border-[#f5d805] hover:text-[#f5d805] transition-colors whitespace-nowrap"
                  >
                    {qs.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Column headers */}
            <div className="grid grid-cols-12 gap-2 px-1 mb-1">
              <div className="col-span-4 text-[9px] text-[#414851] uppercase tracking-wider">Descripción</div>
              <div className="col-span-3 text-[9px] text-[#414851] uppercase tracking-wider">Detalle</div>
              <div className="col-span-2 text-[9px] text-[#414851] text-center uppercase tracking-wider">Cant.</div>
              <div className="col-span-2 text-[9px] text-[#414851] text-right uppercase tracking-wider">Precio</div>
              <div className="col-span-1" />
            </div>

            {/* Service rows */}
            <div className="space-y-2">
              {form.services.map(svc => (
                <div key={svc.id} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-4">
                    <input
                      value={svc.description}
                      onChange={e => updateService(svc.id, 'description', e.target.value)}
                      placeholder="Nombre del servicio"
                      className="w-full bg-[#0f1215] border border-[#2a2f36] rounded-lg px-3 py-2 text-xs text-[#f0eeed] placeholder-[#414851] focus:outline-none focus:border-[#f5d805] transition-colors"
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      value={svc.detail}
                      onChange={e => updateService(svc.id, 'detail', e.target.value)}
                      placeholder="Opcional"
                      className="w-full bg-[#0f1215] border border-[#2a2f36] rounded-lg px-3 py-2 text-xs text-[#f0eeed] placeholder-[#414851] focus:outline-none focus:border-[#f5d805] transition-colors"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      min={1}
                      value={svc.quantity}
                      onChange={e => updateService(svc.id, 'quantity', Number(e.target.value))}
                      className="w-full bg-[#0f1215] border border-[#2a2f36] rounded-lg px-2 py-2 text-xs text-[#f0eeed] text-center focus:outline-none focus:border-[#f5d805] transition-colors"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      min={0}
                      step={0.01}
                      value={svc.unitPrice}
                      onChange={e => updateService(svc.id, 'unitPrice', Number(e.target.value))}
                      className="w-full bg-[#0f1215] border border-[#2a2f36] rounded-lg px-2 py-2 text-xs text-[#f0eeed] text-right focus:outline-none focus:border-[#f5d805] transition-colors"
                    />
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <button
                      onClick={() => removeService(svc.id)}
                      disabled={form.services.length === 1}
                      className="text-[#414851] hover:text-red-400 transition-colors disabled:opacity-20 p-1"
                    >
                      <FiTrash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addService}
              className="flex items-center gap-1 text-[10px] text-[#414851] hover:text-[#f5d805] transition-colors mt-3"
            >
              <FiPlus size={11} />
              Agregar servicio
            </button>

            {/* Totals summary */}
            <div className="mt-5 pt-4 border-t border-[#2a2f36]">
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="checkbox"
                  id="tax"
                  checked={form.taxEnabled}
                  onChange={e => set('taxEnabled', e.target.checked)}
                  className="accent-[#f5d805] w-3.5 h-3.5 cursor-pointer"
                />
                <label htmlFor="tax" className="text-xs text-[#414851] cursor-pointer">
                  Aplicar IVA
                </label>
                {form.taxEnabled && (
                  <>
                    <input
                      type="number"
                      value={form.taxRate}
                      onChange={e => set('taxRate', Number(e.target.value))}
                      className="w-14 bg-[#0f1215] border border-[#2a2f36] rounded px-2 py-1 text-xs text-[#f0eeed] text-center focus:outline-none focus:border-[#f5d805]"
                    />
                    <span className="text-xs text-[#414851]">%</span>
                  </>
                )}
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-[#414851]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#f0eeed]">{fc(subtotal)}</span>
                </div>
                {form.taxEnabled && (
                  <div className="flex justify-between text-xs text-[#414851]">
                    <span>IVA ({form.taxRate}%)</span>
                    <span className="font-medium text-[#f0eeed]">{fc(tax)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-[#f5d805] pt-2 border-t border-[#2a2f36]">
                  <span>TOTAL</span>
                  <span>{fc(total)}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Work Description */}
          <Card title="Alcance del Trabajo">
            <textarea
              value={form.comments}
              onChange={e => set('comments', e.target.value)}
              placeholder="Describí el trabajo: entregables, etapas, revisiones incluidas, qué queda fuera del alcance, plazos estimados, etc."
              rows={7}
              className="w-full bg-[#0f1215] border border-[#2a2f36] rounded-xl px-4 py-3 text-xs text-[#f0eeed] placeholder-[#414851] focus:outline-none focus:border-[#f5d805] transition-colors resize-none leading-relaxed"
            />
          </Card>

          {/* Payment Terms */}
          <Card title="Condiciones de Pago">
            <textarea
              value={form.paymentTerms}
              onChange={e => set('paymentTerms', e.target.value)}
              rows={3}
              className="w-full bg-[#0f1215] border border-[#2a2f36] rounded-xl px-4 py-3 text-xs text-[#f0eeed] focus:outline-none focus:border-[#f5d805] transition-colors resize-none"
            />
          </Card>

          {/* Bottom spacer */}
          <div className="h-4" />
        </div>

        {/* ── RIGHT: PREVIEW ── */}
        <div className="hidden xl:flex xl:flex-col border-l border-[#2a2f36] bg-[#0a0d10]"
          style={{ width: '620px', flexShrink: 0 }}>
          <div className="px-4 py-3 border-b border-[#2a2f36] flex items-center gap-2 flex-shrink-0">
            <FiFileText className="text-[#f5d805] text-sm" />
            <span className="text-xs font-medium text-[#f0eeed]">Vista previa del PDF</span>
            <span className="ml-auto text-[10px] text-[#414851]">A4 · 74%</span>
          </div>
          <div className="flex-1 overflow-y-auto bg-[#1a1d21] p-5">
            {/* zoom scales layout properly, unlike transform */}
            <div style={{ zoom: 0.74, width: '794px' }}>
              <PDFTemplate data={form} subtotal={subtotal} tax={tax} total={total} />
            </div>
          </div>
        </div>
      </div>

      {/* ── HIDDEN CAPTURE TARGET ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          left: '-9999px',
          top: 0,
          zIndex: -1,
          pointerEvents: 'none',
        }}
      >
        <div ref={captureRef}>
          <PDFTemplate data={form} subtotal={subtotal} tax={tax} total={total} />
        </div>
      </div>
    </div>
  );
}
