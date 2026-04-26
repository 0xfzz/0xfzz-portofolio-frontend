"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DownloadCVButton } from "../resume/DownloadCVButton";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    navigation: { label: string; href: string }[];
    resumeData: any;
}

export function MobileMenu({ isOpen, onClose, navigation, resumeData }: MobileMenuProps) {
    const pathname = usePathname();

    return (
        <div>
            {isOpen && (
                <>
                    <div
                        onClick={onClose}
                        className="fixed inset-0 z-40 backdrop-blur-md bg-black/5"
                    />

                    <div
                        className="fixed right-0 top-0 bottom-0 z-50 w-[280px] bg-background border-l border-border shadow-2xl p-6 pt-24 flex flex-col"
                    >
                        <nav className="flex flex-col gap-6">
                            <Link
                                href="/"
                                className="text-lg font-bold tracking-tight text-foreground font-mono"
                                style={{ fontFamily: 'var(--font-fira-code), monospace' }}
                            >
                                {process.env.NEXT_PUBLIC_NAVBAR_TITLE || "0xfzz"}
                            </Link>
                            {navigation.map((link) => {
                                const isActive = link.href === "/"
                                    ? pathname === "/"
                                    : pathname === link.href || pathname?.startsWith(link.href + "/");

                                return (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        onClick={onClose}
                                        className={cn(
                                            "text-lg font-medium transition-colors",
                                            isActive
                                                ? "text-foreground"
                                                : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="mt-auto pt-10 border-t border-border/40">
                            <DownloadCVButton
                                data={resumeData}
                                label={resumeData.label || "Download CV"}
                                className="w-full"
                                variant="secondary"
                                showIcon={true}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
