import {
    ArrowRightEndOnRectangleIcon,
    ArrowLeftStartOnRectangleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { logoutAction } from "@/app/lib/actions/auth_actions";

const AVATAR_COLORS = [
    'bg-[#6b4f3f]', // Coffee Bean
    'bg-[#8fae9e]', // Muted Teal
    'bg-[#c97c5d]', // Burnt Peach
    'bg-[#b5654d]', // Cinnamon Wood
    'bg-[#2e2e2e]', // Graphite
];

export function UserAvatar({ name }: { name: string }) {
    const initial = name.charAt(0).toUpperCase();
    const colorIndex = name.length % AVATAR_COLORS.length;
    const bgColor = AVATAR_COLORS[colorIndex];

    return (
        <div className={`flex h-9 w-9 items-center justify-center rounded-full ${bgColor} text-white font-bold border-2 border-white shadow-sm`}>
            {initial}
        </div>
    );
}

export function LoginButton() {
    return (
        <Link
            href="/login"
            className="flex h-10 items-center rounded-lg bg-black px-4 text-sm font-medium text-white transition-colors hover:bg-slate-800 gap-2"
        >
            <span className="hidden md:block">Log In</span>
            <ArrowRightEndOnRectangleIcon className="w-5" />
        </Link>
    );
}

export function LogoutButton() {
    return (
        <form action={logoutAction}>
            <button
                type="submit"
                className="flex h-10 items-center rounded-lg border border-slate-200 px-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 gap-2"
            >
                <span className="hidden md:block">Log Out</span>
                <ArrowLeftStartOnRectangleIcon className="w-5" />
            </button>
        </form>
    );
}