'use client';

interface BurgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function BurgerButton({ isOpen, onClick }: BurgerButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Toggle menu"
      className="flex flex-col justify-center items-center w-8 h-8 gap-[5px] z-[1100] md:hidden"
    >
      <span
        className={`block w-7 h-[3px] bg-yellow transition-all duration-300 ${
          isOpen ? 'rotate-45 translate-y-2' : ''
        }`}
      />
      <span
        className={`block w-7 h-[3px] bg-yellow transition-all duration-300 ${
          isOpen ? 'opacity-0' : ''
        }`}
      />
      <span
        className={`block w-7 h-[3px] bg-yellow transition-all duration-300 ${
          isOpen ? '-rotate-45 -translate-y-2' : ''
        }`}
      />
    </button>
  );
}
