export default function Footer() {
  return (
    <footer className="text-sm text-slate-600 p-2 pt-5">
      <div className="rounded-lg border flex flex-col gap-2 p-4 md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} Handcrafted Haven</p>
        <p className="text-red-600 font-bold">NOT AN ACTUAL STORE</p>
      </div>
    </footer>
  );
}
