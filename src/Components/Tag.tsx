export default function Tag({ children }: { children: React.ReactNode }) {
    return (
        <span className="rounded-full bg-accent px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-black">
            {children}
        </span>
    );
}