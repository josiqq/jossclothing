import CartModal from 'components/cart/modal';
import LogoIcon from 'components/icons/logo-icon';
import { getMenu } from 'lib/shopify';
import { Menu } from 'lib/shopify/types';
import Link from 'next/link';
import { Suspense } from 'react';
import MobileMenu from './mobile-menu';
import Search, { SearchSkeleton } from './search';

// Iconos para las nuevas características
function OrdersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  );
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

function TagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
    </svg>
  );
}

// Componente para el menú desplegable de marcas
function BrandsDropdown() {
  const brands = [
    { name: 'Nike', slug: 'nike' },
    { name: 'Adidas', slug: 'adidas' },
    { name: 'Puma', slug: 'puma' },
    { name: 'Reebok', slug: 'reebok' },
    { name: 'Converse', slug: 'converse' },
    { name: 'Vans', slug: 'vans' }
  ];

  return (
    <div className="relative group">
      <button className="flex items-center gap-1 text-neutral-500 underline-offset-4 hover:text-black hover:underline">
        Marcas
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-neutral-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-2">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/search?brands=${brand.slug}`}
              className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 hover:text-black"
            >
              {brand.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// Componente para categorías destacadas
function CategoriesDropdown() {
  const categories = [
    { name: 'Hombre', slug: 'hombre' },
    { name: 'Mujer', slug: 'mujer' },
    { name: 'Niños', slug: 'ninos' },
    { name: 'Deportes', slug: 'deportes' },
    { name: 'Casual', slug: 'casual' },
    { name: 'Formal', slug: 'formal' }
  ];

  return (
    <div className="relative group">
      <button className="flex items-center gap-1 text-neutral-500 underline-offset-4 hover:text-black hover:underline">
        Categorías
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-neutral-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/search?category=${category.slug}`}
              className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 hover:text-black"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// Componente para ofertas especiales
function OffersDropdown() {
  const offers = [
    { name: 'Ofertas del Día', slug: 'ofertas-del-dia' },
    { name: 'Descuentos hasta 50%', slug: 'descuentos-50' },
    { name: 'Liquidación', slug: 'liquidacion' },
    { name: 'Nuevos Productos', slug: 'nuevos' },
    { name: 'Más Vendidos', slug: 'mas-vendidos' }
  ];

  return (
    <div className="relative group">
      <button className="flex items-center gap-1 text-red-600 underline-offset-4 hover:text-red-700 hover:underline font-medium">
        <TagIcon className="w-4 h-4" />
        Ofertas
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="absolute top-full left-0 mt-2 w-52 bg-white border border-neutral-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-2">
          {offers.map((offer) => (
            <Link
              key={offer.slug}
              href={`/search?filter=${offer.slug}`}
              className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 hover:text-black"
            >
              {offer.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// Componente para el botón de Mis Pedidos
function OrdersButton() {
  return (
    <Link
      href="/mis-pedidos"
      className="flex hidden md:flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-md transition-colors"
      title="Mis Pedidos"
    >
      <OrdersIcon className="w-5 h-5" />
      <span className="hidden lg:inline">Mis Pedidos</span>
    </Link>
  );
}

// Componente para wishlist
function WishlistButton() {
  return (
    <Link
      href="/wishlist"
      className="flex hidden md:flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-md transition-colors"
      title="Lista de Deseos"
    >
      <HeartIcon className="w-5 h-5" />
      <span className="hidden lg:inline">Wishlist</span>
    </Link>
  );
}

// Componente para el menú de usuario
function UserMenu() {
  return (
    <div className="relative hidden md:block group">
      <button className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:text-black hover:bg-neutral-100 rounded-md transition-colors">
        <UserIcon className="w-5 h-5" />
        <span className="hidden lg:inline">Mi Cuenta</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-neutral-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="py-2">
          <Link href="/login" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 hover:text-black">
            Iniciar Sesión
          </Link>
          <Link href="/register" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 hover:text-black">
            Registrarse
          </Link>
          <hr className="my-2" />
          <Link href="/profile" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 hover:text-black">
            Mi Perfil
          </Link>
          <Link href="/addresses" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 hover:text-black">
            Mis Direcciones
          </Link>
          <Link href="/preferences" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 hover:text-black">
            Preferencias
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function Navbar() {
  const menu = await getMenu('next-js-frontend-header-menu');

  return (
    <nav className="relative bg-white border-b mb-8 border-neutral-200">
      {/* Banner promocional superior */}
      <div className="bg-black text-white text-center py-2 text-sm">
        <span>🔥 Envío gratis en compras superiores a Gs. 100.000 | Descuentos hasta 20% OFF</span>
      </div>

      {/* Navbar principal */}
      <div className="flex items-center justify-between p-4 lg:px-6">
        {/* Menú móvil */}
        <div className="block flex-none md:hidden">
          <Suspense fallback={null}>
            <MobileMenu menu={menu} />
          </Suspense>
        </div>

        {/* Logo y navegación principal */}
        <div className="flex w-full items-center">
          <div className="flex w-full md:w-1/3">
            <Link
              href="/"
              prefetch={true}
              className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
            >
              <LogoIcon className="h-24 w-24 md:h-28 md:w-28" />
            </Link>
            
            {/* Menú de navegación mejorado */}
            <div className="hidden gap-6 text-sm md:flex md:items-center">
              <BrandsDropdown />
              <CategoriesDropdown />
              <OffersDropdown />
              
              {/* Menú original */}
              {menu.length ? (
                <>
                  {menu.map((item: Menu) => (
                    <Link
                      key={item.title}
                      href={item.path}
                      prefetch={true}
                      className="text-neutral-500 underline-offset-4 hover:text-black hover:underline"
                    >
                      {item.title}
                    </Link>
                  ))}
                </>
              ) : null}
            </div>
          </div>

          {/* Buscador */}
          <div className="hidden justify-center md:flex md:w-1/3">
            <Suspense fallback={<SearchSkeleton />}>
              <Search />
            </Suspense>
          </div>

          {/* Acciones de usuario */}
          <div className="flex items-center gap-2 justify-end md:w-1/3">
            <WishlistButton />
            <OrdersButton />
            <UserMenu />
            <div className="ml-2">
              <CartModal />
            </div>
          </div>
        </div>
      </div>

      {/* Barra de categorías rápidas (solo desktop) */}
      <div className="hidden md:block bg-white px-6 mb-2">
        <div className="flex items-center justify-center gap-8 text-sm">
          <Link href="/search?category=nuevos" className="text-neutral-600 hover:text-black transition-colors">
            Nuevos Ingresos
          </Link>
          <Link href="/search?category=trending" className="text-neutral-600 hover:text-black transition-colors">
            Tendencias
          </Link>
          <Link href="/search?category=sale" className="text-red-600 hover:text-red-700 transition-colors font-medium">
            Liquidación
          </Link>
          <Link href="/search?category=premium" className="text-neutral-600 hover:text-black transition-colors">
            Premium
          </Link>
          <Link href="/search?category=eco" className="text-green-600 hover:text-green-700 transition-colors">
            Eco-Friendly
          </Link>
        </div>
      </div>
    </nav>
  );
}