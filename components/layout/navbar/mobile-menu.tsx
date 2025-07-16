"use client";

import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, Suspense, useEffect, useState } from "react";

import {
  Bars3Icon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Menu } from "lib/shopify/types";
import Search, { SearchSkeleton } from "./search";

// Iconos para el menú móvil
function OrdersIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
      />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );
}

function TagIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
      />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
      />
    </svg>
  );
}

interface MobileMenuSection {
  title: string;
  icon: React.ReactNode;
  items: { name: string; href: string }[];
}

export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  const menuSections: MobileMenuSection[] = [
    {
      title: "Categorías",
      icon: <GridIcon className="w-5 h-5" />,
      items: [
        { name: "Hombre", href: "/search?category=hombre" },
        { name: "Mujer", href: "/search?category=mujer" },
        { name: "Niños", href: "/search?category=ninos" },
        { name: "Deportes", href: "/search?category=deportes" },
        { name: "Casual", href: "/search?category=casual" },
        { name: "Formal", href: "/search?category=formal" },
      ],
    },
    {
      title: "Marcas",
      icon: <TagIcon className="w-5 h-5" />,
      items: [
        { name: "Nike", href: "/search?brands=nike" },
        { name: "Adidas", href: "/search?brands=adidas" },
        { name: "Puma", href: "/search?brands=puma" },
        { name: "Reebok", href: "/search?brands=reebok" },
        { name: "Converse", href: "/search?brands=converse" },
        { name: "Vans", href: "/search?brands=vans" },
      ],
    },
    {
      title: "Ofertas",
      icon: <TagIcon className="w-5 h-5 text-red-600" />,
      items: [
        { name: "Ofertas del Día", href: "/search?filter=ofertas-del-dia" },
        { name: "Descuentos hasta 50%", href: "/search?filter=descuentos-50" },
        { name: "Liquidación", href: "/search?filter=liquidacion" },
        { name: "Nuevos Productos", href: "/search?filter=nuevos" },
        { name: "Más Vendidos", href: "/search?filter=mas-vendidos" },
      ],
    },
  ];

  const quickActions = [
    {
      name: "Mis Pedidos",
      href: "/mis-pedidos",
      icon: <OrdersIcon className="w-5 h-5" />,
    },
    {
      name: "Lista de Deseos",
      href: "/wishlist",
      icon: <HeartIcon className="w-5 h-5" />,
    },
    {
      name: "Mi Cuenta",
      href: "/profile",
      icon: <UserIcon className="w-5 h-5" />,
    },
  ];

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors md:hidden"
      >
        <Bars3Icon className="h-4" />
      </button>

      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white pb-6 overflow-y-auto">
              <div className="p-4">
                <button
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors"
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  <XMarkIcon className="h-6" />
                </button>

                {/* Buscador */}
                <div className="mb-6 w-full">
                  <Suspense fallback={<SearchSkeleton />}>
                    <Search />
                  </Suspense>
                </div>

                {/* Acciones rápidas */}
                <div className="mb-6">
                  <h3 className="mb-3 text-sm font-medium text-neutral-500 uppercase tracking-wide">
                    Acciones Rápidas
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {quickActions.map((action) => (
                      <Link
                        key={action.name}
                        href={action.href}
                        onClick={closeMobileMenu}
                        className="flex items-center gap-3 py-3 px-4 text-black transition-colors hover:bg-neutral-100 rounded-md"
                      >
                        {action.icon}
                        <span className="text-base">{action.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Secciones del menú */}
                <div className="mb-6">
                  <h3 className="mb-3 text-sm font-medium text-neutral-500 uppercase tracking-wide">
                    Navegar
                  </h3>
                  <div className="space-y-2">
                    {menuSections.map((section) => (
                      <div key={section.title}>
                        <button
                          onClick={() =>
                            setActiveSection(
                              activeSection === section.title
                                ? null
                                : section.title
                            )
                          }
                          className="flex items-center justify-between w-full py-3 px-4 text-black transition-colors hover:bg-neutral-100 rounded-md"
                        >
                          <div className="flex items-center gap-3">
                            {section.icon}
                            <span className="text-base font-medium">
                              {section.title}
                            </span>
                          </div>
                          <ChevronRightIcon
                            className={`w-4 h-4 transition-transform ${
                              activeSection === section.title ? "rotate-90" : ""
                            }`}
                          />
                        </button>

                        {activeSection === section.title && (
                          <div className="ml-8 mt-2 space-y-1">
                            {section.items.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={closeMobileMenu}
                                className="block py-2 px-4 text-neutral-700 hover:text-black hover:bg-neutral-50 rounded-md"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Menú original */}
                {menu.length ? (
                  <div className="mb-6">
                    <h3 className="mb-3 text-sm font-medium text-neutral-500 uppercase tracking-wide">
                      Páginas
                    </h3>
                    <ul className="space-y-2">
                      {menu.map((item: Menu) => (
                        <li key={item.title}>
                          <Link
                            href={item.path}
                            prefetch={true}
                            onClick={closeMobileMenu}
                            className="block py-3 px-4 text-base text-black transition-colors hover:bg-neutral-100 rounded-md"
                          >
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {/* Links de inicio */}
                <div className="border-t border-neutral-200 pt-4">
                  <div className="space-y-2">
                    <Link
                      href="/"
                      onClick={closeMobileMenu}
                      className="block py-3 px-4 text-base text-black transition-colors hover:bg-neutral-100 rounded-md"
                    >
                      Inicio
                    </Link>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
