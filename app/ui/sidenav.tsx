import Link from 'next/link';
import NavLinks from '@/app/ui/helpers/nav-links';
// import { signOut } from '@/auth';

export default function SideNav() {
    return (
      <div className="flex h-full flex-col px-3 py-4 md:px-2">
        <Link
          className="mb-2 hidden flex h-20 rounded-md bg-center bg-cover md:block md:flex md:flex-col justify-end md:h-35"
          href="/"
          style={{ backgroundImage: `url('/logo.svg')` }}
        >
          <div className="bg-black w-full opacity-70 p-2">
            <p className="text-lg text-white font-semibold leading-tight">
              Handcrafted Haven
            </p>
            <p className="text-sm text-white leading-tight">
              Unique Handmade Treasures
            </p>
          </div>
        </Link>
        <div className="flex grow flex-row justify-start space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <NavLinks />
        </div>
      </div>
    );
  }
  